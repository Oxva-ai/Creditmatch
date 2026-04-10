export const dynamic = "force-static";

export function GET() {
  const robots = `User-agent: *
Allow: /

# Block admin routes
Disallow: /admin/

# Block API proxy
Disallow: /api/

# Sitemap
Sitemap: ${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/sitemap.xml
`;

  return new Response(robots, {
    headers: { "Content-Type": "text/plain" },
  });
}
