import express, { Express, Request, Response } from 'express';
import routes from './routes';
import cors from 'cors';
export function createServer() {
  const app: Express = express();
  app.use(cors({ origin: true }));
  app.use(express.json());
  routes(app);
  return app;
}
