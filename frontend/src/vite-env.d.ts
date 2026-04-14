// SPDX-License-Identifier: Apache-2.0
// Copyright 2026 Aubin Lambaré
/// <reference types="vite/client" />

// Teach TypeScript how to resolve *.svelte imports when running tsc --noEmit.
// Vitest/Vite handle the real transforms; this only provides editor types.
declare module "*.svelte" {
  const component: import("svelte").Component<Record<string, unknown>>;
  export default component;
}
