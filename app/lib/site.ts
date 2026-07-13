// Centrální konfigurace obsahu webu.
// Vše, co se běžně mění (kontakty, telefony, adresy, texty služeb),
// je na jednom místě, aby se to dalo upravit bez zásahu do komponent.

export type NavItem = { label: string; href: string };

// Kanonická adresa webu (bez lomítka na konci). Jeden zdroj pravdy
// pro metadata, sitemap, robots i JSON-LD.
export const SITE_URL = "https://fscs.cz";

// Cesta ke stránce se zásadami ochrany osobních údajů (na jednom místě).
export const PRIVACY_PATH = "/zasady-ochrany-osobnich-udaju";

export const nav: NavItem[] = [
  { label: "Naše služby", href: "#sluzby" },
  { label: "Audit zdarma", href: "#audit" },
  { label: "O firmě", href: "#o-firme" },
  { label: "Reference", href: "#reference" },
  { label: "Kontakty", href: "#kontakty" },
];

export type ContactPerson = {
  name: string;
  role: string;
  phone: string; // ve formátu "+420 603 113 778"; ponech prázdné, dokud není známé
};

export const people: ContactPerson[] = [
  {
    name: "Ing. Jiří Souček",
    role: "jednatel · odborně způsobilá osoba pro BOZP a PO",
    phone: "+420 603 113 778",
  },
  {
    name: "Bc. Jan Souček",
    role: "koordinátor BOZP · revize",
    phone: "+420 736 764 991",
  },
];

export const company = {
  legalName: "Fire & Safety Consulting s.r.o.",
  email: "office@fscs.cz",
  ic: "11792337",
  dic: "CZ11792337",
  foundedYear: 2021,
} as const;

export type Office = {
  city: string;
  label: string;
  street: string;
  zip: string;
  mapsQuery: string;
  lat: number;
  lng: number;
  primary?: boolean;
};

export const offices: Office[] = [
  {
    city: "Praha",
    label: "Pražské sídlo",
    street: "Jaurisova 515/4",
    zip: "140 00 Praha 4",
    mapsQuery: "Jaurisova 515/4, 140 00 Praha 4",
    lat: 50.0594916,
    lng: 14.4490383,
    primary: true,
  },
  {
    city: "Plzeň",
    label: "Plzeňská kancelář",
    street: "Hřbitovní 37",
    // PSČ dohledáno z OSM (Hřbitovní, Doubravka, Plzeň 4) – majitel prosím ověř.
    zip: "312 00 Plzeň",
    mapsQuery: "Hřbitovní 37, 312 00 Plzeň",
    lat: 49.7507678,
    lng: 13.4300683,
  },
];

export type Service = {
  abbr: string;
  title: string;
  description: string;
  icon: "shield" | "flame" | "hardhat" | "building";
};

export const services: Service[] = [
  {
    abbr: "BOZP",
    title: "Bezpečnost práce",
    description:
      "Nabízíme řešení pro oblast bezpečnosti a ochrany zdraví při práci, hodnocení rizik, kategorizace prací, systém pracovně lékařské péče, systém pro hodnocení a přidělování osobních ochranných pracovních prostředků.",
    icon: "shield",
  },
  {
    abbr: "PO",
    title: "Požární ochrana",
    description:
      "Nabízíme řešení pro zajištění prevence. Právnickým osobám v rozsahu odpovídajícím kvalifikaci požárního nebezpečí, fyzickým osobám navrhneme smysluplné zajištění pro jejich ne/movitý majetek.",
    icon: "flame",
  },
  {
    abbr: "KBOZP",
    title: "Koordinátor BOZP",
    description:
      "Zadavatelům (investorům) nabízíme službu koordinátora BOZP na staveništi. Stavbou vás provedeme jak v přípravné fázi (zpracování projektu), tak ve fázi samotné realizace.",
    icon: "hardhat",
  },
  {
    abbr: "PBS",
    title: "Požární bezpečnost staveb",
    description:
      "Pro vaši stavbu zpracujeme požárně bezpečnostní řešení v požadovaném rozsahu, nikoliv s nadbytečně drahými opatřeními.",
    icon: "building",
  },
];

