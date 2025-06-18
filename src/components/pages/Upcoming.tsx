import { useEffect, useState } from "react";
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

  useEffect(() => {
    setIsLoading(true);
    setErrorMessage("");
    const fetchData = async () => {
      const result = await fetchMovies("movie/upcoming");
      if (typeof result === "string") {
        setErrorMessage(result);
        setFetchedMovies([]);
      } else {
        setFetchedMovies(result.fetchedMovies);
        setErrorMessage(result.errorMessage);
      }
    };
    fetchData();
    setIsLoading(false);
  }, []);

  return (
    <div className="wrapper">
      <section className="all-movies">
        <h1>Upcoming Movies...</h1>
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

export default UpcomingMovies;
