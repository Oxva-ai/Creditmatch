import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service — CreditMatch.uk",
  description: "Terms of service for CreditMatch.uk. By using our site, you agree to these terms.",
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900">Terms of Service</h1>
      <p className="mt-2 text-sm text-gray-500">Last updated: April 2025</p>

      <div className="mt-8 space-y-6 text-sm text-gray-700">
        <section>
          <h2 className="text-lg font-semibold text-gray-900">1. Service Description</h2>
          <p className="mt-2">
            CreditMatch.uk provides a credit card eligibility matching tool. We compare your
            self-reported profile against publicly available card criteria to suggest products
            you may be eligible for.
          </p>
          <p className="mt-2">
            <strong>We are not a lender, broker, or financial advisor.</strong> We do not
            guarantee approval for any product. Match scores are estimates only.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">2. Not Financial Advice</h2>
          <p className="mt-2">
            All information on this website is for general information purposes only. It does
            not constitute financial advice. You should consider your own circumstances and
            seek independent advice before applying for any financial product.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">3. Affiliate Links</h2>
          <p className="mt-2">
            Some links on our site are affiliate links. This means we may earn a commission
            if you apply for a product through these links and are approved. This does not
            affect the terms you receive from the product provider.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">4. User Responsibilities</h2>
          <ul className="mt-2 list-inside list-disc space-y-1">
            <li>Provide accurate information when using our eligibility checker</li>
            <li>Read and understand the terms of any product before applying</li>
            <li>Consider whether a product is suitable for your circumstances</li>
            <li>Not use our service for any unlawful purpose</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">5. Intellectual Property</h2>
          <p className="mt-2">
            All content, design, and code on CreditMatch.uk is our property or used under licence.
            You may not reproduce, distribute, or create derivative works without our permission.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">6. Limitation of Liability</h2>
          <p className="mt-2">
            To the maximum extent permitted by law, we are not liable for any loss or damage
            arising from your use of our service, including but not limited to: credit application
            rejections, financial losses, or decisions made based on our match scores.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">7. Changes to Terms</h2>
          <p className="mt-2">
            We may update these terms at any time. Continued use of the site after changes
            constitutes acceptance of the new terms.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">8. Governing Law</h2>
          <p className="mt-2">
            These terms are governed by the laws of England and Wales.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">9. Contact</h2>
          <p className="mt-2">
            Email: <a href="mailto:legal@creditmatch.uk" className="text-brand-600 underline">legal@creditmatch.uk</a>
          </p>
        </section>
      </div>
    </div>
  );
}
