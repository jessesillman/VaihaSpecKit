import type { NextFunction, Response } from 'express';

import { HttpError } from '../api/errors/http-errors';
import type { AuthedRequest } from './jwt.middleware';
import type { Role } from './tokens.service';

export function authorizeRoles(...roles: Role[]) {
  const allowed = new Set<Role>(roles);

  return function authorize(req: AuthedRequest, _res: Response, next: NextFunction): void {
    const role = req.auth?.role;
    if (!role) {
      return next(new HttpError(401, 'unauthorized', 'Missing auth context'));
    }

    if (!allowed.has(role)) {
      return next(new HttpError(403, 'forbidden', 'Insufficient role'));
    }

    return next();
  };
}
