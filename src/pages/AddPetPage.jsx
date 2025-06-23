import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddPetPage = () => {
  const [name, setName] = useState("");
  const nav = useNavigate();

  //function to add pet with token

  async function handleAddPet(e) {
    e.preventDefault();
    const tokenInStorage = localStorage.getItem("authToken");
    try {
      await axios.post(
        "http://localhost:5005/pets/add-pet",
        { name },
        {
          headers: {
            authorization: `Bearer${tokenInStorage}`,
          },
        }
      );
      nav("/profile");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>
      <h2>Add a new pet</h2>
      <form onSubmit={handleAddPet}>
        <label>
          Pet Name:
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </label>
        <button>Add</button>
      </form>
    </div>
  );
};

export default AddPetPage;
