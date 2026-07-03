import Image from "next/image";

const paragraphs = [
  "Naše společnost stojí na dlouholetých zkušenostech v oblasti BOZP a PO. Tým tvoří odborně způsobilé osoby, technici, koordinátoři i projektanti s důrazem na praktické řešení situací v reálném provozu.",
  "V oboru působíme více než 25 let. Naše profesní zkušenosti sahají až do počátku 90. let, kdy jsme začínali v oblasti prevence, mimo jiné i ve spolupráci se Správou železniční dopravní cesty.",
  "Následně jsme více než čtvrtstoletí působili ve společnosti poskytující služby v oblasti BOZP a PO, kde jsme získali zkušenosti napříč širokým spektrem klientů i odvětví. Spolupracovali jsme s významnými výrobními i nevýrobními společnostmi – například v automotive, papírenství, obchodě, strojírenství, vzdělávání nebo dřevozpracujícím průmyslu.",
  "V roce 2021 jsme navázali na tyto zkušenosti založením společnosti Fire & Safety Consulting s.r.o., která dnes poskytuje komplexní služby v oblasti bezpečnosti práce a požární ochrany.",
];

const stats = [
  { value: "25+", label: "let zkušeností v oboru" },
  { value: "1990s", label: "začátky v prevenci" },
  { value: "2021", label: "vznik FSCS s.r.o." },
];

export function About() {
  return (
    <section id="o-firme" className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 lg:gap-16">
          <div className="order-2 md:order-1">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-brand">
              O firmě
            </p>
            <h2 className="text-3xl font-bold text-ink sm:text-4xl">
              Praxe, která stojí na 25 letech v oboru
            </h2>
            <div className="mt-6 space-y-4 leading-relaxed text-body">
              {paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            <dl className="mt-8 grid grid-cols-3 gap-4 border-t border-black/5 pt-6">
              {stats.map((s) => (
                <div key={s.label}>
                  <dt className="text-2xl font-bold text-brand sm:text-3xl">
                    {s.value}
                  </dt>
                  <dd className="mt-1 text-sm text-body">{s.label}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="order-1 md:order-2">
            <Image
              src="/images/12.jpg"
              alt="Projektová dokumentace a 3D model stavby"
              width={1996}
              height={1171}
              sizes="(min-width: 768px) 50vw, 100vw"
              className="h-auto w-full rounded-card shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
