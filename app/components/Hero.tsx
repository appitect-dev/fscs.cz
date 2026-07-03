"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { services } from "@/app/lib/site";
import { Button } from "@/app/components/ui/Button";
import { IconArrowRight } from "@/app/components/icons";

const AUTOPLAY_MS = 6000;

export function Hero() {
  const [active, setActive] = useState(0);
  const count = services.length;
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const go = useCallback((i: number) => setActive((i + count) % count), [count]);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const start = () => {
      timer.current = setInterval(() => {
        setActive((a) => (a + 1) % count);
      }, AUTOPLAY_MS);
    };
    start();
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [count]);

  const pause = () => {
    if (timer.current) clearInterval(timer.current);
  };
  const resume = () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    if (timer.current) clearInterval(timer.current);
    timer.current = setInterval(() => setActive((a) => (a + 1) % count), AUTOPLAY_MS);
  };

  return (
    <section id="top" className="relative isolate overflow-hidden">
      {/* Pozadí – prolnutí Praha / Plzeň */}
      <Image
        src="/images/banner/banner-1.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="-z-10 object-cover object-center"
      />
      <div className="absolute inset-0 -z-10 bg-navy/80" />

      <div
        className="mx-auto max-w-7xl px-4 pb-28 pt-40 sm:px-6 sm:pb-32 sm:pt-48 lg:pb-52 lg:pt-40"
        onMouseEnter={pause}
        onMouseLeave={resume}
        onFocusCapture={pause}
        onBlurCapture={resume}
      >
        <div
          className="relative min-h-[280px] max-w-2xl sm:min-h-[240px]"
          aria-roledescription="carousel"
          aria-label="Naše hlavní služby"
        >
          {services.map((s, i) => (
            <div
              key={s.abbr}
              role="group"
              aria-roledescription="slide"
              aria-hidden={i !== active}
              className={`absolute inset-0 transition-opacity duration-700 ${
                i === active ? "opacity-100" : "pointer-events-none opacity-0"
              }`}
            >
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-brand">
                {s.abbr}
              </p>
              <h1 className="text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
                {s.title}
              </h1>
              <p className="mt-4 max-w-xl leading-relaxed text-white/70">
                {s.description}
              </p>
            </div>
          ))}
        </div>

        {/* Hlavní CTA – audit zdarma */}
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
          <Button href="#audit" variant="primary" size="lg" className="group">
            Nezávazně chci audit zdarma
            <IconArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Button>
          <Button href="#sluzby" variant="outline" size="lg">
            Naše služby
          </Button>
        </div>

        {/* Tečky slideru */}
        <div className="mt-10 flex gap-3" role="tablist" aria-label="Přepínání slidů">
          {services.map((s, i) => (
            <button
              key={s.abbr}
              type="button"
              onClick={() => go(i)}
              role="tab"
              aria-selected={i === active}
              aria-label={`${i + 1}. ${s.title}`}
              className={`h-2.5 rounded-full transition-all ${
                i === active ? "w-8 bg-brand" : "w-2.5 bg-white/40 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
