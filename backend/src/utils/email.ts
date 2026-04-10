import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function sendNewLeadAlert(lead: {
  id: string;
  name?: string;
  email: string;
  phone?: string;
  employment: string;
  annualIncome: number;
  creditHistory: string;
  score: number;
  matchedProducts: string[];
}) {
  if (!resend) {
    console.warn("⚠️  RESEND_API_KEY not set — skipping email notification");
    return;
  }

  const to = process.env.ADMIN_EMAIL_TO || "admin@creditmatch.uk";

  try {
    await resend.emails.send({
      from: "CreditMatch Alerts <alerts@creditmatch.uk>",
      to,
      subject: `🆕 New Lead: ${lead.name || lead.email} — Score: ${lead.score}%`,
      html: `
        <h2>New Lead Captured</h2>
        <table style="border-collapse:collapse;width:100%;max-width:500px;">
          <tr><td style="padding:8px;border:1px solid #ddd;"><strong>Name</strong></td><td style="padding:8px;border:1px solid #ddd;">${lead.name || "N/A"}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;"><strong>Email</strong></td><td style="padding:8px;border:1px solid #ddd;">${lead.email}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;"><strong>Phone</strong></td><td style="padding:8px;border:1px solid #ddd;">${lead.phone || "N/A"}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;"><strong>Employment</strong></td><td style="padding:8px;border:1px solid #ddd;">${lead.employment}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;"><strong>Annual Income</strong></td><td style="padding:8px;border:1px solid #ddd;">£${lead.annualIncome.toLocaleString()}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;"><strong>Credit History</strong></td><td style="padding:8px;border:1px solid #ddd;">${lead.creditHistory}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;"><strong>Match Score</strong></td><td style="padding:8px;border:1px solid #ddd;"><strong>${lead.score}%</strong></td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;"><strong>Matched Products</strong></td><td style="padding:8px;border:1px solid #ddd;">${lead.matchedProducts.join(", ") || "None"}</td></tr>
        </table>
        <p style="margin-top:16px;">
          <a href="${process.env.FRONTEND_URL || "http://localhost:3000"}/admin/leads" 
             style="background:#0f766e;color:white;padding:10px 20px;text-decoration:none;border-radius:6px;">
            View in Admin Dashboard
          </a>
        </p>
        <p style="color:#666;font-size:12px;margin-top:24px;">
          CreditMatch.uk — Lead captured at ${new Date().toISOString()}
        </p>
      `,
    });
    console.log(`✅ Lead alert sent to ${to}`);
  } catch (error) {
    console.error("❌ Failed to send lead alert:", error);
  }
}
