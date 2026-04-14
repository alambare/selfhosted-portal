# SPDX-License-Identifier: Apache-2.0
# Copyright 2026 Aubin Lambaré
import os

from fastapi import FastAPI, HTTPException, Request

app = FastAPI(title="Authelia Portal — whoami")


def _env(name: str, default: str) -> str:
    return os.getenv(name, default)


HEADER_USER = _env("HEADER_USER", "Remote-User")
HEADER_NAME = _env("HEADER_NAME", "Remote-Name")
HEADER_EMAIL = _env("HEADER_EMAIL", "Remote-Email")
HEADER_GROUPS = _env("HEADER_GROUPS", "Remote-Groups")
GROUP_SEPARATOR = _env("GROUPS_SEPARATOR", ",")
GROUPS_LOWERCASE = _env("GROUPS_LOWERCASE", "true").lower() == "true"


def parse_groups(raw: str) -> list[str]:
    if not raw:
        return []
    groups = [g.strip() for g in raw.split(GROUP_SEPARATOR) if g.strip()]
    if GROUPS_LOWERCASE:
        groups = [g.lower() for g in groups]
    return groups


@app.get("/whoami")
async def whoami(request: Request):
    username = request.headers.get(HEADER_USER)
    if not username:
        raise HTTPException(status_code=401, detail="unauthorized")
    return {
        "username": username,
        "displayName": request.headers.get(HEADER_NAME),
        "email": request.headers.get(HEADER_EMAIL),
        "groups": parse_groups(request.headers.get(HEADER_GROUPS, "")),
    }


@app.get("/healthz")
async def healthz():
    return {"ok": True}
