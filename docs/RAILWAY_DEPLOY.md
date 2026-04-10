# Railway Deployment — Quick Start

## You're Looking At Railway Right Now

Here's exactly what to click, in order:

---

## Phase 1: Create the Database (Do This First)

1. Click **"New"** button (top-right `+`)
2. Click **"Deploy"** → **"Database"** → **"Add PostgreSQL"**
3. Wait 20 seconds for it to spin up
4. Click on the **PostgreSQL box** that appears
5. Click the **"Variables"** tab
6. **Copy the `DATABASE_URL`** — you'll paste this in Phase 2

---

## Phase 2: Push Code to GitHub

```bash
cd /home/oxva/Ideas/creditmatch

# Generate secrets
bash scripts/setup-railway.sh

# Copy the JWT_SECRET and ADMIN_PASSWORD it outputs — save them!

git init
git add .
git commit -m "Initial commit"

# Create repo on GitHub first, then:
git remote add origin https://github.com/YOUR-USERNAME/creditmatch.git
git branch -M main
git push -u origin main
```

---

## Phase 3: Deploy Backend on Railway

1. Back on Railway dashboard, click **"New"** → **"Deploy"** → **"GitHub Repo"**
2. Select `creditmatch` repo
3. Railway auto-deploys. Wait for it to finish.
4. Click the service box → **"Settings"** tab
5. Scroll to **"Root Directory"** → set to: `backend`
6. Scroll to **"Custom Start Command"** → set to: `npm start`
7. Click **"Variables"** tab → add these:

| Key | Value |
|---|---|
| `DATABASE_URL` | Paste from Phase 1 |
| `JWT_SECRET` | From setup script output |
| `ADMIN_PASSWORD` | From setup script output |
| `ADMIN_EMAIL` | `admin@creditmatch.uk` |
| `PORT` | `4000` |
| `NODE_ENV` | `production` |
| `FRONTEND_URL` | `http://localhost:3000` (update after Vercel deploy) |
| `RATE_LIMIT_WINDOW_MS` | `900000` |
| `RATE_LIMIT_MAX_REQUESTS` | `50` |
| `ADMIN_EMAIL_TO` | your@email.com |
| `EASEYEARNS_URL` | `https://easyearns.com` |

8. Railway auto-redeploys when you add variables
9. Go to **"Settings"** → **"Networking"** → click **"Generate Domain"**
10. Copy that domain — it's your API URL (e.g., `https://backend-production-xxxx.up.railway.app`)

---

## Phase 4: Run Database Seed

1. Click your backend service → **"Settings"** tab
2. Scroll to **"Shell"** → click **"Connect"**
3. In the terminal that opens:

```bash
cd backend
npx prisma migrate deploy
npx prisma db seed
```

4. You should see: `🎉 Seeding complete!`

---

## Phase 5: Deploy Frontend on Vercel

1. Go to **vercel.com** → **New Project**
2. Import your `creditmatch` GitHub repo
3. **Framework Preset**: Next.js
4. **Root Directory**: `frontend`
5. **Environment Variables**:

| Key | Value |
|---|---|
| `NEXT_PUBLIC_API_URL` | Your Railway domain from Phase 3 |
| `NEXT_PUBLIC_SITE_URL` | Your Vercel domain |
| `NEXT_PUBLIC_EASEYEARNS_URL` | `https://easyearns.com` |

6. Click **Deploy**
7. Wait 2 minutes

---

## Phase 6: Verify Everything

```bash
# Test backend
curl https://YOUR-RAILWAY-DOMAIN.up.railway.app/api/health
# Should return: {"status":"ok","timestamp":"...","service":"creditmatch-api"}

# Test quiz
curl -X POST https://YOUR-RAILWAY-DOMAIN.up.railway.app/api/leads/submit \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@test.com","employment":"EMPLOYED","annualIncome":25000,"creditHistory":"GOOD","hasDebt":false,"missedPayments":false,"consentToShare":true}'
# Should return matches

# Visit frontend
open https://YOUR-VERCEL-URL.vercel.app

# Visit admin
open https://YOUR-VERCEL-URL.vercel.app/admin/login
# Email: admin@creditmatch.uk
# Password: (from setup script output)
```

---

## Phase 7: Update Frontend URL in Railway

1. Go back to Railway → your backend service → **Variables**
2. Update `FRONTEND_URL` to your actual Vercel domain
3. Railway auto-redeploys

---

## Done. You're Live.

**Your revenue stack:**
- Quiz captures leads → stored in PostgreSQL
- Admin dashboard at `/admin/leads` → export → sell to brokers
- Results page funnels to EasyEarns.com
- Articles drive SEO traffic

**Next:** Start broker outreach using `docs/BROKER_OUTREACH.md`
