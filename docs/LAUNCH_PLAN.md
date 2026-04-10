# 30-Day Launch Plan — CreditMatch.uk

## Week 1: Build & Deploy (Days 1-7)

### Day 1-2: Infrastructure
- [ ] Set up Railway account → Create PostgreSQL database
- [ ] Deploy backend to Railway
- [ ] Set up Vercel account → Deploy frontend
- [ ] Configure domain (creditmatch.uk or similar)
- [ ] Set SSL, DNS records

### Day 3-4: Content & Data
- [ ] Run `npm run db:seed` to load 10 credit cards
- [ ] Review all products in Admin → Products
- [ ] Update affiliate links once you have them (start empty, add later)
- [ ] Write/update 2 more articles beyond the 5 seeds
- [ ] Test full quiz flow end-to-end

### Day 5-6: Compliance & Polish
- [ ] Review all FCA disclaimers on every page
- [ ] Test cookie banner acceptance/rejection
- [ ] Verify Privacy Policy and Terms are accurate
- [ ] Test mobile responsiveness on iPhone and Android
- [ ] Run Lighthouse audit → fix any issues below 90

### Day 7: Soft Launch
- [ ] Share quiz link with 5 friends for feedback
- [ ] Fix any bugs reported
- [ ] Submit sitemap to Google Search Console
- [ ] Set up Plausible analytics

---

## Week 2: Traffic Generation (Days 8-14)

### Reddit Strategy (Daily, 30 min)
- [ ] Join r/UKPersonalFinance, r/UKCreditCards, r/PersonalFinanceUK
- [ ] Answer 3-5 questions per day with helpful advice
- [ ] Include link to CreditMatch.uk when relevant ("I built a free tool that checks this")
- [ ] NEVER spam — only link when genuinely useful

### Quora Strategy (Daily, 20 min)
- [ ] Search: "best credit card UK", "credit card eligibility UK", "will I get approved"
- [ ] Write detailed, helpful answers
- [ ] Link to relevant CreditMatch article or quiz

### Pinterest Strategy (3x/week)
- [ ] Create 5 infographic pins:
  - "Credit Score → Which Card?"
  - "Best Cards for Self-Employed UK"
  - "How to Build Credit in 6 Steps"
  - "Balance Transfer Savings Calculator"
  - "Cashback Cards Ranked"
- [ ] Each pin links to the relevant article or quiz

### Medium Strategy (2 articles/week)
- [ ] Republish your site articles on Medium with canonical link
- [ ] Medium's domain authority means faster indexing
- [ ] Include "Check your eligibility free" CTA

### Broker Outreach (Days 10-14)
- [ ] Email 10 brokers using the template in `docs/BROKER_OUTREACH.md`
- [ ] Send sample lead batch to interested parties
- [ ] Negotiate pricing with responders

---

## Week 3: Monetization Activation (Days 15-21)

### Affiliate Applications
- [ ] Apply to Awin (hosts many UK financial offers)
- [ ] Apply to Impact (ClearScore, Experian)
- [ ] Apply to Partnerize (Monzo, Starling)
- [ ] Include your traffic data: "Processing 200+ leads/month"
- [ ] Apply to individual programs: Chase UK, MBNA, Barclaycard

### Update Product Affiliate Links
- [ ] In Admin → Products, update `affiliateLink` for each card
- [ ] Use the links provided by approved affiliate networks
- [ ] Test every link works and tracks correctly

### Email Sequence Setup
- [ ] Connect Resend API key
- [ ] Configure welcome email for new leads
- [ ] Set up 5-email drip campaign:
  1. Day 0: Your results + tips
  2. Day 3: "Did you know?" credit fact
  3. Day 7: New card offer alert
  4. Day 14: "Re-check your eligibility" 
  5. Day 30: "Exclusive offer" EasyEarns crossover

### Lead Sales Operations
- [ ] Export leads daily from Admin → Leads
- [ ] Email to broker partners
- [ ] Track which leads convert (ask brokers for feedback)
- [ ] Adjust pricing based on conversion data

---

## Week 4: Scale & Optimize (Days 22-30)

### SEO Expansion
- [ ] Publish 5 new micro-niche articles:
  - "Credit card for nurses UK"
  - "Credit card after IVA UK"
  - "Best card for zero-hours contract"
  - "Credit card for international students UK"
  - "Will I get approved for Chase UK card?"
- [ ] Internal link all articles to the quiz
- [ ] Build 10 backlinks via guest posts or HARO

### Analytics & Optimization
- [ ] Review conversion funnel: Visits → Quiz Start → Quiz Complete → Lead Capture → Click
- [ ] A/B test quiz CTA copy
- [ ] A/B test email gate wording
- [ ] Identify highest-converting traffic source → double down

### Revenue Review
- [ ] Calculate total revenue: Lead sales + Affiliate commissions
- [ ] Identify top-performing products → prioritize in matching
- [ ] Remove/deprioritize low-converting products
- [ ] Plan Month 2 content calendar

### EasyEarns Integration
- [ ] Review funnel metrics: How many users click through to EasyEarns?
- [ ] Optimize EasyEarns CTA placement based on data
- [ ] Cross-promote: EasyEarns homepage links to CreditMatch quiz
- [ ] Shared email list: CreditMatch subscribers get EasyEarns deals

---

## Metrics to Track Daily

| Metric | Target (Day 30) |
|---|---|
| Daily visitors | 100+ |
| Quiz starts | 30+ |
| Quiz completions | 20+ |
| Leads captured | 18+ |
| Leads sold | 10+ |
| Affiliate clicks | 15+ |
| Affiliate conversions | 1+ |
| Email subscribers | 50+ |
| Revenue | £500+ |

---

## Traffic Source Targets

| Source | Target Visitors/Month |
|---|---|
| Reddit | 1,000 |
| Quora | 500 |
| Pinterest | 800 |
| Medium | 400 |
| Organic SEO | 300 |
| Direct/Referral | 200 |
| **Total** | **3,200** |
