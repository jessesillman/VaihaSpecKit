# Research: Vaiha Mobile Loyalty Ecosystem

**Feature**: [spec.md](spec.md)
**Date**: 2026-04-06

This document records technical decisions needed to implement the feature while
meeting the Vaiha constitution (privacy/data minimization, workflow fit,
stability/quality gates, and supportability).

## Decisions

### 1) Mobile App Framework

- Decision: Flutter (Dart) for a single mobile codebase targeting latest iOS and Android.
- Rationale:
  - High-performance camera/scanner integrations are mature and consistent across platforms.
  - Strong portability (one codebase) and maintainability for long lifecycle.
  - Well-suited to ISO/IEC 25010 goals (portability, maintainability, usability).
- Alternatives considered:
  - Native iOS + Android: best platform integration but higher long-term cost.
  - React Native: viable, but camera/scanner reliability varies more by device/library choices.

### 2) Backend API Framework

- Decision: REST API implemented as a TypeScript service (Node.js LTS) with a structured web framework.
- Rationale:
  - Clear contract surface for mobile + admin.
  - Strong typing improves maintainability and reduces regressions.
- Alternatives considered:
  - Python/FastAPI: excellent for speed, but org preference unknown.
  - Go: high performance, but higher dev friction for rapid iteration.

### 3) Authentication & Session Management

- Decision: HTTPS-only REST API secured with JWT access tokens plus refresh tokens.
- Rationale:
  - Works well for mobile clients.
  - Clear session lifecycle and revocation support.
- Implementation notes (non-normative):
  - Short-lived access token, longer refresh token stored securely on device.
  - Store refresh tokens server-side as hashed values; support rotation and revocation.

### 4) Anti-Fraud QR Stamps

- Decision: QR codes are generated through the staff/admin tool and validated server-side.
- Rationale:
  - Prevents client-side tampering.
  - Enables consistent auditing and rate/eligibility rules.
- Enforcement:
  - Validate authenticity (signed payload or server-issued one-time token).
  - Idempotency: a QR code cannot be used twice.
  - Visit/session cap: max 2 stamps per user per visit/session.
- Clarification resolved as a default:
  - “Visit/session” is implemented as a configurable rolling time window (default: 4 hours)
    starting at the user’s first stamp award in that window. This can be adjusted later
    via configuration if operations define a different policy.

### 5) Segmentation (Student & Senior)

- Decision: Represent segments as assignments on the user profile.
- Rationale:
  - Supports targeted offers and eligibility checks with minimal data.
- Rules:
  - Student: assignment MUST include an expiry/valid-until date and requires periodic counter re-verification.
  - Senior: assignment MAY be permanent (no forced periodic expiry).

### 6) Push Notifications & Marketing Permissions

- Decision: Use Firebase Cloud Messaging for push delivery.
- Rationale:
  - Cross-platform push with a managed service.
- Permissions model:
  - In-app preference (opt-in/opt-out) gates personalized notifications.
  - OS-level permission gates whether any push can be delivered.
  - Backend must enforce opt-out even if OS permission remains enabled.

### 7) Paytrail (Future Roadmap)

- Decision: Design for Paytrail integration via hosted payments + webhook events.
- Rationale:
  - Keep PCI DSS scope minimized by not handling card data directly.
  - Enables future automatic stamp awards from payment-confirmation events.
- Data minimization:
  - Store only Paytrail transaction references and status needed for reconciliation and auditing.

### 8) ISO/IEC 25010 Quality Targets

- Decision: Treat ISO/IEC 25010 as a set of non-functional quality gates.
- Rationale:
  - Long lifecycle and easy updates depend on systematic quality practices.
- Practical gates to include in implementation:
  - Reliability: idempotent stamp and redemption operations.
  - Security: least-privilege, secure token handling, server-side validation.
  - Maintainability: typed codebase, modular services, documented contracts.
  - Portability: mobile CI builds for iOS/Android; minimal platform-specific branching.
  - Observability: structured logs + audit trail.
