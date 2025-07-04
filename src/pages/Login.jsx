import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Authcontext } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import { API_URL } from "../config/api.config";
import Footer from "../components/Footer";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const nav = useNavigate();

  //to grab data from the context
  const { authenticateUser } = useContext(Authcontext);
  async function handleLogin(event) {
    event.preventDefault();
    const userToLogin = { email, password };
    try {
      const res = await axios.post(`${API_URL}/auth/login`, userToLogin);

      //before navigating store the token in the local storage
      localStorage.setItem("authToken", res.data.authToken);
      await authenticateUser();
      nav("/profile");
    } catch (error) {
      console.log(error);
      setErrorMessage(error.response.data.errorMessage);
    }
  }

  return (
    <div>
      <Navbar />
      <section className="form">
        <form onSubmit={handleLogin}>
          <h3>Please use your credentials to login</h3>
          <div className="form-fields">
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
          <button className="login-btn">Login</button>

          <p className="signup-link">
            New here? <Link to="/">Sign up here</Link>
          </p>
          <p className="error-message">{errorMessage}</p>
        </form>
      </section>
      <Footer />
    </div>
  );
};

export default Login;
