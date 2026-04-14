<!-- SPDX-License-Identifier: Apache-2.0 -->
<!-- Copyright 2026 Aubin Lambaré -->
<script lang="ts">
  const { name }: { name: string } = $props();

  function colorFor(s: string): string {
    const palette = [
      "#6366f1", "#ec4899", "#14b8a6", "#f59e0b",
      "#10b981", "#3b82f6", "#ef4444", "#8b5cf6",
    ];
    let hash = 0;
    for (let i = 0; i < s.length; i++) hash = s.charCodeAt(i) + ((hash << 5) - hash);
    return palette[Math.abs(hash) % palette.length];
  }

  const letter = $derived(name.charAt(0).toUpperCase());
  const bg = $derived(colorFor(name));
</script>

<span class="avatar" style="background:{bg}" aria-hidden="true">{letter}</span>

<style>
  .avatar {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 3rem;
    height: 3rem;
    border-radius: 0.75rem;
    font-size: 1.4rem;
    font-weight: 700;
    color: white;
    flex-shrink: 0;
    user-select: none;
  }
</style>
