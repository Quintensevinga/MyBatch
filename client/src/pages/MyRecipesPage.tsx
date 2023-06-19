import React from 'react';
import { useEffect, useState } from 'react';
import './RecipesPages.css';
import { postMyRecipe } from '../utils/ApiService';
import { ourRecipe, myRecipe } from '../types';
import { FaTrash } from 'react-icons/fa';
import { deleteRecipe } from '../utils/ApiService';
interface MyRecipesPageProps {
  myRecipes: myRecipe[];
  allRecipes: ourRecipe[];
}

interface ingredientsAr {
  name: string;
  amount: string;
}

export interface postRecipeType {
  name: string;
  style: string;
  ingredients: {
    hops: ingredientsAr[];
    malts: ingredientsAr[];
    yeast: ingredientsAr[];
  };
  instructions: string;
}
const MyRecipesPage: React.FC<MyRecipesPageProps> = ({ myRecipes, allRecipes }) => {
  const [allMyRecipes, setMyRecipes] = useState<myRecipe[]>([...myRecipes]);
  const [recipeName, setRecipeName] = useState('');
  const [beerStyle, setBeerStyle] = useState('');

  const allHops = new Set<string>();
  const allMalts = new Set<string>();
  const allYeast = new Set<string>();

  if (allRecipes) {
    allRecipes.forEach((recipe) => {
      recipe.ingredients.hops.forEach((hop) => {
        allHops.add(hop.name);
      });
      recipe.ingredients.malts.forEach((malt) => {
        allMalts.add(malt.name);
      });
      allYeast.add(recipe.ingredients.yeast);
    });
  }
  const [instructions, setInstructions] = useState('');
  const [hopsName, setHopsName] = useState('');
  const [hopsQuantity, setHopsQuantity] = useState('');
  const [maltsName, setMaltsName] = useState('');
  const [maltsQuantity, setMaltsQuantity] = useState('');
  const [yeastName, setYeastName] = useState('');
  const [yeastQuantity, setYeastQuantity] = useState('');
  const [selectedRecipe, setSelectedRecipe] = useState<myRecipe | null>(null);

  useEffect(() => {
    setMyRecipes([...myRecipes]);
  }, [myRecipes]);
  console.log(allMyRecipes);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const postRecipe: postRecipeType = {
      name: recipeName,
      style: beerStyle,
      instructions: instructions,
      ingredients: {
        hops: [{ name: hopsName, amount: hopsQuantity }],
        malts: [{ name: maltsName, amount: maltsQuantity }],
        yeast: [{ name: yeastName, amount: yeastQuantity }],
      },
    };
    try {
      const savedRecipe = await postMyRecipe(postRecipe);
      console.log(savedRecipe);
      setMyRecipes((prevRecipes) => [...prevRecipes, savedRecipe]);
    } catch (err) {
      console.log(err);
    }
  };
  const handleRecipeClick = (recipe: myRecipe) => {
    setSelectedRecipe(recipe);
  };

  const handleDelete = (Id: string) => {
    deleteRecipe(Id)
      .then((response) => {
        setMyRecipes((prevRecipe) => prevRecipe.filter((recipe) => recipe._id !== Id));
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div className="container">
      <div className="first-half">
        <div className="my-recipes-form">
          <h2 style={{ fontFamily: 'cursive' }}>Release creativity, create your own recipe</h2>
          {/* Form */}
          <form onSubmit={handleSubmit} className="new-recipe-form">
            <div className="left-side">
              <label>Name</label>
              <br />
              <input
                type="text"
                value={recipeName}
                onChange={(e) => {
                  setRecipeName(e.target.value);
                }}
                required
              ></input>
              <br />
              <label>Beer Style</label>
              <br />
              <input
                type="text"
                value={beerStyle}
                onChange={(e) => {
                  setBeerStyle(e.target.value);
                }}
                required
              ></input>
              <br />
              <label>Add Your Instructions here</label>
              <br />
              <textarea
                value={instructions}
                onChange={(e) => {
                  setInstructions(e.target.value);
                }}
                required
              ></textarea>
              <br />
              <button type="submit" className="create-recipe-btn">
                Create Recipe
              </button>
            </div>
            <div className="right-side">
              <h3>Ingredients</h3>
              <label>Hops</label>
              <select value={hopsName} onChange={(e) => setHopsName(e.target.value)} required>
                <option></option>
                {Array.from(allHops).map((hop) => (
                  <option key={hop} value={hop}>
                    {hop}
                  </option>
                ))}
              </select>
              <label>Qty</label>
              <input type="text" value={hopsQuantity} onChange={(e) => setHopsQuantity(e.target.value)} required></input>
              <br />
              <label>Malts</label>
              <select value={maltsName} onChange={(e) => setMaltsName(e.target.value)} required>
                <option></option>
                {Array.from(allMalts).map((malt) => (
                  <option key={malt} value={malt}>
                    {malt}
                  </option>
                ))}
              </select>
              <label>Qty</label>
              <input type="text" value={maltsQuantity} onChange={(e) => setMaltsQuantity(e.target.value)} required></input>
              <br />
              <label>Yeast</label>
              <select value={yeastName} onChange={(e) => setYeastName(e.target.value)} required>
                <option></option>
                {Array.from(allYeast).map((yeast) => (
                  <option key={yeast} value={yeast}>
                    {yeast}
                  </option>
                ))}
              </select>
              <br />
              <label>Qty</label>
              <input type="text" value={yeastQuantity} onChange={(e) => setYeastQuantity(e.target.value)} required></input>
            </div>
          </form>
          {/* Form */}
        </div>
        <div className="my-recipe-list">
          <h2>Your recipe list</h2>
          <ul className="my-recipes">
            {allMyRecipes &&
              allMyRecipes.map((recipe: myRecipe) => (
                <li className="your-list-li" key={recipe._id} onClick={() => handleRecipeClick(recipe)}>
                  <span className="my-recipe-name">
                    {recipe.name}
                    <br />
                  </span>
                  <span className="my-recipe-style">
                    {recipe.style}

                    <button className="deleteB" onClick={() => handleDelete(recipe._id)}>
                      <FaTrash className="deleteI" />
                    </button>
                  </span>
                </li>
              ))}
          </ul>
        </div>
      </div>
      <div className="my-recipe-details">
        <h1>Details</h1>
        {selectedRecipe && (
          <div>
            <h2>
              {selectedRecipe?.name}({selectedRecipe?.style})
            </h2>

            <h3>Ingredients:</h3>
            <ul>
              {selectedRecipe.ingredients.hops.map((hop, index) => (
                <li key={index}>
                  {hop.name}: {hop.amount}
                </li>
              ))}
              {selectedRecipe.ingredients.malts.map((malt, index) => (
                <li key={index}>
                  {malt.name}: {malt.amount}
                </li>
              ))}
              <li>
                Yeast: {selectedRecipe.ingredients.yeast[0].name}, {selectedRecipe.ingredients.yeast[0].amount}
              </li>
            </ul>
            <h3>Instructions:</h3>
            <p>{selectedRecipe.instructions}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyRecipesPage;
