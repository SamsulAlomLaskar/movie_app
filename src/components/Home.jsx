import { useState, useEffect, useRef, useCallback } from "react";
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
  const [page, setPage] = useState(1);
  const [hasMoreMovie, setHasMoreMovie] = useState(true);

  const observer = useRef(null);

  const API_BASE_URL = import.meta.env.VITE_TMDB_API_BASE_URL;
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

  const API_OPTIONS = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
  };

  const lastMovieEleRef = useCallback(
    (node) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMoreMovie) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [hasMoreMovie, isLoading]
  );
  const fetchMovies = async (query = "") => {
    setIsLoading(true);
    setErrorMessage("");
    try {
      const endpoint = query
        ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
        : `${API_BASE_URL}/discover/movie?page=${page}`;

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
      if (data.results.length === 0) {
        setErrorMessage(data.Error);
        setHasMoreMovie(false);
      } else {
        setMovieList((prev) => {
          const all = [...prev, ...data.results];
          const unique = Array.from(
            new Map(all.map((movie) => [movie.id, movie])).values()
          );
          return unique;
        });
      }

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
  }, []);

  useEffect(() => {
    fetchMovies();
  }, [page]);

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
          {errorMessage ? (
            <p className="text-red-500">{errorMessage}</p>
          ) : (
            <ul>
              {movieList.map((movie, index) => {
                if (index === movieList.length - 1) {
                  return (
                    <li key={movie.id} ref={lastMovieEleRef}>
                      <MovieCards movie={movie} />
                    </li>
                  );
                }
                return (
                  <li key={movie.id}>
                    <MovieCards movie={movie} />
                  </li>
                );
              })}
            </ul>
          )}
          {isLoading && <Spinner />}
          {!hasMoreMovie && (
            <p className="text-red-500">No more movies to load</p>
          )}
        </section>
      </div>
    </main>
  );
};

export default Home;
