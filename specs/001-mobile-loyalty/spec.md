# Feature Specification: Vaiha Mobile Loyalty Ecosystem

**Feature Branch**: `001-mobile-loyalty`  
**Created**: 2026-04-06  
**Status**: Draft  
**Input**: User description: "Build a mobile loyalty ecosystem for Vaiha with User Management, Digital Loyalty Engine, Reward Redemption, Staff/Admin Interface, and Content Integration."

## User Scenarios & Testing *(mandatory)*

<!--
  IMPORTANT: User stories should be PRIORITIZED as user journeys ordered by importance.
  Each user story/journey must be INDEPENDENTLY TESTABLE - meaning if you implement just ONE of them,
  you should still have a viable MVP (Minimum Viable Product) that delivers value.
  
  Assign priorities (P1, P2, P3, etc.) to each story, where P1 is the most critical.
  Think of each story as a standalone slice of functionality that can be:
  - Developed independently
  - Tested independently
  - Deployed independently
  - Demonstrated to users independently
-->

### User Story 1 - Join, Sign In, and Manage My Data (Priority: P1)

As a customer, I can securely register, sign in/out, recover my password, and
view/manage my personal profile so I can participate in the loyalty program and
control my data.

**Why this priority**: Without identity + self-service data controls, loyalty
progress cannot be trusted or supported.

**Independent Test**: Create an account, sign in, view a profile page with an
empty loyalty status, request password recovery, and perform a GDPR action
(export or delete).

**Acceptance Scenarios**:

1. **Given** I have no account, **When** I register with required details, **Then** I can sign in and reach my profile.
2. **Given** I forgot my password, **When** I request password recovery, **Then** I can regain access without staff help.
3. **Given** I am signed in, **When** I request a data export or deletion, **Then** the system completes the request and confirms completion.

---

### User Story 2 - Earn Stamps by Scanning QR at Purchase (Priority: P2)

As a customer, I can earn stamps by scanning a POS-generated QR code so my
loyalty progress updates instantly and reliably.

**Why this priority**: This is the core value driver of a stamp-based loyalty
program.

**Independent Test**: With a signed-in user, scan a valid QR code and verify
the stamp count increases and is visible in the profile.

**Acceptance Scenarios**:

1. **Given** I have 0 stamps, **When** I scan a valid purchase QR code, **Then** my stamp count increases by 1 and I see confirmation.
2. **Given** a QR code has already been used, **When** I scan it, **Then** I do not receive additional stamps and I see a clear error.
3. **Given** I reach 10 stamps, **When** the final stamp is awarded, **Then** an eligible reward becomes available to redeem.

---

### User Story 3 - Redeem a Reward at the Counter (Priority: P3)

As a customer, I can activate a digital coupon and have staff verify it via QR
scan within a 15-minute verification window so redemption is fast and resistant
to misuse.

**Why this priority**: Redemption must be quick and trustworthy during service.

**Independent Test**: Make a reward available to a user, activate it, have a
staff member verify it by scanning, and confirm it cannot be reused.

**Acceptance Scenarios**:

1. **Given** I have an available reward, **When** I activate it, **Then** a scannable QR and a 15-minute timer are shown.
2. **Given** the coupon is active, **When** staff scans it within 15 minutes, **Then** the coupon is verified and marked as redeemed.
3. **Given** the 15-minute window has expired, **When** staff scans the QR, **Then** verification fails and the coupon remains unredeemed.

---

### User Story 4 - Staff/Admin Manage Loyalty Operations (Priority: P4)

As staff/admin, I can manage promotions, generate active QR codes, manually
adjust a user’s stamps/rewards, and verify eligibility for special segments
(e.g., students) so operations can be supported and corrected.

**Why this priority**: Operational tooling is required to support day-to-day
exceptions, campaigns, and customer support.

**Independent Test**: Create a promotion, generate a QR code, grant/remove a
stamp for a user, and verify a segment flag.

**Acceptance Scenarios**:

1. **Given** I have admin access, **When** I create or update a promotion, **Then** it becomes available according to its configured rules.
2. **Given** I am helping a customer, **When** I adjust stamps or rewards with a reason, **Then** the change is recorded and visible in the user profile.
3. **Given** a customer claims student status, **When** I verify it, **Then** the customer is flagged as eligible for student-only benefits.

---

