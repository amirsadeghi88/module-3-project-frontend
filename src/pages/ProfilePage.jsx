import React, { useContext } from "react";
import { Authcontext } from "../context/AuthContext";
import Navbar from "../components/Navbar";

const ProfilePage = () => {
  const { currentUser, isLoading, isLoggedIn } = useContext(Authcontext);
  return (
    <div>
      <Navbar />
      <h3>{currentUser.username}'s profile </h3>
    </div>
  );
};

export default ProfilePage;
