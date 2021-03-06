import serverless from 'serverless-http';
import express from 'express';
import { router } from '@src/routes';

const app = express();

app.use(router);

export const handler = serverless(app);
