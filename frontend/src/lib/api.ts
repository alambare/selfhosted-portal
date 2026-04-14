// SPDX-License-Identifier: Apache-2.0
// Copyright 2026 Aubin Lambaré
import type { Identity } from "./types";

export async function fetchIdentity(): Promise<Identity> {
  const res = await fetch("/whoami");
  if (!res.ok) {
    throw new Error(`whoami returned ${res.status}`);
  }
  return res.json() as Promise<Identity>;
}
