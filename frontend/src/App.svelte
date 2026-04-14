<!-- SPDX-License-Identifier: Apache-2.0 -->
<!-- Copyright 2026 Aubin Lambaré -->
<script lang="ts">
  import { onMount } from "svelte";
  import Header from "./lib/components/Header.svelte";
  import AppGrid from "./lib/components/AppGrid.svelte";
  import AccountPanel from "./lib/components/AccountPanel.svelte";
  import { fetchIdentity } from "./lib/api";
  import { t, locale } from "./lib/i18n.svelte";
  import type { Identity, App, AppCatalog } from "./lib/types";


  let identity = $state<Identity | null>(null);
  let apps = $state<App[]>([]);
  let error = $state<string | null>(null);
  let accountOpen = $state(false);

  function visibleApps(allApps: App[], userGroups: string[]): App[] {
    return allApps.filter((app) => {
      if (app.groups.length === 0) return true;
      return app.groups.some((g) => userGroups.includes(g));
    });
  }

  const filteredApps = $derived(
    identity ? visibleApps(apps, identity.groups) : []
  );

  onMount(async () => {
    try {
      const [id, catalog] = await Promise.all([
        fetchIdentity(),
        fetch("/catalog.json").then((r) => r.json() as Promise<AppCatalog>),
      ]);
      identity = id;
      apps = catalog.apps;
    } catch (e) {
      error = e instanceof Error ? e.message : "Failed to load";
    }
  });

  // Keep <html lang> in sync with selected locale
  $effect(() => {
    document.documentElement.lang = locale.current;
  });
</script>

<Header {identity} onAccountClick={() => (accountOpen = true)} />

<main class="main">
  {#if error}
    <div class="error" role="alert" aria-live="assertive">
      <span aria-hidden="true">⚠</span> {error}
    </div>
  {:else if identity === null}
    <div class="loading" aria-live="polite">
      <span class="spinner" aria-hidden="true"></span>
      <span class="sr-only">{t().loading}</span>
    </div>
  {:else}
    <div class="welcome">
      <h1>
        <span class="greeting">{t().greeting},</span>
        <span class="name">{identity.displayName ?? identity.username}</span>
      </h1>
      <p>{t().yourApplications}</p>
    </div>
    <AppGrid apps={filteredApps} />
  {/if}
</main>

{#if accountOpen && identity}
  <AccountPanel {identity} onclose={() => (accountOpen = false)} />
{/if}

<style>
  .main {
    max-width: 1400px;
    margin: 0 auto;
    padding: 2rem 1.5rem 4rem;
  }

  .welcome {
    margin-bottom: 1.75rem;
  }

  .welcome h1 {
    font-size: clamp(1.4rem, 3vw, 2rem);
    font-weight: 700;
    letter-spacing: -0.02em;
    line-height: 1.3;
    margin-bottom: 0.25rem;
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    gap: 0.35em;
  }

  .greeting {
    font-size: 0.85em;
    font-weight: 400;
    color: var(--color-text-muted);
    letter-spacing: 0;
  }

  .name {
    font-weight: 700;
    color: var(--color-text);
  }

  .welcome p {
    font-size: 0.9rem;
    color: var(--color-text-muted);
  }

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip: rect(0 0 0 0);
  }

  .loading {
    display: flex;
    justify-content: center;
    padding: 6rem 0;
  }

  .spinner {
    width: 2.5rem;
    height: 2.5rem;
    border: 3px solid var(--color-border);
    border-top-color: var(--color-accent);
    border-radius: 50%;
    animation: spin 0.7s linear infinite;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  .error {
    display: flex;
    justify-content: center;
    padding: 4rem 1rem;
    color: #ef4444;
    font-size: 1rem;
    font-weight: 500;
  }
</style>
