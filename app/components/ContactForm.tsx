"use client";

import { useId, useState } from "react";
import type { FormEvent } from "react";
import { PRIVACY_PATH, company } from "@/app/lib/site";
import { IconCheck } from "@/app/components/icons";

type Status = "idle" | "submitting" | "success" | "error";

type ApiResponse = {
  ok?: boolean;
  error?: string;
  errors?: Record<string, string>;
};

const GENERIC_ERROR = `Odeslání se nezdařilo. Zkuste to prosím znovu, nebo nám napište přímo na ${company.email}.`;

type Variant = "light" | "dark";

const theme = {
  light: {
    input:
      "w-full rounded-btn border bg-white px-4 py-3 text-ink transition-colors placeholder:text-muted focus:border-brand focus:outline-none",
    inputBorder: "border-black/10",
    label: "mb-1.5 block text-sm font-semibold text-ink",
    consent: "text-sm leading-relaxed text-body",
    wrapper: "relative rounded-card border border-black/5 bg-surface p-6 sm:p-8",
    successWrapper:
      "rounded-card border border-black/5 bg-surface p-8 text-center",
    successTitle: "mt-4 text-xl font-bold text-ink",
    successBody: "mt-2 text-body",
    errorBox: "mt-4 rounded-btn bg-red-50 px-4 py-3 text-sm text-red-700",
    fieldError: "mt-1 text-xs text-red-600",
  },
  dark: {
    input:
      "w-full rounded-btn border bg-white/5 px-4 py-3 text-white transition-colors placeholder:text-white/40 focus:border-brand focus:outline-none",
    inputBorder: "border-white/15",
    label: "mb-1.5 block text-sm font-semibold text-white/90",
    consent: "text-sm leading-relaxed text-white/70",
    wrapper: "relative rounded-card bg-white/5 p-6 ring-1 ring-white/10 backdrop-blur-sm sm:p-8",
    successWrapper:
      "rounded-card bg-white/5 p-8 text-center ring-1 ring-white/10 backdrop-blur-sm",
    successTitle: "mt-4 text-xl font-bold text-white",
    successBody: "mt-2 text-white/70",
    errorBox: "mt-4 rounded-btn bg-red-500/15 px-4 py-3 text-sm text-red-200",
    fieldError: "mt-1 text-xs text-red-300",
  },
} as const;

export function ContactForm({
  className = "",
  variant = "light",
}: {
  className?: string;
  variant?: Variant;
}) {
  const t = theme[variant];
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const uid = useId();
  const ids = {
    email: `${uid}-email`,
    company: `${uid}-company`,
    message: `${uid}-message`,
    consent: `${uid}-consent`,
  };

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const fd = new FormData(form);

    setStatus("submitting");
    setMessage("");
    setFieldErrors({});

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: fd.get("email"),
          company: fd.get("company"),
          message: fd.get("message"),
          consent: fd.get("consent") === "on",
          website: fd.get("website"), // honeypot
        }),
      });

      const data: ApiResponse = await res.json().catch(() => ({}));

      if (!res.ok || !data.ok) {
        if (data.errors) setFieldErrors(data.errors);
        setStatus("error");
        setMessage(data.error ?? "Zkontrolujte prosím vyplněná pole.");
        return;
      }

      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
      setMessage(GENERIC_ERROR);
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className={`${t.successWrapper} ${className}`}
      >
        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand/10 text-brand">
          <IconCheck className="h-6 w-6" />
        </span>
        <h3 className={t.successTitle}>
          Děkujeme, zpráva odešla
        </h3>
        <p className={t.successBody}>Ozveme se vám co nejdříve zpět.</p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 text-sm font-semibold text-brand hover:underline"
        >
          Odeslat další zprávu
        </button>
      </div>
    );
  }

  const submitting = status === "submitting";

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className={`${t.wrapper} ${className}`}
    >
      {/* Honeypot – skryté pole proti spamu (nevyplňují lidé) */}
      <div
        aria-hidden="true"
        className="absolute left-[-9999px] top-0 h-0 w-0 overflow-hidden"
      >
        <label>
          Nevyplňujte
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
          />
        </label>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor={ids.email}
            className={t.label}
          >
            E-mail <span className="text-brand">*</span>
          </label>
          <input
            id={ids.email}
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="vas@email.cz"
            aria-invalid={Boolean(fieldErrors.email)}
            className={`${t.input} ${
              fieldErrors.email ? "border-red-400" : t.inputBorder
            }`}
          />
          {fieldErrors.email && (
            <p className={t.fieldError}>{fieldErrors.email}</p>
          )}
        </div>

        <div>
          <label
            htmlFor={ids.company}
            className={t.label}
          >
            Název firmy <span className="text-brand">*</span>
          </label>
          <input
            id={ids.company}
            name="company"
            type="text"
            required
            autoComplete="organization"
            placeholder="Vaše firma s.r.o."
            aria-invalid={Boolean(fieldErrors.company)}
            className={`${t.input} ${
              fieldErrors.company ? "border-red-400" : t.inputBorder
            }`}
          />
          {fieldErrors.company && (
            <p className={t.fieldError}>{fieldErrors.company}</p>
          )}
        </div>
      </div>

      <div className="mt-5">
        <label
          htmlFor={ids.message}
          className={t.label}
        >
          Zpráva <span className="text-brand">*</span>
        </label>
        <textarea
          id={ids.message}
          name="message"
          required
          rows={5}
          placeholder="S čím vám můžeme pomoci?"
          aria-invalid={Boolean(fieldErrors.message)}
          className={`${t.input} resize-y ${
            fieldErrors.message ? "border-red-400" : t.inputBorder
          }`}
        />
        {fieldErrors.message && (
          <p className={t.fieldError}>{fieldErrors.message}</p>
        )}
      </div>

      <div className="mt-5 flex items-start gap-3">
        <input
          id={ids.consent}
          name="consent"
          type="checkbox"
          required
          aria-invalid={Boolean(fieldErrors.consent)}
          className="mt-1 h-4 w-4 shrink-0 accent-brand"
        />
        <label htmlFor={ids.consent} className={t.consent}>
          Souhlasím se zpracováním osobních údajů za účelem vyřízení poptávky.
          Více v{" "}
          <a
            href={PRIVACY_PATH}
            className="font-semibold text-brand hover:underline"
          >
            zásadách ochrany osobních údajů
          </a>
          .
        </label>
      </div>
      {fieldErrors.consent && (
        <p className={t.fieldError}>{fieldErrors.consent}</p>
      )}

      {status === "error" && message && (
        <p
          role="alert"
          className={t.errorBox}
        >
          {message}
        </p>
      )}

      <div className="mt-6">
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex w-full items-center justify-center gap-2 rounded-btn bg-brand px-8 py-4 text-base font-semibold text-white transition-colors duration-200 hover:bg-brand-hover disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        >
          {submitting ? "Odesílám…" : "Odeslat poptávku"}
        </button>
      </div>
    </form>
  );
}
