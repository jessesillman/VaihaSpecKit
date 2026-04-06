# Data Model: Vaiha Mobile Loyalty Ecosystem

**Feature**: [spec.md](spec.md)
**Date**: 2026-04-06

This is a conceptual data model (no implementation-specific schema).

## Entities

### UserAccount

- Fields:
  - `id` (opaque)
  - `email` (optional if an alternative login is used; minimized)
  - `created_at_utc`
  - `status` (active, deleted)
- Notes:
  - Store only minimum personal data needed for authentication and support.

### AuthSession / RefreshToken

- Fields:
  - `user_id`
  - `refresh_token_hash`
  - `created_at_utc`, `last_used_at_utc`, `revoked_at_utc` (nullable)
  - `client_metadata` (device/app version, user agent when available)

### UserProfile

- Fields:
  - `user_id`
  - `marketing_opt_in` (boolean)
  - `created_at_utc`, `updated_at_utc`
- Relationships:
  - 1:1 with `UserAccount`

### SegmentAssignment

- Fields:
  - `user_id`
  - `segment_type` (student, senior)
  - `verified_by_staff_id` (nullable for migrated assignments)
  - `verified_at_utc`
  - `valid_until_utc` (nullable; required for student, optional/NULL for senior)
  - `status` (active, expired, revoked)

### Promotion

- Fields:
  - `id`
  - `name`
  - `start_at_utc`, `end_at_utc`
  - `eligibility_rules` (references segments and other attributes)

### QrCode

- Fields:
  - `id`
  - `purpose` (stamp-award, coupon-verification)
  - `issued_by_staff_id`
  - `issued_at_utc`
  - `expires_at_utc` (optional)
  - `status` (active, consumed, revoked, expired)

### StampProgram

- Fields:
  - `id`
  - `stamps_required` (10)
  - `max_stamps_per_visit` (2)
  - `visit_window_minutes` (configurable; default from research)

### StampAwardEvent

- Fields:
  - `id`
  - `user_id`
  - `qr_code_id`
  - `awarded_at_utc`
  - `awarded_by` (system)
  - `result` (awarded, rejected_duplicate, rejected_limit, rejected_invalid)
- Constraints:
  - `qr_code_id` MUST be unique for successful awards.

### Reward

- Fields:
  - `id`
  - `name`
  - `description`
  - `eligibility` (e.g., 10 stamps; segment constraints)

### Coupon

- Fields:
  - `id`
  - `user_id`
  - `reward_id`
  - `status` (available, active, redeemed, expired, revoked)
  - `created_at_utc`

### CouponActivation

- Fields:
  - `coupon_id`
  - `activated_at_utc`
  - `expires_at_utc` (activated_at + 15 minutes)
  - `activation_qr_code_id`

### VerificationSession

- Fields:
  - `id`
  - `coupon_id`
  - `staff_id`
  - `verified_at_utc`
  - `result` (verified, expired, already_redeemed, invalid)

### AuditEvent

- Fields:
  - `id`
  - `event_type` (registration, login, stamp_award, deletion_request, deletion_completed, etc.)
  - `occurred_at_utc`
  - `actor_type` (user, staff, system)
  - `actor_id` (nullable)
  - `subject_user_id` (nullable)
  - `ip_address` (nullable)
  - `user_agent` (nullable)
  - `metadata` (structured, MUST exclude secrets/passwords)

### MenuCache

- Fields:
  - `source` (ruokapaikka)
  - `fetched_at_utc`
  - `payload` (normalized menu data)
  - `etag_or_version` (optional)

### PaymentEvent (Roadmap)

- Fields:
  - `provider` (paytrail)
  - `provider_reference`
  - `status` (authorized, paid, failed, refunded)
  - `occurred_at_utc`
  - `user_id` (optional, depending on linkage)

## State Transitions

### Coupon

- available → active (user activates)
- active → redeemed (staff verifies within 15 minutes)
- active → expired (15-minute window passes)
- any → revoked (admin action)

### Student Segment

- active → expired (valid_until_utc reached)
- expired → active (staff re-verifies)
