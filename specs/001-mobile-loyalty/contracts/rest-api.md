# REST API Contract (Draft)

**Feature**: [spec.md](../spec.md)
**Date**: 2026-04-06

This contract describes the external API surface between:
- Mobile app (iOS/Android)
- Staff/admin web tool
- Backend service

It is intentionally technology-agnostic.

## Cross-cutting Rules

- All endpoints MUST be served over HTTPS.
- Authenticated endpoints MUST require a valid access token.
- All anti-fraud decisions MUST be enforced server-side.
- Critical actions MUST produce audit events (see `AuditEvent` in data model).
- Logs MUST NOT include secrets (passwords, password reset tokens, refresh tokens).

## Authentication

- `POST /auth/register`
  - Creates a user account.
- `POST /auth/login`
  - Returns access token + refresh token.
- `POST /auth/logout`
  - Revokes refresh token(s) for the session/device.
- `POST /auth/password-recovery/request`
  - Starts password recovery.
- `POST /auth/password-recovery/confirm`
  - Completes password reset.

## User Profile & GDPR

- `GET /me`
  - Returns minimal profile data, loyalty status summary, segments, and preferences.
- `PATCH /me`
  - Updates allowed profile fields (data minimization applies).
- `POST /me/privacy/export`
  - Requests a data export.
- `POST /me/privacy/delete`
  - Requests account deletion.

## Loyalty (Stamps)

- `GET /loyalty/status`
  - Returns stamp count, progress to next reward, and available rewards/coupons.

- `POST /loyalty/scan`
  - Input: QR payload (opaque string) + optional context (e.g., location).
  - Behavior:
    - Validates QR server-side (issued by admin tool, authentic, not expired).
    - Enforces idempotency (no duplicate use).
    - Enforces 2-stamps-per-visit/session rule.
  - Output:
    - Result (awarded/rejected + reason) and updated loyalty status.

## Coupons (Redemption)

- `POST /coupons/{couponId}/activate`
  - Starts a 15-minute activation window and returns a scannable verification QR.

- `GET /coupons/{couponId}`
  - Returns coupon state (available/active/redeemed/expired) and expiry timestamp if active.

## Staff Verification

- `POST /staff/coupons/verify`
  - Input: activation QR payload
  - Output: verification result (verified/expired/already_redeemed/invalid)

## Admin Operations

- `POST /admin/promotions`
- `PATCH /admin/promotions/{id}`
- `GET /admin/promotions`

- `POST /admin/qr-codes`
  - Generates a stamp-award QR code for POS usage.

- `POST /admin/users/{userId}/stamps/adjust`
  - Adds/removes stamps with required reason.

- `POST /admin/users/{userId}/segments/verify`
  - Assigns/renews student/senior segments.

## Menu Integration

- `GET /menu/today`
  - Returns normalized menu payload for mobile display.
  - Backend may cache and serve last successful payload if source is unavailable.
