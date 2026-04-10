import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // ── Create Admin User ───────────────────────────────────────────
  const adminEmail = process.env.ADMIN_EMAIL || "admin@creditmatch.uk";
  const adminPassword = process.env.ADMIN_PASSWORD || "ChangeMe123!";
  const passwordHash = await bcrypt.hash(adminPassword, 10);

  const existingAdmin = await prisma.admin.findUnique({ where: { email: adminEmail } });
  if (!existingAdmin) {
    await prisma.admin.create({
      data: { email: adminEmail, passwordHash, role: "SUPER_ADMIN" },
    });
    console.log(`✅ Admin created: ${adminEmail}`);
  }

  // ── Seed Credit Card Products ───────────────────────────────────
  const products = [
    {
      name: "Chase UK Credit Card",
      slug: "chase-uk-credit-card",
      shortDescription: "Up to 1% cashback on everyday spending with no annual fee.",
      description: "The Chase UK credit card offers simple, transparent cashback on every purchase. No annual fee, no foreign transaction fees, and a competitive APR.",
      apr: 22.9,
      creditLimitMin: 500,
      creditLimitMax: 8000,
      representativeExample: "Representative 22.9% APR (variable). Credit limit up to £8,000. Borrowing more than you can afford to repay may lead to financial difficulty.",
      minIncome: 12000,
      minCreditScore: "GOOD",
      requiresEmployment: true,
      excludedEmployment: ["UNEMPLOYED", "STUDENT"],
      affiliateLink: "https://easyearns.com/r/chase-uk",
      brokerPayout: 25.0,
      category: "CASHBACK",
      features: ["1% cashback on all purchases", "No annual fee", "No foreign transaction fees", "Contactless payments"],
      pros: ["Simple cashback on everything", "No fee", "Widely accepted"],
      cons: ["Requires good credit", "Cashback is modest vs specialist cards"],
      isFeatured: true,
      logoUrl: "/logos/chase.png",
    },
    {
      name: "Barclaycard Platinum",
      slug: "barclaycard-platinum",
      shortDescription: "0% on purchases for up to 20 months. Ideal for large purchases.",
      description: "Barclaycard Platinum gives you a long 0% introductory period on purchases, giving you time to spread the cost interest-free.",
      apr: 26.9,
      creditLimitMin: 500,
      creditLimitMax: 10000,
      representativeExample: "Representative 26.9% APR (variable). 0% on purchases for 20 months. Credit limit up to £10,000.",
      minIncome: 15000,
      minCreditScore: "GOOD",
      requiresEmployment: true,
      excludedEmployment: ["UNEMPLOYED"],
      affiliateLink: "https://easyearns.com/r/barclaycard",
            brokerPayout: 30.0,
      category: "PURCHASE_0PC",
      features: ["0% on purchases for 20 months", "No balance transfer fee", "Barclaycard app"],
      pros: ["Long 0% period", "Trusted brand", "Good app"],
      cons: ["High APR after promotional period", "Higher income requirement"],
      isFeatured: true,
      logoUrl: "/logos/barclaycard.png",
    },
    {
      name: "Aquarius Credit Builder",
      slug: "aquarius-credit-builder",
      shortDescription: "Designed for fair or poor credit. Build your score responsibly.",
      description: "Aquarius Credit Builder is specifically designed for people with less-than-perfect credit histories. Use responsibly to build your score over time.",
      apr: 34.9,
      creditLimitMin: 200,
      creditLimitMax: 1200,
      representativeExample: "Representative 34.9% APR (variable). Credit limit up to £1,200. Borrowing more than you can afford to repay may lead to financial difficulty.",
      minIncome: 8000,
      minCreditScore: "POOR",
      requiresEmployment: false,
      excludedEmployment: [],
      affiliateLink: "https://easyearns.com/r/aquarius",
      brokerPayout: 18.0,
      category: "CREDIT_BUILDER",
      features: ["Accepts poor credit", "Low minimum income", "Helps build credit score", "Monthly credit report updates"],
      pros: ["Accessible to most", "Builds credit", "Low income threshold"],
      cons: ["High APR", "Low credit limit", "No rewards"],
      isFeatured: false,
      logoUrl: "/logos/aquarius.png",
    },
    {
      name: "Sainsbury's Bank Credit Card",
      slug: "sainsburys-bank-credit-card",
      shortDescription: "Earn Nectar points on every purchase in-store and online.",
      description: "Combine your shopping with rewards. Earn Nectar points on Sainsbury's purchases and everywhere else you use the card.",
      apr: 23.9,
      creditLimitMin: 500,
      creditLimitMax: 7000,
      representativeExample: "Representative 23.9% APR (variable). Credit limit up to £7,000.",
      minIncome: 12000,
      minCreditScore: "FAIR",
      requiresEmployment: true,
      excludedEmployment: ["UNEMPLOYED"],
      affiliateLink: "https://easyearns.com/r/sainsburys",
      brokerPayout: 22.0,
      category: "REWARDS",
      features: ["Nectar points on all purchases", "Bonus points at Sainsbury's", "No annual fee", "0% on balance transfers for 12 months"],
      pros: ["Great for regular shoppers", "Bonus points", "BT offer"],
      cons: ["Best value if you shop at Sainsbury's", "Nectar devaluation concerns"],
      isFeatured: false,
      logoUrl: "/logos/sainsburys.png",
    },
    {
      name: "MBNA Balance Transfer Plus",
      slug: "mbna-balance-transfer-plus",
      shortDescription: "Transfer existing balances at 0% for up to 34 months.",
      description: "Consolidate your existing credit card debt with a long 0% balance transfer period. Save on interest while you pay down what you owe.",
      apr: 24.9,
      creditLimitMin: 500,
      creditLimitMax: 8000,
      representativeExample: "Representative 24.9% APR (variable). 0% on balance transfers for 34 months. 2.49% balance transfer fee applies.",
      minIncome: 15000,
      minCreditScore: "GOOD",
      requiresEmployment: true,
      excludedEmployment: ["UNEMPLOYED", "STUDENT"],
      affiliateLink: "https://easyearns.com/r/mbna",
      brokerPayout: 28.0,
      category: "BALANCE_TRANSFER",
      features: ["0% BT for 34 months", "Low transfer fee (2.49%)", "No annual fee", "MBNA online banking"],
      pros: ["Longest BT period available", "Low fee", "Trusted brand"],
      cons: ["Transfer fee applies", "Requires good credit", "No rewards"],
      isFeatured: true,
      logoUrl: "/logos/mbna.png",
    },
    {
      name: "Capital One Classic",
      slug: "capital-one-classic",
      shortDescription: "Low APR credit card for everyday borrowing. Simple and transparent.",
      description: "Capital One Classic offers a lower-than-average APR for those who want a straightforward credit card without complex rewards structures.",
      apr: 18.9,
      creditLimitMin: 300,
      creditLimitMax: 5000,
      representativeExample: "Representative 18.9% APR (variable). Credit limit up to £5,000.",
      minIncome: 10000,
      minCreditScore: "FAIR",
      requiresEmployment: false,
      excludedEmployment: ["UNEMPLOYED"],
      affiliateLink: "https://easyearns.com/r/capital-one",
      brokerPayout: 20.0,
      category: "LOW_APR",
      features: ["Lower APR than most cards", "No annual fee", "Online account management", "Free credit score monitoring"],
      pros: ["Low interest rate", "Accessible", "Free credit monitoring"],
      cons: ["No rewards or cashback", "Basic features", "Lower credit limit"],
      isFeatured: false,
      logoUrl: "/logos/capital-one.png",
    },
    {
      name: "American Express Blue Cash",
      slug: "amex-blue-cash",
      shortDescription: "5% cashback for the first 3 months, then 1% on everyday spending.",
      description: "Amex Blue Cash offers a generous introductory cashback rate, then ongoing rewards on all purchases. Premium card with premium benefits.",
      apr: 25.9,
      creditLimitMin: 1000,
      creditLimitMax: 15000,
      representativeExample: "Representative 25.9% APR (variable). Credit limit up to £15,000. 5% cashback for first 3 months (up to £125).",
      minIncome: 25000,
      minCreditScore: "EXCELLENT",
      requiresEmployment: true,
      excludedEmployment: ["UNEMPLOYED", "STUDENT", "RETIRED"],
      affiliateLink: "https://easyearns.com/r/amex",
      brokerPayout: 40.0,
      category: "CASHBACK",
      features: ["5% cashback first 3 months", "1% ongoing cashback", "Purchase protection", "Travel insurance"],
      pros: ["Excellent cashback rate", "Premium benefits", "High credit limit"],
      cons: ["Not widely accepted everywhere", "High income requirement", "Annual fee after year 1"],
      isFeatured: true,
      logoUrl: "/logos/amex.png",
    },
    {
      name: "Vanquis Credit Card",
      slug: "vanquis-credit-card",
      shortDescription: "Credit card for those rebuilding their credit history.",
      description: "Vanquis helps people with limited or damaged credit histories rebuild their score. Use responsibly and consistently to see improvement.",
      apr: 39.9,
      creditLimitMin: 200,
      creditLimitMax: 1000,
      representativeExample: "Representative 39.9% APR (variable). Credit limit up to £1,000.",
      minIncome: 7000,
      minCreditScore: "POOR",
      requiresEmployment: false,
      excludedEmployment: [],
      affiliateLink: "https://easyearns.com/r/vanquis",
      brokerPayout: 15.0,
      category: "CREDIT_BUILDER",
      features: ["Accepts very poor credit", "Credit limit increases over time", "Monthly statements", "Online management"],
      pros: ["Very accessible", "Helps rebuild credit", "Limit can grow"],
      cons: ["Very high APR", "Very low starting limit", "No rewards"],
      isFeatured: false,
      logoUrl: "/logos/vanquis.png",
    },
    {
      name: "Halifax Clarity Credit Card",
      slug: "halifax-clarity",
      shortDescription: "Designed for credit score building with a low minimum income threshold.",
      description: "Halifax Clarity is aimed at people who are new to credit or rebuilding. Features a low minimum income requirement and helpful credit score tools.",
      apr: 28.9,
      creditLimitMin: 250,
      creditLimitMax: 2000,
      representativeExample: "Representative 28.9% APR (variable). Credit limit up to £2,000.",
      minIncome: 6000,
      minCreditScore: "POOR",
      requiresEmployment: false,
      excludedEmployment: [],
      affiliateLink: "https://easyearns.com/r/halifax",
      brokerPayout: 17.0,
      category: "CREDIT_BUILDER",
      features: ["Low income threshold", "Free credit score monitoring", "Halifax branch support", "No annual fee"],
      pros: ["Very low income requirement", "Branch support", "Free credit monitoring"],
      cons: ["High APR", "Low limit", "No cashback or rewards"],
      isFeatured: false,
      logoUrl: "/logos/halifax.png",
    },
    {
      name: "Tesco Clubcard Credit Card",
      slug: "tesco-clubcard-credit-card",
      shortDescription: "Earn Clubcard points on every purchase, boosted at Tesco stores.",
      description: "Earn Tesco Clubcard points everywhere you spend, with accelerated earning at Tesco stores and on Tesco.com. Points can be used for groceries, days out, and more.",
      apr: 23.9,
      creditLimitMin: 500,
      creditLimitMax: 6000,
      representativeExample: "Representative 23.9% APR (variable). Credit limit up to £6,000.",
      minIncome: 12000,
      minCreditScore: "FAIR",
      requiresEmployment: true,
      excludedEmployment: ["UNEMPLOYED"],
      affiliateLink: "https://easyearns.com/r/tesco",
      brokerPayout: 22.0,
      category: "REWARDS",
      features: ["Clubcard points everywhere", "3x points at Tesco", "0% on purchases for 9 months", "No annual fee"],
      pros: ["Great for Tesco shoppers", "Versatile points", "0% purchase offer"],
      cons: ["Best value for Tesco shoppers", "Points value varies", "Moderate APR"],
      isFeatured: false,
      logoUrl: "/logos/tesco.png",
    },
  ];

  for (const p of products) {
    const existing = await prisma.product.findUnique({ where: { slug: p.slug } });
    if (!existing) {
      await prisma.product.create({ data: p });
      console.log(`  ✅ ${p.name}`);
    } else {
      console.log(`  ⏭️  ${p.name} (already exists)`);
    }
  }

  // ── Seed Articles ─────────────────────────────────────────────
  const articles = [
    {
      title: "Best Credit Cards in the UK for 2025",
      slug: "best-credit-cards-uk-2025",
      excerpt: "Our pick of the top credit cards across every category — cashback, balance transfer, credit building, and more.",
      content: `# Best Credit Cards in the UK for 2025

Choosing the right credit card can save you hundreds of pounds in interest and rewards. Here's our comprehensive guide to the best credit cards available in the UK right now.

## Best Overall: Chase UK Credit Card

The Chase UK credit card offers up to 1% cashback on everyday spending with no annual fee. It's our top pick for most people because of its simplicity and wide acceptance.

**Key features:**
- Up to 1% cashback on all purchases
- No annual fee
- No foreign transaction fees
- Representative 22.9% APR

## Best for Balance Transfers: MBNA Balance Transfer Plus

If you're looking to consolidate existing credit card debt, the MBNA Balance Transfer Plus offers 0% for up to 34 months — one of the longest promotional periods available.

## Best for Building Credit: Aquarius Credit Builder

For those with less-than-perfect credit histories, the Aquarius Credit Builder is designed to help you rebuild your score responsibly.

## How We Chose

We evaluated over 50 credit cards available in the UK market, considering:
- **APR and fees** — The true cost of borrowing
- **Rewards and cashback** — What you get back
- **Acceptance criteria** — Who can apply
- **Customer service** — FCA ratings and consumer feedback

Remember: always check your eligibility before applying to avoid unnecessary hard searches on your credit file.

*Last updated: April 2025*`,
      category: "guide",
      targetKeyword: "best credit cards UK 2025",
      metaTitle: "Best Credit Cards in the UK for 2025 — CreditMatch.uk",
      metaDescription: "Compare the top UK credit cards for 2025. Find the best cards for cashback, balance transfers, credit building, and more.",
      isPublished: true,
    },
    {
      title: "How to Build Your Credit Score in the UK",
      slug: "how-to-build-credit-score-uk",
      excerpt: "Step-by-step guide to improving your credit score, from checking your report to using credit builder cards.",
      content: `# How to Build Your Credit Score in the UK

Your credit score is one of the most important financial numbers in the UK. It affects whether you can get a credit card, mortgage, phone contract, or even rent a flat.

## What Is a Credit Score?

A credit score is a number between 0 and 999 (depending on the agency) that represents how creditworthy you are. The three main credit reference agencies in the UK are:

- **Experian** (0–999)
- **Equifax** (0–1000)
- **TransUnion** (0–710)

## 5 Steps to Improve Your Credit Score

### 1. Check Your Credit Report for Errors

You're entitled to a free statutory credit report from each agency. Check for:
- Incorrect personal details
- Accounts you don't recognise
- Incorrect payment histories
- Closed accounts still showing as open

### 2. Register on the Electoral Roll

This is one of the simplest ways to improve your score. Lenders use it to verify your identity and address.

### 3. Use a Credit Builder Card

Credit builder cards are designed for people with poor or limited credit history. They typically have:
- Higher APR (often 30%+)
- Lower credit limits (£200–£1,200)
- No annual fee

Use them for small purchases and **always pay off the full balance each month**.

### 4. Set Up Direct Debits

Missing payments is the worst thing for your credit score. Set up direct debits for at least the minimum payment on every credit agreement.

### 5. Keep Credit Utilisation Below 25%

If your credit limit is £1,000, try never to owe more than £250 at your statement date.

## How Long Does It Take?

You should see improvements within 3–6 months of consistent good behaviour. Major improvements (like moving from "poor" to "good") can take 12–24 months.

## When to Apply for a Better Card

Once you've had a credit builder card for 6–12 months with perfect payments, you can apply for a mainstream rewards or cashback card.

*Last updated: April 2025*`,
      category: "credit-builder",
      targetKeyword: "how to build credit score UK",
      metaTitle: "How to Build Your Credit Score in the UK — CreditMatch.uk",
      metaDescription: "Learn how to improve your UK credit score with our step-by-step guide. Tips on credit builder cards, electoral roll, and more.",
      isPublished: true,
    },
    {
      title: "Complete Guide to Balance Transfer Cards",
      slug: "balance-transfer-guide-uk",
      excerpt: "Everything you need to know about transferring credit card balances to save on interest.",
      content: `# Complete Guide to Balance Transfer Cards in the UK

If you're paying high interest on an existing credit card, a balance transfer could save you hundreds of pounds.

## What Is a Balance Transfer?

A balance transfer moves debt from one credit card to another, usually one with a 0% introductory rate. This means you pay no interest for a set period while you pay down the balance.

## Top Balance Transfer Cards Right Now

| Card | 0% Period | Balance Transfer Fee | Representative APR |
|------|-----------|---------------------|-------------------|
| MBNA Balance Transfer Plus | 34 months | 2.49% | 24.9% |
| Barclaycard Platinum | 20 months | 0% | 26.9% |

## How to Do a Balance Transfer

1. **Check your eligibility** — Use an eligibility checker to avoid unnecessary searches
2. **Apply for the new card** — Make sure you're approved before initiating the transfer
3. **Request the transfer** — Provide your old card details to the new provider
4. **Keep paying the old card** — Until you receive confirmation the transfer is complete
5. **Set up a repayment plan** — Calculate how much you need to pay monthly to clear the balance before the 0% period ends

## Common Mistakes

- **Missing payments** — This can cancel your 0% rate
- **Making new purchases on the card** — These usually aren't at 0%
- **Not clearing the balance in time** — Standard APR kicks in after the promotional period

*Last updated: April 2025*`,
      category: "balance-transfer",
      targetKeyword: "balance transfer credit cards UK",
      metaTitle: "Balance Transfer Credit Cards Guide — CreditMatch.uk",
      metaDescription: "Save on interest with a balance transfer credit card. Compare the best 0% balance transfer cards in the UK.",
      isPublished: true,
    },
    {
      title: "Best Credit Cards for Self-Employed UK",
      slug: "credit-card-for-self-employed-uk",
      excerpt: "Self-employed? Here are the cards most likely to accept your application and the criteria lenders look for.",
      content: `# Best Credit Cards for Self-Employed People in the UK

Being self-employed can make it harder to get a credit card, but there are still great options available.

## Why Is It Harder?

Lenders see self-employed people as higher risk because:
- Income can be variable
- No payslip to verify earnings
- Some lenders only look at the last year's accounts

## What Lenders Want to See

- **Two years of accounts** — Some will accept one year
- **Good credit history** — No missed payments in the last 6 years
- **Stable address** — At the same address for 3+ years
- **Affordability** — Net income after business expenses

## Best Cards for Self-Employed

1. **Capital One Classic** — Lower income requirement (from £10,000)
2. **Sainsbury's Bank** — Accepts self-employed with one year of accounts
3. **Chase UK** — Looks at overall financial picture, not just employment status

## Tips

- Use your **net profit** (after expenses) as your income, not gross revenue
- Have your **SA302 form** from HMRC ready
- Consider applying with a **joint applicant** who has stable employment

*Last updated: April 2025*`,
      category: "guide",
      targetKeyword: "credit cards self employed UK",
      metaTitle: "Best Credit Cards for Self-Employed UK — CreditMatch.uk",
      metaDescription: "Find the best credit cards for self-employed people in the UK. Tips on eligibility and what lenders look for.",
      isPublished: true,
    },
    {
      title: "Top Cashback Credit Cards in the UK",
      slug: "cashback-credit-cards-uk",
      excerpt: "Earn money back on everyday spending. We compare the best cashback cards and their earning rates.",
      content: `# Top Cashback Credit Cards in the UK

Cashback credit cards give you money back on every purchase. Here are our top picks for 2025.

## Best Overall Cashback Card

**Chase UK Credit Card** — Up to 1% cashback on all purchases, no annual fee, no foreign transaction fees.

### How Much Could You Earn?

If you spend £1,000 per month on your Chase card:
- 1% cashback = **£10/month** or **£120/year**
- No cap on cashback earned

## Premium Cashback

**American Express Blue Cash** — 5% cashback for the first 3 months (up to £125), then 1% ongoing.

### Introductory Period Breakdown
- Month 1–3: 5% cashback (up to £125 total)
- Month 4+: 1% cashback (uncapped)

## Important Considerations

- **Pay your balance in full** — Interest charges will wipe out any cashback
- **Check acceptance criteria** — Premium cards often require excellent credit
- **Annual fees** — Some cashback cards charge an annual fee after the first year

*Last updated: April 2025*`,
      category: "cashback",
      targetKeyword: "best cashback credit cards UK",
      metaTitle: "Top Cashback Credit Cards UK — CreditMatch.uk",
      metaDescription: "Compare the best cashback credit cards in the UK. Earn money back on everyday spending with our top picks.",
      isPublished: true,
    },
  ];

  for (const a of articles) {
    const existing = await prisma.article.findUnique({ where: { slug: a.slug } });
    if (!existing) {
      await prisma.article.create({
        data: {
          ...a,
          publishedAt: new Date(),
        },
      });
      console.log(`  ✅ Article: ${a.title}`);
    } else {
      console.log(`  ⏭️  Article: ${a.title} (already exists)`);
    }
  }

  // ── Seed Sample Partners ────────────────────────────────────────
  const partners = [
    { name: "ClearScore", email: "partnerships@clearscore.com", payoutPerLead: 20.0, company: "ClearScore Ltd" },
    { name: "Credit Karma", email: "affiliates@creditkarma.co.uk", payoutPerLead: 18.0, company: "Credit Karma UK" },
    { name: "Experian", email: "commercial@experian.co.uk", payoutPerLead: 25.0, company: "Experian Ltd" },
  ];

  for (const p of partners) {
    const existing = await prisma.partner.findUnique({ where: { name: p.name } });
    if (!existing) {
      await prisma.partner.create({ data: p });
      console.log(`  ✅ Partner: ${p.name}`);
    }
  }

  console.log("🎉 Seeding complete!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
