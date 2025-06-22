import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Authcontext } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();
  const { authenticateUser } = useContext(Authcontext);

  async function handleLogin(event) {
    event.preventDefault();
    const userToLogin = { email, password };
    try {
      const res = await axios.post(
        "http://localhost:5005/auth/login",
        userToLogin
      );

      //before navigating store the token in the local storage
      localStorage.setItem("authToken", res.data.authToken);
      await authenticateUser();
      nav("/profile");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <form onSubmit={handleLogin}>
        <h3>Login form</h3>
        <label>
          Email:{" "}
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </label>
        <label>
          Password:{" "}
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
        <button>Login</button>
      </form>
      <p>
        New here? <Link to="/"> Sign up here</Link>
      </p>
    </div>
  );
};

export default Login;
