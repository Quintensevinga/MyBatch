import mongoose from './db';

export interface Ingredients extends mongoose.Document {}
const Schema = mongoose.Schema;
const addIngredientSchema = new Schema({
  name: { type: String },
  amount: { type: String },
  type: { type: String },
});

const maltSchema = new Schema({
  name: { type: String },
  amount: { type: String },
});

const hopSchema = new Schema({
  name: { type: String },
  amount: { type: String },
  time: { type: String },
});

const beerRecipeSchema = new Schema({
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

const myRecipeSchema = new Schema({
  name: { type: String },
  style: { type: String },
  ingredients: {
    hops: [addIngredientSchema],
    malts: [addIngredientSchema],
    yeast: [addIngredientSchema],
  },
  instructions: { type: String },
});

const beerRecipe = mongoose.model('beerRecipe', beerRecipeSchema, 'ourrecipes');
const addIngredient = mongoose.model('addIngredient', addIngredientSchema);
const myRecipe = mongoose.model('myRecipe', myRecipeSchema, 'myrecipes');

export { beerRecipe, myRecipe, addIngredient };
