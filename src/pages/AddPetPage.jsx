import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const AddPetPage = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [image, setImage] = useState("");
  const nav = useNavigate();

  //function to add pet with token

  async function handleAddPet(e) {
    e.preventDefault();
    //this takes the image that was choosen from the input
    const theImage = e.target.image.files[0];
    //this creates a new object that is form data
    const ourFormData = new FormData();
    //these add properties to the new object that is form data
    ourFormData.append("imageUrl", theImage);
    ourFormData.append("name", name);
    ourFormData.append("age", age);
    const tokenInStorage = localStorage.getItem("authToken");
    try {
      await axios.post("http://localhost:5005/pets/add-pet", ourFormData, {
        headers: {
          authorization: `Bearer ${tokenInStorage}`,
        },
      });
      nav("/profile");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>
      <Navbar />
      <section className="form">
        <form onSubmit={handleAddPet}>
          <h3>Add to your pets:</h3>
          <div className="form-fields">
            <label className="fields">
              Pet Name:
              <span> </span>
              <input
                className="credentials-field"
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </label>
            <label className="fields">
              Age:
              <span> </span>
              <input
                className="credentials-field"
                type="number"
                value={age}
                onChange={(event) => setAge(event.target.value)}
              />
            </label>
            <label className="fields">
              Image:
              <span> </span>
              <input type="file" name="image" />
            </label>
          </div>
          <Link className="link" to="/profile">
            <button className="submit-pet-btn">Add to the list</button>
          </Link>
        </form>
      </section>
      <Footer />
    </div>
  );
};

export default AddPetPage;
