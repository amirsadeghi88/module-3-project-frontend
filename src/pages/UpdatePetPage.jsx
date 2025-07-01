import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const UpdatePetPage = () => {
  const [updatedPet, setUpdatedPet] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [image, setImage] = useState("");
  const nav = useNavigate();
  const { petId } = useParams();
  useEffect(() => {
    axios
      .get(`http://localhost:5005/pets/update-pet/${petId}`)
      .then((res) => {
        console.log(res.data);
        setName(res.data.name);
        setAge(res.data.age);
        setImage(res.data.image);
      })
      .catch((err) => console.log(err));
  }, [petId]);

  async function handleUpdatePet(e) {
    e.preventDefault();

    const theImage = e.target.image.files[0];
    //this creates a new object that is form data
    const ourFormData = new FormData();
    //these add properties to the new object that is form data
    ourFormData.append("imageUrl", theImage);
    ourFormData.append("name", name);
    ourFormData.append("age", age);
    const tokenInStorage = localStorage.getItem("authToken");

    try {
      const response = await axios.put(
        `http://localhost:5005/pets/update-pet/${petId}`,
        ourFormData,
        {
          headers: {
            authorization: `Bearer ${tokenInStorage}`,
          },
        }
      );
      /*const updatedPet = pet.map((pet) => {
        if (pet.id == petId) {
          return response.data;
        } else {
          return pet;
        }
      });
      setUpdatedPet(updatedPet);*/
      nav("/profile");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>
      <Navbar />
      <h2>Update Pet</h2>
      <form onSubmit={handleUpdatePet}>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label>Age:</label>
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />

        <label>Image:</label>
        <input type="file" name="image" />

        <button type="submit">Update Pet</button>
      </form>
      <Footer />
    </div>
  );
};
export default UpdatePetPage;
