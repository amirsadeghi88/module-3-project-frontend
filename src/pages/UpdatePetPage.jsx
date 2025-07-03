import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

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
      <section className="form">
        <h1>Edit your pet info</h1>
        <form onSubmit={handleUpdatePet}>
          <div className="form-fields">
            <label className="fields">Name:</label>
            <input
              className="credentials-field"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <label className="fields">Age:</label>
            <input
              className="credentials-field"
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />

            <label className="fields">Image:</label>
            <input type="file" name="image" />
          </div>
          <Link className="link" to="/profile">
            <button className="update-pet-btn" type="submit">
              Update Pet
            </button>
          </Link>
        </form>
      </section>
      <Footer />
    </div>
  );
};
export default UpdatePetPage;
