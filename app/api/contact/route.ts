import { NextResponse } from "next/server";
import { Resend } from "resend";
import { company } from "@/app/lib/site";

// Kontaktní formulář: přijme JSON, ověří vstup a odešle e-mail přes Resend.
// POST se nikdy necachuje (výchozí chování route handlerů).

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Payload = {
  email?: unknown;
  company?: unknown;
  message?: unknown;
  consent?: unknown;
  website?: unknown; // honeypot – smí být jen prázdné
};

function str(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: Request) {
  let body: Payload;
  try {
    body = (await request.json()) as Payload;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Neplatný požadavek." },
      { status: 400 },
    );
  }

  // Honeypot: skryté pole, které vyplní jen boti. Tváříme se úspěšně,
  // ať spam nedostane zpětnou vazbu, ale e-mail neodesíláme.
  if (str(body.website)) {
    return NextResponse.json({ ok: true });
  }

  const email = str(body.email);
  const companyName = str(body.company);
  const message = str(body.message);
  const consent = body.consent === true;

  const errors: Record<string, string> = {};
  if (!EMAIL_RE.test(email) || email.length > 254) {
    errors.email = "Zadejte platný e-mail.";
  }
  if (companyName.length < 2 || companyName.length > 200) {
    errors.company = "Zadejte název firmy.";
  }
  if (message.length < 10 || message.length > 5000) {
    errors.message = "Zpráva musí mít alespoň 10 znaků.";
  }
  if (!consent) {
    errors.consent = "Bez souhlasu vás nemůžeme kontaktovat.";
  }
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[contact] Chybí RESEND_API_KEY v prostředí.");
    return NextResponse.json(
      {
        ok: false,
        error: `Formulář zatím není nakonfigurován. Napište nám prosím přímo na ${company.email}.`,
      },
      { status: 500 },
    );
  }

  const resend = new Resend(apiKey);
  const to = process.env.CONTACT_TO || company.email;
  const from = process.env.CONTACT_FROM || "onboarding@resend.dev";

  const text = [
    "Nová poptávka z webu fscs.cz",
    "",
    `Firma:  ${companyName}`,
    `E-mail: ${email}`,
    "",
    "Zpráva:",
    message,
  ].join("\n");

  try {
    const { error } = await resend.emails.send({
      from,
      to: [to],
      replyTo: email,
      subject: `Poptávka z webu – ${companyName}`,
      text,
    });

    if (error) {
      console.error("[contact] Resend error:", error);
      return NextResponse.json(
        { ok: false, error: "Odeslání se nezdařilo. Zkuste to prosím znovu." },
        { status: 502 },
      );
    }
  } catch (err) {
    console.error("[contact] Neočekávaná chyba:", err);
    return NextResponse.json(
      { ok: false, error: "Odeslání se nezdařilo. Zkuste to prosím znovu." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
