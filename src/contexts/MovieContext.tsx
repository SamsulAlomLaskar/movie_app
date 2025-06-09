import { createContext, useContext, useState, useEffect } from "react";

const MovieContext = createContext({});

export const useMovieContext = () => useContext(MovieContext);

export const MovieProvider = ({ children }) => {
  type movie = {
    id: number;
    title: string;
    poster_path: string;
    release_date: string;
    vote_average: number;
    overview: string;
    original_language: string;
    adult: boolean;
    backdrop_path: string;
  };
  const [favourites, setFavourites] = useState<movie[]>([]);
  useEffect(() => {
    const storedFav = localStorage.getItem("favourites");

    if (storedFav) setFavourites(JSON.parse(storedFav));
  }, []);

  useEffect(() => {
    if (favourites.length > 0)
      localStorage.setItem("favourites", JSON.stringify(favourites));
  }, [favourites]);

  const addToFavourites = (movie: movie) => {
    if (favourites.some((fav) => fav.id === movie.id)) {
      console.warn("Movie is already in favourites");
      return;
    }
    setFavourites((prev) => [...prev, movie]);
  };

  const removeFromFavourites = (movieId) => {
    setFavourites((prev) => prev.filter((movie) => movie.id !== movieId));
  };

  const isFavourite = (movieId) => {
    return favourites.some((movie) => movie.id === movieId);
  };

  const value = {
    favourites,
    addToFavourites,
    removeFromFavourites,
    isFavourite,
  };
  return (
    <MovieContext.Provider value={value}>{children}</MovieContext.Provider>
  );
};
