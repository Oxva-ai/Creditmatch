import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — CreditMatch.uk",
  description: "Privacy policy for CreditMatch.uk. Learn how we collect, use, and protect your personal data.",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900">Privacy Policy</h1>
      <p className="mt-2 text-sm text-gray-500">Last updated: April 2025</p>

      <div className="mt-8 space-y-6 text-sm text-gray-700">
        <section>
          <h2 className="text-lg font-semibold text-gray-900">1. Who We Are</h2>
          <p className="mt-2">
            CreditMatch.uk is a financial information service. We are not authorised or regulated
            by the Financial Conduct Authority (FCA). We provide information only and do not
            constitute financial advice.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">2. Data We Collect</h2>
          <p className="mt-2">We collect the following personal data when you use our eligibility checker:</p>
          <ul className="mt-2 list-inside list-disc space-y-1">
            <li>Name (optional)</li>
            <li>Email address (required)</li>
            <li>Phone number (optional)</li>
            <li>Employment status</li>
            <li>Annual income range</li>
            <li>Self-reported credit history tier</li>
            <li>Whether you have existing debt</li>
            <li>Whether you've missed payments in the last 12 months</li>
            <li>UTM tracking parameters (source, medium, campaign)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">3. How We Use Your Data</h2>
          <ul className="mt-2 list-inside list-disc space-y-1">
            <li>To match you with suitable credit card products</li>
            <li>To display personalised results based on your profile</li>
            <li>To send you administrative emails related to your submission</li>
            <li>If you consent, to share your data with financial services partners who may contact you</li>
            <li>If you opt in, to send you marketing communications (weekly credit tips, new offers)</li>
            <li>To improve our matching algorithm and website</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">4. Data Sharing</h2>
          <p className="mt-2">
            We may share your data with:
          </p>
          <ul className="mt-2 list-inside list-disc space-y-1">
            <li>Financial services partners (only if you have given explicit consent via the checkbox)</li>
            <li>Affiliate networks for commission tracking purposes</li>
            <li>Service providers who process data on our behalf (hosting, email delivery)</li>
          </ul>
          <p className="mt-2">
            We never sell your data to unvetted third parties. All partners are screened for
            FCA compliance and data protection standards.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">5. Data Retention</h2>
          <p className="mt-2">
            We retain your lead data for up to 24 months. You can request deletion at any time
            by contacting us at the email below.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">6. Your Rights (UK GDPR)</h2>
          <ul className="mt-2 list-inside list-disc space-y-1">
            <li>Right to access your data</li>
            <li>Right to rectification</li>
            <li>Right to erasure ("right to be forgotten")</li>
            <li>Right to restrict processing</li>
            <li>Right to data portability</li>
            <li>Right to object to processing</li>
          </ul>
          <p className="mt-2">
            To exercise any of these rights, email us at{" "}
            <a href="mailto:privacy@creditmatch.uk" className="text-brand-600 underline">privacy@creditmatch.uk</a>.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">7. Cookies</h2>
          <p className="mt-2">
            We use essential cookies for site functionality and, with your consent, analytics
            cookies to improve our service. See our <a href="/cookies" className="text-brand-600 underline">Cookie Policy</a>.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">8. Contact</h2>
          <p className="mt-2">
            Email: <a href="mailto:privacy@creditmatch.uk" className="text-brand-600 underline">privacy@creditmatch.uk</a>
          </p>
        </section>
      </div>
    </div>
  );
}
