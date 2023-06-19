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
export interface malt {
  _id: string;
  name: string;
  amount: string;
}

export interface hopsi {
  _id: string;
  name: string;
  amount: string;
  time: string;
}

// export interface yeasti {
//   _id: string;
//   yeast: string;
// }

export interface ingredients {
  malts: malt;
  hops: hopsi;
  yeast: string;
}

export interface ourRecipe {
  _id: string;
  name: string;
  style: string;
  description: string;
  batchSize: string;
  ingredients: {
    malts: malt[];
    hops: hopsi[];
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
export interface myRecipe {
  _id: string;
  name: string;
  style: string;
  ingredients: {
    hops: hopsi[];
    malts: malt[];
    yeast: Ingredient[];
  };
  instructions: string[];
}
