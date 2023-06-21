import { Express, Request, Response } from 'express';
import { getAllIngredients, createIngredients, deleteIngredient, getOurRecipes, getMyRecipes, postMyRecipe, deleteRecipe } from './controllers/controllers';
import { loginHandler, registerHandler } from './controllers/authControllers';
import authMiddleware from './middlewares/auth';

function routes(app: Express) {
  app.post('/api/login', loginHandler);
  app.post('/api/register', registerHandler);

  app.get('/inventory', getAllIngredients);
  app.post('/inventory', authMiddleware, createIngredients);
  app.delete('/inventory/:id', authMiddleware, deleteIngredient);
  app.get('/our-recipes', getOurRecipes);
  app.get('/my-recipes', authMiddleware, getMyRecipes);
  app.post('/my-recipes', authMiddleware, postMyRecipe);
  app.delete('/my-recipes/:id', authMiddleware, deleteRecipe);
}

export default routes;


  // app.get('/health', (req: Request, res: Response) => {
  //   res.sendStatus(200);
  // });
  // app.get('/users', (req: Request, res: Response): void => {
  //   let users = ['Goon', 'Tsuki', 'Joe'];
  //   res.status(200).send(users);
  // });
  // app.get('/test', async (req, res) => {
  //   res.json({ message: 'pass!' });
  // });
  // app.post('/users', async (req, res) => {
  //   const { password, username } = req.body;
  //   if (!username || !password) {
  //     res.sendStatus(400);
  //     return;
  //   }
  //   res.send({ username, password });
  // });