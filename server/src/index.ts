import express, { Express, Request, Response } from 'express';
import routes from './routes';
const app: Express = express();
const PORT = 3500;

import cors from 'cors';

app.use(cors({ origin: true }));
app.use(express.json());

app.listen(PORT, function () {
  console.log('MyBatch server listening on port ' + PORT);
});

export const ToRoutes = () => {
  routes(app);
};