// Obory, ve kterých máme zkušenosti (z historie týmu).
export const sectors: string[] = [
  "Automotive",
  "Papírenství",
  "Obchod",
  "Strojírenství",
  "Vzdělávání",
  "Dřevozpracující průmysl",
];

export type Client = {
  name: string; // plný název (alt/title)
  logo: string; // cesta do /public
  width: number; // vlastní rozměry loga (kvůli poměru stran)
  height: number;
};

// Vybraní klienti (na základě přímých referencí). Loga stažena z oficiálních
// webů; zobrazovat pouze se souhlasem klienta.
export const clients: Client[] = [
  { name: "Technická správa komunikací hl. m. Prahy", logo: "/images/clients/tsk.svg", width: 64, height: 64 },
  { name: "Technologie hlavního města Prahy", logo: "/images/clients/thmp.svg", width: 319, height: 104 },
  { name: "Institut klinické a experimentální medicíny (IKEM)", logo: "/images/clients/ikem.png", width: 111, height: 97 },
  { name: "OC Nový Smíchov", logo: "/images/clients/novysmichov.svg", width: 111, height: 35 },
  { name: "Správa a údržba silnic Plzeňského kraje", logo: "/images/clients/suspk.png", width: 258, height: 60 },
  { name: "Úřad městského obvodu Plzeň 2", logo: "/images/clients/umo2.png", width: 243, height: 58 },
];

export type Faq = { question: string; answer: string };

// Časté dotazy – viditelné na webu i jako FAQPage schema (pozor: obsah
// musí zůstat shodný s tím, co vidí návštěvník).
export const faqs: Faq[] = [
  {
    question: "Co obsahuje úvodní audit zdarma?",
    answer:
      "Úvodní audit je nezávazná vstupní konzultace, při které zmapujeme stav bezpečnosti práce (BOZP) a požární ochrany (PO) ve vaší firmě nebo na stavbě, upozorníme na nejčastější nedostatky a navrhneme smysluplný rozsah spolupráce. Je zdarma a bez závazku.",
  },
  {
    question: "Kdy musím mít na stavbě koordinátora BOZP?",
    answer:
      "Zadavatel (investor) je povinen určit koordinátora BOZP na staveništi zejména tehdy, působí-li na stavbě současně více zhotovitelů a rozsah prací překročí zákonné limity dle zákona č. 309/2006 Sb. Koordinátora zajistíme v přípravné fázi i po celou dobu realizace.",
  },
  {
    question: "Jaký je rozdíl mezi BOZP a požární ochranou (PO)?",
    answer:
      "BOZP (bezpečnost a ochrana zdraví při práci) se zaměřuje na prevenci pracovních úrazů, hodnocení rizik a pracovní podmínky. Požární ochrana (PO) řeší prevenci vzniku požárů a povinnosti dané zákonem o požární ochraně. Obě oblasti spolu úzce souvisejí a zajišťujeme je společně.",
  },
  {
    question: "Co je požárně bezpečnostní řešení stavby (PBS)?",
    answer:
      "Požárně bezpečnostní řešení je část projektové dokumentace, která stanovuje požadavky na požární bezpečnost stavby – například únikové cesty, odstupové vzdálenosti a rozdělení do požárních úseků. Zpracováváme ho v rozsahu odpovídajícím vaší stavbě, bez zbytečně nákladných opatření.",
  },
  {
    question: "V jakých lokalitách působíte?",
    answer:
      "Sídlíme v Praze a máme kancelář v Plzni, služby v oblasti BOZP, PO, koordinace staveb a PBS ale poskytujeme v celé České republice.",
  },
];

// Telefon zobrazený v horní liště (hlavní kontakt).
export const primaryPhone = people[0].phone;

// Pomůcka: telefon jako tel: odkaz (bez mezer).
export function telHref(phone: string): string {
  return `tel:${phone.replace(/\s+/g, "")}`;
}
