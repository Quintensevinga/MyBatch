import { Express, Request, Response } from 'express';

import { getAllIngredients, createIngredients, deleteIngredient, getOurRecipes, getMyRecipes, postMyRecipe } from './controllers';

function routes(app: Express) {
  app.get('/health', (req: Request, res: Response) => {
    res.sendStatus(200);
  });
  app.get('/users', (req: Request, res: Response): void => {
    let users = ['Goon', 'Tsuki', 'Joe'];
    res.status(200).send(users);
  });
  app.get('/test', async (req, res) => {
    res.json({ message: 'pass!' });
  });
  app.get('/inventory', getAllIngredients);
  app.post('/inventory', createIngredients);
  app.delete('/inventory/:id', deleteIngredient);
  app.get('/our-recipes', getOurRecipes);
  app.get('/my-recipes', getMyRecipes);
  app.post('/my-recipes', postMyRecipe);
}

export default routes;
