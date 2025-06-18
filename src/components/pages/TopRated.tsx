import React, { useEffect, useState } from "react";
import Spinner from "../Spinner";
import MovieCards from "../MovieCards";
import fetchMovies from "./fetchMovies";

type Movie = {
  id: number;
  title: any;
  original_title: any;
  poster_path: any;
  release_date: any;
  vote_average: any;
  overview: any;
  original_language: any;
  adult: any;
  backdrop_path: any;
  [key: string]: any;
};

const TopRatedMovies = () => {
  const [fetchedMovies, setFetchedMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setErrorMessage("");
      const result = await fetchMovies("top_rated");

      if (typeof result === "string") {
        setErrorMessage(result);
        setFetchedMovies([]);
      } else {
        setFetchedMovies(result.fetchedMovies);
        setErrorMessage(result.errorMessage);
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="wrapper">
      <section className="all-movies">
        <h1>Top rated movies...</h1>
        {isLoading && <Spinner />}
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        {
          <ul>
            {fetchedMovies.map((movie) => (
              <MovieCards key={movie.id} movie={movie} />
            ))}
          </ul>
        }
      </section>
    </div>
  );
};

export default TopRatedMovies;
