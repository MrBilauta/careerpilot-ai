# Contributing to CareerPilot AI

Thank you for your interest in contributing to CareerPilot AI! 🚀

This guide will help you get started with contributing to the project.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Project Structure](#project-structure)
- [Making Changes](#making-changes)
- [Commit Convention](#commit-convention)
- [Pull Request Process](#pull-request-process)
- [Coding Standards](#coding-standards)
- [Need Help?](#need-help)

## Code of Conduct

Please read and follow our [Code of Conduct](CODE_OF_CONDUCT.md) to help us maintain a welcoming and inclusive community.

## Getting Started

### Finding Issues

- 🏷 **Good First Issues**: Look for [`good first issue`](https://github.com/careerpilot-ai/careerpilot-ai/labels/good%20first%20issue) labels — perfect for newcomers
- 🔍 **Help Wanted**: Check [`help wanted`](https://github.com/careerpilot-ai/careerpilot-ai/labels/help%20wanted) for tasks that need contributors
- 💡 **Feature Requests**: Browse [`enhancement`](https://github.com/careerpilot-ai/careerpilot-ai/labels/enhancement) to find features to implement

### Before You Start

1. Check if an issue already exists for your proposed change
2. If not, create one to discuss before starting work
3. Wait for a maintainer to assign the issue to you

## Development Setup

### Prerequisites

- **Node.js** 18+
- **Python** 3.12+
- **Docker** (optional, recommended)
- **Git**

### Quick Setup

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/careerpilot-ai.git
cd careerpilot-ai

# Option 1: Docker (recommended)
docker compose up --build

# Option 2: Manual setup
# Backend
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000

# Frontend (new terminal)
cd frontend
npm install
npm run dev
```

### Environment Variables

```bash
cp frontend/.env.example frontend/.env.local
cp backend/.env.example backend/.env
```

See [README.md](README.md#environment-variables) for all required variables.

## Project Structure

```
careerpilot-ai/
├── frontend/          # Next.js 15 application
│   ├── src/app/       # Pages (App Router)
│   ├── src/components/# React components
│   ├── src/hooks/     # Custom hooks
│   ├── src/lib/       # Utilities
│   └── src/types/     # TypeScript types
├── backend/           # FastAPI application
│   ├── app/routers/   # API endpoints
│   ├── app/services/  # Business logic
│   ├── app/models/    # Pydantic schemas
│   └── tests/         # Python tests
└── docs/              # Documentation
```

## Making Changes

### Branch Naming

Use descriptive branch names:

```
feature/add-resume-analyzer
fix/sidebar-navigation-bug
docs/update-api-documentation
refactor/optimize-ai-engine
```

### Development Workflow

1. **Fork** and clone the repository
2. **Create** a feature branch from `main`
3. **Make** your changes
4. **Write** or update tests
5. **Run** linting and tests locally
6. **Commit** with a conventional commit message
7. **Push** and open a Pull Request

### Running Tests

```bash
# Frontend
cd frontend
npm run lint          # ESLint
npm run type-check    # TypeScript
npm run test          # Vitest

# Backend
cd backend
pytest tests/ -v      # Pytest
```

## Commit Convention

We use [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <description>

[optional body]
[optional footer]
```

### Types

| Type | Description |
|------|-------------|
| `feat` | New feature |
| `fix` | Bug fix |
| `docs` | Documentation changes |
| `style` | Code style (formatting, no logic changes) |
| `refactor` | Code refactoring |
| `perf` | Performance improvements |
| `test` | Adding/updating tests |
| `chore` | Build process, tooling, dependencies |
| `ci` | CI/CD changes |

### Examples

```
feat(resume): add PDF text extraction
fix(sidebar): correct active state on navigation
docs(api): add endpoint documentation for GitHub analyzer
test(ats): add unit tests for keyword matching
```

## Pull Request Process

1. **Fill out** the PR template completely
2. **Link** the related issue
3. **Ensure** all CI checks pass
4. **Request** review from maintainers
5. **Address** review feedback
6. **Squash** commits if requested

### PR Checklist

- [ ] Code follows the project's style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex logic
- [ ] Documentation updated (if applicable)
- [ ] Tests added or updated
- [ ] All tests pass
- [ ] No new warnings

## Coding Standards

### Frontend (TypeScript/React)

- Use **functional components** with hooks
- Use **TypeScript** strict mode — no `any`
- Follow **shadcn/ui** patterns for new components
- Use **Framer Motion** for animations
- Use **server components** by default, `'use client'` only when needed
- Keep components **small and focused** (< 150 lines)

### Backend (Python/FastAPI)

- Use **type hints** everywhere
- Use **Pydantic** models for all request/response schemas
- Use **async** functions for I/O operations
- Follow **PEP 8** and use **Ruff** for formatting
- Write **docstrings** for all public functions
- Keep services **thin** — business logic in service layer, not routers

### General

- **DRY** — Don't Repeat Yourself
- **KISS** — Keep It Simple
- **YAGNI** — You Aren't Gonna Need It
- Write **meaningful** variable/function names
- Add **comments** for _why_, not _what_

## Need Help?

- 💬 **Discord**: [Join our server](https://discord.gg/careerpilot)
- 🐛 **Issues**: [Open an issue](https://github.com/careerpilot-ai/careerpilot-ai/issues/new)
- 📧 **Email**: contributors@careerpilot.ai

---

Thank you for helping make CareerPilot AI better! Every contribution matters. 💖
