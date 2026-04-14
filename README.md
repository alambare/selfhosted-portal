# Portal — aubinina.eu

[![License](https://img.shields.io/badge/license-Apache%202.0-blue.svg)](LICENSE)

Stateless self-hosted home portal behind Authelia forward-auth.  
The reverse proxy injects `Remote-User/Name/Email/Groups` headers; the FastAPI `/whoami` endpoint reads them and the Svelte SPA filters tiles by group.

## Dev

```bash
make dev-local        # no containers — Vite HMR on :5173 with fake headers
make dev-rebuild      # full container stack (podman compose up --build)
make test             # pytest + vitest
```

Override the fake identity:
```bash
FAKE_REMOTE_USER=bob FAKE_REMOTE_NAME="Bob Smith" FAKE_REMOTE_GROUPS=family make dev-local
```

## Catalog

Edit `frontend/public/catalog.json` — volume-mounted, no rebuild needed.

```jsonc
{
  "apps": [
    {
      "id": "myapp",
      "name": "My App",
      "description": "...",
      "url": "https://...",
      "icon": "/icons/myapp.svg",  // letter-avatar fallback if omitted
      "groups": [],                // [] = everyone; ["admin"] = admins only
      "tags": ["new"]              // optional: new | deprecated
    }
  ]
}
```

---

© 2026 Aubin Lambaré — [Apache License 2.0](LICENSE)
