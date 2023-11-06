import React from "react";
import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    
    localStorage.removeItem("token");

    navigate("/login");
  };

  handleLogout();

  return (
    <div>
      <h2>You have logged out</h2>
      <button onClick={handleLogout}>Continue to Login</button>
    </div>
  );
}

export default Logout;