import './App.css';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import InventoryPage from './pages/InventoryPage';
import OurRecipesPage from './pages/OurRecipesPage';
import MyRecipesPage from './pages/MyRecipesPage';
import Homepage from './pages/HomePage';
import { getOurRecipes, getMyRecipes } from './utils/ApiService';
import { useState, useEffect } from 'react';
import { OurRecipe, MyRecipe } from './types';

interface MyRecipesPageProps {
  myRecipes: MyRecipe[];
  allRecipes: OurRecipe[];
}

const App: React.FC<MyRecipesPageProps> = () => {
  const [allRecipes, setAllRecipes] = useState<OurRecipe[]>([]);
  const [myRecipes, setMyRecipes] = useState<MyRecipe[]>([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    setError(false);
    getOurRecipes().then((fetchedRecipes) => {
      const ourR = fetchedRecipes;
      if (!ourR) {
        setError(true);
      }
      setAllRecipes(fetchedRecipes);
    });
    getMyRecipes().then((fetchedMyRecipes) => {
      const myR = fetchedMyRecipes;
      if (!myR) {
        setError(true);
      }
      setMyRecipes(fetchedMyRecipes);
    });
    setIsLoading(false);
  }, []);

  return (
    <div className="App">
      {isLoading && <p>Loading...</p>}
      <div>
        {error ? (
          <p>An error occurred, Server maybe down. Please try later</p>
        ) : (
          <>
            <NavBar />
            <Routes>
              <Route path="/" element={<Homepage />}></Route>
              <Route path="/inventory" element={<InventoryPage allRecipes={allRecipes} />}></Route>
              <Route path="/our-recipes" element={<OurRecipesPage allRecipes={allRecipes} />}></Route>
              <Route path="/my-recipes" element={<MyRecipesPage allRecipes={allRecipes} myRecipes={myRecipes} />}></Route>
            </Routes>
          </>
        )}
      </div>
    </div>
  );
};

export default App;
