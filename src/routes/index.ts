import { Router } from 'express';

const router = Router();

router.get('/', (_req, res) =>
  res.status(200).json({
    message: 'Hello from root!',
  }),
);

router.get('/hello', (_req, res) =>
  res.status(200).json({
    message: 'Hello from path!',
  }),
);

router.use((_req, res) =>
  res.status(404).json({
    error: 'Not Found',
  }),
);
export { router };
