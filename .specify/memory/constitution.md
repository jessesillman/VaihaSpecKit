<!--
Sync Impact Report

- Version change: (unset/template) → 1.0.0
- Modified principles: N/A (initial ratification)
- Added sections: Core Principles; Compliance & Data Handling; Delivery & Support Workflow; Governance
- Removed sections: N/A
- Templates requiring updates:
  - ✅ Updated: .specify/templates/plan-template.md
  - ✅ Updated: .specify/templates/tasks-template.md
- Deferred TODOs: None
-->

# Vaiha App Constitution

## Core Principles

### 1) Privacy & Data Minimization (GDPR-first)
Vaiha MUST collect, store, and process the minimum data needed to deliver loyalty
and operational workflows.

- Any collection of personal data MUST have a clear purpose and documented data
  flow (what, why, where stored, who can access, retention period).
- Prefer pseudonymous identifiers and avoid storing raw PII unless required for a
  specific user-facing capability.
- Data retention MUST be explicit (time-bound where possible) and deletions MUST
  be supported for account removal and data subject requests.

### 2) Seamless Operational Workflows (Staff + Customers)
Features MUST be designed around the real restaurant and catering workflow.

- The “happy path” MUST be fast and low-friction for staff during service.
- The customer experience MUST be understandable without training.
- Operational changes MUST not introduce brittle manual steps or duplicate data
  entry without a documented justification.

### 3) Stability & Quality Gates (Non-negotiable)
The platform MUST reduce technical uncertainty by being predictably stable.

- Changes touching customer/staff-critical workflows or any personal data MUST
  include automated tests (unit and/or integration) that cover the intended
  behavior and key regressions.
- Backward-incompatible changes MUST include a migration plan and rollout
  strategy (including rollback).
- Error handling MUST be explicit and user-safe (no silent failures for money,
  points, identity, or permissions).

### 4) Supportability & Observability
The platform MUST be operable and supportable continuously.

- Production systems MUST emit actionable logs (structured where possible) with
  correlation identifiers for tracing requests/user journeys.
- Critical flows MUST have monitoring/alerting signals defined (even if the
  first iteration is minimal).
- Incidents MUST be diagnosable from telemetry without requiring ad-hoc database
  spelunking as the primary strategy.

### 5) Simplicity & Incremental Delivery
Prefer the smallest change that delivers value and can be supported.

- Build MVP slices that are independently testable and shippable.
- Avoid unnecessary abstraction; introduce complexity only with a documented
  operational need.
- Optimize for clear ownership, maintainability, and predictable upgrades.

## Compliance & Data Handling

- GDPR principles apply by default: data minimization, purpose limitation,
  storage limitation, integrity/confidentiality.
- Personal data access MUST be least-privilege and auditable.
- Data exports/imports (if any) MUST avoid leaking personal data in logs.
- Any new external vendor/service integration MUST document data sharing scope,
  retention, and deletion mechanisms.

## Delivery & Support Workflow

- Every change MUST be reviewed by at least one other person (or a documented
  exception for emergencies).
- For changes affecting personal data handling, a privacy impact note MUST be
  included in the PR/plan (what changed, risks, mitigations).
- Releases MUST include a short operator-focused note: what changed, how to
  verify, and how to roll back.

## Governance

- This constitution is the highest-level project policy and supersedes other
  process documents when there is conflict.
- Amendments MUST be made via a documented change (PR) that includes:
  - the principle/section being changed,
  - the reason for the change,
  - expected operational impact (including support and monitoring), and
  - any required migration/rollout plan.
- Versioning policy follows semantic versioning:
  - MAJOR: backward-incompatible governance changes or removals/redefinitions of
    principles.
  - MINOR: new principle/section added or material expansion of requirements.
  - PATCH: clarifications, wording, and non-semantic refinements.
- Compliance expectation: feature specs/plans MUST include a constitution check
  for privacy, workflow fit, quality gates, and supportability.

**Version**: 1.0.0 | **Ratified**: 2026-04-06 | **Last Amended**: 2026-04-06
