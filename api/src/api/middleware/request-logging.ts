import type { NextFunction, Request, Response } from 'express';
import crypto from 'node:crypto';

export type RequestWithRequestId = Request & { requestId?: string };

export function requestLogging(req: RequestWithRequestId, res: Response, next: NextFunction): void {
  const start = Date.now();
  const requestId = crypto.randomUUID();

  req.requestId = requestId;
  res.setHeader('x-request-id', requestId);

  res.on('finish', () => {
    const durationMs = Date.now() - start;

    // Structured log line; do not log secrets or bodies.
    console.log(
      JSON.stringify({
        level: 'info',
        msg: 'request',
        requestId,
        method: req.method,
        path: req.originalUrl,
        status: res.statusCode,
        durationMs,
      })
    );
  });

  next();
}
