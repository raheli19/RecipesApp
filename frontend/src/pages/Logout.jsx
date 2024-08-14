import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

function Logout() {
  const navigate = useNavigate();
  const { setUser } = useUser();
  useEffect(() => {
    setTimeout(() => navigate("/login"), 1000);
  }, []); 
  setUser(null);
  return <div className="content">Logout...</div>;
}

export default Logout;
