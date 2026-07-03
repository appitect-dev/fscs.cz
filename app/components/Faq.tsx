import { faqs } from "@/app/lib/site";

function FaqJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function Faq() {
  return (
    <section id="faq" className="bg-surface">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:py-24">
        <div className="text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-brand">
            Časté dotazy
          </p>
          <h2 className="text-3xl font-bold text-ink sm:text-4xl">
            Co se nejčastěji ptáte
          </h2>
        </div>

        <div className="mt-10">
          {faqs.map((f) => (
            <details
              key={f.question}
              className="group border-b border-black/10 py-5"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-semibold text-ink [&::-webkit-details-marker]:hidden">
                {f.question}
                <span
                  aria-hidden
                  className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-brand/10 text-xl leading-none text-brand transition-transform duration-200 group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="mt-3 leading-relaxed text-body">{f.answer}</p>
            </details>
          ))}
        </div>
      </div>

      <FaqJsonLd />
    </section>
  );
}
