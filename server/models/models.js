const { mongoose } = require("./db");

const Schema = mongoose.Schema;

const addIngredientSchema = new Schema({
  name: String,
  amount: String,
  type: String,
});

const maltSchema = new Schema({
  name: String,
  amount: String,
});

const hopSchema = new Schema({
  name: String,
  amount: String,
  time: String,
});

const beerRecipeSchema = new Schema({
  name: String,
  style: String,
  description: String,
  batchSize: String,
  ingredients: {
    malts: [maltSchema],
    hops: [hopSchema],
    yeast: String,
  },
  instructions: [String],
});

const myRecipeSchema = new Schema({
  name: String,
  style: String,
  ingredients: {
    hops: [addIngredientSchema],
    malts: [addIngredientSchema],
    yeast: [addIngredientSchema],
  },
  instructions: String,
});

const beerRecipe = mongoose.model("beerRecipe", beerRecipeSchema, "ourrecipes");
const addIngredient = mongoose.model("addIngredient", addIngredientSchema);
const myRecipe = mongoose.model("myRecipe", myRecipeSchema, "myrecipes");

module.exports = { beerRecipe, addIngredient, myRecipe };
