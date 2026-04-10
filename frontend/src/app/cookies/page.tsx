import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy — CreditMatch.uk",
  description: "Cookie policy for CreditMatch.uk. Learn about the cookies we use and how to manage them.",
};

export default function CookiesPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900">Cookie Policy</h1>
      <p className="mt-2 text-sm text-gray-500">Last updated: April 2025</p>

      <div className="mt-8 space-y-6 text-sm text-gray-700">
        <section>
          <h2 className="text-lg font-semibold text-gray-900">What Are Cookies?</h2>
          <p className="mt-2">
            Cookies are small text files stored on your device when you visit a website.
            They help the site function properly and can provide information to the site owners.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">Cookies We Use</h2>

          <h3 className="mt-4 font-semibold">Essential Cookies (Always Active)</h3>
          <ul className="mt-2 list-inside list-disc space-y-1">
            <li><strong>cm_cookie_consent</strong> — Remembers your cookie consent choice (1 year)</li>
            <li><strong>cm_admin_token</strong> — Admin session token (7 days, admin only)</li>
          </ul>

          <h3 className="mt-4 font-semibold">Analytics Cookies (With Consent)</h3>
          <ul className="mt-2 list-inside list-disc space-y-1">
            <li><strong>Plausible analytics</strong> — Anonymous pageview tracking (session)</li>
          </ul>

          <p className="mt-2">
            We do not use advertising cookies, tracking pixels, or third-party analytics that
            identify individual users across websites.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">Managing Cookies</h2>
          <p className="mt-2">
            You can manage your cookie preferences through the cookie banner on our site.
            You can also delete cookies at any time through your browser settings.
          </p>
          <p className="mt-2">
            Note: Disabling essential cookies may affect site functionality.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">Changes</h2>
          <p className="mt-2">
            We may update this policy from time to time. Changes will be posted on this page.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">Contact</h2>
          <p className="mt-2">
            Email: <a href="mailto:privacy@creditmatch.uk" className="text-brand-600 underline">privacy@creditmatch.uk</a>
          </p>
        </section>
      </div>
    </div>
  );
}
