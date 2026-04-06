# Implementation Plan: Vaiha Mobile Loyalty Ecosystem

**Branch**: `001-mobile-loyalty` | **Date**: 2026-04-06 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `/specs/001-mobile-loyalty/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/plan-template.md` for the execution workflow.

## Summary

Deliver a mobile loyalty platform (latest iOS + Android) backed by a secure REST
API and staff/admin web tooling. The system supports:

- Secure user management (registration/login/logout/password recovery + GDPR
  self-service)
- QR-based stamp earning (10-stamp program) with anti-fraud controls (admin
  issuance, server-side validation, 2 stamps per visit/session)
- Reward redemption with staff verification and 15-minute activation window
- Segmentation (student with expiry + re-verification; senior can be permanent)
- Firebase segmented push notifications with explicit marketing opt-in/out
- Lunch menu integration from a third-party JSON API with graceful fallback

Technical approach is captured in [research.md](research.md) and reflected in the
contracts and data model.

## Technical Context

<!--
  ACTION REQUIRED: Replace the content in this section with the technical details
  for the project. The structure here is presented in advisory capacity to guide
  the iteration process.
-->

**Language/Version**: Mobile: Dart (Flutter) | Backend: TypeScript (Node.js LTS) | Admin UI: Web application

**Primary Dependencies**:
- Mobile: QR scanning/camera library suitable for reliable device coverage
- Backend: REST framework, JWT support, Firebase Admin SDK for push

**Storage**:
- Primary: relational database for transactional integrity (users, stamps, coupons, audit)
- Caching: menu cache (time-based) to support graceful fallback

**Testing**:
- Mobile: automated UI + unit tests for QR and core flows
- Backend: unit tests + integration tests for anti-fraud, redemption, and segment rules

**Target Platform**:
- Mobile: latest iOS and Android versions
- Backend: Linux server/container

**Project Type**:
- Mobile app + REST API + staff/admin web tool

**Performance Goals**:
- QR scan award confirmation within 5 seconds for 95% of valid scans
- Staff coupon verification within 15 seconds for the happy path

**Constraints**:
- GDPR data minimization by design
- Server-side enforcement for anti-fraud and permissions
- ISO/IEC 25010 quality characteristics used as lifecycle gates

**Scale/Scope**:
- Single restaurant/catering brand loyalty system with segmentation and promotions
- Designed to extend to Paytrail-based ordering/payment events later

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- Privacy & data minimization impact is assessed (what data, why, retention).
- Workflow fit is validated for staff + customers (happy path + failure modes).
- Stability/quality gates are defined (tests needed, migrations/rollout/rollback).
- Supportability is addressed (logging/monitoring signals, operational notes).

**Outcome for this feature**:
- Privacy: minimal account/profile fields, explicit marketing opt-in/out, and GDPR export/delete flows.
- Workflow: counter verification designed for <15 seconds; failure states explicit.
- Stability: idempotent stamp awarding + coupon redemption; anti-fraud enforced server-side.
- Supportability: immutable audit events (UTC/IP/User-Agent) for critical actions; alertable signals identified in research.

## Project Structure

### Documentation (this feature)

```text
specs/001-mobile-loyalty/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)
```text
api/
├── src/
│   ├── api/
│   ├── auth/
│   ├── loyalty/
│   ├── coupons/
│   ├── admin/
│   ├── menu/
│   └── audit/
└── tests/

admin/
├── src/
└── tests/

mobile/
├── lib/
├── test/
└── integration_test/

docs/
└── ops/
```

**Structure Decision**: Mobile + API + Admin web tool. This matches the feature
requirements (mobile scanning + staff/admin operations) while keeping contracts
clear and maintainable.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| N/A | No constitution violations required | N/A |

Complexity is kept minimal by using a single REST API as the source of truth and
enforcing anti-fraud/audit rules centrally.
