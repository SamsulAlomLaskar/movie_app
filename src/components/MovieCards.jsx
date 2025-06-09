import MovieModal from "./MovieModal";
import { useMovieContext } from "../contexts/MovieContext";
import { Heart } from "lucide-react";

const MovieCards = ({
  movie: {
    title,
    original_title,
    id,
    poster_path,
    release_date,
    vote_average,
    overview,
    original_language,
    adult,
    backdrop_path,
  },
}) => {
  const { addToFavourites, removeFromFavourites, isFavourite } =
    useMovieContext();

  const movie = {
    title,
    original_title,
    id,
    poster_path,
    release_date,
    vote_average,
    overview,
    original_language,
    adult,
    backdrop_path,
  };

  const favourite = isFavourite(id);

  const onFavouriteClick = (e) => {
    e.preventDefault();
    if (favourite) {
      removeFromFavourites(id);
    } else {
      addToFavourites(movie);
    }
  };

  return (
    <div className="movie-card" key={id}>
      <img
        src={
          poster_path
            ? `https://image.tmdb.org/t/p/w500/${poster_path}`
            : "./no-poster.png"
        }
        alt={title}
      />
      <div
        className={`favourite-btn ${favourite ? "active" : ""}`}
        onClick={onFavouriteClick}
      >
        <Heart className={`w-6 h-6 ${favourite ? "active" : ""}`} />
      </div>

      <div className="mt-4">
        <h3>{title}</h3>
      </div>
      <div className="content">
        <div className="rating">
          <img src="./star.svg" alt="Star icon" />
          <p>{vote_average ? vote_average.toFixed(1) : "N/A"}</p>
        </div>
        <span>⁘</span>
        <p className="lang">{original_language}</p>
        <span>⁘</span>
        <p className="year">
          {release_date ? release_date.split("-")[0] : "N/A"}
        </p>
        <span>⁘</span>
        <p className="adult">{adult == false ? "UA" : "18+"}</p>
        <span>⁘</span>
        <p className="adult">
          <MovieModal
            title={title}
            original_title={original_title}
            id={id}
            release_date={release_date}
            overview={overview}
            backdrop_path={backdrop_path}
          />
        </p>
      </div>
    </div>
  );
};

export default MovieCards;
