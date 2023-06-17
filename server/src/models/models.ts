import { Document, Schema } from 'mongoose';
import mongoose from './db';
import { Ingredients, BeerIngredients, RecipeInter } from './interfaces';

export interface IngredientsModel extends Ingredients, Document {}

const addIngredientSchema: Schema = new Schema({
  name: { type: String },
  amount: { type: String },
  type: { type: String },
});

const maltSchema: Schema = new Schema({
  name: { type: String },
  amount: { type: String },
});

const hopSchema: Schema = new Schema({
  name: { type: String },
  amount: { type: String },
  time: { type: String },
});

export interface BeerModel extends BeerIngredients, Document {}

const beerRecipeSchema: Schema = new Schema({
  name: { type: String },
  style: { type: String },
  description: { type: String },
  batchSize: { type: String },
  ingredients: {
    malts: [maltSchema],
    hops: [hopSchema],
    yeast: { type: String },
  },
  instructions: [String],
});
export interface RecipeModel extends RecipeInter, Document {}
const myRecipeSchema: Schema = new Schema({
  name: { type: String },
  style: { type: String },
  ingredients: {
    hops: [addIngredientSchema],
    malts: [addIngredientSchema],
    yeast: [addIngredientSchema],
  },
  instructions: { type: String },
});

const beerRecipe = mongoose.model<BeerModel>('beerRecipe', beerRecipeSchema, 'ourrecipes');
const addIngredient = mongoose.model<IngredientsModel>('addIngredient', addIngredientSchema);
const myRecipe = mongoose.model<RecipeModel>('myRecipe', myRecipeSchema, 'myrecipes');

export { beerRecipe, myRecipe, addIngredient };
