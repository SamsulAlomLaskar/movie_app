import React from "react";

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
      </div>
    </div>
  );
};

export default MovieCards;
