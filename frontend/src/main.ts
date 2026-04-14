// SPDX-License-Identifier: Apache-2.0
// Copyright 2026 Aubin Lambaré
import "./app.css";
import { mount } from "svelte";
import App from "./App.svelte";

mount(App, { target: document.getElementById("app")! });
