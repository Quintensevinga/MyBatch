export interface Ingredients {
  name: string;
  amount: string;
  type: string;
}

export interface malt {
  name: string;
  amount: string;
}

export interface hopsi {
  name: string;
  amount: string;
  time: string;
}

export interface yeasti {
  yeast: string;
}

export interface ingredients {
  malts: malt;
  hops: hopsi;
  yeast: yeasti;
}

export interface BeerIngredients extends ingredients {
  name: string;
  style: string;
  description: string;
  instructions: string;
}

export interface ingredientsRecipe {
  malts: Ingredients;
  hops: Ingredients;
  yeast: Ingredients;
}

export interface RecipeInter extends ingredientsRecipe {
  name: string;
  style: string;
  ingredients: string;
  instructions: string;
}
