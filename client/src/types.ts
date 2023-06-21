export interface Ingredient {
  _id: string;
  name: string;
  amount: string;
  type: string;
}

// export interface Recipe {
//   _id: string;
//   name: string;
//   style: string;
//   instructions: string;
//   ingredients: {
//     hops: Ingredient[];
//     malts: Ingredient[];
//     yeast: Ingredient[];
//   };
// }

// interface our Recipes
export interface Malt {
  _id: string;
  name: string;
  amount: string;
}

export interface Hopsi {
  _id: string;
  name: string;
  amount: string;
  time: string;
}

// export interface yeasti {
//   _id: string;
//   yeast: string;
// }

export interface Ingredients {
  malts: Malt;
  hops: Hopsi;
  yeast: string;
}

export interface OurRecipe {
  _id: string;
  name: string;
  style: string;
  description: string;
  batchSize: string;
  ingredients: {
    malts: Malt[];
    hops: Hopsi[];
    yeast: string;
  };
  instructions: string[];
}

// interface my Recipes

// export interface IngredientRe {
//   name: string;
//   amount: string;
//   type: string;
// }
export interface MyRecipe {
  _id: string;
  name: string;
  style: string;
  ingredients: {
    hops: Hopsi[];
    malts: Malt[];
    yeast: Ingredient[];
  };
  instructions: string[];
}
