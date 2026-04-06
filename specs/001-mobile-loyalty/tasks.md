---

description: "Implementation tasks for Vaiha Mobile Loyalty Ecosystem"
---

# Tasks: Vaiha Mobile Loyalty Ecosystem

**Input**: Design documents from `/specs/001-mobile-loyalty/`

- [spec.md](spec.md)
- [plan.md](plan.md)
- [research.md](research.md)
- [data-model.md](data-model.md)
- [contracts/rest-api.md](contracts/rest-api.md)
- [quickstart.md](quickstart.md)

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

**Format**: `- [ ] T### [P?] [US#?] Description with file path`

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Create the repo structure and baseline tooling for mobile, API, and admin.

- [x] T001 Create feature project directories api/, admin/, mobile/, docs/ops/
- [x] T002 Initialize backend TypeScript project in api/package.json and api/tsconfig.json
- [x] T003 [P] Configure backend lint/format in api/eslint.config.js and api/prettier.config.js
- [x] T004 [P] Add backend env template in api/.env.example
- [x] T005 Initialize Flutter app scaffold in mobile/pubspec.yaml and mobile/lib/
- [x] T006 [P] Add mobile env/config pattern in mobile/lib/config/app_config.dart
- [x] T007 Initialize admin web app scaffold (Vite + React + TS) in admin/package.json and admin/vite.config.ts
- [x] T008 [P] Add shared developer docs in docs/ops/dev-setup.md

## Phase 2: Foundational (Blocking Security + Ops Primitives)

**Purpose**: Core platform foundations that MUST exist before user stories.

- [x] T009 Define backend config + secrets loading in api/src/config/index.ts
- [x] T010 Implement structured request logging in api/src/api/middleware/request-logging.ts
- [x] T011 Implement audit event writer in api/src/audit/audit-event.service.ts
- [x] T012 Enforce “no secrets in logs” policy in api/src/audit/audit-redaction.ts
- [x] T013 Add standard UTC timestamp utilities in api/src/lib/time.ts
- [x] T014 Define auth token model + refresh rotation in api/src/auth/tokens.service.ts
- [x] T015 Implement JWT verification middleware in api/src/auth/jwt.middleware.ts
- [x] T016 Implement role-based authorization (user/staff/admin) in api/src/auth/authorize.ts
- [x] T017 Add local Postgres dev stack in api/docker-compose.yml
- [ ] T018 Define Prisma schema + migrations in api/prisma/schema.prisma and api/prisma/migrations/
- [ ] T019 Implement Prisma client wrapper + connection lifecycle in api/src/lib/db.ts
- [ ] T020 Implement segment model + validation (student expiry required) in api/src/admin/segments/segment.model.ts
- [ ] T021 Implement marketing preference storage in api/src/auth/marketing-preferences.model.ts
- [ ] T022 Implement QR issuance + signature/validation primitives in api/src/loyalty/qr/qr.service.ts
- [ ] T023 Implement anti-fraud visit/session window policy in api/src/loyalty/visit-window/visit-window.service.ts
- [ ] T024 Implement idempotency guard for QR consumption in api/src/loyalty/qr/qr-consumption.service.ts
- [x] T025 Add API error format + mapping in api/src/api/errors/http-errors.ts
- [ ] T026 Add rate limiting for scan/verify endpoints in api/src/api/middleware/rate-limit.ts
- [x] T027 Define REST routes skeleton in api/src/api/routes.ts
- [ ] T028 [P] Create a minimal staff/admin auth bootstrap in api/src/admin/auth/admin-users.service.ts
- [ ] T029 [P] Add Firebase server integration wrapper in api/src/notifications/firebase.service.ts
- [ ] T030 Define ISO/IEC 25010 quality gates checklist in docs/ops/quality-gates.md

## Phase 3: User Story 1 — Join, Sign In, and Manage My Data (P1) 🎯 MVP

**Goal**: Secure auth + profile + GDPR self-service.

**Independent Test**: Register → login → view profile → toggle marketing opt-in/out → request export/delete.

