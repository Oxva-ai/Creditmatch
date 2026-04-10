# CreditMatch.uk — Credit Card Eligibility Engine

A UK-focused credit card matching platform that captures qualified leads and funnels users to EasyEarns.com.

## Architecture

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   Next.js    │────▶│   Express    │────▶│  PostgreSQL  │
│  Frontend    │     │   Backend    │     │  (Prisma)    │
│  (Vercel)    │     │  (Railway)   │     │              │
└──────────────┘     └──────────────┘     └──────────────┘
                              │
                              ▼
                       ┌──────────────┐
                       │    Resend    │
                       │  (Email)     │
                       └──────────────┘
```

## Quick Start (Local Development)

### Prerequisites
- Node.js 20+
- PostgreSQL 15+
- pnpm or npm

### 1. Install Dependencies
```bash
cd creditmatch
npm install
```

### 2. Set Up Database
```bash
# Copy env files
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env

# Edit backend/.env with your PostgreSQL credentials
# Then run:
npm run db:migrate
npm run db:seed
```

### 3. Start Development Servers
```bash
npm run dev
```
- Frontend: http://localhost:3000
- Backend: http://localhost:4000
- Admin: http://localhost:3000/admin/login (default: admin@creditmatch.uk / ChangeMe123!)

## Deployment

### Backend (Railway/Render)
1. Create a PostgreSQL database
2. Set environment variables from `backend/.env`
3. Deploy with build command: `cd backend && npm install && npx prisma migrate deploy && npx prisma generate && npm run build`
4. Start command: `cd backend && npm start`

### Frontend (Vercel)
1. Connect your GitHub repo
2. Set environment variable: `NEXT_PUBLIC_API_URL=https://your-backend-url`
3. Deploy — Vercel auto-detects Next.js

### Database
- Use Railway's PostgreSQL or any managed PostgreSQL provider
- Set `DATABASE_URL` in backend env

## Post-Deployment Checklist

- [ ] Change default admin password
- [ ] Set `JWT_SECRET` to a random 32+ char string
- [ ] Add `RESEND_API_KEY` for email notifications
- [ ] Verify `FRONTEND_URL` and `NEXT_PUBLIC_API_URL` match your domains
- [ ] Submit sitemap to Google Search Console
- [ ] Set up Plausible analytics (or GA4)
- [ ] Test quiz submission → lead capture → admin dashboard flow
- [ ] Test email notification on new lead
- [ ] Verify FCA disclaimers appear on all pages
- [ ] Test mobile responsiveness
- [ ] Run Lighthouse audit (target: 95+ performance)

## Revenue Operations

### Selling Leads (Day 1)
1. Go to Admin → Leads
2. Filter by "NEW" status
3. Click "Export & Mark Sold"
4. Email the JSON to broker partners (see broker outreach plan)

### Affiliate Monetization (Week 3+)
1. Update product `affiliateLink` fields in Admin → Products
2. Apply to affiliate networks: Awin, Impact, Partnerize
3. Networks approve you faster with lead data ("We process 200+ leads/month")

### Funnel to EasyEarns
- Homepage: "More ways to earn → EasyEarns.com"
- Results page: "Browse 394+ referral codes → EasyEarns.com"
- Footer: Persistent EasyEarns link
- Articles: Inline CTAs to EasyEarns

## Broker Outreach Template

See `docs/BROKER_OUTREACH.md` for email templates.

## Compliance Notes

- All financial pages include FCA-mandated disclaimers
- GDPR consent is captured before lead data is stored
- Representative APR examples are shown for every product
- "Not financial advice" disclaimer is site-wide
- Cookie consent banner is PECR-compliant

**⚠️ This is not legal advice. Have a qualified UK solicitor review before launch.**

## File Structure

See the `frontend/src/app/` and `backend/src/` directories for the complete layout.

## License

Private — All rights reserved.
