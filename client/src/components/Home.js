import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home container">
      <h1 className="Heading">Welcome to the Recipe Book</h1>
      <Link to='/signup' className="btn btn-primary">Get Started</Link>
    </div>
  );
};

export default Home;
