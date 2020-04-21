import React from "react";
import MovieItem from "./MovieItem";

function MovieGrid({ movies }) {
  return (
    <div className="movie_grid">
      {movies.map((movie, index) => (
        <MovieItem delay={(index % 20) + 1} key={movie.id} movie={movie} />
      ))}
    </div>
  );
}

export default MovieGrid;
