"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { submitQuiz } from "@/lib/api";
import type { QuizAnswers, EmploymentStatus, CreditScore } from "@/types";
import { EMPLOYMENT_OPTIONS, INCOME_RANGES, CREDIT_TIERS } from "@/lib/constants";
import { Shield, ChevronRight, ChevronLeft, Loader2 } from "lucide-react";

type Step = "employment" | "income" | "credit" | "debt" | "payments" | "email" | "loading";

export default function QuizEngine() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("employment");
  const [answers, setAnswers] = useState<Partial<QuizAnswers>>({});
  const [emailData, setEmailData] = useState({ name: "", email: "", phone: "", consentMarketing: false });
  const [error, setError] = useState("");
  const [stepHistory, setStepHistory] = useState<Step[]>([]);

  const goNext = (next: Step) => {
    setStepHistory((h) => [...h, step]);
    setStep(next);
  };

  const goBack = () => {
    const prev = stepHistory[stepHistory.length - 1];
    if (prev) {
      setStepHistory((h) => h.slice(0, -1));
      setStep(prev);
    }
  };

  const stepIndex = ["employment", "income", "credit", "debt", "payments", "email", "loading"].indexOf(step);
  const progress = Math.min(((stepIndex) / 6) * 100, 100);

  const handleSubmitQuiz = useCallback(async () => {
    setStep("loading");
    setError("");

    try {
      const payload = {
        name: emailData.name || undefined,
        email: emailData.email,
        phone: emailData.phone || undefined,
        employment: answers.employment,
        annualIncome: answers.annualIncome,
        creditHistory: answers.creditHistory,
        hasDebt: answers.hasDebt,
        missedPayments: answers.missedPayments,
        consentToShare: true as const,
        consentMarketing: emailData.consentMarketing,
      };

      const result = await submitQuiz(payload);

      if (result.success) {
        // Store results in sessionStorage for the results page
        sessionStorage.setItem("cm_quiz_result", JSON.stringify(result));
        router.push(`/results?lead=${result.leadId}`);
      } else {
        setError("Something went wrong. Please try again.");
        setStep("email");
      }
    } catch (err: any) {
      setError(err.message || "Failed to submit. Please check your connection and try again.");
      setStep("email");
    }
  }, [answers, emailData, router]);

  const steps: Record<Step, React.ReactNode> = {
    employment: (
      <StepWrapper step={1} title="What's your employment status?" onBack={stepHistory.length > 0 ? goBack : undefined}>
        <div className="grid gap-3 sm:grid-cols-2">
          {EMPLOYMENT_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => {
                setAnswers((a) => ({ ...a, employment: opt.value as EmploymentStatus }));
                goNext("income");
              }}
              className={`flex items-center gap-3 rounded-xl border-2 p-4 text-left transition-all ${
                answers.employment === opt.value
                  ? "border-brand-500 bg-brand-50"
                  : "border-gray-200 hover:border-brand-300 hover:bg-gray-50"
              }`}
            >
              <span className="text-2xl">{opt.icon}</span>
              <span className="font-medium text-gray-900">{opt.label}</span>
            </button>
          ))}
        </div>
      </StepWrapper>
    ),

    income: (
      <StepWrapper step={2} title="What's your annual income?" onBack={goBack}>
        <div className="grid gap-3">
          {INCOME_RANGES.map((opt) => (
            <button
              key={opt.value}
              onClick={() => {
                setAnswers((a) => ({ ...a, annualIncome: opt.value }));
                goNext("credit");
              }}
              className={`rounded-xl border-2 p-4 text-left transition-all ${
                answers.annualIncome === opt.value
                  ? "border-brand-500 bg-brand-50"
                  : "border-gray-200 hover:border-brand-300 hover:bg-gray-50"
              }`}
            >
              <span className="font-medium text-gray-900">{opt.label}</span>
            </button>
          ))}
        </div>
      </StepWrapper>
    ),

    credit: (
      <StepWrapper step={3} title="How would you rate your credit history?" onBack={goBack}>
        <p className="mb-4 text-sm text-gray-500">
          Not sure? You can check your score for free at{" "}
          <a href="https://www.clearscore.com" target="_blank" rel="noopener noreferrer" className="text-brand-600 underline">
            ClearScore
          </a>{" "}
          or{" "}
          <a href="https://www.creditkarma.co.uk" target="_blank" rel="noopener noreferrer" className="text-brand-600 underline">
            Credit Karma
          </a>
          .
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          {CREDIT_TIERS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => {
                setAnswers((a) => ({ ...a, creditHistory: opt.value as CreditScore }));
                goNext("debt");
              }}
              className={`rounded-xl border-2 p-4 text-left transition-all ${
                answers.creditHistory === opt.value
                  ? "border-brand-500 bg-brand-50"
                  : "border-gray-200 hover:border-brand-300 hover:bg-gray-50"
              }`}
            >
              <span className={`font-semibold ${opt.color}`}>{opt.label}</span>
              <span className="block text-xs text-gray-500">{opt.sublabel}</span>
            </button>
          ))}
        </div>
      </StepWrapper>
    ),

    debt: (
      <StepWrapper step={4} title="Do you currently have any outstanding debt?" onBack={goBack}>
        <p className="mb-4 text-sm text-gray-500">
          This includes credit cards, loans, overdrafts, or any other borrowing.
        </p>
        <div className="flex gap-3">
          <button
            onClick={() => {
              setAnswers((a) => ({ ...a, hasDebt: false }));
              goNext("payments");
            }}
            className={`flex-1 rounded-xl border-2 p-6 text-center transition-all ${
              answers.hasDebt === false
                ? "border-brand-500 bg-brand-50"
                : "border-gray-200 hover:border-brand-300"
            }`}
          >
            <span className="text-2xl">✅</span>
            <p className="mt-2 font-medium">No debt</p>
          </button>
          <button
            onClick={() => {
              setAnswers((a) => ({ ...a, hasDebt: true }));
              goNext("payments");
            }}
            className={`flex-1 rounded-xl border-2 p-6 text-center transition-all ${
              answers.hasDebt === true
                ? "border-brand-500 bg-brand-50"
                : "border-gray-200 hover:border-brand-300"
            }`}
          >
            <span className="text-2xl">💳</span>
            <p className="mt-2 font-medium">Yes, I have debt</p>
          </button>
        </div>
      </StepWrapper>
    ),

    payments: (
      <StepWrapper step={5} title="Have you missed any payments in the last 12 months?" onBack={goBack}>
        <p className="mb-4 text-sm text-gray-500">
          This includes missed credit card payments, loan payments, or utility bills.
        </p>
        <div className="flex gap-3">
          <button
            onClick={() => {
              setAnswers((a) => ({ ...a, missedPayments: false }));
              goNext("email");
            }}
            className={`flex-1 rounded-xl border-2 p-6 text-center transition-all ${
              answers.missedPayments === false
                ? "border-brand-500 bg-brand-50"
                : "border-gray-200 hover:border-brand-300"
            }`}
          >
            <span className="text-2xl">✅</span>
            <p className="mt-2 font-medium">No missed payments</p>
          </button>
          <button
            onClick={() => {
              setAnswers((a) => ({ ...a, missedPayments: true }));
              goNext("email");
            }}
            className={`flex-1 rounded-xl border-2 p-6 text-center transition-all ${
              answers.missedPayments === true
                ? "border-brand-500 bg-brand-50"
                : "border-gray-200 hover:border-brand-300"
            }`}
          >
            <span className="text-2xl">⚠️</span>
            <p className="mt-2 font-medium">Yes, I have</p>
          </button>
        </div>
      </StepWrapper>
    ),

    email: (
      <StepWrapper step={6} title="Enter your details to see results" onBack={goBack}>
        <p className="mb-4 text-sm text-gray-500">
          We'll match your profile against UK credit card criteria and show your best options.
        </p>
        <div className="space-y-4">
          <div>
            <label className="label">Name (optional)</label>
            <input
              type="text"
              className="input"
              placeholder="John Smith"
              value={emailData.name}
              onChange={(e) => setEmailData((d) => ({ ...d, name: e.target.value }))}
            />
          </div>
          <div>
            <label className="label">Email Address *</label>
            <input
              type="email"
              className="input"
              placeholder="john@example.com"
              required
              value={emailData.email}
              onChange={(e) => setEmailData((d) => ({ ...d, email: e.target.value }))}
            />
          </div>
          <div>
            <label className="label">Phone (optional)</label>
            <input
              type="tel"
              className="input"
              placeholder="07700 900000"
              value={emailData.phone}
              onChange={(e) => setEmailData((d) => ({ ...d, phone: e.target.value }))}
            />
          </div>
          <div className="rounded-lg border border-brand-200 bg-brand-50 p-3">
            <label className="flex items-start gap-3 text-sm">
              <input
                type="checkbox"
                defaultChecked
                className="mt-0.5 h-4 w-4 rounded border-gray-300 text-brand-600 focus:ring-brand-500"
                id="consent-share"
              />
              <span className="text-gray-700">
                I agree to share my details with selected financial partners so they can contact
                me with relevant offers. <span className="text-red-500">*</span>
              </span>
            </label>
          </div>
          <div>
            <label className="flex items-start gap-3 text-sm">
              <input
                type="checkbox"
                className="mt-0.5 h-4 w-4 rounded border-gray-300 text-brand-600 focus:ring-brand-500"
                checked={emailData.consentMarketing}
                onChange={(e) => setEmailData((d) => ({ ...d, consentMarketing: e.target.checked }))}
              />
              <span className="text-gray-600">
                Send me weekly credit tips and new card offers (optional).
              </span>
            </label>
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button
            onClick={() => {
              if (!emailData.email) {
                setError("Email is required");
                return;
              }
              if (!answers.employment || !answers.annualIncome || !answers.creditHistory || answers.hasDebt === undefined || answers.missedPayments === undefined) {
                setError("Please complete all quiz steps first");
                return;
              }
              handleSubmitQuiz();
            }}
            className="btn-primary w-full"
          >
            <Shield className="mr-2 h-4 w-4" />
            See My Match Score
          </button>
          <p className="text-center text-xs text-gray-500">
            We never perform a credit check. Your data is encrypted and used only for matching.
          </p>
        </div>
      </StepWrapper>
    ),

    loading: (
      <div className="card mx-auto max-w-md text-center">
        <Loader2 className="mx-auto h-12 w-12 animate-spin text-brand-600" />
        <h3 className="mt-4 text-lg font-semibold">Analysing your profile...</h3>
        <p className="mt-2 text-sm text-gray-500">
          Comparing against 10+ UK credit cards to find your best matches.
        </p>
      </div>
    ),
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Progress Bar */}
      {step !== "loading" && (
        <div className="mb-8">
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="font-medium text-gray-700">Step {stepIndex + 1} of 6</span>
            <span className="text-gray-500">{Math.round(progress)}%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-gray-200">
            <div
              className="h-full rounded-full bg-brand-600 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {steps[step]}
    </div>
  );
}

function StepWrapper({
  step,
  title,
  onBack,
  children,
}: {
  step: number;
  title: string;
  onBack?: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="card">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">{title}</h2>
        {onBack && (
          <button onClick={onBack} className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700">
            <ChevronLeft className="h-4 w-4" /> Back
          </button>
        )}
      </div>
      {children}
    </div>
  );
}
