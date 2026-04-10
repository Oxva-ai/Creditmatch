import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { requireAuth } from "../middleware/auth.js";
import slugify from "slugify";

const prisma = new PrismaClient();
const router = Router();

// ── Public ──────────────────────────────────────────────────────

/**
 * GET /api/articles — List published articles
 */
router.get("/", async (_req, res) => {
  try {
    const { category } = _req.query;
    const where: Record<string, unknown> = { isPublished: true };
    if (category && typeof category === "string") where.category = category;

    const articles = await prisma.article.findMany({
      where,
      orderBy: { publishedAt: "desc" },
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        category: true,
        targetKeyword: true,
        publishedAt: true,
        createdAt: true,
      },
    });

    res.json({ articles });
  } catch {
    res.status(500).json({ error: "Failed to fetch articles" });
  }
});

/**
 * GET /api/articles/:slug — Single article
 */
router.get("/:slug", async (req, res) => {
  try {
    const article = await prisma.article.findUnique({ where: { slug: req.params.slug } });
    if (!article) return res.status(404).json({ error: "Article not found" });

    res.json({ article });
  } catch {
    res.status(500).json({ error: "Failed to fetch article" });
  }
});

// ── Admin ───────────────────────────────────────────────────────

/**
 * GET /api/admin/articles — List all articles (incl. unpublished)
 */
router.get("/admin/articles", requireAuth, async (_req, res) => {
  try {
    const articles = await prisma.article.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.json({ articles });
  } catch {
    res.status(500).json({ error: "Failed to fetch articles" });
  }
});

/**
 * POST /api/admin/articles — Create article
 */
router.post("/admin/articles", requireAuth, async (req, res) => {
  try {
    const { title, excerpt, content, category, targetKeyword, metaTitle, metaDescription, isPublished } =
      req.body;

    const slug = slugify(title, { lower: true, strict: true });

    const article = await prisma.article.create({
      data: {
        title,
        slug,
        excerpt,
        content,
        category: category || "guide",
        targetKeyword: targetKeyword || "",
        metaTitle: metaTitle || title,
        metaDescription: metaDescription || "",
        isPublished: isPublished || false,
        publishedAt: isPublished ? new Date() : null,
      },
    });

    res.status(201).json({ article });
  } catch (err) {
    console.error("Error creating article:", err);
    res.status(500).json({ error: "Failed to create article" });
  }
});

/**
 * PUT /api/admin/articles/:id — Update article
 */
router.put("/admin/articles/:id", requireAuth, async (req, res) => {
  try {
    const { title, excerpt, content, category, targetKeyword, metaTitle, metaDescription, isPublished } =
      req.body;

    const existing = await prisma.article.findUnique({ where: { id: req.params.id } });
    if (!existing) return res.status(404).json({ error: "Article not found" });

    const slug = title ? slugify(title, { lower: true, strict: true }) : existing.slug;

    const article = await prisma.article.update({
      where: { id: req.params.id },
      data: {
        title,
        slug,
        excerpt,
        content,
        category,
        targetKeyword,
        metaTitle,
        metaDescription,
        isPublished,
        publishedAt: isPublished && !existing.publishedAt ? new Date() : existing.publishedAt,
      },
    });

    res.json({ article });
  } catch {
    res.status(500).json({ error: "Failed to update article" });
  }
});

/**
 * DELETE /api/admin/articles/:id — Delete article
 */
router.delete("/admin/articles/:id", requireAuth, async (req, res) => {
  try {
    await prisma.article.delete({ where: { id: req.params.id } });
    res.json({ success: true });
  } catch {
    res.status(500).json({ error: "Failed to delete article" });
  }
});

export default router;
