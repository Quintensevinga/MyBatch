export interface Ingredient {
  _id: string;
  name: string;
  amount: string;
  type: string;
}

export interface Recipe {
  _id: string;
  name: string;
  style: string;
  instructions: string;
  ingredients: {
    hops: Ingredient[];
    malts: Ingredient[];
    yeast: Ingredient[];
  };
}



