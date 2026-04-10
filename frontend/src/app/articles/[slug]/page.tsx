import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

async function getArticle(slug: string) {
  try {
    const res = await fetch(`${API_URL}/api/articles/${slug}`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.article || null;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const article = await getArticle(params.slug);
  return {
    title: article ? `${article.title} — CreditMatch.uk` : "Article Not Found — CreditMatch.uk",
    description: article?.metaDescription || article?.excerpt || "Credit card guides and articles.",
  };
}

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const article = await getArticle(params.slug);

  if (!article) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center">
        <h1 className="text-2xl font-bold">Article Not Found</h1>
        <Link href="/articles" className="mt-4 inline-block text-brand-600 underline">
          ← Back to articles
        </Link>
      </div>
    );
  }

  const renderContent = (content: string) => {
    return content
      .split("\n")
      .map((line: string, i: number) => {
        if (line.startsWith("# ")) {
          return <h1 key={i} className="mt-8 text-3xl font-bold">{line.slice(2)}</h1>;
        }
        if (line.startsWith("## ")) {
          return <h2 key={i} className="mt-8 text-2xl font-semibold">{line.slice(3)}</h2>;
        }
        if (line.startsWith("### ")) {
          return <h3 key={i} className="mt-6 text-xl font-medium">{line.slice(4)}</h3>;
        }
        if (line.startsWith("- **")) {
          const match = line.match(/- \*\*(.+?)\*\* — (.+)/);
          if (match) return <li key={i} className="ml-4"><strong>{match[1]}</strong> — {match[2]}</li>;
        }
        if (line.startsWith("- ")) {
          return <li key={i} className="ml-4 text-gray-700">{line.slice(2)}</li>;
        }
        if (line.startsWith("---")) {
          return <hr key={i} className="my-8 border-gray-200" />;
        }
        if (line.startsWith("*")) {
          return <p key={i} className="text-sm italic text-gray-500">{line.replace(/\*/g, "")}</p>;
        }
        if (line.trim() === "") return <br key={i} />;

        // Process inline markdown
        let processed = line
          .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
          .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" class="text-brand-600 underline">$1</a>');

        return (
          <p
            key={i}
            className="text-gray-700 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: processed }}
          />
        );
      })
      .filter(Boolean);
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <Link href="/articles" className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700">
        <ArrowLeft className="h-4 w-4" /> Back to articles
      </Link>
      <article className="mt-6">
        <h1 className="text-3xl font-bold text-gray-900">{article.title}</h1>
        <div className="mt-8 space-y-2">{renderContent(article.content)}</div>
      </article>

      <div className="mt-12 rounded-xl bg-brand-50 p-6 text-center">
        <h3 className="text-lg font-semibold">Ready to find your card?</h3>
        <p className="mt-2 text-gray-600">Check your eligibility in 30 seconds — completely free.</p>
        <Link href="/quiz" className="mt-4 inline-block btn-primary">
          Check My Eligibility
        </Link>
      </div>
    </div>
  );
}
