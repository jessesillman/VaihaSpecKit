import type { NextFunction, Request, Response } from 'express';

import { HttpError } from '../api/errors/http-errors';
import type { AccessTokenClaims } from './tokens.service';
import { TokensService } from './tokens.service';

export type AuthedRequest = Request & { auth?: AccessTokenClaims };

export function jwtMiddleware(tokens: TokensService) {
  return function jwt(req: AuthedRequest, _res: Response, next: NextFunction): void {
    const header = req.header('authorization');
    if (!header) {
      return next(new HttpError(401, 'unauthorized', 'Missing Authorization header'));
    }

    const [scheme, token] = header.split(' ');
    if (scheme !== 'Bearer' || !token) {
      return next(new HttpError(401, 'unauthorized', 'Invalid Authorization header'));
    }

    try {
      const claims = tokens.verifyAccessToken(token);
      if (claims.typ !== 'access') {
        return next(new HttpError(401, 'unauthorized', 'Invalid token type'));
      }
      req.auth = claims;
      return next();
    } catch {
      return next(new HttpError(401, 'unauthorized', 'Invalid token'));
    }
  };
}
