"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";

// Uchovává rozhodnutí uživatele o analytických cookies.
// Skripty (Microsoft Clarity) se načtou POUZE po výslovném souhlasu ("granted").
export type ConsentValue = "granted" | "denied";

const STORAGE_KEY = "fscs-consent";

// --- Jednoduchý externí store nad localStorage (čteno přes useSyncExternalStore) ---
const listeners = new Set<() => void>();

function notify() {
  listeners.forEach((l) => l());
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  // Synchronizace mezi taby.
  window.addEventListener("storage", cb);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", cb);
  };
}

function readConsent(): ConsentValue | null {
  try {
    const v = window.localStorage.getItem(STORAGE_KEY);
    return v === "granted" || v === "denied" ? v : null;
  } catch {
    // localStorage nemusí být dostupné (privátní režim) – bereme jako bez volby
    return null;
  }
}

function writeConsent(value: ConsentValue | null) {
  try {
    if (value === null) {
      window.localStorage.removeItem(STORAGE_KEY);
    } else {
      window.localStorage.setItem(STORAGE_KEY, value);
    }
  } catch {
    // zápis může selhat – tiše ignorujeme
  }
  notify(); // `storage` event se ve vlastním tabu nespouští, řešíme ručně
}

// Detekce hydratace bez efektu: server → false, klient po hydrataci → true.
const noopSubscribe = () => () => {};

type ConsentContextType = {
  /** null = uživatel se ještě nerozhodl (zobrazíme lištu) */
  consent: ConsentValue | null;
  /** false během SSR/hydratace; true až po připojení na klientu */
  ready: boolean;
  accept: () => void;
  reject: () => void;
  /** vynuluje volbu → lišta se zobrazí znovu ("Nastavení cookies") */
  reset: () => void;
};

const ConsentContext = createContext<ConsentContextType | null>(null);

export function ConsentProvider({ children }: { children: ReactNode }) {
  const consent = useSyncExternalStore(subscribe, readConsent, () => null);
  const ready = useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );

  const accept = useCallback(() => writeConsent("granted"), []);
  const reject = useCallback(() => writeConsent("denied"), []);
  const reset = useCallback(() => writeConsent(null), []);

  const value = useMemo<ConsentContextType>(
    () => ({ consent, ready, accept, reject, reset }),
    [consent, ready, accept, reject, reset],
  );

  return (
    <ConsentContext.Provider value={value}>{children}</ConsentContext.Provider>
  );
}

export function useConsent(): ConsentContextType {
  const ctx = useContext(ConsentContext);
  if (!ctx) {
    throw new Error("useConsent musí být použit uvnitř <ConsentProvider>.");
  }
  return ctx;
}
