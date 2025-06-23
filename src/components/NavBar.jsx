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
          Popular
        </Link>
        <Link to="/top-rated" className="navnar-route">
          Top Rated
        </Link>
        <Link to="/now-playing" className="navnar-route">
          Now Playing
        </Link>
        <Link to="/upcoming" className="navnar-route">
          Upcoming
        </Link>
        <Link to="/favourite" className="navnar-route">
          Favourites
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
