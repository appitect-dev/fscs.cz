import { company, people, telHref } from "@/app/lib/site";
import { IconMail, IconPhone } from "@/app/components/icons";

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

        {/* Primární kontakt – konkrétní lidé s telefony */}
        <div className="mx-auto mt-12 grid max-w-3xl grid-cols-1 gap-5 sm:grid-cols-2">
          {contactablePeople.map((person) => (
            <a
              key={person.phone}
              href={telHref(person.phone)}
              className="group flex flex-col rounded-card border border-black/5 bg-surface p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <span className="text-lg font-bold text-ink">{person.name}</span>
              {person.role && (
                <span className="mt-1 text-sm text-body/70">{person.role}</span>
              )}
              <span className="mt-auto flex items-center gap-2.5 pt-5 text-xl font-bold text-brand">
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand/10">
                  <IconPhone className="h-5 w-5" />
                </span>
                <span className="group-hover:underline">{person.phone}</span>
              </span>
            </a>
          ))}
        </div>

        {/* Sekundární kontakt – společný e-mail */}
        <p className="mt-8 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-center text-body">
          Preferujete e-mail? Napište na{" "}
          <a
            href={`mailto:${company.email}`}
            className="inline-flex items-center gap-1.5 font-semibold text-brand hover:underline"
          >
            <IconMail className="h-4 w-4" />
            {company.email}
          </a>
        </p>
      </div>
    </section>
  );
}
