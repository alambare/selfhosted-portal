// SPDX-License-Identifier: Apache-2.0
// Copyright 2026 Aubin Lambaré
import { describe, it, expect, vi, afterEach } from "vitest";
import { fetchIdentity } from "./api";

afterEach(() => {
  vi.restoreAllMocks();
});

describe("fetchIdentity", () => {
  it("resolves with identity on 200", async () => {
    const mockIdentity = {
      username: "alice",
      displayName: "Alice Doe",
      email: "alice@example.com",
      groups: ["family"],
    };
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockIdentity),
      })
    );

    const result = await fetchIdentity();
    expect(result).toEqual(mockIdentity);
  });

  it("throws on non-200 response", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({ ok: false, status: 401 })
    );

    await expect(fetchIdentity()).rejects.toThrow("whoami returned 401");
  });
});
