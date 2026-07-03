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

const inputBase =
  "w-full rounded-btn border bg-white px-4 py-3 text-ink transition-colors placeholder:text-muted focus:border-brand focus:outline-none";

export function ContactForm({ className = "" }: { className?: string }) {
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
        className={`rounded-card border border-black/5 bg-surface p-8 text-center ${className}`}
      >
        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand/10 text-brand">
          <IconCheck className="h-6 w-6" />
        </span>
        <h3 className="mt-4 text-xl font-bold text-ink">
          Děkujeme, zpráva odešla
        </h3>
        <p className="mt-2 text-body">Ozveme se vám co nejdříve zpět.</p>
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
      className={`relative rounded-card border border-black/5 bg-surface p-6 sm:p-8 ${className}`}
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
            className="mb-1.5 block text-sm font-semibold text-ink"
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
            className={`${inputBase} ${
              fieldErrors.email ? "border-red-400" : "border-black/10"
            }`}
          />
          {fieldErrors.email && (
            <p className="mt-1 text-xs text-red-600">{fieldErrors.email}</p>
          )}
        </div>

        <div>
          <label
            htmlFor={ids.company}
            className="mb-1.5 block text-sm font-semibold text-ink"
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
            className={`${inputBase} ${
              fieldErrors.company ? "border-red-400" : "border-black/10"
            }`}
          />
          {fieldErrors.company && (
            <p className="mt-1 text-xs text-red-600">{fieldErrors.company}</p>
          )}
        </div>
      </div>

      <div className="mt-5">
        <label
          htmlFor={ids.message}
          className="mb-1.5 block text-sm font-semibold text-ink"
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
          className={`${inputBase} resize-y ${
            fieldErrors.message ? "border-red-400" : "border-black/10"
          }`}
        />
        {fieldErrors.message && (
          <p className="mt-1 text-xs text-red-600">{fieldErrors.message}</p>
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
        <label htmlFor={ids.consent} className="text-sm leading-relaxed text-body">
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
        <p className="mt-1 text-xs text-red-600">{fieldErrors.consent}</p>
      )}

      {status === "error" && message && (
        <p
          role="alert"
          className="mt-4 rounded-btn bg-red-50 px-4 py-3 text-sm text-red-700"
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
