import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/userService.js";
import { useUser } from "../context/UserContext";
import "../css/Login.css";

function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setUser } = useUser();

  const navigate = useNavigate();

  const handleLogin = async (event) => {
     event.preventDefault();
    try {
      const response = await loginUser(userName, password);
      console.log(response.message);
      setUser(response.user);
      navigate("/home");
    } catch (error) {
      setError("Your Username or Password is wrong!");
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <input
              required
              type="text"
              id="userName"
              placeholder="Enter user-name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              autoComplete="off"
            />
          </div>
          <div className="form-group">
            <input
              required
              type="password"
              id="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
        <button
          type="button"
          className="register-button"
          onClick={() => navigate("/register")}
        >
          Register
        </button>
      </div>
    </div>
  );
}

export default Login;
