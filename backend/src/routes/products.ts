import { Router } from "express";
import prisma from "../utils/prisma.js";
import slugify from "slugify";
import { authenticate, type AuthRequest } from "../middleware/auth.js";

const router = Router();

/**
 * GET /api/products — Fetch products (with optional matching params)
 * Public endpoint used by frontend results page.
 */
router.get("/", async (req, res) => {
  try {
    const category = req.query.category as string;
    const featured = req.query.featured === "true";

    const where: any = { isActive: true };
    if (category) where.category = category;
    if (featured) where.isFeatured = true;

    const products = await prisma.product.findMany({
      where,
      orderBy: [{ isFeatured: "desc" }, { brokerPayout: "desc" }],
    });

    res.json({ products });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

/**
 * GET /api/products/:slug — Single product detail
 */
router.get("/:slug", async (req, res) => {
  try {
    const product = await prisma.product.findUnique({
      where: { slug: req.params.slug },
    });
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json({ product });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch product" });
  }
});

// ── Admin CRUD ────────────────────────────────────────────────────

/**
 * POST /api/admin/products — Create product
 */
router.post("/", authenticate, async (req: AuthRequest, res) => {
  try {
    const {
      name,
      description,
      shortDescription,
      apr,
      creditLimitMin,
      creditLimitMax,
      representativeExample,
      minIncome,
      minCreditScore,
      requiresEmployment,
      excludedEmployment,
      affiliateLink,
      brokerPayout,
      category,
      features,
      pros,
      cons,
      isFeatured,
      logoUrl,
    } = req.body;

    const slug = slugify(name, { lower: true, strict: true });

    const product = await prisma.product.create({
      data: {
        name,
        slug,
        description: description || "",
        shortDescription: shortDescription || "",
        apr: parseFloat(apr),
        creditLimitMin: parseInt(creditLimitMin) || 200,
        creditLimitMax: parseInt(creditLimitMax) || 5000,
        representativeExample: representativeExample || "",
        minIncome: parseInt(minIncome) || 12000,
        minCreditScore: minCreditScore || "POOR",
        requiresEmployment: requiresEmployment || false,
        excludedEmployment: excludedEmployment || [],
        affiliateLink: affiliateLink || "",
        brokerPayout: parseFloat(brokerPayout) || 20.0,
        category,
        features: features || [],
        pros: pros || [],
        cons: cons || [],
        isFeatured: isFeatured || false,
        logoUrl: logoUrl || "",
      },
    });

    res.json({ success: true, product });
  } catch (error) {
    console.error("Create product error:", error);
    res.status(500).json({ error: "Failed to create product" });
  }
});

/**
 * PUT /api/admin/products/:id — Update product
 */
router.put("/:id", authenticate, async (req: AuthRequest, res) => {
  try {
    const product = await prisma.product.update({
      where: { id: req.params.id },
      data: req.body,
    });
    res.json({ success: true, product });
  } catch (error) {
    res.status(500).json({ error: "Failed to update product" });
  }
});

/**
 * DELETE /api/admin/products/:id — Soft delete (set inactive)
 */
router.delete("/:id", authenticate, async (req: AuthRequest, res) => {
  try {
    await prisma.product.update({
      where: { id: req.params.id },
      data: { isActive: false },
    });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete product" });
  }
});

export default router;
