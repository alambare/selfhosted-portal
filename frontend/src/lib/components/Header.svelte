<!-- SPDX-License-Identifier: Apache-2.0 -->
<!-- Copyright 2026 Aubin Lambaré -->
<script lang="ts">
  import LetterAvatar from "./LetterAvatar.svelte";
  import type { Identity } from "../types";
  import { t, locale, setLocale, LOCALES } from "../i18n.svelte";

  const {
    identity,
    onAccountClick,
  }: {
    identity: Identity | null;
    onAccountClick: () => void;
  } = $props();

  const displayName = $derived(
    identity ? (identity.displayName ?? identity.username) : ""
  );
</script>

<header class="header">
  <div class="brand">
    <img src="/favicon.svg" alt="" width="32" height="32" class="brand-icon" />
    <span class="brand-name">aubinina.eu</span>
  </div>

  <div class="right">
    <div class="locale-switcher" role="group" aria-label="Language">
      {#each LOCALES as loc}
        <button
          class="locale-btn"
          class:active={locale.current === loc.code}
          onclick={() => setLocale(loc.code)}
          aria-pressed={locale.current === loc.code}
        >{loc.label}</button>
      {/each}
    </div>

    {#if identity}
      <button class="account-btn" onclick={onAccountClick} aria-label={t().openAccount}>
        <LetterAvatar name={displayName} />
      </button>
    {/if}
  </div>
</header>

<style>
  .header {
    position: sticky;
    top: 0;
    z-index: 30;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.75rem 1.5rem;
    background: color-mix(in srgb, var(--color-bg) 85%, transparent);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid var(--color-border);
  }

  .brand {
    display: flex;
    align-items: center;
    gap: 0.6rem;
  }

  .brand-icon {
    border-radius: 0.5rem;
  }

  .brand-name {
    font-weight: 700;
    font-size: 1.05rem;
    letter-spacing: -0.01em;
  }

  .right {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .locale-switcher {
    display: flex;
    gap: 0.15rem;
    background: var(--color-surface);
    border-radius: 0.5rem;
    padding: 0.2rem;
    border: 1px solid var(--color-border);
  }

  .locale-btn {
    font-size: 0.7rem;
    font-weight: 600;
    letter-spacing: 0.04em;
    padding: 0.2em 0.55em;
    border-radius: 0.3rem;
    color: var(--color-text-muted);
    transition: background var(--transition), color var(--transition);
  }

  .locale-btn.active {
    background: var(--color-accent);
    color: white;
  }

  .locale-btn:not(.active):hover {
    background: var(--color-border);
    color: var(--color-text);
  }

  .account-btn {
    border-radius: 0.75rem;
    overflow: hidden;
    transition: opacity var(--transition), transform var(--transition);
  }

  .account-btn:hover {
    opacity: 0.85;
    transform: scale(1.05);
  }

  .account-btn:focus-visible {
    outline: 2px solid var(--color-accent);
    outline-offset: 2px;
  }
</style>
