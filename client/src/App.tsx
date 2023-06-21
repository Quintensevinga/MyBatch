import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import InventoryPage from './pages/InventoryPage';
import OurRecipesPage from './pages/OurRecipesPage';
import MyRecipesPage from './pages/MyRecipesPage';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import { getOurRecipes, getMyRecipes } from './utils/ApiService';
import { ourRecipe, myRecipe } from './types';

const App: React.FC = () => {
  const [allRecipes, setAllRecipes] = useState<ourRecipe[]>([]);
  const [myRecipes, setMyRecipes] = useState<myRecipe[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      setIsLoggedIn(true);
      console.log(accessToken);
      getOurRecipes().then((fetchedRecipes) => {
        setAllRecipes(fetchedRecipes);
      });
      getMyRecipes().then((fetchedMyRecipes) => {
        setMyRecipes(fetchedMyRecipes);
      });
    }
  }, []);

  if (!isLoggedIn) {
    return <AuthPage />;
  }

  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/inventory" element={<InventoryPage allRecipes={allRecipes} />} />
        <Route path="/our-recipes" element={<OurRecipesPage allRecipes={allRecipes} />} />
        <Route path="/my-recipes" element={<MyRecipesPage allRecipes={allRecipes} myRecipes={myRecipes} />} />
      </Routes>
    </div>
  );
};

export default App;
