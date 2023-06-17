import express, { Express, Request, Response } from 'express';
import { letConnect } from './models/db';
const PORT = 3500;

import { createServer } from './server';

letConnect().then(() => {
  const app: Express = createServer(); // new
  app.listen(PORT, () => {
    console.log('Server has started!');
  });
});
