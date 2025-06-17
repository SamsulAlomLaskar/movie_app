import React, { useState } from "react";

const TopRatedMovies = () => {
  const [fetchedMovies, setFetchedMovies] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const BASE_API_URL = import.meta.env.VITE_TMDB_API_BASE_URL;
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

  const API_OPTIONS = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
  };

  return <h1>TopRated</h1>;
};

export default TopRatedMovies;
