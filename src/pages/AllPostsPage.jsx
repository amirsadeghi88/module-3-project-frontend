import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

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

  return (
    <div>
      <Navbar />
      <h1>All Posts</h1>
      {posts.map((post, index) => (
        <div key={index}>
          <h2>Hi my name is: {post.name}</h2>
          <p>I need care on these dates: {post.dates}</p>
          <Link to="/profile">Go back to my profile</Link>
        </div>
      ))}
    </div>
  );
};
export default AllPostsPage;
