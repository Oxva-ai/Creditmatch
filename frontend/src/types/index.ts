// ── Shared TypeScript Types ───────────────────────────────────────

export type EmploymentStatus = "EMPLOYED" | "SELF_EMPLOYED" | "UNEMPLOYED" | "STUDENT" | "RETIRED";
export type CreditScore = "EXCELLENT" | "GOOD" | "FAIR" | "POOR";
export type ProductCategory =
  | "BALANCE_TRANSFER"
  | "CREDIT_BUILDER"
  | "CASHBACK"
  | "REWARDS"
  | "PURCHASE_0PC"
  | "TRAVEL"
  | "LOW_APR";
export type LeadStatus = "NEW" | "SOLD" | "CONTACTED" | "CONVERTED" | "DISMISSED";

export interface QuizAnswers {
  employment: EmploymentStatus;
  annualIncome: number;
  creditHistory: CreditScore;
  hasDebt: boolean;
  missedPayments: boolean;
}

export interface LeadSubmitPayload extends QuizAnswers {
  name?: string;
  email: string;
  phone?: string;
  consentToShare: true;
  consentMarketing?: boolean;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
}

export interface MatchedProduct {
  id: string;
  name: string;
  slug: string;
  logoUrl: string;
  shortDescription: string;
  apr: number;
  creditLimitMin: number;
  creditLimitMax: number;
  representativeExample: string;
  features: string[];
  pros: string[];
  cons: string[];
  affiliateLink: string;
  category: string;
  isFeatured: boolean;
  matchScore: number;
  matchReason: string[];
}

export interface QuizResult {
  success: boolean;
  leadId: string;
  score: number;
  matches: MatchedProduct[];
}

export interface Lead {
  id: string;
  name: string | null;
  email: string;
  phone: string | null;
  employment: EmploymentStatus;
  annualIncome: number;
  creditHistory: CreditScore;
  hasDebt: boolean;
  missedPayments: boolean;
  consentToShare: boolean;
  consentMarketing: boolean;
  utmSource: string | null;
  status: LeadStatus;
  brokerNotes: string;
  matchedProducts: string[];
  score: number;
  createdAt: string;
}

export interface Product {
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
  minIncome: number;
  minCreditScore: CreditScore;
  requiresEmployment: boolean;
  excludedEmployment: EmploymentStatus[];
  affiliateLink: string;
  brokerPayout: number;
  category: ProductCategory;
  features: string[];
  pros: string[];
  cons: string[];
  isFeatured: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface DashboardStats {
  totalLeads: number;
  todayLeads: number;
  weekLeads: number;
  monthLeads: number;
  newLeads: number;
  soldLeads: number;
  totalProducts: number;
  activeProducts: number;
  estimatedRevenue: string;
}

export interface AdminUser {
  id: string;
  email: string;
  role: string;
}
