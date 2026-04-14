# SPDX-License-Identifier: Apache-2.0
# Copyright 2026 Aubin Lambaré
import pytest
from fastapi.testclient import TestClient
from main import app


@pytest.fixture
def client():
    with TestClient(app) as c:
        yield c
