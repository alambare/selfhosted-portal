# SPDX-License-Identifier: Apache-2.0
# Copyright 2026 Aubin Lambaré
def test_whoami_happy_path(client):
    response = client.get(
        "/whoami",
        headers={
            "Remote-User": "alice",
            "Remote-Name": "Alice Doe",
            "Remote-Email": "alice@example.com",
            "Remote-Groups": "family,admins",
        },
    )
    assert response.status_code == 200
    data = response.json()
    assert data["username"] == "alice"
    assert data["displayName"] == "Alice Doe"
    assert data["email"] == "alice@example.com"
    assert data["groups"] == ["family", "admins"]


def test_whoami_missing_user_returns_401(client):
    response = client.get("/whoami")
    assert response.status_code == 401


def test_whoami_empty_groups(client):
    response = client.get(
        "/whoami",
        headers={
            "Remote-User": "bob",
            "Remote-Groups": "",
        },
    )
    assert response.status_code == 200
    assert response.json()["groups"] == []


def test_whoami_groups_are_lowercased(client):
    response = client.get(
        "/whoami",
        headers={
            "Remote-User": "charlie",
            "Remote-Groups": "Family,ADMINS, Media ",
        },
    )
    assert response.json()["groups"] == ["family", "admins", "media"]


def test_whoami_optional_headers_absent(client):
    response = client.get(
        "/whoami",
        headers={"Remote-User": "dave"},
    )
    assert response.status_code == 200
    data = response.json()
    assert data["username"] == "dave"
    assert data["displayName"] is None
    assert data["email"] is None
    assert data["groups"] == []


def test_healthz(client):
    response = client.get("/healthz")
    assert response.status_code == 200
    assert response.json() == {"ok": True}
