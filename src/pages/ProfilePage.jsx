import React, { useContext, useEffect, useState } from "react";
import { Authcontext } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import axios from "axios";
import { Link } from "react-router-dom";

const ProfilePage = () => {
  const { currentUser } = useContext(Authcontext);
  const [pets, setPets] = useState([]);
  useEffect(() => {
    const tokenInStorage = localStorage.getItem("authToken");
    axios
      .get("http://localhost:5005/pets/user-pets", {
        headers: {
          authorization: `Bearer ${tokenInStorage}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setPets(res.data.pets);
      })
      .catch((err) => console.log(err));
  }, []);

  //function to remove pet

  async function handleRemovePet(petId) {
    const tokenInStorage = localStorage.getItem("authToken");
    axios
      .delete(`http://localhost:5005/pets/delete-pet/${petId}`, {
        headers: {
          authorization: `Bearer ${tokenInStorage}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setPets(res.data.pets);
      })
      .catch((err) => console.log(err));
  }

  return (
    <div>
      <Navbar />
      <h3>{currentUser.username}'s profile page</h3>
      <Link to="/add-pets">Add Pet</Link>
      <h3>Pets:</h3>
      {pets.map((onepet) => {
        return (
          <div key={onepet._id} className="pet-card">
            <h4>Pet Name: {onepet.name}</h4>
            <button onClick={() => handleRemovePet(onepet._id)}>Remove</button>
          </div>
        );
      })}
    </div>
  );
};

export default ProfilePage;
