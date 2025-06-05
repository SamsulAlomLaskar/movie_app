import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">Movie Flix</Link>
      </div>
      <div className="navbar-routes">
        <Link to="/" className="navnar-route">
          Home
        </Link>
        <Link to="/favourite" className="navnar-route">
          Favourites
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
