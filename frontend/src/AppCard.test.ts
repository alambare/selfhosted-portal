// SPDX-License-Identifier: Apache-2.0
// Copyright 2026 Aubin Lambaré
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/svelte";
import AppCard from "./lib/components/AppCard.svelte";
import type { App } from "./lib/types";

const baseApp: App = {
  id: "test",
  name: "TestApp",
  description: "A test app",
  url: "https://example.com",
  icon: "",
  groups: [],
};

describe("AppCard", () => {
  it("renders app name and description", () => {
    render(AppCard, { props: { app: baseApp } });
    expect(screen.getByText("TestApp")).toBeTruthy();
    expect(screen.getByText("A test app")).toBeTruthy();
  });

  it("links to the correct URL", () => {
    render(AppCard, { props: { app: baseApp } });
    const link = screen.getByRole("link");
    expect(link.getAttribute("href")).toBe("https://example.com");
  });

  it("opens in a new tab", () => {
    render(AppCard, { props: { app: baseApp } });
    const link = screen.getByRole("link");
    expect(link.getAttribute("target")).toBe("_blank");
  });

  it("shows a tag badge when tags are set", () => {
    const taggedApp: App = { ...baseApp, tags: ["new"] };
    render(AppCard, { props: { app: taggedApp } });
    expect(screen.getByText("New")).toBeTruthy();
  });

  it("shows no badge when no tags", () => {
    render(AppCard, { props: { app: baseApp } });
    expect(screen.queryByText("New")).toBeNull();
  });
});
