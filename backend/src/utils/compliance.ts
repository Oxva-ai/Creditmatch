/**
 * FCA Compliance Text Generator
 * All text is based on public FCA guidance for financial promotions.
 * This is NOT legal advice — have a qualified solicitor review before launch.
 */

export const FCA_DISCLAIMERS = {
  notFinancialAdvice:
    "This website provides information only and does not constitute financial advice. " +
    "You should consider your own circumstances and seek independent advice if unsure.",

  capitalRisk:
    "Credit commitments should be carefully considered. Borrowing more than you can afford " +
    "to repay may lead to financial difficulty and affect your credit rating.",

  affiliateDisclosure:
    "We may earn a commission if you apply for a product through links on this site. " +
    "This does not affect the terms you receive.",

  representativeAprNote:
    "The APR shown is representative of the product. Your actual rate may differ based on " +
    "your individual circumstances, credit history, and the lender's assessment.",

  fcaRegister:
    "To check whether a financial firm is authorised by the FCA, visit the " +
    "FCA Register at https://register.fca.org.uk",
};

/**
 * Generates a representative APR example string.
 * Required by FCA for all credit card promotions.
 */
export function generateRepresentativeExample(
  apr: number,
  creditLimit: number
): string {
  const representativeRate = apr.toFixed(1);
  return (
    `Representative ${representativeRate}% APR (variable). ` +
    `Credit limit up to £${creditLimit.toLocaleString()}. ` +
    `Borrowing more than you can afford to repay may lead to financial difficulty.`
  );
}

/**
 * Generates a risk warning appropriate for the product type.
 */
export function getRiskWarning(category: string): string {
  switch (category) {
    case "BALANCE_TRANSFER":
      return "Balance transfer offers may be subject to eligibility. Standard purchase APR applies after the promotional period.";
    case "CREDIT_BUILDER":
      return "Credit builder cards typically have higher APRs. Use responsibly to improve your credit score.";
    case "CASHBACK":
    case "REWARDS":
      return "Cashback and rewards are not guaranteed and may be withdrawn or changed by the provider.";
    case "PURCHASE_0PC":
      return "0% purchase offers apply to new purchases only. Standard APR applies after the promotional period.";
    case "TRAVEL":
      return "Travel cards may charge foreign transaction fees. Check terms before using abroad.";
    default:
      return "Credit commitments should be carefully considered. Borrowing more than you can afford to repay may lead to financial difficulty.";
  }
}
