import React, { useContext } from "react";
import { Authcontext } from "../context/AuthContext";
import { Link } from "react-router-dom";

function Navbar() {
  const { handleLogout } = useContext(Authcontext);
  return (
    <nav className="navbar">
      <Link className="link" to="/profile">
        <div className="logo">
          <img src="./src/assets/logo.png" alt="logo" />
          <h2>My Pet Care</h2>
        </div>
      </Link>
      <section className="nav-links">
        <Link className="link" to="/all-posts">
          {" "}
          Waiting List{" "}
        </Link>
        <Link className="link" to="/profile">
          {" "}
          My Profile{" "}
        </Link>
        <Link className="link" to="/add-post">
          {" "}
          Add Inquiry{" "}
        </Link>
      </section>

      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </nav>
  );
}

export default Navbar;
