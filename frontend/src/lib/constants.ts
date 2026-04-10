export const EMPLOYMENT_OPTIONS = [
  { value: "EMPLOYED", label: "Employed", icon: "💼" },
  { value: "SELF_EMPLOYED", label: "Self-Employed", icon: "🏠" },
  { value: "UNEMPLOYED", label: "Unemployed", icon: "🔍" },
  { value: "STUDENT", label: "Student", icon: "🎓" },
  { value: "RETIRED", label: "Retired", icon: "🏖️" },
] as const;

export const INCOME_RANGES = [
  { value: 8000, label: "Under £12,000" },
  { value: 16000, label: "£12,000 - £20,000" },
  { value: 27500, label: "£20,000 - £35,000" },
  { value: 42500, label: "£35,000 - £50,000" },
  { value: 75000, label: "£50,000+" },
] as const;

export const CREDIT_TIERS = [
  { value: "EXCELLENT", label: "Excellent", sublabel: "Credit score 750+", color: "text-green-600" },
  { value: "GOOD", label: "Good", sublabel: "Credit score 650-749", color: "text-emerald-600" },
  { value: "FAIR", label: "Fair", sublabel: "Credit score 550-649", color: "text-yellow-600" },
  { value: "POOR", label: "Poor", sublabel: "Credit score below 550", color: "text-red-600" },
] as const;

export const CATEGORY_LABELS: Record<string, string> = {
  BALANCE_TRANSFER: "Balance Transfer",
  CREDIT_BUILDER: "Credit Builder",
  CASHBACK: "Cashback",
  REWARDS: "Rewards",
  PURCHASE_0PC: "0% Purchase",
  TRAVEL: "Travel",
  LOW_APR: "Low APR",
};

export const SITE_NAME = "CreditMatch.uk";
export const EASEYEARNS_URL = process.env.NEXT_PUBLIC_EASEYEARNS_URL || "https://easyearns.com";