- [ ] T031 [US1] Implement POST /auth/register in api/src/auth/auth.controller.ts
- [ ] T032 [US1] Implement POST /auth/login in api/src/auth/auth.controller.ts
- [ ] T033 [US1] Implement POST /auth/logout in api/src/auth/auth.controller.ts
- [ ] T034 [US1] Implement password recovery request/confirm in api/src/auth/password-recovery.controller.ts
- [ ] T035 [US1] Implement GET /me and PATCH /me in api/src/auth/me.controller.ts
- [ ] T036 [US1] Implement GDPR export request in api/src/auth/privacy-export.controller.ts
- [ ] T037 [US1] Implement GDPR delete request in api/src/auth/privacy-delete.controller.ts
- [ ] T038 [US1] Add audit events for auth + privacy flows in api/src/auth/auth.audit.ts
- [ ] T039 [P] [US1] Build login/register screens in mobile/lib/screens/auth/login_screen.dart and mobile/lib/screens/auth/register_screen.dart
- [ ] T040 [P] [US1] Build password recovery flow in mobile/lib/screens/auth/password_recovery.dart
- [ ] T041 [P] [US1] Build profile screen (initial loyalty placeholders) in mobile/lib/screens/profile/profile_screen.dart
- [ ] T042 [P] [US1] Add marketing opt-in/out toggle UI in mobile/lib/screens/profile/marketing_preferences.dart
- [ ] T043 [P] [US1] Add GDPR export/delete actions UI in mobile/lib/screens/profile/privacy_controls.dart
- [ ] T044 [US1] Implement mobile API client + auth token storage in mobile/lib/services/api_client.dart

## Phase 4: User Story 2 — Earn Stamps by Scanning QR at Purchase (P2)

**Goal**: QR scan → server-side validation → stamps awarded with anti-fraud limits.

**Independent Test**: Generate a valid stamp QR → scan twice within a visit/session → third scan rejected by policy.

- [ ] T045 [US2] Implement POST /loyalty/scan in api/src/loyalty/scan.controller.ts
- [ ] T046 [US2] Implement GET /loyalty/status in api/src/loyalty/status.controller.ts
- [ ] T047 [US2] Enforce 2-stamps-per-visit/session in api/src/loyalty/scan.service.ts
- [ ] T048 [US2] Record stamp award events + audit events in api/src/loyalty/stamp-award.service.ts
- [ ] T049 [US2] Implement admin QR generation endpoint POST /admin/qr-codes in api/src/admin/qr/admin-qr.controller.ts
- [ ] T050 [P] [US2] Add QR scanner screen in mobile/lib/screens/loyalty/scan_qr_screen.dart
- [ ] T051 [P] [US2] Show stamp progress UI (0–10) in mobile/lib/screens/profile/loyalty_progress.dart
- [ ] T052 [US2] Handle QR scan errors (duplicate/limit/invalid) in mobile/lib/screens/loyalty/scan_result.dart
- [ ] T053 [P] [US2] Create admin page to generate QR codes in admin/src/pages/qr_codes.tsx

## Phase 5: User Story 3 — Redeem a Reward at the Counter (P3)

**Goal**: Activate coupon → QR displayed → staff verifies within 15 minutes → single-use redemption.

**Independent Test**: Make coupon available → activate → verify within window → verify again rejected → verify after expiry rejected.

- [ ] T054 [US3] Implement coupon activation POST /coupons/{couponId}/activate in api/src/coupons/activate.controller.ts
- [ ] T055 [US3] Implement coupon status GET /coupons/{couponId} in api/src/coupons/coupon.controller.ts
- [ ] T056 [US3] Implement staff verify POST /staff/coupons/verify in api/src/admin/verify/staff-verify.controller.ts
- [ ] T057 [US3] Enforce 15-minute window + single-use state transitions in api/src/coupons/coupon.service.ts
- [ ] T058 [US3] Add audit events for activation/verification/redeem in api/src/coupons/coupon.audit.ts
- [ ] T059 [P] [US3] Build rewards list UI in mobile/lib/screens/rewards/rewards_screen.dart
- [ ] T060 [P] [US3] Build coupon activation + timer UI in mobile/lib/screens/rewards/coupon_active_screen.dart
- [ ] T061 [P] [US3] Build staff verification page (camera scan in browser) in admin/src/pages/verify_coupon.tsx

## Phase 6: User Story 4 — Staff/Admin Manage Loyalty Operations (P4)

**Goal**: Promotions, manual adjustments, and segment verification (student expiry renewal, senior permanent).

**Independent Test**: Verify student segment with expiry → expiry blocks benefits → re-verify renews; adjust stamps with reason.

