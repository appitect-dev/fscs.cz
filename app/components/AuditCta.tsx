import { company, people, telHref } from "@/app/lib/site";
import { Button } from "@/app/components/ui/Button";
import { IconCheck, IconMail, IconPhone } from "@/app/components/icons";

const benefits = [
  "Nezávazně a zcela zdarma",
  "Projdeme váš provoz i stávající dokumentaci",
  "Zjistíme, kde jsou rizika a co řešit přednostně",
  "Doporučíme konkrétní další postup",
];

export function AuditCta() {
  const phone = people.find((p) => p.phone)?.phone ?? "";

  return (
    <section id="audit" className="bg-navy">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-brand">
              Naše nejsilnější nabídka
            </p>
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Úvodní audit BOZP a PO{" "}
              <span className="text-brand">zdarma</span>
            </h2>
            <p className="mt-4 max-w-xl leading-relaxed text-white/70">
              Nevíte, jak na tom s bezpečností práce a požární ochranou jste?
              Ozvěte se nám. Nezávazně se domluvíme na úvodním auditu, ze kterého
              zjistíte, co máte v pořádku a čemu se raději věnovat hned.
            </p>

            <ul className="mt-6 space-y-3">
              {benefits.map((b) => (
                <li key={b} className="flex items-start gap-3 text-white/85">
                  <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand/20 text-brand">
                    <IconCheck className="h-4 w-4" />
                  </span>
                  {b}
                </li>
              ))}
            </ul>
          </div>

          {/* Kontaktní karta */}
          <div className="rounded-card bg-white/5 p-8 ring-1 ring-white/10 backdrop-blur-sm">
            <p className="text-lg font-semibold text-white">
              Řekněte si o audit
            </p>
            <p className="mt-2 text-sm text-white/60">
              Zavolejte nebo napište, ozveme se vám zpět.
            </p>

            <div className="mt-6 flex flex-col gap-3">
              {phone && (
                <Button
                  href={telHref(phone)}
                  variant="primary"
                  size="lg"
                  className="w-full"
                >
                  <IconPhone className="h-5 w-5" />
                  {phone}
                </Button>
              )}
              <Button
                href={`mailto:${company.email}?subject=Žádost%20o%20audit%20zdarma`}
                variant="outline"
                size="lg"
                className="w-full"
              >
                <IconMail className="h-5 w-5" />
                {company.email}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
