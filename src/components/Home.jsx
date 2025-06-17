import { useState, useEffect } from "react";
import { useDebounce } from "react-use";
import { getTrendingMovies, updateSearchCountHistory } from "../appwrite.setup";
import Search from "./Search";
import Spinner from "./Spinner";
import MovieCards from "./MovieCards";

const Home = () => {
  const [searchMovie, setSearchMovie] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [debouncedSearchMovie, setDebouncedSearchMovie] = useState("");
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const API_BASE_URL = import.meta.env.VITE_TMDB_API_BASE_URL;
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

  const API_OPTIONS = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
  };

  const fetchMovies = async (query = "") => {
    setIsLoading(true);
    setErrorMessage("");
    try {
      const endpoint = query
        ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
        : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;

      const response = await fetch(endpoint, API_OPTIONS);

      if (!response.ok) {
        throw new Error("Error fetching movies");
      }

      const data = await response.json();

      if (data.Response === "False") {
        setErrorMessage(data.Error || "Failed to fetch movies");
        setMovieList([]);
        return;
      }
      setMovieList(data.results || []);

      if (query && data.results.length > 0) {
        await updateSearchCountHistory(query, data.results[0]);
      }
    } catch (error) {
      console.error("Error while fetching movies", error);
      setErrorMessage("Error while fetching movies, please try again later !");
    } finally {
      setIsLoading(false);
    }
  };

  const loadTrendingMovies = async () => {
    try {
      const movies = await getTrendingMovies();
      if (!movies || movies.length === 0) {
        console.log("No trending movies found");
        return;
      }
      setTrendingMovies(movies);
    } catch (error) {
      console.log("Error while fetching trending movies!");
      console.error(error);
    }
  };

  useDebounce(() => setDebouncedSearchMovie(searchMovie), 500, [searchMovie]);

  useEffect(() => {
    fetchMovies(debouncedSearchMovie);
  }, [debouncedSearchMovie]);

  useEffect(() => {
    loadTrendingMovies();
    fetchMovies();
  }, []);

  return (
    <main>
      <div className="pattern" />
      <div className="wrapper">
        <header>
          <h1>
            Find the <span className="text-gradient">Movies</span> You Would
            Love To Enjoy Without Any Hassle
          </h1>
          <Search searchMovie={searchMovie} setSearchMovie={setSearchMovie} />
        </header>
        {trendingMovies.length > 0 && (
          <section className="trending">
            <h2>Trending Movies</h2>
            <ul>
              {trendingMovies.map((movie, index) => (
                <li key={movie.$id}>
                  <p>{index + 1}</p>
                  <img src={movie.poster_url} alt={movie.title} />
                </li>
              ))}
            </ul>
          </section>
        )}
        <section className="all-movies">
          <h2>All Movies</h2>
          {isLoading ? (
            <Spinner />
          ) : errorMessage ? (
            <p className="text-red-500">{errorMessage}</p>
          ) : (
            <ul>
              {movieList.map((movie) => (
                <MovieCards key={movie.id} movie={movie} />
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
};

export default Home;
