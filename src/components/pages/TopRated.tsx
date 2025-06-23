import React, { useEffect, useState, useRef, useCallback } from "react";
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
  const [page, setPage] = useState(1);
  const [hasMoreMovie, setHasMoreMovie] = useState(true);

  const observer = useRef<IntersectionObserver | null>(null);

  const lastMovieEleRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMoreMovie) {
          setPage((prevPage) => prevPage + 1);
        }
      });

      if (node) observer.current?.observe(node);
    },
    [isLoading, hasMoreMovie]
  );

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setErrorMessage("");
      const result = await fetchMovies("movie/top_rated", page);

      if (typeof result === "string") {
        setErrorMessage(result);
        setFetchedMovies([]);
        return;
      }
      if (result.fetchedMovies.length === 0) {
        setErrorMessage(result.errorMessage);
        setHasMoreMovie(false);
      } else {
        setFetchedMovies((prev) => {
          const all = [...prev, ...result.fetchedMovies];
          const unique = Array.from(
            new Map(all.map((movie) => [movie.id, movie])).values()
          );
          return unique;
        });
      }
      setIsLoading(false);
    };
    fetchData();
  }, [page]);

  return (
    <div className="wrapper">
      <section className="all-movies">
        <h1>Top rated movies...</h1>
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        {
          <ul>
            {fetchedMovies.map((movie, index) => {
              if (index === fetchedMovies.length - 1) {
                return (
                  <li key={movie.id} ref={lastMovieEleRef}>
                    <MovieCards movie={movie} />
                  </li>
                );
              }
              return (
                <li key={`${movie.id}-${index}`}>
                  <MovieCards movie={movie} />
                </li>
              );
            })}
          </ul>
        }
        {isLoading && <Spinner />}
        {!hasMoreMovie && (
          <p className="text-red-500">No more movies to load.</p>
        )}
      </section>
    </div>
  );
};

export default TopRatedMovies;
