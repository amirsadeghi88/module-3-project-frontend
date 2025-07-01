import React, { useContext, useEffect, useState } from "react";
import { Authcontext } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import axios from "axios";
import { Link } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import Footer from "../components/Footer";

const ProfilePage = () => {
  const markers = [
    { geocode: [52.483333, 13.316667], popUp: "My apartment location" },
    { geocode: [52.50499798, 13.33583199], popUp: "My shop location" },
  ];
  const { currentUser } = useContext(Authcontext);
  const [pets, setPets] = useState([]);
  const [acceptedPet, setAcceptedPet] = useState([]);
  const [dates, setDates] = useState("");

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
        setAcceptedPet(res.data.acceptedPets);
        setDates(res.data.dates);
      })
      .catch((err) => console.log(err));
  }, []);

  //function to remove pet

  async function handleRemoveAcceptedPet(petId) {
    const tokenInStorage = localStorage.getItem("authToken");
    axios
      .delete(`http://localhost:5005/pets/delete-accepted-pet/${petId}`, {
        headers: {
          authorization: `Bearer ${tokenInStorage}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setAcceptedPet(res.data.acceptedPets);
      })
      .catch((err) => console.log(err));
  }

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
        setPets(res.data.removePetFromUserArray.pets);
      })
      .catch((err) => console.log(err));
  }
  const customIcon = new Icon({
    iconUrl: "../src/assets/map-marker.png",
    iconSize: [38, 38], //size of the icon
  });
  return (
    <div>
      <Navbar />
      <section className="profile-page">
        <section className="profile-info">
          <h3> Welcome back {currentUser.username}</h3>

          <section>
            <div className="pets-list">
              {pets.map((onepet) => {
                return (
                  <div key={onepet._id} className="pet-card">
                    <img src={onepet.image} alt="pet image" />
                    <div id="my-pet-info">
                      <h4 className="pet-name">My pets: {onepet.name}</h4>
                      <h4 className="pet-age">Age: {onepet.age}</h4>
                      <div id="my-pet-info-btns">
                        <button
                          className="remove-btn"
                          onClick={() => handleRemovePet(onepet._id)}
                        >
                          Remove
                        </button>
                        <button className="edit-btn">
                          <Link
                            className="link"
                            to={`/update-pet/${onepet._id}`}
                          >
                            Edit
                          </Link>
                        </button>
                        <button className="add-pet-btn">
                          <Link className="link" to="/add-pet">
                            Add Pet
                          </Link>
                        </button>
                        <button className="add-post-btn">
                          <Link className="link" to="/add-post">
                            Add Post
                          </Link>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </section>
      </section>

      <section className="profile-page">
        <section className="profile-info">
          <h3> Here are the pets in your care</h3>
          <section>
            <div className="guest-list">
              {acceptedPet.map((onepet) => {
                return (
                  <div key={onepet._id} className="pet-card">
                    <img src={onepet.image} alt="pet image" />
                    <h4 className="pet-name">My guest's name: {onepet.name}</h4>
                    <h4 className="dates">with me within: {onepet.dates}</h4>
                    <button
                      className="guest-remove-btn"
                      onClick={() => handleRemoveAcceptedPet(onepet._id)}
                    >
                      Remove
                    </button>
                  </div>
                );
              })}
            </div>
          </section>
        </section>
      </section>
      <Footer />
    </div>
  );
};

export default ProfilePage;
