import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div>
      404 NotFound
      <p>
        The page you are looking for does not exist
        <Link to="/">Go to homepage</Link>
      </p>
    </div>
  );
};

export default NotFoundPage;
