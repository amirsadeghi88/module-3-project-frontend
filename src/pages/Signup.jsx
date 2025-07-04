import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { API_URL } from "../config/api.config";
import Footer from "../components/Footer";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const nav = useNavigate();

  function handleSignupUser(event) {
    event.preventDefault();
    const userToCreate = { username, email, password };
    axios
      .post(`${API_URL}/auth/signup`, userToCreate)
      .then((res) => {
        console.log("User successfully created", res.data);
        nav("/login");
      })
      .catch((err) => {
        console.log(err);
        setErrorMessage(err.response.data.errorMessage);
      });
  }

  return (
    <div>
      <Navbar />
      <section className="form">
        <form onSubmit={handleSignupUser}>
          <h3>Please sign up with your information</h3>
          <div className="form-fields">
            <label className="fields">
              Username:{" "}
              <input
                className="credentials-field"
                type="text"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
            </label>
            <label className="fields">
              Email:{" "}
              <input
                className="credentials-field"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </label>
            <label className="fields">
              Password:{" "}
              <input
                className="credentials-field"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </label>
          </div>
          <button className="signup-btn">Signup</button>

          <p>
            Already a member? <Link to="/login"> Login</Link>
          </p>
          <p className="error-message">{errorMessage}</p>
        </form>
      </section>
      <Footer />
    </div>
  );
};

export default Signup;
