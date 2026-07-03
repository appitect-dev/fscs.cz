"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { nav, primaryPhone, telHref } from "@/app/lib/site";
import { Button } from "@/app/components/ui/Button";
import { IconClose, IconMenu, IconPhone } from "@/app/components/icons";

const AUDIT_HREF = "#audit";

/**
 * `home` – průhledná hlavička nad tmavým hero (výchozí, kotvy `#...`).
 * `page` – plné pozadí na podstránce; kotvy míří na domovskou stránku (`/#...`).
 */
export function Header({ variant = "home" }: { variant?: "home" | "page" }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isPage = variant === "page";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => setOpen(false);

  // Na podstránce ukazují kotvy zpět na domovskou stránku.
  const hrefFor = (href: string) => (isPage ? `/${href}` : href);
  const homeHref = isPage ? "/" : "#top";

  // Audit má vlastní CTA vpravo, takže ho z prostřední navigace vynecháme.
  const menu = nav.filter((item) => item.href !== AUDIT_HREF);
  const audit =
    nav.find((item) => item.href === AUDIT_HREF) ??
    { label: "Audit zdarma", href: AUDIT_HREF };

  // Plné (navy) pozadí na podstránce, při scrollu i s otevřeným mobilním menu;
  // jinak průhledné nad tmavým hero.
  const solid = scrolled || open || isPage;

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`transition-colors duration-300 ${
          solid
            ? "bg-navy/95 shadow-lg shadow-black/10 backdrop-blur"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <nav className="grid h-20 grid-cols-[1fr_auto] items-center lg:grid-cols-[1fr_auto_1fr]">
            {/* Logo */}
            <a
              href={homeHref}
              onClick={closeMenu}
              className="flex items-center gap-3 justify-self-start"
              aria-label="Fire & Safety Consulting – domů"
            >
              <Image
                src="/images/logo.svg"
                alt="Fire & Safety Consulting s.r.o."
                width={60}
                height={66}
                priority
                className="h-12 w-auto sm:h-14"
              />
              <span className="hidden text-sm font-semibold text-white xl:inline">
                Fire &amp; Safety Consulting
              </span>
            </a>

            {/* Prostřední navigace (desktop) */}
            <ul className="hidden items-center justify-self-center lg:flex">
              {menu.map((item) => (
                <li key={item.href}>
                  <a
                    href={hrefFor(item.href)}
                    className="group relative block px-4 py-2 text-sm font-semibold uppercase tracking-wide text-white/85 transition-colors hover:text-white"
                  >
                    {item.label}
                    <span className="absolute inset-x-4 -bottom-0.5 h-0.5 origin-left scale-x-0 bg-brand transition-transform duration-300 group-hover:scale-x-100" />
                  </a>
                </li>
              ))}
            </ul>

            {/* Vpravo: CTA audit + mobilní přepínač */}
            <div className="flex items-center justify-end gap-2 justify-self-end">
              <Button
                href={hrefFor(audit.href)}
                onClick={closeMenu}
                variant="primary"
                size="sm"
                className="hidden lg:inline-flex"
              >
                {audit.label}
              </Button>
              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                className="inline-flex items-center justify-center rounded-btn p-2 text-white lg:hidden"
                aria-expanded={open}
                aria-controls="mobile-menu"
                aria-label={open ? "Zavřít menu" : "Otevřít menu"}
              >
                {open ? (
                  <IconClose className="h-7 w-7" />
                ) : (
                  <IconMenu className="h-7 w-7" />
                )}
              </button>
            </div>
          </nav>
        </div>

        {/* Mobilní menu */}
        <div
          id="mobile-menu"
          className={`overflow-hidden bg-navy transition-[max-height] duration-300 lg:hidden ${
            open ? "max-h-[420px]" : "max-h-0"
          }`}
        >
          <ul className="flex flex-col gap-1 px-4 pb-6 pt-2">
            {menu.map((item) => (
              <li key={item.href}>
                <a
                  href={hrefFor(item.href)}
                  onClick={closeMenu}
                  className="block rounded-btn px-3 py-3 text-sm font-semibold uppercase tracking-wide text-white/85 transition-colors hover:bg-white/5 hover:text-white"
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li className="pt-3">
              <Button
                href={hrefFor(audit.href)}
                onClick={closeMenu}
                variant="primary"
                size="lg"
                className="w-full"
              >
                {audit.label}
              </Button>
            </li>
            <li className="pt-3 text-center">
              <a
                href={telHref(primaryPhone)}
                onClick={closeMenu}
                className="inline-flex items-center gap-2 text-sm font-semibold text-white/70 transition-colors hover:text-brand"
              >
                <IconPhone className="h-4 w-4" />
                {primaryPhone}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
