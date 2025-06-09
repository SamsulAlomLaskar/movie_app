import { useMovieContext } from "../contexts/MovieContext";
import MovieCards from "./MovieCards";

const Favourites = () => {
  const { favourites } = useMovieContext();

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
