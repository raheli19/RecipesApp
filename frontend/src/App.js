import React from "react";
import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Settings from "./pages/Settings";
import Logout from "./pages/Logout";
import ProtectedRoutes from "./pages/ProtectedRoutes";
import Register from "./pages/Register";
import ManageRecipes from "./pages/ManageRecipes";
import RecipeDetail from "./pages/RecipeDetail";
import AddRecipe from "./pages/AddRecipe";
import ShoppingList from "./pages/ShoppingList";
import ManageUsers from "./pages/ManageUsers";
import MainLayout from "./layout/MainLayout";
import Favorite from "./pages/Favorite";
import Help from "./pages/Help";
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
                <Route path="/ManageRecipes" element={<ManageRecipes />} />
                <Route path="/ManageUsers" element={<ManageUsers />} />
                <Route path="/AddRecipe" element={<AddRecipe />} />
                <Route path="/ShoppingList" element={<ShoppingList />} />
                <Route path="/Help" element={<Help />} />
                <Route path="/Logout" element={<Logout />} />
                <Route path="/Favorite/:userId" element={<Favorite />} />
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
