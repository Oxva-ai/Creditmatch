import { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

const staticRoutes: MetadataRoute.Sitemap = [
  { url: SITE_URL, priority: 1, changeFrequency: "daily", lastModified: new Date() },
  { url: `${SITE_URL}/quiz`, priority: 0.9, changeFrequency: "daily", lastModified: new Date() },
  { url: `${SITE_URL}/about`, priority: 0.5, changeFrequency: "monthly", lastModified: new Date() },
  { url: `${SITE_URL}/articles`, priority: 0.7, changeFrequency: "weekly", lastModified: new Date() },
  { url: `${SITE_URL}/privacy`, priority: 0.3, changeFrequency: "yearly", lastModified: new Date() },
  { url: `${SITE_URL}/terms`, priority: 0.3, changeFrequency: "yearly", lastModified: new Date() },
  { url: `${SITE_URL}/cookies`, priority: 0.3, changeFrequency: "yearly", lastModified: new Date() },
];

const articleSlugs = [
  "best-credit-cards-uk-2025",
  "how-to-build-credit-score-uk",
  "balance-transfer-guide-uk",
  "credit-card-for-self-employed-uk",
  "cashback-credit-cards-uk",
];

const articleRoutes: MetadataRoute.Sitemap = articleSlugs.map((slug) => ({
  url: `${SITE_URL}/articles/${slug}`,
  priority: 0.8,
  changeFrequency: "monthly" as const,
  lastModified: new Date(),
}));

export default function sitemap(): MetadataRoute.Sitemap {
  return [...staticRoutes, ...articleRoutes];
}
