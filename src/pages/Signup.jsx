import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

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
      .post("http://localhost:5005/auth/signup", userToCreate)
      .then((res) => {
        console.log("User successfully created", res.data);
        nav("/login");
      })
      .catch((err) => console.log(err));
    setErrorMessage(error.response.data.errorMessage);
  }

  return (
    <div>
      <form onSubmit={handleSignupUser}>
        <h3>Sign up form</h3>
        <label>
          Username:{" "}
          <input
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </label>
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
        <button>Signup</button>
      </form>
      <p>
        Already a member? <Link to="/login"> Login</Link>
      </p>
      <p className="error-message">{errorMessage}</p>
    </div>
  );
};

export default Signup;
