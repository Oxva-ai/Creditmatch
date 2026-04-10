import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen } from "lucide-react";

export const metadata: Metadata = {
  title: "Credit Card Guides & Articles — CreditMatch.uk",
  description: "Expert guides on UK credit cards, credit scores, balance transfers, and building credit.",
};

const ARTICLES = [
  {
    slug: "best-credit-cards-uk-2025",
    title: "Best Credit Cards in the UK for 2025",
    excerpt: "Our pick of the top credit cards across every category — cashback, balance transfer, credit building, and more.",
    category: "guide",
    readTime: "8 min",
  },
  {
    slug: "how-to-build-credit-score-uk",
    title: "How to Build Your Credit Score in the UK",
    excerpt: "Step-by-step guide to improving your credit score, from checking your report to using credit builder cards.",
    category: "credit-builder",
    readTime: "10 min",
  },
  {
    slug: "balance-transfer-guide-uk",
    title: "Complete Guide to Balance Transfer Cards",
    excerpt: "Everything you need to know about transferring credit card balances to save on interest.",
    category: "balance-transfer",
    readTime: "7 min",
  },
  {
    slug: "credit-card-for-self-employed-uk",
    title: "Best Credit Cards for Self-Employed UK",
    excerpt: "Self-employed? Here are the cards most likely to accept your application and the criteria lenders look for.",
    category: "guide",
    readTime: "6 min",
  },
  {
    slug: "cashback-credit-cards-uk",
    title: "Top Cashback Credit Cards in the UK",
    excerpt: "Earn money back on everyday spending. We compare the best cashback cards and their earning rates.",
    category: "cashback",
    readTime: "5 min",
  },
];

export default function ArticlesPage() {
  return (
    <div className="bg-gradient-to-b from-brand-50 to-white py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900">Guides & Articles</h1>
        <p className="mt-2 text-gray-600">
          Expert advice on UK credit cards, credit scores, and financial products.
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {ARTICLES.map((article) => (
            <Link
              key={article.slug}
              href={`/articles/${article.slug}`}
              className="card transition-shadow hover:shadow-md"
            >
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <BookOpen className="h-3.5 w-3.5" />
                <span>{article.category.replace("-", " ")}</span>
                <span>·</span>
                <span>{article.readTime} read</span>
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
