import React, { useContext } from "react";
import { Authcontext } from "../context/AuthContext";

function Navbar() {
  const { handleLogout } = useContext(Authcontext);
  return (
    <nav>
      <img alt="logo" />
      <h2>Our Navbar</h2>
      <button onClick={handleLogout}>Logout</button>
    </nav>
  );
}

export default Navbar;
