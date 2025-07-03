import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { API_URL } from "../config/api.config";

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
    const theImage = e.target.image.files[0];
    //this creates a new object that is form data
    const ourFormData = new FormData();
    //these add properties to the new object that is form data
    ourFormData.append("imageUrl", theImage);
    ourFormData.append("name", name);
    ourFormData.append("age", age);
    ourFormData.append("dates", dates);

    try {
      await axios.post(`${API_URL}/posts/add-post`, ourFormData);
      nav("/all-posts");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>
      <Navbar />
      <section className="form">
        <form onSubmit={handleAddPost}>
          <h2>Add a new post</h2>
          <div className="form-fields">
            <label className="fields">
              Name:
              <span> </span>
              <input
                className="credentials-field"
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </label>
            <label className="fields">
              Description:
              <span> </span>
              <input
                className="credentials-field"
                type="text"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
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
              Dates:
              <span> </span>
              <input
                className="credentials-field"
                type="text"
                value={dates}
                onChange={(event) => setDates(event.target.value)}
              />
            </label>
            <label className="fields">
              Owner:
              <span> </span>
              <input
                className="credentials-field"
                type="text"
                value={owner}
                onChange={(event) => setOwner(event.target.value)}
              />
            </label>
            <label className="fields">
              Image:
              <span> </span>
              <input type="file" name="image" />
            </label>
          </div>
          <button className="submit-post-btn">Submit</button>
        </form>
      </section>
      <Footer />
    </div>
  );
};
export default AddPostsPage;
