import React from "react";

const Search = ({ searchMovie, setSearchMovie }) => {
  /* const handleSearch = (e) => {
    e.preventDefault();
    if (!searchMovie.trim()) return;
    else setSearchMovie(e.target.value);
    // setSearchMovie("");
    console.log("Call handleSearch");
  }; */
  return (
    <div className="search">
      <div>
        <img src="./search.svg" alt="Search" />
        <input
          type="text"
          placeholder="Search your favourite movie!"
          value={searchMovie}
          onChange={(e) => setSearchMovie(e.target.value)}
          // onChange={() => handleSearch}
        />
      </div>
    </div>
  );
};

export default Search;
