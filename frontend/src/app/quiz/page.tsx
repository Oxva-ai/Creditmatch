import type { Metadata } from "next";
import QuizEngine from "@/components/quiz/QuizEngine";

export const metadata: Metadata = {
  title: "Credit Card Eligibility Check — Free | CreditMatch.uk",
  description: "Check your UK credit card eligibility in 30 seconds. No credit score impact. 5 simple questions to find your best match.",
};

export default function QuizPage() {
  return (
    <div className="bg-gradient-to-b from-brand-50 to-white py-8">
      <div className="mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
          Check Your Credit Card Eligibility
        </h1>
        <p className="mt-2 text-gray-600">
          Answer 5 quick questions. Get your personalised match score. 100% free.
        </p>
      </div>
      <QuizEngine />
    </div>
  );
}
