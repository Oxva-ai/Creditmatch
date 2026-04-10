import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Credit Card Guides & Articles — CreditMatch.uk",
  description: "Expert guides on UK credit cards, credit scores, balance transfers, and building credit.",
};

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

async function getArticles() {
  try {
    const res = await fetch(`${API_URL}/api/articles`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.articles || [];
  } catch {
    return [];
  }
}

export default async function ArticlesPage() {
  const articles = await getArticles();

  if (!articles.length) {
    return (
      <div className="bg-gradient-to-b from-brand-50 to-white py-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Guides & Articles</h1>
          <p className="mt-4 text-gray-600">No articles available yet. Check back soon!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-brand-50 to-white py-12">
      <div className="mx-auto max-w-4xl px-4 sm-px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900">Guides & Articles</h1>
        <p className="mt-2 text-gray-600">
          Expert advice on UK credit cards, credit scores, and financial products.
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {articles.map((article: { slug: string; title: string; excerpt: string; category: string }) => (
            <Link
              key={article.slug}
              href={`/articles/${article.slug}`}
              className="card transition-shadow hover:shadow-md"
            >
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <BookOpen className="h-3.5 w-3.5" />
                <span>{article.category.replace("-", " ")}</span>
              </div>
              <h2 className="mt-2 text-lg font-semibold text-gray-900">{article.title}</h2>
              <p className="mt-1 text-sm text-gray-600">{article.excerpt}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
