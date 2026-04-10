import { Router } from "express";
import { z } from "zod";
import prisma from "../utils/prisma.js";
import { findMatches } from "../utils/matching.js";
import { sendNewLeadAlert } from "../utils/email.js";
import { quizLimiter } from "../middleware/rateLimiter.js";
import { authenticate, type AuthRequest } from "../middleware/auth.js";

const router = Router();

// ── Validation Schema ─────────────────────────────────────────────
const leadSchema = z.object({
  name: z.string().optional(),
  email: z.string().email("Valid email is required"),
  phone: z.string().optional(),
  employment: z.enum(["EMPLOYED", "SELF_EMPLOYED", "UNEMPLOYED", "STUDENT", "RETIRED"]),
  annualIncome: z.number().int().positive("Income must be a positive number"),
  creditHistory: z.enum(["EXCELLENT", "GOOD", "FAIR", "POOR"]),
  hasDebt: z.boolean(),
  missedPayments: z.boolean(),
  consentToShare: z.literal(true, {
    errorMap: () => ({ message: "You must consent to share your details to see results" }),
  }),
  consentMarketing: z.boolean().optional().default(false),
  utmSource: z.string().optional(),
  utmMedium: z.string().optional(),
  utmCampaign: z.string().optional(),
});

// ── Public Routes ─────────────────────────────────────────────────

/**
 * POST /api/leads/submit
 * Submits quiz answers, saves lead, returns matched products.
 */
router.post("/submit", quizLimiter, async (req, res) => {
  try {
    const data = leadSchema.parse(req.body);

    // Run matching algorithm
    const matches = await findMatches({
      employment: data.employment,
      annualIncome: data.annualIncome,
      creditHistory: data.creditHistory,
      hasDebt: data.hasDebt,
      missedPayments: data.missedPayments,
    });

    // Save the lead
    const lead = await prisma.lead.create({
      data: {
        name: data.name || null,
        email: data.email,
        phone: data.phone || null,
        employment: data.employment,
        annualIncome: data.annualIncome,
        creditHistory: data.creditHistory,
        hasDebt: data.hasDebt,
        missedPayments: data.missedPayments,
        consentToShare: data.consentToShare,
        consentMarketing: data.consentMarketing,
        utmSource: data.utmSource || null,
        utmMedium: data.utmMedium || null,
        utmCampaign: data.utmCampaign || null,
        matchedProducts: matches.map((m) => m.name),
        score: matches.length > 0 ? matches[0].matchScore : 0,
      },
    });

    // Send admin alert (async, don't await)
    sendNewLeadAlert({
      id: lead.id,
      name: lead.name || undefined,
      email: lead.email,
      phone: lead.phone || undefined,
      employment: lead.employment,
      annualIncome: lead.annualIncome,
      creditHistory: lead.creditHistory,
      score: lead.score,
      matchedProducts: lead.matchedProducts,
    }).catch((e) => console.error("Email alert failed:", e));

    // Return matches to frontend (strip sensitive broker data)
    res.json({
      success: true,
      leadId: lead.id,
      score: lead.score,
      matches: matches.map((m) => ({
        id: m.id,
        name: m.name,
        slug: m.slug,
        logoUrl: m.logoUrl,
        shortDescription: m.shortDescription,
        apr: m.apr,
        creditLimitMin: m.creditLimitMin,
        creditLimitMax: m.creditLimitMax,
        representativeExample: m.representativeExample,
        features: m.features,
        pros: m.pros,
        cons: m.cons,
        affiliateLink: m.affiliateLink,
        category: m.category,
        isFeatured: m.isFeatured,
        matchScore: m.matchScore,
        matchReason: m.matchReason,
      })),
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: "Validation failed", details: error.errors });
    }
    console.error("Lead submission error:", error);
    res.status(500).json({ error: "Failed to process quiz submission" });
  }
});

// ── Admin Routes ──────────────────────────────────────────────────

/**
 * GET /api/leads — List all leads (admin only)
 */
router.get("/", authenticate, async (req: AuthRequest, res) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const status = req.query.status as string;
    const skip = (page - 1) * limit;

    const where: any = {};
    if (status && status !== "ALL") where.status = status;

    const [leads, total] = await Promise.all([
      prisma.lead.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.lead.count({ where }),
    ]);

    res.json({
      leads,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching leads:", error);
    res.status(500).json({ error: "Failed to fetch leads" });
  }
});

/**
 * PUT /api/leads/:id — Update lead status (admin only)
 */
router.put("/:id", authenticate, async (req: AuthRequest, res) => {
  try {
    const { status, brokerNotes } = req.body;
    const lead = await prisma.lead.update({
      where: { id: req.params.id },
      data: {
        ...(status && { status }),
        ...(brokerNotes !== undefined && { brokerNotes }),
      },
    });
    res.json({ success: true, lead });
  } catch (error) {
    res.status(500).json({ error: "Failed to update lead" });
  }
});

/**
 * DELETE /api/leads/:id — Delete a lead (GDPR right to erasure)
 */
router.delete("/:id", authenticate, async (req: AuthRequest, res) => {
  try {
    await prisma.lead.delete({ where: { id: req.params.id } });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete lead" });
  }
});

/**
 * GET /api/leads/export — Export leads as JSON for broker handoff
 */
router.get("/export", authenticate, async (req: AuthRequest, res) => {
  try {
    const status = (req.query.status as string) || "NEW";
    const leads = await prisma.lead.findMany({
      where: { status: status as any },
      orderBy: { createdAt: "desc" },
    });

    // Format for broker export
    const exportData = leads.map((l) => ({
      name: l.name || "",
      email: l.email,
      phone: l.phone || "",
      employment: l.employment,
      annualIncome: l.annualIncome,
      creditHistory: l.creditHistory,
      hasDebt: l.hasDebt,
      missedPayments: l.missedPayments,
      matchScore: l.score,
      matchedProducts: l.matchedProducts.join("; "),
      consentToShare: l.consentToShare,
      capturedAt: l.createdAt.toISOString(),
    }));

    // Mark exported leads as SOLD if requested
    if (req.query.markSold === "true") {
      await prisma.lead.updateMany({
        where: { id: { in: leads.map((l) => l.id) } },
        data: { status: "SOLD" },
      });
    }

    res.json({ leads: exportData, count: exportData.length });
  } catch (error) {
    console.error("Export error:", error);
    res.status(500).json({ error: "Failed to export leads" });
  }
});

export default router;
