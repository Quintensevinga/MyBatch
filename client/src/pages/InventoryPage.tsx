import React from 'react';
import { useState, useEffect } from "react";
import {
  createIngredients,
  getAllIngredients,
  deleteIngredient,
} from "../utils/ApiService";
import "./InventoryPage.css";
import { FaTrash } from "react-icons/fa";
import { Recipe, Ingredient } from "../types";

interface InventoryPageProps {
  allRecipes: Recipe[];
}

const InventoryPage: React.FC<InventoryPageProps> = ({ allRecipes }) => {
  const ourRecipes = allRecipes;
  // Options for DropDown lists
  const allHops = new Set<string>();
  const allMalts = new Set<string>();
  const allYeast = new Set<string>();

  if (ourRecipes) {
    ourRecipes.forEach((recipe) => {
      recipe.ingredients.hops.forEach((hop) => {
        allHops.add(hop.name);
      });
      recipe.ingredients.malts.forEach((malt) => {
        allMalts.add(malt.name);
      });
      allYeast.add(recipe.ingredients.yeast[0].name);
    });
  }
  
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  useEffect(() => {
    refreshIngredients();
  }, []);

  const [hopsQuantity, setHopsQuantity] = useState<string>('');
  const [maltsQuantity, setMaltsQuantity] = useState<string>('');
  const [yeastQuantity, setYeastQuantity] = useState<string>('');
  const [additionalQuantity, setAdditionalQuantity] = useState<string>('');

  const resetFormInputs = () => {
    setHopsQuantity('');
    setMaltsQuantity('');
    setYeastQuantity('');
    setAdditionalQuantity('');
  };

  const addHops = () => {
    const hopsName = (document.querySelector(
      ".form-for-adding-hops select"
    ) as HTMLSelectElement).value;
    if (hopsName === "" || !hopsQuantity) {
      alert("Please enter proper name and quantity for hops");
      return;
    }

    createIngredients(hopsName, parseInt(hopsQuantity), "hops")
      .then((hopsinfo) => {
        console.log(hopsinfo);
        refreshIngredients();
        resetFormInputs();
      })
      .catch((error: Error) => {
        console.error("Error:", error);
      });
  };

  const addMalts = () => {
    const maltsName = (document.querySelector(
      ".form-for-adding-malts select"
    ) as HTMLSelectElement).value;
    if (maltsName === "" || !maltsQuantity) {
      alert("Please enter proper name and quantity for malts");
      return;
    }

    createIngredients(maltsName, parseInt(maltsQuantity), "malts")
      .then((maltsinfo) => {
        console.log(maltsinfo);
        refreshIngredients();
        resetFormInputs();
      })
      .catch((error: Error) => {
        console.error("Error:", error);
      });
  };

  const addYeast = () => {
    const yeastName = (document.querySelector(
      ".form-for-adding-yeast select"
    ) as HTMLSelectElement).value;
    if (yeastName === "" || !yeastQuantity) {
      alert("Please enter proper name and quantity for yeast");
      return;
    }

    createIngredients(yeastName, parseInt(yeastQuantity), "yeast")
      .then((yeastinfo) => {
        console.log(yeastinfo);
        refreshIngredients();
        resetFormInputs();
      })
      .catch((error: Error) => {
        console.error("Error:", error);
      });
  };

  const refreshIngredients = () => {
    getAllIngredients()
      .then((data: Ingredient[]) => {
        setIngredients(data);
      })
      .catch((error: Error) => {
        console.error("Error:", error);
      });
  };

  const deleteIng = (id: string) => {
    deleteIngredient(id)
      .then(() => {
        refreshIngredients();
      })
      .catch((error: Error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="inventory-page">
      <h2>Inventory Page</h2>
      <div className="add-ingredients">
        <h3>Add Ingredients</h3>
        <div className="form-for-adding-hops">
          <select>
            <option value="" disabled selected>
              Select a hop
            </option>
            {Array.from(allHops).map((hop, index) => (
              <option key={index} value={hop}>
                {hop}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Quantity"
            value={hopsQuantity}
            onChange={(e) => setHopsQuantity(e.target.value)}
          />
          <button onClick={addHops}>Add</button>
        </div>
        <div className="form-for-adding-malts">
          <select>
            <option value="" disabled selected>
              Select a malt
            </option>
            {Array.from(allMalts).map((malt, index) => (
              <option key={index} value={malt}>
                {malt}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Quantity"
            value={maltsQuantity}
            onChange={(e) => setMaltsQuantity(e.target.value)}
          />
          <button onClick={addMalts}>Add</button>
        </div>
        <div className="form-for-adding-yeast">
          <select>
            <option value="" disabled selected>
              Select a yeast
            </option>
            {Array.from(allYeast).map((yeast, index) => (
              <option key={index} value={yeast}>
                {yeast}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Quantity"
            value={yeastQuantity}
            onChange={(e) => setYeastQuantity(e.target.value)}
          />
          <button onClick={addYeast}>Add</button>
        </div>
        <div className="form-for-adding-additional">
          <input
            type="text"
            placeholder="Additional Ingredient"
            value={additionalQuantity}
            onChange={(e) => setAdditionalQuantity(e.target.value)}
          />
          <button>Add</button>
        </div>
      </div>
      <div className="ingredient-list">
        <h3>Ingredients List</h3>
        <ul>
          {ingredients.map((ingredient) => (
            <li key={ingredient._id}>
              {ingredient.name} - {ingredient.amount}
              <FaTrash
                className="delete-icon"
                onClick={() => deleteIng(ingredient._id)}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default InventoryPage;
