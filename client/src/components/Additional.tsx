import React from 'react';
import { FaTrash } from 'react-icons/fa';
import { Ingredient } from '../types';
interface AdditionalPageProps {
  additionalQuantity: string;
  setAdditionalQuantity: React.Dispatch<React.SetStateAction<string>>;
  ingredients: Ingredient[];
  addIN: (name: HTMLInputElement | null, qty: string, type: string) => void;
  handleDelete: (ingredientId: string) => void;
}

const Additional: React.FC<AdditionalPageProps> = ({
  ingredients,
  handleDelete,
  addIN,

  setAdditionalQuantity,
  additionalQuantity,
}) => {
  return (
    <div className="Additions ingridients">
      <h2>Additional Ingredients</h2>
      <div className="container-for-ul-and-form">
        <ul className="yourAdditions">
          {ingredients.map((ingredient) =>
            ingredient.type === 'additions' ? (
              <li key={ingredient._id}>
                {ingredient.name} {ingredient.amount}
                <button data-testid="delitem" className="deleteButton" onClick={() => handleDelete(ingredient._id)}>
                  <FaTrash className="deleteIcon" />
                </button>
              </li>
            ) : null
          )}
        </ul>
        <div className="form-for-adding-additions forms">
          <select className="additonalIng">
            <option></option>
            <option value="Cinnamon Stick">Cinnamon Stick</option>
            <option value="Ginger Root">Ginger Root</option>
            <option value="Peach puree">Peach puree</option>
          </select>
          <br />
          <input
            type="text"
            placeholder="Quantity in grams"
            value={additionalQuantity}
            onChange={(e) => {
              setAdditionalQuantity(e.target.value);
            }}
          ></input>
          <br />
          <button
            className="fortest"
            onClick={() =>
              addIN(document.querySelector('.form-for-adding-additions select') as HTMLInputElement | null, additionalQuantity, 'additions')
            }
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default Additional;
