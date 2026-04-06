# Quickstart: Vaiha Mobile Loyalty Ecosystem (Planned)

**Feature**: [spec.md](spec.md)
**Date**: 2026-04-06

This quickstart describes the intended developer workflow once implementation begins.

## Components

- Mobile app (iOS/Android)
- Backend REST API
- Staff/admin web tool
- Firebase Cloud Messaging (push)

## Local Development (Target)

1. Configure environment variables
   - API base URL
   - JWT signing configuration
   - Database connection string
   - Firebase project credentials (server-side)

2. Start backend
   - Run migrations / initialize database
   - Start API server

3. Start admin tool
   - Configure to call the backend API

4. Run mobile app
   - Enable camera permissions
   - Point to local/staging API

## Key Manual Test Flows

- Register → login → view profile
- Generate a stamp QR in admin → scan in mobile → stamp awarded (with 2-per-visit cap)
- Reach 10 stamps → reward becomes available
- Activate coupon → staff verifies within 15 minutes → coupon redeemed
- Assign/renew student segment → confirm expiry behavior
- Toggle marketing opt-in/out → confirm backend gates notifications
- Pull lunch menu → confirm fallback behavior when source is down

## Operational Notes (Target)

- Audit log review should allow tracing a user journey end-to-end using UTC timestamps.
- Monitoring should alert on spikes of rejected QR scans, verification failures, and menu fetch errors.
