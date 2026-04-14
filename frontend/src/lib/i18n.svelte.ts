// SPDX-License-Identifier: Apache-2.0
// Copyright 2026 Aubin Lambaré
export type Locale = "en" | "fr" | "hr";

// ── Translations ──────────────────────────────────────────────────────────────

const messages = {
  en: {
    greeting:         "Welcome",
    yourApplications: "Your applications",
    loading:          "Loading…",
    loadError:        "Failed to load",
    signOut:          "Sign out",
    groups:           "Groups",
    close:            "Close",
    openAccount:      "Account",
    tag: {
      new:        "New",
      deprecated: "Deprecated",
    } as Record<string, string>,
  },
  fr: {
    greeting:         "Bienvenue",
    yourApplications: "Vos applications",
    loading:          "Chargement…",
    loadError:        "Échec du chargement",
    signOut:          "Se déconnecter",
    groups:           "Groupes",
    close:            "Fermer",
    openAccount:      "Mon compte",
    tag: {
      new:        "Nouveau",
      deprecated: "Obsolète",
    } as Record<string, string>,
  },
  hr: {
    greeting:         "Dobrodošli",
    yourApplications: "Vaše aplikacije",
    loading:          "Učitavanje…",
    loadError:        "Greška pri učitavanju",
    signOut:          "Odjava",
    groups:           "Grupe",
    close:            "Zatvori",
    openAccount:      "Račun",
    tag: {
      new:        "Novo",
      deprecated: "Zastarjelo",
    } as Record<string, string>,
  },
} as const satisfies Record<string, {
  greeting: string;
  yourApplications: string;
  loading: string;
  loadError: string;
  signOut: string;
  groups: string;
  close: string;
  openAccount: string;
  tag: Record<string, string>;
}>;

// ── Auto-detect from browser ──────────────────────────────────────────────────

function detectLocale(): Locale {
  if (typeof navigator === "undefined") return "en";
  const lang = navigator.language?.split("-")[0] ?? "en";
  if (lang === "fr") return "fr";
  if (lang === "hr") return "hr";
  return "en";
}

// ── Reactive state (module-level $state in .svelte.ts) ────────────────────────

export const locale = $state({ current: detectLocale() });

export function setLocale(l: Locale) {
  locale.current = l;
}

/** Reactive accessor — call t() inside template / $derived to get current translations */
export function t() {
  return messages[locale.current];
}

export const LOCALES: { code: Locale; label: string }[] = [
  { code: "en", label: "EN" },
  { code: "fr", label: "FR" },
  { code: "hr", label: "HR" },
];
