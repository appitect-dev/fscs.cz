"use client";

import Script from "next/script";
import { useConsent } from "@/app/components/consent/ConsentProvider";

/**
 * Analytika – Microsoft Clarity.
 *
 * Skript se načte POUZE po výslovném souhlasu uživatele (cookie lišta).
 * Bez souhlasu se nevykreslí nic – žádné cookies, žádné requesty.
 */
const CLARITY_ID = "xg5fydk38b";

export function Analytics() {
  const { consent, ready } = useConsent();

  // Nic nenačítat, dokud uživatel nedal souhlas.
  if (!ready || consent !== "granted") {
    return null;
  }

  return (
    <Script id="ms-clarity" strategy="afterInteractive">
      {`
        (function(c,l,a,r,i,t,y){
          c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
          t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
          y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", "${CLARITY_ID}");
      `}
    </Script>
  );
}
