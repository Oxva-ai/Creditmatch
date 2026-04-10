import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const ARTICLES: Record<string, { title: string; content: string }> = {
  "best-credit-cards-uk-2025": {
    title: "Best Credit Cards in the UK for 2025",
    content: `
## Overview

The UK credit card market in 2025 offers something for everyone, whether you're looking to build credit, earn cashback, or transfer a balance interest-free.

## Best Overall: Chase UK Credit Card

The Chase UK card offers straightforward 1% cashback on all purchases with no annual fee. It's our top pick for most people.

**Key features:**
- 1% cashback on everything
- No annual fee
- No foreign transaction fees
- Representative APR: 22.9%

## Best for Balance Transfers: MBNA Balance Transfer Plus

With 0% on balance transfers for up to 34 months, MBNA offers the longest promotional period available.

**Key features:**
- 0% BT for 34 months
- 2.49% transfer fee
- Representative APR: 24.9%

## Best for Credit Building: Aquarius Credit Builder

Designed specifically for people with poor credit histories, this card helps you rebuild your score over time.

**Key features:**
- Accepts poor credit scores
- Low minimum income (£8,000)
- Credit limit increases over time

## How to Choose

1. **Know your credit score** — Check it free at ClearScore or Credit Karma
2. **Define your goal** — Cashback? Balance transfer? Credit building?
3. **Check eligibility** — Use our [free eligibility checker](/quiz) before applying
4. **Read the terms** — Understand the APR, fees, and promotional period conditions

---

*This article provides information only and does not constitute financial advice. Credit commitments should be carefully considered.*
`,
  },
  "how-to-build-credit-score-uk": {
    title: "How to Build Your Credit Score in the UK",
    content: `
## Why Your Credit Score Matters

Your credit score affects your ability to get credit cards, loans, mortgages, and even mobile phone contracts. A higher score means better rates and more options.

## Step 1: Check Your Current Score

Use free services like ClearScore (Experian data) or Credit Karma (TransUnion data) to see where you stand.

## Step 2: Register on the Electoral Roll

This simple step can boost your score by 50+ points. It proves your identity and address to lenders.

## Step 3: Get a Credit Builder Card

If your score is low, a credit builder card like the Aquarius or Vanquis card can help. Use it for small purchases and pay the full balance each month.

## Step 4: Always Pay On Time

Set up direct debits for at least the minimum payment. One missed payment can stay on your report for 6 years.

## Step 5: Keep Credit Utilisation Low

Try to use less than 25% of your available credit. High utilisation signals risk to lenders.

## Step 6: Don't Apply for Too Much Credit

Each application leaves a "hard search" on your report. Too many in a short period looks risky.

## How Long Does It Take?

- **Minor improvements:** 1-3 months
- **Significant score increase:** 6-12 months
- **Rebuilding after defaults:** 2-6 years

---

*Use our [eligibility checker](/quiz) to find credit builder cards matched to your profile.*
`,
  },
  "balance-transfer-guide-uk": {
    title: "Complete Guide to Balance Transfer Cards",
    content: `
## What Is a Balance Transfer?

A balance transfer moves debt from one credit card to another, usually with a 0% introductory interest rate. This lets you pay off the debt without accruing additional interest.

## How It Works

1. Apply for a balance transfer card
2. Request a transfer from your existing card(s)
3. Pay a small fee (usually 1-3% of the transferred amount)
4. Pay off the balance during the 0% period

## Top Balance Transfer Cards 2025

| Card | 0% Period | Transfer Fee | APR After |
|------|-----------|-------------|-----------|
| MBNA Balance Transfer Plus | 34 months | 2.49% | 24.9% |
| Barclaycard Platinum | 20 months | 0% (first 60 days) | 26.9% |
| Sainsbury's Bank | 12 months | 1.99% | 23.9% |

## Tips

- **Transfer ASAP** — The 0% clock starts from account opening
- **Pay more than the minimum** — Aim to clear the balance before the 0% ends
- **Don't use the card for purchases** — New purchases usually don't get the 0% rate
- **Check your eligibility first** — Use our [free checker](/quiz)

---

*Balance transfer offers may be subject to eligibility. Standard purchase APR applies after the promotional period.*
`,
  },
  "credit-card-for-self-employed-uk": {
    title: "Best Credit Cards for Self-Employed UK",
    content: `
## The Challenge for Self-Employed Applicants

Lenders often view self-employed applicants as higher risk because income can fluctuate. However, many cards are available if you meet the criteria.

## What Lenders Look For

- **Stable income history** — Usually 1-2 years of self-employment
- **Annual income above threshold** — Most cards require £12,000+
- **Good credit score** — Self-employed applicants often need higher scores
- **Tax returns** — Some lenders may request SA302 forms

## Recommended Cards

### Chase UK Credit Card
- Accepts self-employed applicants
- Minimum income: £12,000
- 1% cashback on all spending

### Capital One Classic
- Lower income threshold (£10,000)
- Doesn't require employment proof
- Lower APR (18.9%)

### Tesco Clubcard Credit Card
- Accepts self-employed
- Earn points on all spending
- 3x points at Tesco

## Tips for Application

1. **Prepare your accounts** — Have 1-2 years of tax returns ready
2. **Check your credit score** — Ensure it's accurate
3. **Apply selectively** — Use our [eligibility checker](/quiz) first
4. **Consider a specialist lender** — Some banks cater specifically to self-employed

---

*Self-employment doesn't disqualify you — it just means lenders assess you differently.*
`,
  },
  "cashback-credit-cards-uk": {
    title: "Top Cashback Credit Cards in the UK",
    content: `
## What Is a Cashback Credit Card?

A cashback card pays you a percentage of your spending back as cash. It's effectively a discount on everything you buy.

## Best Cashback Cards 2025

### Amex Blue Cash — Best Overall
- **5% cashback** for first 3 months (up to £125)
- **1% ongoing** cashback on all purchases
- Minimum income: £25,000
- Representative APR: 25.9%

### Chase UK — Best for Everyday Spending
- **1% cashback** on all purchases
- No annual fee
- No foreign transaction fees
- Minimum income: £12,000

### Sainsbury's Bank — Best for Groceries
- **5p per £1** at Sainsbury's (effectively 0.5%)
- **1p per £1** elsewhere
- Nectar points can be more valuable than cash

## Maximising Cashback

1. **Pay your balance in full each month** — Interest charges wipe out cashback
2. **Combine with retailer cashback sites** — Stack TopCashback with card cashback
3. **Use for everyday spending** — The more you spend (responsibly), the more you earn
4. **Check for caps** — Some cards limit cashback earnings

---

*Cashback and rewards are not guaranteed and may be withdrawn or changed by the provider.*
`,
  },
};

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const article = ARTICLES[params.slug];
  return {
    title: article ? `${article.title} — CreditMatch.uk` : "Article Not Found — CreditMatch.uk",
    description: article?.content.slice(0, 160).replace(/[#*|`]/g, "") || "Credit card guides and articles.",
  };
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const article = ARTICLES[params.slug];

  if (!article) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center">
        <h1 className="text-2xl font-bold">Article Not Found</h1>
        <Link href="/articles" className="mt-4 inline-block text-brand-600 underline">
          ← Back to articles
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <Link href="/articles" className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700">
        <ArrowLeft className="h-4 w-4" /> Back to articles
      </Link>
      <article className="mt-6">
        <h1 className="text-3xl font-bold text-gray-900">{article.title}</h1>
        <div className="prose prose-gray mt-8 max-w-none" dangerouslySetInnerHTML={{
          __html: article.content
            .split("\n")
            .map((line) => {
              if (line.startsWith("## ")) return `<h2 class="text-xl font-semibold mt-8 mb-4">${line.slice(3)}</h2>`;
              if (line.startsWith("### ")) return `<h3 class="text-lg font-semibold mt-6 mb-3">${line.slice(4)}</h3>`;
              if (line.startsWith("- **")) {
                const match = line.match(/- \*\*(.+?)\*\* — (.+)/);
                if (match) return `<li><strong>${match[1]}</strong> — ${match[2]}</li>`;
              }
              if (line.startsWith("- ")) return `<li class="ml-4">${line.slice(2)}</li>`;
              if (line.startsWith("|")) return null; // Skip table rows for simplicity
              if (line.trim() === "") return "<br/>";
              return `<p class="text-gray-700 leading-relaxed">${line}</p>`;
            })
            .filter(Boolean)
            .join("\n"),
        }} />
      </article>

      <div className="mt-12 rounded-xl bg-brand-50 p-6 text-center">
        <h3 className="text-lg font-semibold">Ready to find your card?</h3>
        <p className="mt-2 text-gray-600">Check your eligibility in 30 seconds — completely free.</p>
        <Link href="/quiz" className="mt-4 inline-block btn-primary">
          Check My Eligibility
        </Link>
      </div>
    </div>
  );
}
