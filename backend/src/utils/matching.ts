import prisma from "./prisma.js";
import type { EmploymentStatus, CreditScore } from "@prisma/client";

interface QuizAnswers {
  employment: EmploymentStatus;
  annualIncome: number;
  creditHistory: CreditScore;
  hasDebt: boolean;
  missedPayments: boolean;
}

interface MatchedProduct {
  id: string;
  name: string;
  slug: string;
  logoUrl: string;
  description: string;
  shortDescription: string;
  apr: number;
  creditLimitMin: number;
  creditLimitMax: number;
  representativeExample: string;
  features: string[];
  pros: string[];
  cons: string[];
  affiliateLink: string;
  brokerPayout: number;
  category: string;
  isFeatured: boolean;
  matchScore: number;
  matchReason: string[];
}

/**
 * Credit score tier ordering (best to worst)
 */
const CREDIT_TIERS: Record<CreditScore, number> = {
  EXCELLENT: 4,
  GOOD: 3,
  FAIR: 2,
  POOR: 1,
};

/**
 * Employment eligibility scoring
 */
const EMPLOYMENT_SCORE: Record<EmploymentStatus, number> = {
  EMPLOYED: 4,
  SELF_EMPLOYED: 3,
  RETIRED: 2,
  STUDENT: 1,
  UNEMPLOYED: 0,
};

/**
 * Core matching algorithm.
 * Returns products sorted by matchScore descending.
 */
export async function findMatches(answers: QuizAnswers): Promise<MatchedProduct[]> {
  const { employment, annualIncome, creditHistory, hasDebt, missedPayments } = answers;

  // Fetch all active products
  const products = await prisma.product.findMany({
    where: { isActive: true },
    orderBy: { brokerPayout: "desc" },
  });

  const matched: MatchedProduct[] = [];

  for (const product of products) {
    let score = 0;
    const reasons: string[] = [];
    const maxScore = 100;

    // ── Hard filters (disqualify immediately) ──
    if (product.requiresEmployment && employment === "UNEMPLOYED") continue;
    if (product.excludedEmployment.includes(employment)) continue;
    if (annualIncome < product.minIncome) continue;

    // Credit score must meet minimum tier
    if (CREDIT_TIERS[creditHistory] < CREDIT_TIERS[product.minCreditScore]) continue;

    // ── Scoring (0-100) ──

    // Income match (up to 25 points)
    const incomeRatio = Math.min(annualIncome / Math.max(product.minIncome, 1), 3);
    score += Math.round(incomeRatio * 25);
    if (incomeRatio >= 2) reasons.push("Strong income for this card");
    else if (incomeRatio >= 1.5) reasons.push("Good income match");
    else reasons.push("Meets minimum income requirement");

    // Credit score match (up to 30 points)
    const creditDiff = CREDIT_TIERS[creditHistory] - CREDIT_TIERS[product.minCreditScore];
    score += Math.min(creditDiff * 10 + 15, 30);
    if (creditDiff >= 2) reasons.push("Excellent credit for this card");
    else if (creditDiff >= 1) reasons.push("Good credit match");
    else reasons.push("Meets credit requirements");

    // Employment stability (up to 20 points)
    score += EMPLOYMENT_SCORE[employment] * 5;
    if (employment === "EMPLOYED") reasons.push("Stable employment preferred");
    else if (employment === "SELF_EMPLOYED") reasons.push("Self-employed accepted");

    // Debt penalty (up to -15 points)
    if (hasDebt) {
      score = Math.max(0, score - 15);
      reasons.push("Existing debt may affect approval");
    }

    // Missed payments penalty (up to -20 points)
    if (missedPayments) {
      score = Math.max(0, score - 20);
      reasons.push("Recent missed payments noted — consider credit builder cards");
    }

    // Featured bonus (up to 5 points)
    if (product.isFeatured) {
      score = Math.min(score + 5, maxScore);
    }

    matched.push({
      id: product.id,
      name: product.name,
      slug: product.slug,
      logoUrl: product.logoUrl,
      description: product.description,
      shortDescription: product.shortDescription,
      apr: product.apr,
      creditLimitMin: product.creditLimitMin,
      creditLimitMax: product.creditLimitMax,
      representativeExample: product.representativeExample,
      features: product.features,
      pros: product.pros,
      cons: product.cons,
      affiliateLink: product.affiliateLink,
      brokerPayout: product.brokerPayout,
      category: product.category,
      isFeatured: product.isFeatured,
      matchScore: Math.min(score, maxScore),
      matchReason: reasons,
    });
  }

  // Sort by score descending
  matched.sort((a, b) => b.matchScore - a.matchScore);

  return matched;
}

/**
 * Get a human-readable credit score label from the enum.
 */
export function creditScoreLabel(score: CreditScore): string {
  const labels: Record<CreditScore, string> = {
    EXCELLENT: "Excellent (750+)",
    GOOD: "Good (650-749)",
    FAIR: "Fair (550-649)",
    POOR: "Poor (below 550)",
  };
  return labels[score];
}

/**
 * Get employment label.
 */
export function employmentLabel(status: EmploymentStatus): string {
  const labels: Record<EmploymentStatus, string> = {
    EMPLOYED: "Employed",
    SELF_EMPLOYED: "Self-Employed",
    UNEMPLOYED: "Unemployed",
    STUDENT: "Student",
    RETIRED: "Retired",
  };
  return labels[status];
}
