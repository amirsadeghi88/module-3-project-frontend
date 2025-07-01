import React, { useContext } from "react";
import { Authcontext } from "../context/AuthContext";
import { Link } from "react-router-dom";

function Navbar() {
  const { handleLogout } = useContext(Authcontext);
  return (
    <nav className="navbar">
      <div className="logo">
        <img src="./src/assets/logo.png" alt="logo" />
        <h2>My Pet Care</h2>
      </div>
      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </nav>
  );
}

export default Navbar;
