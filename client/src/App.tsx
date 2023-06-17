import "./App.css";
import React from 'react';
import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import InventoryPage from "./pages/InventoryPage";
import OurRecipesPage from "./pages/OurRecipesPage";
import MyRecipesPage from "./pages/MyRecipesPage";
import Homepage from "./pages/HomePage";
import { getOurRecipes, getMyRecipes } from "./utils/ApiService";
import { useState, useEffect } from "react";
import { Recipe } from './types';

interface MyRecipesPageProps {
  myRecipes: Recipe[];
  allRecipes: Recipe[];
} 

const App: React.FC<MyRecipesPageProps> = () => {
  const [allRecipes, setAllRecipes] = useState<Recipe[]>([]);
  const [myRecipes, setMyRecipies] = useState<Recipe[]>([]);
  useEffect(() => {
    getOurRecipes().then((fetchedRecipes: Recipe[]) => {
      setAllRecipes(fetchedRecipes);
    });
    getMyRecipes().then((fetchedMyRecipes: Recipe[]) => {
      setMyRecipies(fetchedMyRecipes);
    });
  }, []);

  return (
    <div className="App">
      <NavBar></NavBar>
      <Routes>
        <Route path="/" element={<Homepage></Homepage>}></Route>
        <Route
          path="/inventory"
          element={<InventoryPage allRecipes={allRecipes}></InventoryPage>}
        ></Route>
        <Route
          path="/our-recipes"
          element={<OurRecipesPage allRecipes={allRecipes}></OurRecipesPage>}
        ></Route>
        <Route
          path="/my-recipes"
          element={
            <MyRecipesPage
              allRecipes={allRecipes}
              myRecipes={myRecipes}
            ></MyRecipesPage>
          }
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
