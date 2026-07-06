.PHONY: dev dev-frontend dev-backend install lint test build clean docker-up docker-down

# ============================================================
# Development
# ============================================================

dev: ## Start both frontend and backend in development mode
	@echo "Starting CareerPilot AI..."
	@make -j2 dev-frontend dev-backend

dev-frontend: ## Start frontend dev server
	cd frontend && npm run dev

dev-backend: ## Start backend dev server
	cd backend && uvicorn app.main:app --reload --port 8000

# ============================================================
# Installation
# ============================================================

install: ## Install all dependencies
	cd frontend && npm install
	cd backend && pip install -r requirements.txt

install-frontend: ## Install frontend dependencies
	cd frontend && npm install

install-backend: ## Install backend dependencies
	cd backend && pip install -r requirements.txt

# ============================================================
# Quality
# ============================================================

lint: ## Run linters
	cd frontend && npm run lint
	cd backend && ruff check app/

lint-fix: ## Fix lint issues
	cd frontend && npm run lint --fix
	cd backend && ruff check app/ --fix

type-check: ## Run type checking
	cd frontend && npm run type-check

test: ## Run all tests
	cd frontend && npm run test
	cd backend && pytest tests/ -v

test-frontend: ## Run frontend tests
	cd frontend && npm run test

test-backend: ## Run backend tests
	cd backend && pytest tests/ -v

# ============================================================
# Build
# ============================================================

build: ## Build for production
	cd frontend && npm run build

# ============================================================
# Docker
# ============================================================

docker-up: ## Start with Docker Compose
	docker compose up --build

docker-down: ## Stop Docker Compose
	docker compose down

docker-clean: ## Remove all Docker artifacts
	docker compose down -v --rmi all

# ============================================================
# Utilities
# ============================================================

clean: ## Clean build artifacts
	rm -rf frontend/.next frontend/node_modules
	rm -rf backend/__pycache__ backend/.pytest_cache

help: ## Show this help
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'

.DEFAULT_GOAL := help
