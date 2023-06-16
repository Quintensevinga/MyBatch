import { Express, Request, Response } from 'express';
import { getAllIngredients, createIngredients, deleteIngredient, getOurRecipes, getMyRecipes, postMyRecipe } from './controllers';
function routes(app: Express) {
  app.get('/heal', (req: Request, res: Response) => {
    res.sendStatus(200);
  });
  app.get('/', function (req, res) {
    res.send('MyBatch express is here ssnow');
  });

  app.get('/inventory', getAllIngredients);
  app.post('/inventory', createIngredients);
  app.delete('/inventory/:id', deleteIngredient);
  app.get('/our-recipes', getOurRecipes);
  app.get('/my-recipes', getMyRecipes);
  app.post('/my-recipes', postMyRecipe);
}

export default routes;
