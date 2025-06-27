import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

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
      <h2>Pets in care currently:</h2>
      <form onSubmit={handleAddPet}>
        <label>
          Pet Name:
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </label>
        <label>
          Age:
          <input
            type="number"
            value={age}
            onChange={(event) => setAge(event.target.value)}
          />
        </label>
        <label>
          Image :
          <input type="file" name="image" />
        </label>
        <button className="submit-pet-btn">Add to the list</button>
      </form>
    </div>
  );
};

export default AddPetPage;
