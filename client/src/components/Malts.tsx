import React from 'react';
import { Ingredient } from '../types';

import { FaTrash } from 'react-icons/fa';
interface MaltsPageProps {
  allMalts: Set<string>;
  addIN: (name: HTMLInputElement | null, qty: string, type: string) => void;
  maltsQuantity: string;
  setMaltsQuantity: React.Dispatch<React.SetStateAction<string>>;
  ingredients: Ingredient[];
  handleDelete: (ingredientId: string) => void;
}

const Malts: React.FC<MaltsPageProps> = ({ allMalts, addIN, maltsQuantity, setMaltsQuantity, ingredients, handleDelete }) => {
  return (
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
          <button onClick={() => addIN(document.querySelector('.form-for-adding-malts select') as HTMLInputElement | null, maltsQuantity, 'malts')}>
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default Malts;
