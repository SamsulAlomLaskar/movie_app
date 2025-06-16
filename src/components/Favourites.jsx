import { useEffect } from "react";
import MovieCards from "./MovieCards";
import { useMovieContext } from "../contexts/MovieContext";
import { getFavouriteMovies } from "../appwrite.setup";

const Favourites = () => {
  const { favourites, setFavourites } = useMovieContext();

  useEffect(() => {
    const fetchAppWriteMovies = async () => {
      try {
        const favLocalStorage = localStorage.getItem("favourites");

        if (
          !favLocalStorage ||
          favLocalStorage == null ||
          favLocalStorage == undefined ||
          favLocalStorage === "[]" ||
          favLocalStorage === ""
        ) {
          const data = await getFavouriteMovies();
          localStorage.setItem("favourites", JSON.stringify(data));
          console.log("Favourite movies fetched from Appwrite", data);

          setFavourites(data);
        } else {
          setFavourites(JSON.parse(favLocalStorage));
        }
      } catch (error) {
        console.log("Error fetching movies from Appwrite: ", error);
      }
    };

    fetchAppWriteMovies();
  }, []);

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
