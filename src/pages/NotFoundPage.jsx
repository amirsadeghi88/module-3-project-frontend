import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
const NotFoundPage = () => {
  return (
    <div>
      <Navbar />
      404 NotFound
      <p>
        The page you are looking for does not exist
        <Link to="/">Go to homepage</Link>
      </p>
      <Footer />
    </div>
  );
};

export default NotFoundPage;
