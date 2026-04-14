<!-- SPDX-License-Identifier: Apache-2.0 -->
<!-- Copyright 2026 Aubin Lambaré -->
<script lang="ts">
  import AppCard from "./AppCard.svelte";
  import type { App } from "../types";
  import { t } from "../i18n.svelte";

  const { apps }: { apps: App[] } = $props();
</script>

<section class="grid" aria-label={t().yourApplications}>
  {#each apps as app (app.id)}
    <AppCard {app} />
  {/each}
</section>

<style>
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(min(100%, 260px), 1fr));
    gap: 1rem;
    width: 100%;
  }

  @media (min-width: 1600px) {
    .grid {
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    }
  }
</style>
