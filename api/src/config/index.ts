type NodeEnv = 'development' | 'test' | 'production';

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required env var: ${name}`);
  }
  return value;
}

function optionalEnv(name: string, defaultValue: string): string {
  return process.env[name] ?? defaultValue;
}

export type AppConfig = {
  env: NodeEnv;
  port: number;
  jwt: {
    accessSecret: string;
    refreshSecret: string;
  };
  databaseUrl: string;
};

export function loadConfig(): AppConfig {
  const env = (optionalEnv('NODE_ENV', 'development') as NodeEnv) ?? 'development';
  const port = Number(optionalEnv('PORT', '3000'));

  if (!Number.isFinite(port) || port <= 0) {
    throw new Error('Invalid PORT');
  }

  return {
    env,
    port,
    jwt: {
      accessSecret: requireEnv('JWT_ACCESS_SECRET'),
      refreshSecret: requireEnv('JWT_REFRESH_SECRET'),
    },
    databaseUrl: requireEnv('DATABASE_URL'),
  };
}
