import { nowUtcIso } from '../lib/time';
import { redactSecrets } from './audit-redaction';

export type AuditActorType = 'user' | 'staff' | 'system';

export type AuditEvent = {
  eventType: string;
  occurredAtUtc: string;
  actorType: AuditActorType;
  actorId?: string;
  subjectUserId?: string;
  ipAddress?: string;
  userAgent?: string;
  metadata?: Record<string, unknown>;
};

export class AuditEventService {
  write(event: Omit<AuditEvent, 'occurredAtUtc'>): void {
    const fullEvent: AuditEvent = {
      occurredAtUtc: nowUtcIso(),
      ...event,
      metadata: event.metadata ? redactSecrets(event.metadata) : undefined,
    };

    // Persisting to DB will be added once Prisma + schema exists.
    // For now, emit a structured log line.
    console.log(JSON.stringify({ level: 'info', msg: 'audit', audit: fullEvent }));
  }
}
