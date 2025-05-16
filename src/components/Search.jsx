import React from "react";

const Search = ({ searchMovie, setSearchMovie }) => {
  return (
    <div className="search">
      <div>
        <img src="./search.svg" alt="Search" />
        <input
          type="text"
          placeholder="Search your favourite movie!"
          value={searchMovie}
          onChange={(e) => setSearchMovie(e.target.value)}
        />
      </div>
    </div>
  );
};

export default Search;
