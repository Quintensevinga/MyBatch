import { PostRecipeType } from '../pages/MyRecipesPage';

const baseUrl = 'http://localhost:3500';

export const getAllIngredients = async () => {
  try {
    const response = await fetch(baseUrl + '/inventory');
    return response.json();
  } catch (error) {
    console.log(error);
  }
};

export const createIngredients = (ingName: string, ingAmount: string, ingType: string) =>
  fetch(baseUrl + '/inventory', {
    method: 'POST',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: ingName,
      amount: ingAmount,
      type: ingType,
    }),
  });

export async function getOurRecipes() {
  try {
    const response = await fetch(baseUrl + '/our-recipes');
    if (!response.ok) {
      throw new Error('Failed to fetch');
    }
    return response.json();
  } catch (error: any) {
    if (error instanceof TypeError && error.message.includes('API key')) {
      console.error('Invalid API key:', error);
    } else {
      console.error('There was a problem with the Fetch operation:', error);
    }
  }
}

export async function deleteIngredient(ingredientId: string) {
  fetch('http://localhost:3500/inventory/' + ingredientId, {
    method: 'DELETE',
    mode: 'cors',
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

export const getMyRecipes = async () => {
  try {
    const response = await fetch('http://localhost:3500/my-recipes');
    if (!response.ok) {
      throw new Error('Failed to fetch recipes');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof TypeError && error.message.includes('API key')) {
      console.error('Invalid API key:', error);
    } else {
      console.error('There was a problem with the Fetch operation:', error);
    }
  }
};

export async function postMyRecipe(recipeData: PostRecipeType) {
  try {
    const response = await fetch('http://localhost:3500/my-recipes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(recipeData),
    });
    return response.json();
  } catch (err) {
    console.log(err);
  }
}

export async function deleteRecipe(recipeId: string) {
  fetch('http://localhost:3500/my-recipes/' + recipeId, {
    method: 'DELETE',
    mode: 'cors',
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}
