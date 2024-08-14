import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../context/UserContext";

export default function ProtectedRoutes() {
  const { user } = useUser();
  
return user ? (
  <div style={{ overflowY: "auto" }}>
    <Outlet />
  </div>
) : (
  <Navigate to="/login" />
);
}