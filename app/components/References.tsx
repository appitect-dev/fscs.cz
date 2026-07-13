import Image from "next/image";
import { clients, sectors } from "@/app/lib/site";

export function References() {
  return (
    <section id="reference" className="bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-brand">
            Reference
          </p>
          <h2 className="text-3xl font-bold text-ink sm:text-4xl">
            Zkušenosti napříč obory
          </h2>
          <p className="mt-4 leading-relaxed text-body">
            Za dobu naší praxe jsme spolupracovali s výrobními i nevýrobními
            organizacemi z celé řady odvětví. Konkrétní reference rádi doložíme
            na vyžádání.
          </p>
        </div>

        {/* Obory */}
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {sectors.map((sector) => (
            <span
              key={sector}
              className="rounded-full border border-black/5 bg-white px-5 py-2.5 text-sm font-medium text-ink shadow-sm"
            >
              {sector}
            </span>
          ))}
        </div>

        {/* Vybraní klienti */}
        <div className="mt-12">
          <p className="text-center text-sm font-semibold uppercase tracking-[0.2em] text-body/60">
            Vybraní klienti
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-8 sm:gap-x-14">
            {clients.map((client) => (
              <Image
                key={client.name}
                src={client.logo}
                alt={client.name}
                title={client.name}
                width={client.width}
                height={client.height}
                className="h-9 w-auto opacity-70 grayscale transition duration-200 hover:opacity-100 hover:grayscale-0 sm:h-10"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
