"use client";

import Link from "next/link";
import { PRIVACY_PATH } from "@/app/lib/site";
import { useConsent } from "@/app/components/consent/ConsentProvider";
import { IconCookie } from "@/app/components/icons";

const btnBase =
  "inline-flex flex-1 items-center justify-center rounded-btn px-5 py-3 text-sm font-semibold transition-colors duration-200";

export function CookieBanner() {
  const { consent, ready, accept, reject } = useConsent();

  // Nezobrazovat, dokud neznáme uloženou volbu, ani když už uživatel rozhodl.
  if (!ready || consent !== null) {
    return null;
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-[70] p-4 sm:inset-x-auto sm:right-0 sm:max-w-md sm:p-6">
      <div
        role="dialog"
        aria-label="Souhlas s cookies"
        aria-live="polite"
        className="flex w-full flex-col gap-5 rounded-card border border-black/5 bg-white p-6 shadow-2xl shadow-black/25"
      >
        <div className="flex items-start gap-4">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-brand/10 ring-1 ring-brand/15">
            <IconCookie className="h-6 w-6 text-brand" />
          </span>
          <div>
            <p className="text-base font-bold text-ink">Používáme cookies</p>
            <p className="mt-1.5 text-sm leading-relaxed text-body">
              Pro měření návštěvnosti a vylepšování webu používáme analytické
              cookies (Microsoft Clarity). Zapneme je jen s vaším souhlasem.
              Podrobnosti najdete v{" "}
              <Link
                href={PRIVACY_PATH}
                className="font-semibold text-brand underline underline-offset-2 hover:text-brand-hover"
              >
                zásadách ochrany osobních údajů
              </Link>
              .
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={reject}
            className={`${btnBase} border border-ink/15 text-ink hover:bg-surface`}
          >
            Odmítnout
          </button>
          <button
            type="button"
            onClick={accept}
            className={`${btnBase} bg-brand text-white hover:bg-brand-hover`}
          >
            Přijmout
          </button>
        </div>
      </div>
    </div>
  );
}
