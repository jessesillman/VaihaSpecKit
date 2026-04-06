const SECRET_KEYS = new Set([
  'password',
  'refreshToken',
  'refresh_token',
  'accessToken',
  'access_token',
  'token',
  'jwt',
  'secret',
  'resetToken',
  'reset_token',
]);

export function redactSecrets<T>(value: T): T {
  return redact(value) as T;
}

function redact(value: unknown): unknown {
  if (value === null || value === undefined) {
    return value;
  }

  if (Array.isArray(value)) {
    return value.map(redact);
  }

  if (typeof value === 'object') {
    const result: Record<string, unknown> = {};
    for (const [key, nested] of Object.entries(value as Record<string, unknown>)) {
      if (SECRET_KEYS.has(key)) {
        result[key] = '[REDACTED]';
      } else {
        result[key] = redact(nested);
      }
    }
    return result;
  }

  return value;
}
