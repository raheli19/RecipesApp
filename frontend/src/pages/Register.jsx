import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkUsernameExists, registerUser } from "../services/userService.js";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { useUser } from "../context/UserContext";
import Select from "@mui/material/Select";
import "../css/Register.css";

function Register() {
  const { setUser } = useUser();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [error, setError] = useState("");
  const [step, setStep] = useState("first");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [role, setRole] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const userExist = await checkUsernameExists(userName);

    if (!userExist && password === verifyPassword) {
      setError("");
      setStep("second");
    } else if (userExist) {
      setError("Your Username already exists! Please Login!");
    } else {
      setError("Your Passwords do not match!");
    }
  };

    const handleRegister = async () => {
      const newUser = {
        last_name: lastName,
        first_name: userName,
        email,
        phone_number: phone,
        address,
        password,
        role
      };

     try {
       const response = await registerUser(newUser);
       if(response.message)
       {
        setUser(response.user.newUser);
       navigate("/home");}
       
     } catch (error) {
      setError("An error occurred while registering. Please try again.");
      setTimeout(() => {
        setError("");
      }, 3000);
     }
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <h2>Register</h2>

        <form onSubmit={handleSubmit}>
          {step === "first" ? (
            <div className="common-form form-one">
              <input
                className="register-input"
                type="text"
                placeholder="Enter UserName"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                autoComplete="off"
              />
              <input
                className="register-input"
                required
                type="password"
                id="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
              />
              <input
                className="register-input"
                required
                type="password"
                id="verify-password"
                placeholder="Verify password"
                value={verifyPassword}
                onChange={(e) => setVerifyPassword(e.target.value)}
                autoComplete="new-password"
              />
            </div>
          ) : (
            <div className="common-form form-one">
              <h4>Details</h4>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-autowidth-label">
                  Role
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  className="register-input"
                  style={{
                    textAlign: "left",
                    color: "black",
                    margin: 0,
                    marginBottom: "10px",
                  }}
                  value={role}
                  fullWidth
                  size="small"
                  placeholder="Role"
                  label="Role"
                  InputLabelProps={{
                    style: { color: "black" },
                  }}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <MenuItem value={"User"}>User</MenuItem>
                  <MenuItem value={"Chief"}>Chief</MenuItem>
                  <MenuItem value={"Admin"}>Admin</MenuItem>
                </Select>
              </FormControl>
              <input
                className="register-input"
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                autoComplete="off"
              />

              <input
                className="register-input"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="off"
              />

              <input
                className="register-input"
                type="text"
                placeholder="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                autoComplete="off"
              />

              <input
                className="register-input"
                type="text"
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                autoComplete="off"
              />
            </div>
          )}

          {error && <p className="error-message">{error}</p>}
          <button
            type="submit"
            className="register-button"
            onClick={step === "second" ? handleRegister : null}
          >
            {step === "first" ? "Continue" : "Register"}
          </button>

          {step === "second" ? (
            <button
              className="register-button"
              onClick={() => setStep("first")}
            >
              Return
            </button>
          ) : null}
          {step === "first" ? (
            <button className="login-button" onClick={() => navigate("/login")}>
              Login
            </button>
          ) : null}
        </form>
      </div>
    </div>
  );
}

export default Register;
