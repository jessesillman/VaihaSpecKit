import 'dotenv/config';

import express from 'express';

import { toPublicError } from './api/errors/http-errors';
import { requestLogging } from './api/middleware/request-logging';
import { buildRoutes } from './api/routes';
import { loadConfig } from './config';

const config = loadConfig();

const app = express();
app.disable('x-powered-by');

app.use(express.json({ limit: '256kb' }));
app.use(requestLogging);
app.use(buildRoutes());

// Error handler
app.use((err: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  const { status, body } = toPublicError(err);
  res.status(status).json(body);
});

app.listen(config.port, () => {
  console.log(`API listening on http://localhost:${config.port}`);
});
