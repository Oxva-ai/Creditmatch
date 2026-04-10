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
