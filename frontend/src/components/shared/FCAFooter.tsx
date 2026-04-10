import Link from "next/link";
import { EASEYEARNS_URL } from "@/lib/constants";

export default function FCAFooter() {
  return (
    <footer className="border-t border-gray-200 bg-gray-900 text-gray-400">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Compliance Notice */}
        <div className="mb-8 rounded-lg border border-gray-700 bg-gray-800 p-4 text-xs">
          <p className="mb-2 font-semibold text-gray-300">Important Information</p>
          <p className="mb-1">
            This website provides information only and does not constitute financial advice.
            You should consider your own circumstances and seek independent advice if unsure.
          </p>
          <p className="mb-1">
            Credit commitments should be carefully considered. Borrowing more than you can
            afford to repay may lead to financial difficulty and affect your credit rating.
          </p>
          <p className="mb-1">
            We may earn a commission if you apply for a product through links on this site.
            This does not affect the terms you receive.
          </p>
          <p>
            To check whether a financial firm is authorised by the FCA, visit the{" "}
            <a
              href="https://register.fca.org.uk"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-400 underline hover:text-brand-300"
            >
              FCA Register
            </a>
            .
          </p>
        </div>

        {/* Links */}
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <h3 className="mb-3 text-sm font-semibold text-white">CreditMatch</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-white">About Us</Link></li>
              <li><Link href="/quiz" className="hover:text-white">Eligibility Check</Link></li>
              <li><Link href="/articles" className="hover:text-white">Guides</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-semibold text-white">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/privacy" className="hover:text-white">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white">Terms of Service</Link></li>
              <li><Link href="/cookies" className="hover:text-white">Cookie Policy</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-semibold text-white">Categories</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/articles?cat=credit-builder" className="hover:text-white">Credit Builder</Link></li>
              <li><Link href="/articles?cat=balance-transfer" className="hover:text-white">Balance Transfer</Link></li>
              <li><Link href="/articles?cat=cashback" className="hover:text-white">Cashback</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-semibold text-white">More Ways to Earn</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href={EASEYEARNS_URL} target="_blank" rel="noopener noreferrer" className="text-brand-400 hover:text-brand-300">
                  EasyEarns.com →
                </a>
              </li>
            </ul>
            <p className="mt-2 text-xs text-gray-500">
              Community referral codes and sign-up bonuses
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 border-t border-gray-800 pt-6 text-center text-xs">
          <p>© {new Date().getFullYear()} CreditMatch.uk. All rights reserved.</p>
          <p className="mt-1 text-gray-600">
            Not authorised or regulated by the Financial Conduct Authority. Information purposes only.
          </p>
        </div>
      </div>
    </footer>
  );
}
