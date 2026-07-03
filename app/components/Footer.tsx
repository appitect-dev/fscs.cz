import Image from "next/image";
import Link from "next/link";
import { company, nav, offices, PRIVACY_PATH } from "@/app/lib/site";
import { OfficesMap } from "@/app/components/OfficesMap";
import { CookieSettingsButton } from "@/app/components/consent/CookieSettingsButton";

function MapPinIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto bg-footer">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="flex flex-col items-center gap-8 md:flex-row md:items-start md:justify-between">
          <div className="flex items-center gap-3">
            <Image
              src="/images/logo.svg"
              alt=""
              width={44}
              height={48}
              className="h-11 w-auto"
            />
            <span className="text-sm font-semibold text-white">
              {company.legalName}
            </span>
          </div>

          <nav aria-label="Patička">
            <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              {nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-sm text-white/70 transition-colors hover:text-brand"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-10 grid gap-8 border-t border-white/10 pt-10 md:grid-cols-2 md:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-white/40">
              Kde nás najdete
            </p>
            <h2 className="mt-2 text-xl font-semibold text-white">
              Působíme na lince Praha–Plzeň
            </h2>
            <ul className="mt-6 space-y-5">
              {offices.map((office) => (
                <li key={office.city} className="flex gap-3">
                  <MapPinIcon className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
                  <div>
                    <p className="font-semibold text-white">{office.label}</p>
                    <p className="text-sm text-white/70">
                      {office.street}, {office.zip}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <OfficesMap />
        </div>

        <div className="mt-10 flex flex-col items-center gap-4 border-t border-white/10 pt-6 sm:flex-row sm:justify-between">
          <p className="text-sm text-white/60">
            Copyright © {year} {company.legalName}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <Link
              href={PRIVACY_PATH}
              className="text-sm text-white/70 transition-colors hover:text-brand"
            >
              Zásady ochrany osobních údajů
            </Link>
            <CookieSettingsButton className="text-sm text-white/70 transition-colors hover:text-brand" />
          </div>
        </div>
      </div>
    </footer>
  );
}
