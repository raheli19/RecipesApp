import React from "react";
import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import MealPlanner from "./pages/MealPlanner";
import Home from "./pages/Home";
import Settings from "./pages/Settings";
import Recipes from "./pages/Recipes";
import Posts from "./pages/Posts";
import Logout from "./pages/Logout";
import Todos from "./pages/Todos";
import ProtectedRoutes from "./pages/ProtectedRoutes";
import Register from "./pages/Register";
import Timer from "./pages/Timer";
import ManageRecipes from "./pages/ManageRecipes";
import NewPost from "./pages/NewPost";
import RecipeDetail from "./pages/RecipeDetail";
import AddRecipe from "./pages/AddRecipe";
import ShoppingList from "./pages/ShoppingList";
import ManageUsers from "./pages/ManageUsers";
import MainLayout from "./layout/MainLayout";
import { UserProvider } from "./context/UserContext";
import Favorite from "./pages/Favorite";
import "./App.css";

export default function App() {
  return (
    <UserProvider>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<ProtectedRoutes />}>
              <Route path="/" element={<MainLayout />}>
                <Route index element={<Navigate to="/home" />} />
                <Route path="/home" element={<Home />} />
                <Route path="/recipe/:id" element={<RecipeDetail />} />
                <Route path="/Settings" element={<Settings />} />
                <Route path="/Todos/:userId" element={<Todos />} />
                <Route path="/Posts/:userId" element={<Posts />} />
                <Route path="/Timer" element={<Timer />} />
                <Route path="/ManageRecipes" element={<ManageRecipes />} />
                <Route path="/ManageUsers" element={<ManageUsers />} />
                <Route path="/AddRecipe" element={<AddRecipe />} />
                <Route path="/ShoppingList" element={<ShoppingList />} />
                <Route path="/NewPost" element={<NewPost />} />
                <Route path="/Recipes/:userId" element={<Recipes />} />
                <Route path="/Logout" element={<Logout />} />
                <Route path="/Favorite/:userId" element={<Favorite />} />
                <Route path="/MealPlanner" element={<MealPlanner />} />
              </Route>
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<h1>Not Found</h1>} />
          </Routes>
        </BrowserRouter>
      </div>
    </UserProvider>
  );
}
