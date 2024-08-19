import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import "../css/MainLayout.css";

const MainLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const { user } = useUser();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div style={{ display: "flex", width: "100vw", height: "100vh" }}>
      <aside
        className={`sidebar ${isSidebarOpen ? "open" : "closed"}`}
        style={{
          height: "100%",
          width: isSidebarOpen ? "250px" : "0",
          padding: isSidebarOpen ? "16px" : "0",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          position: "fixed",
          zIndex: 10,
          transition: "width 0.3s, padding 0.3s",
        }}
      >
        <button onClick={toggleSidebar} className="toggle-button">
          {isSidebarOpen ? (
            <i className="fas fa-arrow-left"></i>
          ) : (
            <i className="fas fa-arrow-right"></i>
          )}
        </button>
        <ul
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            margin: 0,
            padding: 0,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: "100%",
            }}
          >
            <div className="firstpart">
              <li className="list-item" onClick={() => navigate("/")}>
                <i className="fas fa-home"></i> Home
              </li>
              <li
                className={`list-item ${
                  user.role === "User" ? "disabled" : ""
                }`}
                onClick={() => user.role !== "User" && navigate("/addRecipe")}
              >
                <i className="fas fa-plus"></i> Add Recipe
              </li>
              <li
                className={`list-item ${
                  user.role === "User" ? "disabled" : ""
                }`}
                onClick={() =>
                  user.role !== "User" && navigate("/manageRecipes")
                }
              >
                <i className="fas fa-cogs"></i> Manage Recipes
              </li>
              <li
                className={`list-item ${
                  ["User", "Chief"].includes(user.role) ? "disabled" : ""
                }`}
                onClick={() =>
                  !["User", "Chief"].includes(user.role) &&
                  navigate("/manageUsers")
                }
              >
                <i className="fas fa-cogs"></i> Manage Users
              </li>
              <li
                className="list-item"
                onClick={() => navigate("/shoppingList")}
              >
                <i className="fas fa-list"></i> Shopping List
              </li>
              <li
                className="list-item"
                onClick={() => navigate(`/favorite/${user.id}`)}
              >
                <i className="fas fa-heart"></i> Favorite
              </li>
            </div>

            <div className="secondpart">
              <li className="list-item" onClick={() => navigate(`/help`)}>
                <i className="fas fa-question-circle"></i> Help
              </li>
              <li className="list-item" onClick={() => navigate(`/settings`)}>
                <i className="fas fa-cog"></i> Settings
              </li>
              <li className="list-item" onClick={() => navigate("/logout")}>
                <i className="fas fa-sign-out-alt"></i> Log Out
              </li>
            </div>
          </div>
        </ul>
      </aside>

      <main
        style={{
          marginLeft: isSidebarOpen ? "250px" : "0",
          width: isSidebarOpen ? "calc(100% - 250px)" : "100%",
          transition: "margin-left 0.3s, width 0.3s",
        }}
      >
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;