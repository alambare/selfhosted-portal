// SPDX-License-Identifier: Apache-2.0
// Copyright 2026 Aubin Lambaré

/** Known tag values — more can be added in catalog.json freely */
export type AppTag = "new" | "deprecated" | (string & Record<never, never>);

export interface App {
  id: string;
  name: string;
  description: string;
  url: string;
  icon: string;
  /** Empty array means visible to everyone */
  groups: string[];
  /** Optional decorative flags — does not affect visibility or interactivity */
  tags?: AppTag[];
}

export interface AppCatalog {
  apps: App[];
}

export interface Identity {
  username: string;
  displayName: string | null;
  email: string | null;
  groups: string[];
}
