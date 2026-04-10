"use client";

import { useState, useEffect } from "react";

export default function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cm_cookie_consent");
    if (!consent) setShow(true);
  }, []);

  if (!show) return null;

  const accept = () => {
    localStorage.setItem("cm_cookie_consent", "accepted");
    setShow(false);
  };

  const reject = () => {
    localStorage.setItem("cm_cookie_consent", "rejected");
    setShow(false);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-200 bg-white p-4 shadow-lg sm:p-6">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div className="text-sm text-gray-600">
          <p className="font-semibold text-gray-900">Cookie Notice</p>
          <p>
            We use essential cookies to make our site work. With your consent, we may also use
            non-essential cookies to improve user experience and analyse website traffic.{" "}
            <a href="/cookies" className="text-brand-600 underline">Learn more</a>.
          </p>
        </div>
        <div className="flex gap-3">
          <button onClick={reject} className="btn-secondary btn-sm">
            Reject All
          </button>
          <button onClick={accept} className="btn-primary btn-sm">
            Accept All
          </button>
        </div>
      </div>
    </div>
  );
}
