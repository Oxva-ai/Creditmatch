"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import type { QuizResult } from "@/types";
import MatchScore from "@/components/results/MatchScore";
import CardCard from "@/components/results/CardCard";
import { EASEYEARNS_URL } from "@/lib/constants";
import { ArrowRight, RefreshCw } from "lucide-react";

function ResultsContent() {
  const searchParams = useSearchParams();
  const leadId = searchParams.get("lead");
  const [result, setResult] = useState<QuizResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = sessionStorage.getItem("cm_quiz_result");
    if (stored) {
      try {
        setResult(JSON.parse(stored));
      } catch {
        window.location.href = "/quiz";
      }
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="text-center">
          <RefreshCw className="mx-auto h-8 w-8 animate-spin text-brand-600" />
          <p className="mt-4 text-gray-600">Loading your results...</p>
        </div>
      </div>
    );
  }

  if (!result || result.matches.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900">No Matches Found</h1>
        <p className="mt-4 text-gray-600">
          Based on your answers, we couldn&apos;t find a matching credit card right now.
          This doesn&apos;t mean you won&apos;t be approved — our matching is conservative.
        </p>
        <div className="mt-8">
          <a href={EASEYEARNS_URL} target="_blank" rel="noopener noreferrer" className="btn-primary">
            Browse All Options on EasyEarns <ArrowRight className="ml-1 h-4 w-4" />
          </a>
        </div>
        <button
          onClick={() => (window.location.href = "/quiz")}
          className="mt-4 btn-secondary"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-brand-50 to-white py-8">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Your Credit Card Match Results
          </h1>
          <p className="mt-2 text-gray-600">
            We found <strong>{result.matches.length} card{result.matches.length > 1 ? "s" : ""}</strong> that match your profile.
          </p>
        </div>

        <div className="mb-10 card">
          <MatchScore score={result.score} />
        </div>

        {result.matches[0] && (
          <div className="mb-6">
            <h2 className="mb-4 text-lg font-semibold text-gray-900">🏆 Your Best Match</h2>
            <CardCard product={result.matches[0]} index={0} />
          </div>
        )}

        {result.matches.length > 1 && (
          <div>
            <h2 className="mb-4 text-lg font-semibold text-gray-900">Other Options</h2>
            <div className="space-y-4">
              {result.matches.slice(1).map((product, i) => (
                <CardCard key={product.id} product={product} index={i + 1} />
              ))}
            </div>
          </div>
        )}

        <div className="mt-10 rounded-xl border-2 border-dashed border-brand-300 bg-brand-50 p-8 text-center">
          <h3 className="text-lg font-semibold text-gray-900">Want More Options?</h3>
          <p className="mt-2 text-gray-600">
            Browse 394+ brands with verified referral codes, sign-up bonuses, and community reviews.
          </p>
          <a
            href={EASEYEARNS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 btn-primary"
          >
            Visit EasyEarns.com <ArrowRight className="ml-1 h-4 w-4" />
          </a>
        </div>

        <div className="mt-8 rounded-lg bg-gray-100 p-4 text-xs text-gray-500">
          <p>
            <strong>Disclaimer:</strong> Match scores are estimates based on the information you
            provided and our matching criteria. They do not guarantee approval. Actual approval
            depends on the lender&apos;s full assessment, which may include a credit check. All credit
            commitments should be carefully considered. Borrowing more than you can afford to repay
            may lead to financial difficulty.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function ResultsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center py-24">
          <div className="text-center">
            <RefreshCw className="mx-auto h-8 w-8 animate-spin text-brand-600" />
            <p className="mt-4 text-gray-600">Loading your results...</p>
          </div>
        </div>
      }
    >
      <ResultsContent />
    </Suspense>
  );
}
