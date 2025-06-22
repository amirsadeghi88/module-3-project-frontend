import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Authcontext = createContext();

const AuthContextWrapper = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const nav = useNavigate();
  //function to validate the token in the local storage
  async function authenticateUser() {
    try {
      const tokenInLocalStorage = localStorage.getItem("authToken");
      const response = await axios.get("http://localhost:5005/auth/verify", {
        headers: {
          authorization: `Bearer ${tokenInLocalStorage}`,
        },
      });
      console.log(response.data);
      //if you are in the try then it was successful and you should set states
      setCurrentUser(response.data.payload);
      setIsLoading(false);
      setIsLoggedIn(true);
    } catch (error) {
      console.log(error);
      setCurrentUser(null);
      setIsLoading(false);
      setIsLoggedIn(false);
    }
  }
  function handleLogout() {
    localStorage.removeItem("authToken");
    nav("/login");
  }
  useEffect(() => {
    authenticateUser();
  }, []);
  return (
    <Authcontext.Provider
      value={{
        currentUser,
        isLoading,
        isLoggedIn,
        authenticateUser,
        handleLogout,
      }}
    >
      {children};
    </Authcontext.Provider>
  );
};

export { Authcontext, AuthContextWrapper };
