import { useEffect, useState } from "react";
import MovieCards from "./MovieCards";
import { useMovieContext } from "../contexts/MovieContext";
import { getFavouriteMovies } from "../appwrite.setup";

const Favourites = () => {
  const { favourites } = useMovieContext();
  const [fetchedFavMovies, setFetchedFavMovies] = useState(null);

  useEffect(async () => {
    const data = await getFavouriteMovies();
    setFetchedFavMovies(data);
    console.log("Fetched Movies in Fav.JSX: ", data);
  }, []);

  useEffect(() => {
    if (
      localStorage.getItem("favourites") == null ||
      localStorage.getItem("favourites") == undefined ||
      localStorage.getItem("favourites") === "[]" ||
      localStorage.getItem("favourites") === ""
    ) {
      const data = getFavouriteMovies();
      setFetchedFavMovies(data);
      console.log("Fetched Movies in Fav.JSX: ", data);
      localStorage.setItem("favourites", JSON.parse([fetchedFavMovies]));
    }
  }, [favourites]);

  if (favourites.length > 0) {
    return (
      <div className="all-movies">
        <h1>Your Favourite Movies</h1>
        <ul>
          {favourites.map((movie) => (
            <MovieCards key={movie.id} movie={movie} />
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div className="favourite-empty">
      <h2>No Favourite Movies Yet !</h2>
      <p>Start adding your favourite movies to display here</p>
    </div>
  );
};

export default Favourites;
