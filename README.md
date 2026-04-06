# VaihaSpecKit

Lightweight “SpecKit”-style repo where specification (spec), implementation planning (plan), and task breakdowns (tasks) are versioned, and implementation proceeds in phases.

## Where are the docs?

- Project constitution / quality gates: `.specify/memory/constitution.md`
- Templates: `.specify/templates/`
- Feature specs and plans: `specs/<NNN-feature-name>/`
  - `spec.md` — requirements and user journeys
  - `plan.md` — implementation plan and structure
  - `tasks.md` — phased task breakdown (implementation)
  - `research.md`, `data-model.md`, `contracts/`, `quickstart.md` — supporting docs

## Current feature

- `specs/001-mobile-loyalty/` — Vaiha Mobile Loyalty Ecosystem

## Code (as implementation progresses)

- `api/` — backend (TypeScript / Node.js)
- `admin/` — staff/admin web UI
- `mobile/` — Flutter mobile app
- `docs/ops/` — operational docs (runbooks, quality gates, etc.)
