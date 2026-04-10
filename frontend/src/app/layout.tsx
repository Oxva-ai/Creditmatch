import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import Header from "@/components/shared/Header";
import FCAFooter from "@/components/shared/FCAFooter";
import CookieBanner from "@/components/shared/CookieBanner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CreditMatch.uk — UK Credit Card Eligibility Checker",
  description:
    "Check your credit card eligibility in 30 seconds. No impact on your credit score. Find the best cards for your situation.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  openGraph: {
    title: "CreditMatch.uk — UK Credit Card Eligibility Checker",
    description: "Check your credit card eligibility in 30 seconds. Find the best cards for your situation.",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB">
      <body className={inter.className}>
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <FCAFooter />
          <CookieBanner />
        </div>
      </body>
    </html>
  );
}
