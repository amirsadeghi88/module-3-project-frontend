import React, { useContext } from "react";
import { Authcontext } from "../context/AuthContext";

function Navbar() {
  const { handleLogout } = useContext(Authcontext);
  return (
    <nav className="navbar">
      <img alt="logo" />
      <h2></h2>
      <button onClick={handleLogout}>Logout</button>
    </nav>
  );
}

export default Navbar;
