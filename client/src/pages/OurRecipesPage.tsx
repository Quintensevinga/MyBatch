import { getOurRecipes } from "../utils/ApiService";
import { useState, useEffect } from "react";
import "./RecipesPages.css";

function OurRecipesPage({ allRecipes }) {
  const ourRecipes = allRecipes;

  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const handleRecipeClick = (recipe) => {
    setSelectedRecipe(recipe);
  };

  return (
    <div className="our-recipes ">
      <div className="recipe-list contaners">
        <h2 style={{ fontFamily: "cursive" }}>
          Here are some one our most popular recipes
        </h2>
        {ourRecipes && (
          <ul className="ourRecipes">
            {allRecipes.map((recipe) => (
              <li
                key={recipe._id}
                onClick={() => handleRecipeClick(recipe)}
                className={selectedRecipe === recipe ? "active-recipe" : ""}
              >
                <h3>{recipe.name}</h3>
                <p>{recipe.description}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="recipe-instruction contaners">
        <h2>Details</h2>
        {selectedRecipe && (
          <div className="ing-details">
            <h3>Hops</h3>
            <ul className="ing-ul">
              {selectedRecipe.ingredients.hops.map((hop) => (
                <li key={hop._id}>
                  {hop.name} {hop.amount} Adding time: {hop.time}
                </li>
              ))}
            </ul>
            <h3>Yeast</h3>
            <ul className="ing-ul">
              <li>{selectedRecipe.ingredients.yeast}</li>
            </ul>
            <h3>Malts</h3>
            <ul className="ing-ul">
              {selectedRecipe.ingredients.malts.map((malt) => (
                <li key={malt._id}>
                  {malt.name} {malt.amount}
                </li>
              ))}
            </ul>
            <h2>Recipe instructions</h2>
            <ul>
              {selectedRecipe.instructions.map((instruction) => (
                <li key={instruction}>{instruction}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default OurRecipesPage;
