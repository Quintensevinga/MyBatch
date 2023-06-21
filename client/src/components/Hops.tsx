import React from 'react';
import { FaTrash } from 'react-icons/fa';
import { Ingredient } from '../types';
interface HopsPageProps {
  allHops: Set<string>;
  addIN: (name: HTMLInputElement | null, qty: string, type: string) => void;
  hopsQuantity: string;
  setHopsQuantity: React.Dispatch<React.SetStateAction<string>>;
  ingredients: Ingredient[];

  handleDelete: (ingredientId: string) => void;
}

const Hops: React.FC<HopsPageProps> = ({ allHops, addIN, hopsQuantity, setHopsQuantity, ingredients, handleDelete }) => {
  return (
    <div className="malts ingridients">
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
          <button onClick={() => addIN(document.querySelector('.form-for-adding-hops select') as HTMLInputElement | null, hopsQuantity, 'hops')}>
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hops;
