import { useState, useEffect } from "react";
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

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setErrorMessage("");
      const result = await fetchMovies("movie/now_playing");

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
        <h1>Now Playing.....</h1>
        {isLoading && <Spinner />}
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        {
          <ul>
            {fetchedMovies.map((movies) => {
              return <MovieCards key={movies.id} movie={movies} />;
            })}
          </ul>
        }
      </section>
    </div>
  );
};

export default NowPlayingMovies;
