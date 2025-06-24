import { useCallback, useEffect, useRef, useState } from "react";
import fetchMovies from "./fetchMovies";
import Spinner from "../Spinner";
import MovieCards from "../MovieCards";

type Movie = {
  id: number;
  title: string;
  original_title: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  overview: string;
  original_language: string;
  adult: boolean;
  backdrop_path: string;
};

const UpcomingMovies = () => {
  const [fetchedMovies, setFetchedMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [hasMoreMovie, setHasMoreMovie] = useState(true);
  const [page, setPage] = useState(1);

  const observer = useRef<IntersectionObserver | null>(null);

  const lastEleRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMoreMovie)
          setPage((prevPage) => prevPage + 1);
      });

      if (node) observer.current?.observe(node);
    },
    [isLoading, hasMoreMovie]
  );

  useEffect(() => {
    setIsLoading(true);
    setErrorMessage("");
    const fetchData = async () => {
      const result = await fetchMovies("movie/upcoming", page);
      if (typeof result === "string") {
        setErrorMessage(result);
        setFetchedMovies([]);
        return;
      }
      if (result.fetchedMovies.length === 0) {
        setHasMoreMovie(false);
        setErrorMessage(result.errorMessage);
      } else {
        setFetchedMovies((prevMovies) => [
          ...prevMovies,
          ...result.fetchedMovies,
        ]);
      }
    };
    fetchData();
    setIsLoading(false);
  }, [page]);

  return (
    <div className="wrapper">
      <section className="all-movies">
        <h1>Upcoming Movies...</h1>
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        {
          <ul>
            {fetchedMovies.map((movie, index) => {
              if (index === fetchedMovies.length - 1) {
                return (
                  <li key={movie.id} ref={lastEleRef}>
                    <MovieCards movie={movie} />
                  </li>
                );
              }
              return <MovieCards key={movie.id} movie={movie} />;
            })}
          </ul>
        }
        {isLoading && <Spinner />}
        {!hasMoreMovie && (
          <p className="text-red-500">No more movies to load...</p>
        )}
      </section>
    </div>
  );
};

export default UpcomingMovies;
