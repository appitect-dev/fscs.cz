"use client";

import { useConsent } from "@/app/components/consent/ConsentProvider";

// Odkaz v patičce, který znovu otevře cookie lištu (odvolání/změna souhlasu).
export function CookieSettingsButton({ className }: { className?: string }) {
  const { reset } = useConsent();

  return (
    <button type="button" onClick={reset} className={className}>
      Nastavení cookies
    </button>
  );
}
