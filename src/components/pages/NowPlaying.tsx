import { useState, useEffect, useRef, useCallback } from "react";
import fetchMovies from "./fetchMovies";
import Spinner from "../Spinner";
import MovieCards from "../MovieCards";

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

const NowPlayingMovies = () => {
  const [fetchedMovies, setFetchedMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [page, setPage] = useState(1);
  const [hasMoreMovie, setHasMoreMovie] = useState(true);

  const observer = useRef<IntersectionObserver | null>(null);

  const lastMovieElementRef = useCallback(
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
      const result = await fetchMovies("movie/now_playing", page);

      if (typeof result === "string") {
        setErrorMessage(result);
        setFetchedMovies([]);
        return;
      }
      if (result.fetchedMovies.length === 0) {
        setErrorMessage(result.errorMessage);
        setHasMoreMovie(false);
      } else {
        setFetchedMovies((prev) => [...prev, ...result.fetchedMovies]);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [page]);

  return (
    <div className="wrapper">
      <section className="all-movies">
        <h1>Now Playing.....</h1>
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        {
          <ul>
            {fetchedMovies.map((movies, index) => {
              if (index === fetchedMovies.length - 1) {
                return (
                  <li key={movies.id} ref={lastMovieElementRef}>
                    <MovieCards movie={movies} />
                  </li>
                );
              }
              return <MovieCards key={movies.id} movie={movies} />;
            })}
          </ul>
        }
        {isLoading && <Spinner />}
        {!hasMoreMovie && (
          <p className="text-red-500">No more movies to load</p>
        )}
      </section>
    </div>
  );
};

export default NowPlayingMovies;