- [ ] T062 [US4] Implement promotions CRUD in api/src/admin/promotions/promotions.controller.ts
- [ ] T063 [US4] Implement manual stamp adjust endpoint in api/src/admin/users/stamps-adjust.controller.ts
- [ ] T064 [US4] Implement segment verify/renew endpoint in api/src/admin/users/segment-verify.controller.ts
- [ ] T065 [US4] Enforce student validity rules in api/src/admin/segments/segment.rules.ts
- [ ] T066 [US4] Add audit events for admin actions (promotions/adjust/segments) in api/src/admin/admin.audit.ts
- [ ] T067 [P] [US4] Build promotions management UI in admin/src/pages/promotions.tsx
- [ ] T068 [P] [US4] Build user lookup + stamp adjust UI in admin/src/pages/user_adjustments.tsx
- [ ] T069 [P] [US4] Build segment verification UI in admin/src/pages/segments.tsx

## Phase 7: User Story 5 — View Today’s Lunch Menu in the App (P5)

**Goal**: Fetch menu from third-party JSON, format for mobile, and gracefully fallback.

**Independent Test**: Load menu view with source available; simulate source down and show cached/fallback.

- [ ] T070 [US5] Implement menu fetch + normalization in api/src/menu/ruokapaikka/ruokapaikka.client.ts
- [ ] T071 [US5] Implement cache + fallback in api/src/menu/menu.service.ts
- [ ] T072 [US5] Expose GET /menu/today in api/src/menu/menu.controller.ts
- [ ] T073 [P] [US5] Build menu screen UI in mobile/lib/screens/menu/menu_screen.dart
- [ ] T074 [US5] Handle menu errors and cached fallback UI in mobile/lib/screens/menu/menu_fallback.dart

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Lifecycle readiness (security hardening, ops docs, Paytrail-ready hooks) and ISO/IEC 25010 alignment.

- [ ] T075 Add data retention policy + deletion semantics doc in docs/ops/data-retention.md
- [ ] T076 Add incident/support runbook for audit/event tracing in docs/ops/runbook.md
- [ ] T077 Add monitoring signal definitions in docs/ops/monitoring-signals.md
- [ ] T078 Add Paytrail webhook contract stub (no payment processing) in api/src/payments/paytrail/webhook.controller.ts
- [ ] T079 Ensure audit events include IP/User-Agent capture middleware in api/src/audit/audit-context.middleware.ts
- [ ] T080 Ensure marketing opt-in/out is enforced server-side in api/src/notifications/notification-gating.service.ts
- [ ] T081 Add documentation for segment validity policy in docs/ops/segment-policy.md

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies
- **Foundational (Phase 2)**: Depends on Setup completion
- **US1 (Phase 3)**: Depends on Foundational
- **US2 (Phase 4)**: Depends on Foundational (and uses the admin QR issuance endpoint)
- **US3 (Phase 5)**: Depends on Foundational
- **US4 (Phase 6)**: Depends on Foundational
- **US5 (Phase 7)**: Depends on Foundational
- **Polish (Phase 8)**: Depends on desired user stories being complete

### User Story Dependencies

- **US1**: No dependencies beyond Foundational
- **US2**: Depends on Foundational + the QR issuance capability (POST /admin/qr-codes)
- **US3**: Depends on Foundational
- **US4**: Depends on Foundational
- **US5**: Depends on Foundational

## Parallel Opportunities

- Setup tasks marked `[P]` can be run in parallel (mobile vs API vs admin vs docs).
- After Foundational completes, US2/US3/US5 mobile and backend work can proceed in parallel.
- Admin UI pages for QR codes/verification/promotions/segments can be built in parallel to backend endpoints.

## Parallel Example: User Story 2

```bash
Task: "Implement POST /loyalty/scan in api/src/loyalty/scan.controller.ts"
Task: "Add QR scanner screen in mobile/lib/screens/loyalty/scan_qr_screen.dart"
Task: "Create minimal admin page to generate QR codes in admin/src/pages/qr_codes.tsx"
```

## Implementation Strategy

### MVP First (US1 only)

1. Complete Setup + Foundational
2. Complete US1
3. Validate auth, profile, GDPR controls, and marketing opt-in/out

### Incremental Delivery

- Add US2 → validate anti-fraud limits
- Add US3 → validate 15-minute verification window
- Add US4 → operational tooling
- Add US5 → engagement content
