import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/app/components/Header";
import { Footer } from "@/app/components/Footer";
import { CookieSettingsButton } from "@/app/components/consent/CookieSettingsButton";
import { company, offices } from "@/app/lib/site";

export const metadata: Metadata = {
  title: "Zásady ochrany osobních údajů",
  description:
    "Jak Fire & Safety Consulting s.r.o. zpracovává osobní údaje, jaké cookies web používá a jaká máte práva podle GDPR.",
  alternates: { canonical: "/zasady-ochrany-osobnich-udaju" },
};

const seat = offices.find((o) => o.primary) ?? offices[0];

// Datum poslední aktualizace textu (ručně, ať odpovídá revizi obsahu).
const updatedAt = "1. 1. 2026";

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="mt-10 scroll-mt-28 first:mt-0">
      <h2 className="text-2xl font-bold text-ink">{title}</h2>
      <div className="mt-4 space-y-4 text-body">{children}</div>
    </section>
  );
}

export default function PrivacyPolicyPage() {
  return (
    <>
      <Header variant="page" />
      <main className="bg-white">
        <div className="mx-auto max-w-3xl px-4 pb-20 pt-32 sm:px-6 sm:pt-36">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand">
            Ochrana soukromí
          </p>
          <h1 className="mt-3 text-3xl font-bold text-ink sm:text-4xl">
            Zásady ochrany osobních údajů
          </h1>
          <p className="mt-4 text-body">
            Tyto zásady popisují, jaké osobní údaje jako správce zpracováváme
            v souvislosti s provozem webu <strong>fscs.cz</strong> a naší
            poradenskou činností, z jakých důvodů a jaká máte práva podle nařízení
            <span className="whitespace-nowrap"> (EU) 2016/679</span> (GDPR).
          </p>
          <p className="mt-2 text-sm text-muted">
            Poslední aktualizace: {updatedAt}
          </p>

          <Section id="spravce" title="1. Správce osobních údajů">
            <ul className="space-y-1">
              <li>
                <strong className="text-ink">{company.legalName}</strong>
              </li>
              <li>
                Sídlo: {seat.street}, {seat.zip}
              </li>
              <li>IČO: {company.ic}</li>
              <li>DIČ: {company.dic}</li>
              <li>
                E-mail:{" "}
                <a
                  href={`mailto:${company.email}`}
                  className="font-semibold text-brand hover:text-brand-hover"
                >
                  {company.email}
                </a>
              </li>
            </ul>
            <p>
              Ve věcech ochrany osobních údajů nás kontaktujte na uvedeném
              e-mailu. Nejmenovali jsme pověřence pro ochranu osobních údajů
              (DPO), protože nám tuto povinnost GDPR neukládá.
            </p>
          </Section>

          <Section id="rozsah" title="2. Jaké údaje a proč zpracováváme">
            <p>
              Zpracováváme jen údaje, které jsou nezbytné pro daný účel:
            </p>
            <div className="space-y-4">
              <div className="rounded-card border border-black/5 bg-surface p-5">
                <h3 className="font-bold text-ink">
                  a) Komunikace a poptávky
                </h3>
                <p className="mt-2 text-sm">
                  Když nás oslovíte e-mailem nebo telefonicky (např. kvůli auditu
                  zdarma), zpracujeme jméno, kontaktní údaje a obsah zprávy.
                </p>
                <p className="mt-2 text-sm">
                  <strong>Právní základ:</strong> jednání o smlouvě a náš
                  oprávněný zájem odpovědět na vaši poptávku (čl. 6 odst. 1 písm.
                  b) a f) GDPR).
                </p>
              </div>
              <div className="rounded-card border border-black/5 bg-surface p-5">
                <h3 className="font-bold text-ink">
                  b) Měření návštěvnosti (analytika)
                </h3>
                <p className="mt-2 text-sm">
                  Se souhlasem měříme, jak je web používán (navštívené stránky,
                  přibližná lokalita, typ zařízení, chování na stránce). Slouží to
                  ke zlepšování obsahu a použitelnosti.
                </p>
                <p className="mt-2 text-sm">
                  <strong>Právní základ:</strong> váš souhlas (čl. 6 odst. 1 písm.
                  a) GDPR). Souhlas je dobrovolný a lze jej kdykoli odvolat.
                </p>
              </div>
            </div>
          </Section>

          <Section id="cookies" title="3. Cookies a obdobné technologie">
            <p>
              Cookies jsou malé soubory ukládané ve vašem prohlížeči. Rozlišujeme
              dvě kategorie:
            </p>
            <div className="overflow-hidden rounded-card border border-black/5">
              <table className="w-full text-left text-sm">
                <thead className="bg-surface text-ink">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Kategorie</th>
                    <th className="px-4 py-3 font-semibold">Účel</th>
                    <th className="px-4 py-3 font-semibold">Souhlas</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/5">
                  <tr>
                    <td className="px-4 py-3 font-medium text-ink">
                      Nezbytné
                    </td>
                    <td className="px-4 py-3">
                      Uložení vaší volby o cookies (klíč{" "}
                      <code className="rounded bg-surface px-1">
                        fscs-consent
                      </code>
                      ). Bez nich web nefunguje správně.
                    </td>
                    <td className="px-4 py-3 text-muted">Není potřeba</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium text-ink">
                      Analytické
                    </td>
                    <td className="px-4 py-3">
                      Microsoft Clarity – měření návštěvnosti a chování na webu
                      (heatmapy, anonymní záznamy relací).
                    </td>
                    <td className="px-4 py-3 text-brand">Ano, opt-in</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              Analytické skripty se načtou <strong>až po vašem souhlasu</strong>.
              Dokud souhlas nedáte, žádné analytické cookies se neukládají.
            </p>
          </Section>

          <Section id="prijemci" title="4. Zpracovatelé a předání do třetích zemí">
            <p>
              K analytice využíváme tohoto zpracovatele. Data mohou být
              zpracovávána i mimo EU (USA); přenos je krytý standardními smluvními
              doložkami, resp. rámcem EU–US Data Privacy Framework.
            </p>
            <ul className="list-disc space-y-2 pl-5">
              <li>
                <strong className="text-ink">Microsoft Clarity</strong> –
                Microsoft Corporation. Analýza chování na webu (heatmapy, anonymní
                záznamy relací).{" "}
                <a
                  href="https://privacy.microsoft.com/privacystatement"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-brand hover:text-brand-hover"
                >
                  Zásady Microsoftu
                </a>
              </li>
            </ul>
          </Section>

          <Section id="mapa" title="5. Mapa v patičce">
            <p>
              Mapa poboček využívá mapové podklady z OpenStreetMap a dlaždice
              služby CARTO. Při zobrazení mapy se z jejich serverů načítají
              obrázky, což zahrnuje vaši IP adresu. Nepoužíváme k tomu marketingové
              cookies a mapa se zobrazuje bez ohledu na souhlas s analytikou.
            </p>
          </Section>

          <Section id="doba" title="6. Doba uložení">
            <ul className="list-disc space-y-2 pl-5">
              <li>
                Poptávky a komunikace: po dobu vyřízení a následně po dobu nutnou
                k ochraně našich práv (zpravidla max. 3 roky).
              </li>
              <li>
                Analytické údaje: dle nastavení daného nástroje (obvykle do 14
                měsíců); souhlas s cookies uchováváme, dokud jej nezměníte.
              </li>
            </ul>
          </Section>

          <Section id="prava" title="7. Vaše práva">
            <p>Ve vztahu ke svým osobním údajům máte právo:</p>
            <ul className="list-disc space-y-2 pl-5">
              <li>na přístup k údajům a jejich kopii,</li>
              <li>na opravu nepřesných údajů,</li>
              <li>na výmaz, tzv. právo být zapomenut,</li>
              <li>na omezení zpracování,</li>
              <li>na přenositelnost údajů,</li>
              <li>vznést námitku proti zpracování z oprávněného zájmu,</li>
              <li>kdykoli odvolat udělený souhlas.</li>
            </ul>
            <p>
              Práva uplatníte e-mailem na{" "}
              <a
                href={`mailto:${company.email}`}
                className="font-semibold text-brand hover:text-brand-hover"
              >
                {company.email}
              </a>
              .
            </p>
          </Section>

          <Section id="odvolani" title="8. Odvolání souhlasu s cookies">
            <p>
              Souhlas s analytickými cookies můžete kdykoli změnit nebo odvolat –
              stejně snadno, jako jste jej udělili:
            </p>
            <p>
              <CookieSettingsButton className="inline-flex items-center justify-center rounded-btn bg-brand px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-hover" />
            </p>
          </Section>

          <Section id="dozor" title="9. Dozorový úřad">
            <p>
              Pokud máte za to, že zpracováním vašich údajů porušujeme GDPR, máte
              právo podat stížnost u dozorového úřadu:
            </p>
            <ul className="space-y-1">
              <li>
                <strong className="text-ink">
                  Úřad pro ochranu osobních údajů
                </strong>
              </li>
              <li>Pplk. Sochora 27, 170 00 Praha 7</li>
              <li>
                <a
                  href="https://www.uoou.cz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-brand hover:text-brand-hover"
                >
                  www.uoou.cz
                </a>
              </li>
            </ul>
          </Section>

          <div className="mt-12 border-t border-black/10 pt-6">
            <Link
              href="/"
              className="text-sm font-semibold text-brand hover:text-brand-hover"
            >
              ← Zpět na hlavní stránku
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
