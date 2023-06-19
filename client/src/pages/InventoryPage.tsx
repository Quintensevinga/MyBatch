import { useState, useEffect } from 'react';
import { createIngredients, getAllIngredients, deleteIngredient } from '../utils/ApiService';
import './InventoryPage.css';
import { FaTrash } from 'react-icons/fa';
import { ourRecipe, Ingredient } from '../types';
interface InventoryPageProps {
  allRecipes: ourRecipe[];
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
      allYeast.add(recipe.ingredients.yeast);
    });
  }
  const [ingredients, setIngredients] = useState<Ingredient[] | []>([]);
  useEffect(() => {
    refreshIngredients();
  }, []);

  const [hopsQuantity, setHopsQuantity] = useState('');
  const [maltsQuantity, setMaltsQuantity] = useState('');
  const [yeastQuantity, setYeastQuantity] = useState('');
  const [additionalQuantity, setAdditionalQuantity] = useState('');

  const resetFormInputs = () => {
    setHopsQuantity('');
    setMaltsQuantity('');
    setYeastQuantity('');
    setAdditionalQuantity('');
  };

  // functions to add ingridients(we are posting the topic to backend and update state)
  const addHops = () => {
    const hopsName = document.querySelector('.form-for-adding-hops select') as HTMLInputElement | null;

    if (hopsName === null || hopsQuantity === '') {
      alert('Please enter proper name and quantity for hops');
      return;
    }

    createIngredients(hopsName.value, hopsQuantity, 'hops')
      .then((hopsinfo) => {
        console.log(hopsinfo);
        refreshIngredients();
        resetFormInputs();
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const addMalts = () => {
    const maltsName = document.querySelector('.form-for-adding-malts select') as HTMLInputElement | null;
    if (maltsName === null || maltsQuantity === '') {
      alert('Please enter proper name and quantity for malts');
      return;
    }

    createIngredients(maltsName.value, maltsQuantity, 'malts')
      .then((maltsinfo) => {
        console.log(maltsinfo);
        refreshIngredients();
        resetFormInputs();
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const addYeast = () => {
    const yeastName = document.querySelector('.form-for-adding-yeast select') as HTMLInputElement | null;

    if (yeastName === null || yeastQuantity === '') {
      alert('Please enter proper name and quantity for yeast');
      return;
    }
    createIngredients(yeastName.value, yeastQuantity, 'yeast')
      .then((yeastinfo) => {
        console.log(yeastinfo);
        refreshIngredients();
        resetFormInputs();
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const addAddtionalIngredients = () => {
    const additionalIngredientName = document.querySelector('.form-for-adding-additions select') as HTMLInputElement | null;

    if (additionalIngredientName === null || additionalQuantity === '') {
      alert('Please enter proper name and quantity for additional ingreadients');
      return;
    }

    createIngredients(additionalIngredientName.value, additionalQuantity, 'additions')
      .then((additionalinfo) => {
        console.log(additionalinfo);
        refreshIngredients();
        resetFormInputs();
      })
      .catch((error) => {
        console.error('Error:', error);
      });
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

  const refreshIngredients = () => {
    getAllIngredients()
      .then((fetchedIngredients) => {
        console.log(fetchedIngredients);
        setIngredients(fetchedIngredients);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div className="inventoryPage">
      <h1>Your Inventory</h1>
      <div className="row1">
        <div className="hops ingridients">
          <h2>Hops</h2>
          <div className="container-for-ul-and-form">
            <ul className="yourHops" key="hops-list">
              {ingredients.map((ingredient) =>
                ingredient.type === 'hops' ? (
                  <li key={ingredient._id}>
                    {ingredient.name} {ingredient.amount}
                    <button className="deleteButton" onClick={() => handleDelete(ingredient._id)}>
                      <FaTrash className="deleteIcon" />
                    </button>
                  </li>
                ) : null
              )}
            </ul>
            <div className="form-for-adding-hops forms">
              <select className="hops-dd" required>
                <option></option>
                {Array.from(allHops).map((hop) => (
                  <option key={hop} value={hop}>
                    {hop}
                  </option>
                ))}
              </select>
              <br />
              <input
                type="text"
                placeholder="Quantity in grams"
                value={hopsQuantity}
                onChange={(e) => {
                  setHopsQuantity(e.target.value);
                }}
              ></input>
              <br />
              <button onClick={addHops}>Add</button>
            </div>
          </div>
        </div>
        <div className="malts ingridients">
          <h2>Malts</h2>
          <div className="container-for-ul-and-form">
            <ul className="yourmalts">
              {ingredients.map((ingredient) =>
                ingredient.type === 'malts' ? (
                  <li key={ingredient._id}>
                    {ingredient.name} {ingredient.amount}
                    <button className="deleteButton" onClick={() => handleDelete(ingredient._id)}>
                      <FaTrash className="deleteIcon" />
                    </button>
                  </li>
                ) : null
              )}
            </ul>
            <div className="form-for-adding-malts forms">
              <select>
                <option></option>
                {Array.from(allMalts).map((malt) => (
                  <option key={malt} value={malt}>
                    {malt}
                  </option>
                ))}
              </select>
              <br />
              <input
                type="text"
                placeholder="Quatity in kg"
                value={maltsQuantity}
                onChange={(e) => {
                  setMaltsQuantity(e.target.value);
                }}
              ></input>
              <br />
              <button onClick={addMalts}>Add</button>
            </div>
          </div>
        </div>
      </div>
      {/* **************** */}
      <div className="row2">
        <div className="yeast ingridients">
          <h2>Yeast</h2>
          <div className="container-for-ul-and-form">
            <ul className="youryeast">
              {ingredients.map((ingredient) =>
                ingredient.type === 'yeast' ? (
                  <li key={ingredient._id}>
                    {ingredient.name} {ingredient.amount}
                    <button className="deleteButton" onClick={() => handleDelete(ingredient._id)}>
                      <FaTrash className="deleteIcon" />
                    </button>
                  </li>
                ) : null
              )}
            </ul>
            <div className="form-for-adding-yeast forms">
              <select>
                <option></option>
                {Array.from(allYeast).map((yeast) => (
                  <option key={yeast} value={yeast}>
                    {yeast}
                  </option>
                ))}
              </select>
              <br />
              <input
                type="text"
                placeholder="Quatity in grams"
                value={yeastQuantity}
                onChange={(e) => {
                  setYeastQuantity(e.target.value);
                }}
              ></input>
              <br />
              <button onClick={addYeast}>Add</button>
            </div>
          </div>
        </div>
        <div className="Additions ingridients">
          <h2>Additional Ingredients</h2>
          <div className="container-for-ul-and-form">
            <ul className="yourAdditions">
              {ingredients.map((ingredient) =>
                ingredient.type === 'additions' ? (
                  <li key={ingredient._id}>
                    {ingredient.name} {ingredient.amount}
                    <button className="deleteButton" onClick={() => handleDelete(ingredient._id)}>
                      <FaTrash className="deleteIcon" />
                    </button>
                  </li>
                ) : null
              )}
            </ul>
            <div className="form-for-adding-additions forms">
              <select>
                <option></option>
                <option value="Cinnamon Stick">Cinnamon Stick</option>
                <option value="Ginger Root">Ginger Root</option>
                <option value="Peach puree">Peach puree</option>
              </select>
              <br />
              <input
                type="text"
                placeholder="Quatity in grams"
                value={additionalQuantity}
                onChange={(e) => {
                  setAdditionalQuantity(e.target.value);
                }}
              ></input>
              <br />
              <button onClick={addAddtionalIngredients}>Add</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventoryPage;
