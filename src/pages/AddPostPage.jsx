import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const AddPostsPage = () => {
  const nav = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [age, setAge] = useState(0);
  const [dates, setDates] = useState(0);
  const [image, setImage] = useState("");
  const [owner, setOwner] = useState("");

  async function handleAddPost(e) {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5005/posts/add-post", {
        name,
        description,
        age,
        dates,
        image,
      });
      nav("/all-posts");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>
      <Navbar />
      <h2>Add a new post</h2>
      <form onSubmit={handleAddPost}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </label>
        <label>
          Description:
          <input
            type="text"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
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
          Dates:
          <input
            type="text"
            value={dates}
            onChange={(event) => setDates(event.target.value)}
          />
        </label>
        <label>
          Owner:
          <input
            type="text"
            value={owner}
            onChange={(event) => setOwner(event.target.value)}
          />
        </label>
        <label>
          Image:
          <input
            type="text"
            value={image}
            onChange={(event) => setImage(event.target.value)}
          />
        </label>
        <button>Add</button>
      </form>
    </div>
  );
};
export default AddPostsPage;
