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
import { ourRecipe, myRecipe } from './types';

interface MyRecipesPageProps {
  myRecipes: myRecipe[];
  allRecipes: ourRecipe[];
}

const App: React.FC<MyRecipesPageProps> = () => {
  const [allRecipes, setAllRecipes] = useState<ourRecipe[]>([]);
  const [myRecipes, setMyRecipes] = useState<myRecipe[]>([]);
  useEffect(() => {
    getOurRecipes().then((fetchedRecipes) => {
      setAllRecipes(fetchedRecipes);
    });
    getMyRecipes().then((fetchedMyRecipes) => {
      setMyRecipes(fetchedMyRecipes);
    });
  }, []);

  return (
    <div className="App">
      <NavBar></NavBar>
      <Routes>
        <Route path="/" element={<Homepage></Homepage>}></Route>
        <Route path="/inventory" element={<InventoryPage allRecipes={allRecipes}></InventoryPage>}></Route>
        <Route path="/our-recipes" element={<OurRecipesPage allRecipes={allRecipes}></OurRecipesPage>}></Route>
        <Route path="/my-recipes" element={<MyRecipesPage allRecipes={allRecipes} myRecipes={myRecipes}></MyRecipesPage>}></Route>
      </Routes>
    </div>
  );
};

export default App;
