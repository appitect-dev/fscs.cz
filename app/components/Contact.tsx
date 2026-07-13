import {
  company,
  offices,
  people,
  telHref,
} from "@/app/lib/site";
import { IconMail, IconMapPin, IconPhone } from "@/app/components/icons";

function mapsUrl(query: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    query,
  )}`;
}

export function Contact() {
  const contactablePeople = people.filter((p) => p.name && p.phone);

  return (
    <section id="kontakty" className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-brand">
            Kontakty
          </p>
          <h2 className="text-3xl font-bold text-ink sm:text-4xl">
            Ozvěte se nám
          </h2>
          <p className="mt-4 leading-relaxed text-body">
            Působíme v Praze i v Plzni. Úvodní audit nabízíme zdarma – stačí
            zavolat nebo napsat.
          </p>
        </div>

        {/* Telefony na jednotlivé osoby */}
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          {contactablePeople.map((person) => (
            <a
              key={person.phone}
              href={telHref(person.phone)}
              className="group flex min-w-[240px] flex-col items-center rounded-card border border-black/5 bg-surface px-6 py-5 text-center shadow-sm transition-shadow hover:shadow-md"
            >
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-brand/10 text-brand">
                <IconPhone className="h-5 w-5" />
              </span>
              <span className="mt-3 text-lg font-semibold text-ink group-hover:text-brand">
                {person.phone}
              </span>
              <span className="mt-1 text-sm text-body">{person.name}</span>
              {person.role && (
                <span className="mt-0.5 text-xs text-body/60">{person.role}</span>
              )}
            </a>
          ))}

          {/* E-mail (společný) */}
          <a
            href={`mailto:${company.email}`}
            className="group flex min-w-[240px] flex-col items-center rounded-card border border-black/5 bg-surface px-6 py-5 text-center shadow-sm transition-shadow hover:shadow-md"
          >
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-brand/10 text-brand">
              <IconMail className="h-5 w-5" />
            </span>
            <span className="mt-3 text-lg font-semibold text-ink group-hover:text-brand">
              {company.email}
            </span>
            <span className="mt-1 text-sm text-body">Napište nám</span>
          </a>
        </div>

        {/* Kanceláře Praha / Plzeň */}
        <div className="mx-auto mt-14 grid max-w-3xl grid-cols-1 gap-6 sm:grid-cols-2">
          {offices.map((office) => (
            <div
              key={office.city}
              className="rounded-card border border-black/5 bg-surface p-6"
            >
              <div className="flex items-center gap-2">
                <IconMapPin className="h-5 w-5 text-brand" />
                <h3 className="text-lg font-bold text-ink">{office.label}</h3>
              </div>
              <address className="mt-3 not-italic leading-relaxed text-body">
                {company.legalName}
                <br />
                {office.street}
                <br />
                {office.zip}
              </address>
              <a
                href={mapsUrl(office.mapsQuery)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-brand hover:underline"
              >
                Zobrazit na mapě
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
