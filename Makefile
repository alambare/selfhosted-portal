# ─────────────────────────────────────────────────────────────────────────────
# Portal – development helpers
#
# Usage:
#   make setup           Install all local deps
#   make dev             Start local stack on http://localhost:8080
#   make test            Run all tests
#   make lint            Run all linters
#   make build           Build OCI images locally
#
# Override defaults:
#   COMPOSE=docker compose make dev
#   REGISTRY=ghcr.io/myorg TAG=v1.2.3 make push
# ─────────────────────────────────────────────────────────────────────────────

COMPOSE  ?= podman compose
REGISTRY ?= ghcr.io/alambare/selfhosted-portal
TAG      ?= dev

.DEFAULT_GOAL := help

.PHONY: help \
        setup setup-backend setup-frontend \
        dev down \
        lint lint-backend lint-frontend \
        test test-backend test-frontend \
        build push \
        clean

# ── Help ──────────────────────────────────────────────────────────────────────

help: ## Show this help
	@awk 'BEGIN{FS=":.*##"; printf "\nUsage:\n  make \033[36m<target>\033[0m\n\nTargets:\n"} \
	     /^[a-zA-Z_-]+:.*##/{printf "  \033[36m%-22s\033[0m %s\n",$$1,$$2}' $(MAKEFILE_LIST)

# ── Setup ─────────────────────────────────────────────────────────────────────

setup-backend: ## Create backend venv and install dev deps
	[ -d backend/.venv ] || uv venv backend/.venv
	uv pip install --python backend/.venv/bin/python --quiet -e "./backend[dev]"

setup-frontend: ## Install frontend npm deps
	npm --prefix frontend ci

setup: setup-backend setup-frontend ## Install all local dev deps

# ── Local dev ─────────────────────────────────────────────────────────────────

dev: ## Start local dev stack (http://localhost:8080)
	$(COMPOSE) up --build

dev-rebuild: ## Force full image rebuild then start stack (use after Dockerfile changes)
	$(COMPOSE) build --no-cache
	$(COMPOSE) up

dev-local: ## Run backend + frontend without containers (http://localhost:5173)
	@echo "Backend → http://localhost:8080  |  Frontend → http://localhost:5173"
	@trap 'kill 0' EXIT INT TERM; \
	  backend/.venv/bin/uvicorn --app-dir backend main:app --host 127.0.0.1 --port 8080 & \
	  npm --prefix frontend run dev

down: ## Stop and remove local dev stack
	$(COMPOSE) down

# ── Lint ──────────────────────────────────────────────────────────────────────

lint-backend: ## Lint backend (ruff)
	cd backend && .venv/bin/ruff check .

lint-frontend: ## Type-check frontend (tsc --noEmit)
	npm --prefix frontend exec -- tsc --noEmit

lint: lint-backend lint-frontend ## Run all linters

# ── Test ──────────────────────────────────────────────────────────────────────

test-backend: ## Run backend tests (pytest)
	cd backend && .venv/bin/python -m pytest -v

test-frontend: ## Run frontend tests (vitest --run)
	npm --prefix frontend test -- --run

test: test-backend test-frontend ## Run all tests

# ── Build & push ──────────────────────────────────────────────────────────────

build: ## Build OCI images locally (context = repo root)
	podman build -f docker/backend.Dockerfile  -t $(REGISTRY)/portal-backend:$(TAG)  .
	podman build -f docker/frontend.Dockerfile -t $(REGISTRY)/portal-frontend:$(TAG) .

push: build ## Build and push images to the registry
	podman push $(REGISTRY)/portal-backend:$(TAG)
	podman push $(REGISTRY)/portal-frontend:$(TAG)

# ── Clean ─────────────────────────────────────────────────────────────────────

clean: ## Remove generated artefacts and local venvs
	rm -rf backend/.venv backend/__pycache__ backend/*.egg-info
	rm -rf frontend/node_modules frontend/dist
