"use client";

import type { MatchedProduct } from "@/types";
import { CATEGORY_LABELS, EASEYEARNS_URL } from "@/lib/constants";
import { ExternalLink, Check, X, AlertTriangle, ArrowRight } from "lucide-react";

interface CardCardProps {
  product: MatchedProduct;
  index: number;
}

export default function CardCard({ product, index }: CardCardProps) {
  const isFeatured = product.isFeatured;
  const categoryLabel = CATEGORY_LABELS[product.category] || product.category;

  return (
    <div
      className={`relative rounded-xl border-2 p-6 transition-shadow hover:shadow-md ${
        isFeatured ? "border-brand-500 bg-brand-50/50" : "border-gray-200 bg-white"
      }`}
    >
      {isFeatured && (
        <div className="absolute -top-3 left-4 rounded-full bg-brand-600 px-3 py-0.5 text-xs font-semibold text-white">
          ⭐ Top Match
        </div>
      )}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
        {/* Card Info */}
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="badge bg-gray-100 text-gray-600">{categoryLabel}</span>
            {index === 0 && (
              <span className="badge bg-green-100 text-green-700">Best Match</span>
            )}
          </div>
          <h3 className="mt-2 text-xl font-bold text-gray-900">{product.name}</h3>
          <p className="mt-1 text-sm text-gray-600">{product.shortDescription}</p>

          {/* Match Reasons */}
          <div className="mt-3 space-y-1">
            {product.matchReason.slice(0, 3).map((reason, i) => (
              <div key={i} className="flex items-center gap-2 text-xs text-gray-500">
                <Check className="h-3.5 w-3.5 text-brand-500" />
                {reason}
              </div>
            ))}
          </div>

          {/* Features */}
          <div className="mt-3 flex flex-wrap gap-2">
            {product.features.slice(0, 4).map((f, i) => (
              <span key={i} className="badge bg-brand-50 text-brand-700">{f}</span>
            ))}
          </div>

          {/* Pros/Cons */}
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div>
              <p className="mb-1 text-xs font-semibold text-green-700">Pros</p>
              {product.pros.slice(0, 2).map((p, i) => (
                <div key={i} className="flex items-start gap-1.5 text-xs text-gray-600">
                  <Check className="mt-0.5 h-3 w-3 flex-shrink-0 text-green-500" />
                  {p}
                </div>
              ))}
            </div>
            <div>
              <p className="mb-1 text-xs font-semibold text-red-700">Cons</p>
              {product.cons.slice(0, 2).map((c, i) => (
                <div key={i} className="flex items-start gap-1.5 text-xs text-gray-600">
                  <X className="mt-0.5 h-3 w-3 flex-shrink-0 text-red-500" />
                  {c}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Side */}
        <div className="flex flex-col items-center gap-3 sm:min-w-[200px]">
          <div className="text-center">
            <p className="text-2xl font-extrabold text-brand-600">{product.apr}%</p>
            <p className="text-xs text-gray-500">Representative APR</p>
          </div>

          <div className="w-full space-y-2">
            {product.affiliateLink ? (
              <a
                href={product.affiliateLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full justify-center"
              >
                Apply Now <ExternalLink className="ml-1 h-4 w-4" />
              </a>
            ) : (
              <a
                href={`${EASEYEARNS_URL}/brands/${product.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full justify-center"
              >
                View on EasyEarns <ArrowRight className="ml-1 h-4 w-4" />
              </a>
            )}
            <a
              href={product.affiliateLink || `${EASEYEARNS_URL}/brands/${product.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary w-full justify-center"
            >
              Learn More
            </a>
          </div>

          {/* Risk Warning */}
          <div className="flex items-start gap-1.5 rounded-lg bg-amber-50 p-2 text-xs text-amber-800">
            <AlertTriangle className="mt-0.5 h-3.5 w-3.5 flex-shrink-0" />
            <p>Borrowing more than you can afford to repay may lead to financial difficulty.</p>
          </div>
        </div>
      </div>

      {/* Representative Example */}
      <div className="mt-4 border-t border-gray-100 pt-3">
        <p className="text-xs text-gray-400">{product.representativeExample}</p>
      </div>
    </div>
  );
}
