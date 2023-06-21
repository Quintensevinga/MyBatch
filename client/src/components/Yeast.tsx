import React from 'react';
import { Ingredient } from '../types';

import { FaTrash } from 'react-icons/fa';
interface YeastPageProps {
  allYeast: Set<string>;
  addIN: (name: HTMLInputElement | null, qty: string, type: string) => void;
  yeastQuantity: string;
  setYeastQuantity: React.Dispatch<React.SetStateAction<string>>;
  ingredients: Ingredient[];
  handleDelete: (ingredientId: string) => void;
}

const Yeast: React.FC<YeastPageProps> = ({ ingredients, handleDelete, allYeast, yeastQuantity, setYeastQuantity, addIN }) => {
  return (
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

          <button onClick={() => addIN(document.querySelector('.form-for-adding-yeast select') as HTMLInputElement | null, yeastQuantity, 'yeast')}>
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default Yeast;
