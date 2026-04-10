import { Router } from "express";
import prisma from "../utils/prisma.js";
import { authenticate, type AuthRequest } from "../middleware/auth.js";

const router = Router();

/**
 * GET /api/stats — Dashboard stats (admin only)
 */
router.get("/", authenticate, async (_req: AuthRequest, res) => {
  try {
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekStart = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

    const [
      totalLeads,
      todayLeads,
      weekLeads,
      monthLeads,
      newLeads,
      soldLeads,
      totalProducts,
      activeProducts,
      revenueEstimate,
    ] = await Promise.all([
      prisma.lead.count(),
      prisma.lead.count({ where: { createdAt: { gte: todayStart } } }),
      prisma.lead.count({ where: { createdAt: { gte: weekStart } } }),
      prisma.lead.count({ where: { createdAt: { gte: monthStart } } }),
      prisma.lead.count({ where: { status: "NEW" } }),
      prisma.lead.count({ where: { status: "SOLD" } }),
      prisma.product.count(),
      prisma.product.count({ where: { isActive: true } }),
      prisma.lead.aggregate({
        _sum: { score: true },
        where: { status: "SOLD" },
      }),
    ]);

    // Get leads by source (UTM)
    const leadsBySource = await prisma.lead.groupBy({
      by: ["utmSource"],
      _count: true,
      orderBy: { _count: { utmSource: "desc" } },
    });

    // Recent leads
    const recentLeads = await prisma.lead.findMany({
      orderBy: { createdAt: "desc" },
      take: 10,
      select: {
        id: true,
        name: true,
        email: true,
        score: true,
        status: true,
        createdAt: true,
        matchedProducts: true,
      },
    });

    res.json({
      stats: {
        totalLeads,
        todayLeads,
        weekLeads,
        monthLeads,
        newLeads,
        soldLeads,
        totalProducts,
        activeProducts,
        estimatedRevenue: (soldLeads * 20).toFixed(2), // £20 avg per lead
      },
      leadsBySource: leadsBySource.filter((s) => s.utmSource).slice(0, 5),
      recentLeads,
    });
  } catch (error) {
    console.error("Stats error:", error);
    res.status(500).json({ error: "Failed to fetch stats" });
  }
});

export default router;
