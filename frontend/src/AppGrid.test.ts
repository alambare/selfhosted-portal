// SPDX-License-Identifier: Apache-2.0
// Copyright 2026 Aubin Lambaré
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/svelte";
import AppGrid from "./lib/components/AppGrid.svelte";
import type { App } from "./lib/types";

const mkApp = (id: string, groups: string[] = []): App => ({
  id,
  name: id,
  description: "",
  url: "https://example.com",
  icon: "",
  groups,
});

describe("AppGrid", () => {
  it("renders all apps passed to it", () => {
    const apps = [mkApp("Immich"), mkApp("Nextcloud")];
    render(AppGrid, { props: { apps } });
    expect(screen.getByText("Immich")).toBeTruthy();
    expect(screen.getByText("Nextcloud")).toBeTruthy();
  });

  it("renders nothing when apps list is empty", () => {
    render(AppGrid, { props: { apps: [] } });
    expect(screen.queryAllByRole("link")).toHaveLength(0);
  });
});
