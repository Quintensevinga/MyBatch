import { useState, useEffect } from 'react';
import { createIngredients, getAllIngredients, deleteIngredient } from '../utils/ApiService';
import './InventoryPage.css';
import { OurRecipe, Ingredient } from '../types';
import Hops from '../components/Hops';
import Malts from '../components/Malts';
import Yeast from '../components/Yeast';
import Additional from '../components/Additional';
interface InventoryPageProps {
  allRecipes: OurRecipe[] | null;
}

const InventoryPage: React.FC<InventoryPageProps> = ({ allRecipes }) => {
  const [hopsQuantity, setHopsQuantity] = useState('');
  const [maltsQuantity, setMaltsQuantity] = useState('');
  const [yeastQuantity, setYeastQuantity] = useState('');
  const [additionalQuantity, setAdditionalQuantity] = useState('');
  const [ingredients, setIngredients] = useState<Ingredient[] | []>([]);

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
      allYeast.add(recipe.ingredients.yeast);
    });
  }

  useEffect(() => {
    refreshIngredients();
  }, []);

  const refreshIngredients = () => {
    getAllIngredients()
      .then((fetchedIngredients) => {
        setIngredients(fetchedIngredients);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const resetFormInputs = () => {
    setHopsQuantity('');
    setMaltsQuantity('');
    setYeastQuantity('');
    setAdditionalQuantity('');
  };

  const handleDelete = (ingredientId: string) => {
    deleteIngredient(ingredientId)
      .then((response) => {
        setIngredients((prevIngredients) => prevIngredients.filter((ingredient) => ingredient._id !== ingredientId));
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  // functions to add ingredients(we are posting the topic to backend and update state)

  const addIN = (name: HTMLInputElement | null, qty: string, type: string) => {
    if (name === null || qty === '') {
      alert('Please enter proper name and quantity for yeast');
      return;
    }
    createIngredients(name.value, qty, type)
      .then((info) => {
        console.log(info);
        refreshIngredients();
        resetFormInputs();
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div className="inventoryPage">
      <h1>Your Inventory</h1>
      <div className="row1">
        <Hops
          allHops={allHops}
          addIN={addIN}
          hopsQuantity={hopsQuantity}
          setHopsQuantity={setHopsQuantity}
          ingredients={ingredients}
          handleDelete={handleDelete}
        />

        <Malts
          allMalts={allMalts}
          addIN={addIN}
          maltsQuantity={maltsQuantity}
          setMaltsQuantity={setMaltsQuantity}
          ingredients={ingredients}
          handleDelete={handleDelete}
        ></Malts>
      </div>
      {/* **************** */}
      <div className="row2">
        <Yeast
          allYeast={allYeast}
          addIN={addIN}
          yeastQuantity={yeastQuantity}
          setYeastQuantity={setYeastQuantity}
          ingredients={ingredients}
          handleDelete={handleDelete}
        />
        <Additional
          ingredients={ingredients}
          handleDelete={handleDelete}
          addIN={addIN}
          setAdditionalQuantity={setAdditionalQuantity}
          additionalQuantity={additionalQuantity}
        />
      </div>
    </div>
  );
};

export default InventoryPage;