### User Story 5 - View Today’s Lunch Menu in the App (Priority: P5)

As a customer, I can view the lunch menu fetched from a third-party JSON source
formatted for mobile so I can decide what to order.

**Why this priority**: Menu visibility improves engagement but is not blocking
for loyalty MVP.

**Independent Test**: Load the menu view, confirm items render from the JSON
source, and verify the app handles the source being temporarily unavailable.

**Acceptance Scenarios**:

1. **Given** the menu source is available, **When** I open the menu view, **Then** I see today’s items formatted for mobile.
2. **Given** the menu source is unavailable, **When** I open the menu view, **Then** I see a clear error and the last successfully fetched menu (if available).

---

[Add more user stories as needed, each with an assigned priority]

### Edge Cases

<!--
  ACTION REQUIRED: The content in this section represents placeholders.
  Fill them out with the right edge cases.
-->

- QR code is scanned when the user is signed out.
- QR code is malformed, expired, already used, or not issued by Vaiha.
- Multiple scans occur quickly (double-tap, poor connectivity, concurrent scans).
- User attempts to farm stamps by scanning multiple codes in a single visit/session.
- Customer’s camera permissions are denied or the device cannot scan.
- Reward activation is started but the customer closes the app.
- Staff verification happens after the 15-minute window.
- Manual adjustments conflict with recent automated stamp awards.
- Student status expires and the user tries to claim student-only benefits.
- User opts out of personalized notifications but OS push permissions remain enabled.
- User opts in within the app but OS-level push permissions are disabled.
- Third-party menu JSON changes schema, becomes slow, or is temporarily down.

## Requirements *(mandatory)*

<!--
  ACTION REQUIRED: The content in this section represents placeholders.
  Fill them out with the right functional requirements.
-->

### Functional Requirements

**User Management & GDPR**

- **FR-001**: System MUST support secure user registration, login, and logout.
- **FR-002**: System MUST support self-service password recovery without staff involvement.
- **FR-003**: System MUST provide a user profile view showing current stamps, available rewards, and redemption history.
- **FR-004**: System MUST support user self-service data controls for GDPR (access/export, correction, and deletion).
- **FR-005**: System MUST follow data minimization by requiring only the minimum personal data needed to operate loyalty accounts.

**Digital Loyalty Engine (10-stamp program)**

- **FR-006**: System MUST implement a 10-stamp loyalty program where stamps accumulate per eligible purchase event.
- **FR-007**: System MUST award stamps only by scanning QR codes that are generated via the staff/admin interface and validated server-side as authentic and eligible.
- **FR-008**: System MUST prevent duplicate stamp awards from reusing the same QR code.
- **FR-009**: System MUST limit stamp awards to a maximum of 2 stamps per user per visit/session.
- **FR-010**: All anti-fraud eligibility checks MUST be enforced server-side (client-side checks may exist for UX but must not be the source of truth).
- **FR-011**: System MUST support benefits not feasible with physical cards, including personalized offers and eligibility rules based on user attributes/segments.

**Reward Redemption**

- **FR-012**: System MUST allow users to convert earned loyalty progress into redeemable rewards/coupons.
- **FR-013**: System MUST display a scannable QR code for an active coupon and a visible verification countdown.
- **FR-014**: System MUST enforce a 15-minute verification window for staff to verify the active coupon.
- **FR-015**: System MUST ensure each coupon redemption is single-use and cannot be verified twice.

**Staff & Admin Interface**

- **FR-016**: System MUST provide a web-based staff/admin tool to manage promotions and loyalty configuration.
- **FR-017**: Staff/admin MUST be able to generate active QR codes used for awarding stamps at purchase.
- **FR-018**: Staff/admin MUST be able to manually adjust a user’s stamps and/or rewards with a recorded reason.
- **FR-019**: Staff/admin MUST be able to verify and manage segment eligibility (student, senior) for targeted benefits.
- **FR-020**: Student segment eligibility MUST have a limited validity period and require periodic re-verification at the counter to renew.
- **FR-021**: Senior segment eligibility MUST support permanent assignment (no forced periodic expiry).
- **FR-022**: The staff/admin tool MUST support integration into existing site tooling (e.g., embedded into an existing CMS) without requiring customers to use it.

**Content Integration (Lunch Menu)**

