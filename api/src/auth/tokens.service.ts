import * as jwt from 'jsonwebtoken';

type ExpiresIn = jwt.SignOptions['expiresIn'];

export type Role = 'user' | 'staff' | 'admin';

export type AccessTokenClaims = {
  sub: string; // userId
  role: Role;
  typ: 'access';
};

export type RefreshTokenClaims = {
  sub: string; // userId
  sid: string; // sessionId
  typ: 'refresh';
};

export class TokensService {
  constructor(
    private readonly accessSecret: string,
    private readonly refreshSecret: string
  ) {}

  signAccessToken(params: { userId: string; role: Role; expiresIn: ExpiresIn }): string {
    const claims: AccessTokenClaims = {
      sub: params.userId,
      role: params.role,
      typ: 'access',
    };

    return jwt.sign(claims, this.accessSecret, {
      algorithm: 'HS256',
      expiresIn: params.expiresIn,
    });
  }

  signRefreshToken(params: { userId: string; sessionId: string; expiresIn: ExpiresIn }): string {
    const claims: RefreshTokenClaims = {
      sub: params.userId,
      sid: params.sessionId,
      typ: 'refresh',
    };

    return jwt.sign(claims, this.refreshSecret, {
      algorithm: 'HS256',
      expiresIn: params.expiresIn,
    });
  }

  verifyAccessToken(token: string): AccessTokenClaims {
    const decoded = jwt.verify(token, this.accessSecret, { algorithms: ['HS256'] });
    return decoded as AccessTokenClaims;
  }

  verifyRefreshToken(token: string): RefreshTokenClaims {
    const decoded = jwt.verify(token, this.refreshSecret, { algorithms: ['HS256'] });
    return decoded as RefreshTokenClaims;
  }
}
