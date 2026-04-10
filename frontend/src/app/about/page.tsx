import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "About CreditMatch.uk — How Our Credit Card Matching Works",
  description: "Learn how CreditMatch.uk helps you find the right credit card. Our 5-question eligibility checker matches you with cards you're likely to be approved for.",
};

export default function AboutPage() {
  return (
    <div className="bg-gradient-to-b from-brand-50 to-white py-12">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900">About CreditMatch.uk</h1>
        <p className="mt-4 text-lg text-gray-600">
          We help UK consumers find credit cards they're likely to be approved for,
          reducing the risk of rejection and protecting credit scores.
        </p>

        <div className="mt-10 space-y-8">
          <section>
            <h2 className="text-xl font-semibold text-gray-900">How It Works</h2>
            <div className="mt-4 space-y-3">
              {[
                "You answer 5 simple questions about your employment, income, and credit history.",
                "Our matching algorithm compares your profile against criteria from 10+ UK credit cards.",
                "You receive a personalised match score and a ranked list of recommended cards.",
                "Apply directly through our links — each application goes to the card issuer, not us.",
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-brand-600" />
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900">Why Your Credit Score Isn't Affected</h2>
            <p className="mt-2 text-gray-600">
              We never perform a credit check. Our matching is based on the information you
              provide and the publicly available criteria from card issuers. When you apply
              through our links, the card issuer may perform their own assessment — but
              knowing your likely approval chances beforehand helps you apply more selectively.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900">Our Matching Algorithm</h2>
            <p className="mt-2 text-gray-600">
              Our algorithm scores each card based on how well your profile matches the issuer's
              typical acceptance criteria. Factors include:
            </p>
            <ul className="mt-3 list-inside list-disc space-y-1 text-gray-600">
              <li>Minimum income requirements</li>
              <li>Employment status compatibility</li>
              <li>Credit score tier alignment</li>
              <li>Existing debt levels</li>
              <li>Recent payment history</li>
            </ul>
            <p className="mt-2 text-sm text-gray-500">
              Note: Our match score is an estimate and does not guarantee approval.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900">How We Make Money</h2>
            <p className="mt-2 text-gray-600">
              We earn commissions from card issuers when users apply through our links and
              are approved. This does not affect our recommendations — our algorithm ranks
              cards purely on match quality. We may also earn revenue from lead referrals
              to financial services partners.
            </p>
          </section>

          <section className="rounded-xl bg-brand-50 p-6">
            <h2 className="text-xl font-semibold text-gray-900">More Ways to Earn</h2>
            <p className="mt-2 text-gray-600">
              Looking for referral codes, sign-up bonuses, and community-shared deals?
              Visit our partner site:
            </p>
            <a
              href={process.env.NEXT_PUBLIC_EASEYEARNS_URL || "https://easyearns.com"}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center text-brand-600 font-semibold hover:underline"
            >
              EasyEarns.com — Community Referral Codes →
            </a>
          </section>
        </div>
      </div>
    </div>
  );
}
