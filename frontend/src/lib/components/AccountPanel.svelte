<!-- SPDX-License-Identifier: Apache-2.0 -->
<!-- Copyright 2026 Aubin Lambaré -->
<script lang="ts">
  import { tick } from "svelte";
  import LetterAvatar from "./LetterAvatar.svelte";
  import type { Identity } from "../types";
  import { t } from "../i18n.svelte";

  const { identity, onclose }: { identity: Identity; onclose: () => void } = $props();

  const displayName = $derived(identity.displayName ?? identity.username);
  const logoutUrl = "https://auth.aubinina.eu/logout";

  let closeBtn = $state<HTMLButtonElement | null>(null);

  // Move focus to the close button when the panel opens
  $effect(() => {
    tick().then(() => closeBtn?.focus());
  });

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === "Escape") onclose();
  }
</script>

<svelte:window onkeydown={handleKeydown} />

<!-- Backdrop -->
<button class="backdrop" onclick={onclose} aria-hidden="true" tabindex="-1"></button>

<div
  class="panel"
  role="dialog"
  aria-modal="true"
  aria-label={t().openAccount}
>
  <header class="panel-header">
    <LetterAvatar name={displayName} />
    <div class="user-info">
      <span class="display-name">{displayName}</span>
      {#if identity.email}
        <span class="email">{identity.email}</span>
      {/if}
    </div>
    <button bind:this={closeBtn} class="close-btn" onclick={onclose} aria-label={t().close}>✕</button>
  </header>

  {#if identity.groups.length > 0}
    <div class="groups-section">
      <span class="section-label" id="groups-label">{t().groups}</span>
      <div class="groups" role="list" aria-labelledby="groups-label">
        {#each identity.groups as group}
          <span class="group-chip" role="listitem">{group}</span>
        {/each}
      </div>
    </div>
  {/if}

  <footer class="panel-footer">
    <a href={logoutUrl} class="logout-btn">{t().signOut}</a>
  </footer>
</div>

<style>
  .backdrop {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(2px);
    z-index: 40;
    border: none;
    cursor: default;
  }

  .panel {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    width: min(320px, 90vw);
    background: var(--color-surface);
    border-left: 1px solid var(--color-border);
    z-index: 50;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    padding: 1.5rem;
    box-shadow: -8px 0 32px rgba(0, 0, 0, 0.15);
    animation: slide-in 200ms ease;
  }

  @keyframes slide-in {
    from { transform: translateX(100%); }
    to   { transform: translateX(0); }
  }

  .panel-header {
    display: flex;
    align-items: center;
    gap: 0.875rem;
  }

  .user-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.1rem;
    overflow: hidden;
  }

  .display-name {
    font-weight: 600;
    font-size: 0.975rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .email {
    font-size: 0.78rem;
    color: var(--color-text-muted);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .close-btn {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2rem;
    height: 2rem;
    border-radius: 0.5rem;
    font-size: 0.85rem;
    color: var(--color-text-muted);
    transition: background var(--transition), color var(--transition);
  }

  .close-btn:hover {
    background: var(--color-surface-hover);
    color: var(--color-text);
  }

  .groups-section {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .section-label {
    font-size: 0.72rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--color-text-muted);
  }

  .groups {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
  }

  .group-chip {
    font-size: 0.75rem;
    font-weight: 500;
    padding: 0.2em 0.65em;
    border-radius: 999px;
    background: color-mix(in srgb, var(--color-accent) 15%, transparent);
    color: var(--color-accent);
    border: 1px solid color-mix(in srgb, var(--color-accent) 30%, transparent);
  }

  .panel-footer {
    margin-top: auto;
  }

  .logout-btn {
    display: block;
    width: 100%;
    padding: 0.7rem 1rem;
    border-radius: 0.625rem;
    background: color-mix(in srgb, #ef4444 12%, transparent);
    color: #ef4444;
    font-weight: 600;
    font-size: 0.875rem;
    text-align: center;
    border: 1px solid color-mix(in srgb, #ef4444 25%, transparent);
    transition: background var(--transition);
  }

  .logout-btn:hover {
    background: color-mix(in srgb, #ef4444 20%, transparent);
  }
</style>