- **FR-023**: System MUST fetch and display lunch menu content from a third-party JSON API (Ruokapaikka.fi) formatted for mobile screens.
- **FR-024**: System MUST handle menu source failures gracefully (clear message and fallback to last successful menu when available).

**Marketing Permissions (Personalization + Push Notifications)**

- **FR-025**: System MUST provide an explicit opt-in/opt-out control for personalized notifications.
- **FR-026**: Personalized notifications MUST only be sent when the user has opted in within the app.
- **FR-027**: Push notifications MUST respect OS-level notification permissions (iOS/Android) in addition to the in-app preference.
- **FR-028**: Opt-out MUST be honored promptly and MUST prevent future personalized notifications.

**Auditability & Support**

- **FR-029**: System MUST record an audit trail for critical events sufficient to investigate support issues, including: registrations, logins, stamp awards, coupon activations, redemptions/verifications, manual adjustments, and GDPR deletion/export requests.
- **FR-030**: Audit events MUST include UTC timestamps, IP address, and User-Agent when available.
- **FR-031**: Audit logs MUST NOT include sensitive data such as passwords or password reset secrets.
- **FR-032**: System MUST provide staff with clear verification outcomes (verified, already redeemed, expired, invalid) during counter workflows.

### Key Entities *(include if feature involves data)*

- **User Account**: Customer identity and authentication state.
- **User Profile**: Customer-facing view of loyalty progress and basic preferences.
- **Consent/Privacy Request**: Requests to access/export/correct/delete user data.
- **Stamp Program**: Defines the 10-stamp rules and eligible events.
- **Stamp Award Event**: A recorded stamp grant tied to a validated QR scan.
- **Reward**: A benefit unlocked by meeting loyalty criteria.
- **Coupon**: A redeemable token representing a reward.
- **Coupon Activation**: The act of starting a redemption window for a coupon.
- **Verification Session**: Staff verification attempt(s) within the 15-minute window.
- **Promotion**: Admin-managed campaign that can modify eligibility or rewards.
- **Segment**: Eligibility group (student, senior) used for targeted benefits.
- **Segment Assignment**: Records a user’s segment status, who verified it, and validity (expiry for student; none for senior).
- **Menu**: Lunch menu data retrieved from third-party JSON.
- **Audit Event**: Immutable record of a critical action with UTC timestamp, IP, and User-Agent (excluding sensitive secrets).
- **Marketing Preference**: User preference for personalized notifications (opt-in/opt-out), distinct from OS push permissions.

## Success Criteria *(mandatory)*

<!--
  ACTION REQUIRED: Define measurable success criteria.
  These must be technology-agnostic and measurable.
-->

### Measurable Outcomes

- **SC-001**: 90% of new users can register and reach their profile in under 2 minutes.
- **SC-002**: 95% of valid QR scans result in a stamp award confirmation within 5 seconds.
- **SC-003**: Staff can verify a valid active coupon at the counter in under 15 seconds.
- **SC-004**: 99% of redeemed coupons cannot be redeemed a second time.
- **SC-005**: Stamp fraud limits are enforced: no user can receive more than 2 stamps per visit/session.
- **SC-006**: 90% of menu view loads display content (fresh or cached) in under 3 seconds under normal connectivity.
- **SC-007**: 100% of GDPR access/export/deletion requests are trackable with completion confirmation to the user.
- **SC-008**: 100% of critical events are auditable with UTC timestamp + IP + User-Agent (when available) and no sensitive secret leakage.

## Assumptions

<!--
  ACTION REQUIRED: The content in this section represents placeholders.
  Fill them out with the right assumptions based on reasonable defaults
  chosen when the feature description did not specify certain details.
-->

- Users have smartphones with camera access for scanning QR codes.
- POS can generate QR codes for eligible purchases and staff can present/print them.
- Staff have access to a web browser during service for verification/admin tasks.
- The loyalty program is a single 10-stamp program for Vaiha (future multi-program support is out of scope for this feature).
- Student verification details (what proof is accepted and the validity period, e.g., one academic year) will be defined operationally; the system must support storing an eligibility status plus a validity/expiry date and renewing it at the counter.
- Senior eligibility rules are operationally defined; the system must support permanent eligibility.
- Ruokapaikka.fi provides a reachable JSON endpoint for lunch menu data, and Vaiha has permission to display it in-app.
