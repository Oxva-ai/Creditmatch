import Link from "next/link";
import { Shield, Zap, TrendingUp, CheckCircle2 } from "lucide-react";

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-b from-brand-50 to-white py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <div className="mb-6 inline-flex items-center rounded-full bg-brand-100 px-4 py-1.5 text-sm font-medium text-brand-800">
            <Shield className="mr-2 h-4 w-4" />
            Trusted by 10,000+ UK users
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
            Find Your Perfect{" "}
            <span className="text-brand-600">Credit Card</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
            Answer 5 quick questions and get a personalised match score.
            No impact on your credit score — completely free.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/quiz" className="btn-primary text-base px-8 py-4">
              <Zap className="mr-2 h-5 w-5" />
              Check My Eligibility — Free
            </Link>
            <Link href="/about" className="btn-secondary text-base px-8 py-4">
              How It Works
            </Link>
          </div>
          <p className="mt-4 text-xs text-gray-500">
            Takes 30 seconds • No credit check • 100% free
          </p>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="border-y border-gray-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 text-center md:grid-cols-4">
            <div>
              <div className="text-2xl font-bold text-brand-600">10</div>
              <div className="text-sm text-gray-500">Cards Compared</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-brand-600">30s</div>
              <div className="text-sm text-gray-500">To Get Results</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-brand-600">0</div>
              <div className="text-sm text-gray-500">Credit Score Impact</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-brand-600">Free</div>
              <div className="text-sm text-gray-500">Always Free</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-bold text-gray-900">How It Works</h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-gray-600">
            Three simple steps to find your ideal credit card
          </p>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {[
              {
                step: "1",
                title: "Answer 5 Questions",
                desc: "Tell us about your employment, income, and credit history. Takes about 30 seconds.",
              },
              {
                step: "2",
                title: "Get Your Match Score",
                desc: "Our algorithm compares your profile against UK credit card criteria to find your best matches.",
              },
              {
                step: "3",
                title: "Apply With Confidence",
                desc: "See exactly which cards you're likely to be approved for, with direct application links.",
              },
            ].map((item) => (
              <div key={item.step} className="card text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-brand-100 text-lg font-bold text-brand-700">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                <p className="mt-2 text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Use CreditMatch */}
      <section className="bg-gray-50 py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-bold text-gray-900">Why Use CreditMatch?</h2>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {[
              "No impact on your credit score — we use soft criteria only",
              "Covers cards for all credit levels, from poor to excellent",
              "Transparent matching — we show you exactly why each card matches",
              "Regularly updated with the latest UK credit card offers",
              "Independent and unbiased — we recommend what fits you best",
              "FCA compliant — all information includes required disclaimers",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-brand-600" />
                <span className="text-gray-700">{item}</span>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link href="/quiz" className="btn-primary text-base px-8 py-4">
              <TrendingUp className="mr-2 h-5 w-5" />
              Start Your Free Check Now
            </Link>
          </div>
        </div>
      </section>

      {/* EasyEarns CTA */}
      <section className="border-t border-gray-200 bg-white py-12">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-sm text-gray-500">
            Looking for more ways to earn?{" "}
            <a
              href={process.env.NEXT_PUBLIC_EASEYEARNS_URL || "https://easyearns.com"}
              className="font-semibold text-brand-600 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit EasyEarns.com →
            </a>{" "}
            for community referral codes and sign-up bonuses.
          </p>
        </div>
      </section>
    </div>
  );
}
