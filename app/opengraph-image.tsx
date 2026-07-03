import { ImageResponse } from "next/og";

// Statický OG náhled (1200×630) pro sdílení na sítích a v messengerech.
// Generuje se za buildu a cachuje.

export const alt =
  "Fire & Safety Consulting – BOZP, PO, KBOZP a PBS. Úvodní audit zdarma.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const NAME = "Fire & Safety Consulting";
const HEADLINE = "Požární bezpečnost a bezpečnost práce";
const CHIPS = "BOZP · PO · KBOZP · PBS";
const FOOTER = "Úvodní audit zdarma · Praha & Plzeň · fscs.cz";
const BADGE = "F&S";

// Načte Poppins z Google Fonts jako TTF (starý User-Agent → truetype),
// subset omezený na použité znaky kvůli velikosti a diakritice.
async function loadPoppins(
  weight: 500 | 700,
): Promise<ArrayBuffer | null> {
  try {
    const text = encodeURIComponent(NAME + HEADLINE + CHIPS + FOOTER + BADGE);
    const cssUrl = `https://fonts.googleapis.com/css2?family=Poppins:wght@${weight}&text=${text}`;
    const css = await fetch(cssUrl, {
      headers: { "User-Agent": "Mozilla/4.0 (compatible; MSIE 6.0)" },
    }).then((res) => res.text());
    const match = css.match(/src:\s*url\((https:\/\/[^)]+)\)\s*format\('truetype'\)/);
    if (!match) return null;
    return await fetch(match[1]).then((res) => res.arrayBuffer());
  } catch {
    return null;
  }
}

export default async function Image() {
  const [regular, bold] = await Promise.all([loadPoppins(500), loadPoppins(700)]);

  const fonts = [
    regular && {
      name: "Poppins",
      data: regular,
      weight: 500 as const,
      style: "normal" as const,
    },
    bold && {
      name: "Poppins",
      data: bold,
      weight: 700 as const,
      style: "normal" as const,
    },
  ].filter(Boolean) as {
    name: string;
    data: ArrayBuffer;
    weight: 500 | 700;
    style: "normal";
  }[];

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          backgroundColor: "#1a1a37",
          backgroundImage:
            "radial-gradient(circle at 85% 12%, rgba(242,147,34,0.28), rgba(26,26,55,0) 46%)",
          fontFamily: "Poppins, sans-serif",
        }}
      >
        {/* Značka */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "88px",
              height: "88px",
              borderRadius: "22px",
              backgroundColor: "#f29322",
              color: "#1a1a37",
              fontSize: "38px",
              fontWeight: 700,
            }}
          >
            {BADGE}
          </div>
          <div
            style={{
              display: "flex",
              marginLeft: "26px",
              color: "#ffffff",
              fontSize: "36px",
              fontWeight: 700,
            }}
          >
            {NAME}
          </div>
        </div>

        {/* Nadpis */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              color: "#ffffff",
              fontSize: "68px",
              fontWeight: 700,
              lineHeight: 1.08,
              letterSpacing: "-1px",
              maxWidth: "920px",
            }}
          >
            {HEADLINE}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: "28px",
              color: "#f6a545",
              fontSize: "34px",
              fontWeight: 700,
              letterSpacing: "3px",
            }}
          >
            {CHIPS}
          </div>
        </div>

        {/* Patička */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            color: "#c9c9d6",
            fontSize: "29px",
            fontWeight: 500,
          }}
        >
          {FOOTER}
        </div>
      </div>
    ),
    { ...size, fonts: fonts.length ? fonts : undefined },
  );
}
