import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const AllPostsPage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5005/posts/all-posts")
      .then((res) => {
        console.log(res.data);
        setPosts(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  async function handleAcceptPet(postId) {
    const tokenInStorage = localStorage.getItem("authToken");
    axios
      .post(
        `http://localhost:5005/accept/accept-pet/${postId}`,
        {},
        {
          headers: {
            authorization: `Bearer ${tokenInStorage}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        setPets(res.data.pets);
      })
      .catch((err) => console.log(err));
  }

  return (
    <div>
      <Navbar />
      <h1>All Posts</h1>
      <section className="all-posts">
        {posts.map((post, index) => (
          <div className="post-card-list" key={index}>
            <div className="post-card">
              <h4>Hi my name is: {post.name}</h4>
              <p>
                I need care on these dates:{" "}
                <span>
                  <br></br>
                </span>
                {post.dates}
              </p>
              <img src={post.image} alt="pet image" />
              <button
                className="accept-btn"
                onClick={() => handleAcceptPet(post._id)}
              >
                Accept
              </button>
            </div>
          </div>
        ))}
      </section>
      <button className="back-to-profile-btn">
        <Link className="link" to="/profile">
          Go back to my profile
        </Link>
      </button>
      <Footer />
    </div>
  );
};
export default AllPostsPage;
