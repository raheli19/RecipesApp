import React, { useState } from "react";
import { useUser } from "../context/UserContext";
import "../css/Settings.css";
import Loading from "./Loading";
import { updateUserById } from "../services/userService";

function Settings() {
  const { user, setUser } = useUser();
  const [firstName, setFirstName] = useState(user?.first_name || "");
  const [lastName, setLastName] = useState(user?.last_name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [address, setAddress] = useState(user?.address || "");
  const [phoneNumber, setPhoneNumber] = useState(user?.phone_number || "");
  const [role, setRole] = useState(user?.role || "");

  if (!user) {
    return <Loading />;
  }

  const handleUpdate = async () => {
    const updatedUser = {
      id: user.id,
      first_name: firstName,
      last_name: lastName,
      email: email,
      phone_number: phoneNumber,
      address: address,
      role: role,
    };

    try {
      await updateUserById(user.id, updatedUser);
      console.log("User information updated successfully");
      setUser(updatedUser);
    } catch (error) {
      console.error("Error updating user information:", error);
    }
  };

  return (
    <div className="settings-container">
      <div className="settings-form">
        <h1 className="settings-title">User Information</h1>
        <hr className="settings-divider" />
        <div className="settings-grid">
          <label className="settings-label">First Name:</label>
          <input
            className="settings-input"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <label className="settings-label">Last Name:</label>
          <input
            className="settings-input"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <label className="settings-label">Email:</label>
          <input
            className="settings-input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label className="settings-label">Address:</label>
          <input
            className="settings-input"
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <label className="settings-label">Phone:</label>
          <input
            className="settings-input"
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <label className="settings-label">Role:</label>
          <input
            className="settings-input"
            type="text"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />
        </div>
        <button
          className="settings-button"
          onClick={handleUpdate}
          style={{
            fontFamily: "'Georgia', serif",
            fontWeight: "bold",
            color: "white",
            backgroundColor: "brown",
          }}
        >
          UPDATE
        </button>
      </div>
    </div>
  );
}

export default Settings;
