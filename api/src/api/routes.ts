import { Router } from 'express';

export function buildRoutes(): Router {
  const router = Router();

  router.get('/health', (_req, res) => {
    res.status(200).json({ ok: true });
  });

  return router;
}
