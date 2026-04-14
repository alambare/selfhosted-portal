<!-- SPDX-License-Identifier: Apache-2.0 -->
<!-- Copyright 2026 Aubin Lambaré -->
<script lang="ts">
  import LetterAvatar from "./LetterAvatar.svelte";
  import type { App } from "../types";
  import { t } from "../i18n.svelte";

  const { app }: { app: App } = $props();

  const ariaLabel = $derived(
    app.tags && app.tags.length > 0
      ? `${app.name} — ${app.tags.map(tag => t().tag[tag] ?? tag).join(", ")}`
      : app.name
  );
</script>

<a
  href={app.url}
  target="_blank"
  rel="noopener noreferrer"
  class="card"
  aria-label={ariaLabel}
>
  <div class="icon-wrap">
    {#if app.icon}
      <img
        src={app.icon}
        alt=""
        width="48"
        height="48"
        onerror={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
      />
    {:else}
      <LetterAvatar name={app.name} />
    {/if}
  </div>

  <div class="info">
    <span class="name">{app.name}</span>
    <span class="desc">{app.description}</span>
  </div>

  {#if app.tags && app.tags.length > 0}
    <div class="tags">
      {#each app.tags as tag}
        <span class="tag tag--{tag}" aria-label={t().tag[tag] ?? tag}>{t().tag[tag] ?? tag}</span>
      {/each}
    </div>
  {/if}
</a>

<style>
  .card {
    position: relative;
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1.1rem 1.25rem;
    background: var(--color-surface);
    border-radius: var(--radius-card);
    box-shadow: var(--shadow-card);
    transition: box-shadow var(--transition), transform var(--transition), background var(--transition);
    cursor: pointer;
    outline-offset: 3px;
  }

  .card:hover {
    box-shadow: var(--shadow-card-h);
    transform: translateY(-2px);
    background: var(--color-surface-hover);
  }

  .card:focus-visible {
    outline: 2px solid var(--color-accent);
  }

  .icon-wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: 3rem;
    height: 3rem;
    border-radius: 0.75rem;
    overflow: hidden;
  }

  .icon-wrap img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .info {
    display: flex;
    flex-direction: column;
    gap: 0.15rem;
    min-width: 0;
    flex: 1;
  }

  .name {
    font-weight: 600;
    font-size: 0.95rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .desc {
    font-size: 0.78rem;
    color: var(--color-text-muted);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .tags {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    flex-shrink: 0;
  }

  .tag {
    font-size: 0.6rem;
    font-weight: 700;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    padding: 0.15em 0.5em;
    border-radius: var(--radius-badge);
    color: white;
    background: var(--color-accent);
  }

  .tag--new        { background: #10b981; }
  .tag--deprecated { background: #f59e0b; }
</style>
