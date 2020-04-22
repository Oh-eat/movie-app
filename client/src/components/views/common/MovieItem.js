import React from "react";
import { Link } from "react-router-dom";
import buildImageURL from "../../../lib/buildImageURL";

function MovieItem({ movie, delay = 0 }) {
  return (
    <div
      className="movie_item"
      key={movie.id}
      style={{ display: "block", animationDelay: `${delay * 0.1}s` }}
    >
      <Link to={`/movie/${movie.id}`}>
        <img
          style={{
            width: "100%",
            height: "100%",
          }}
          src={buildImageURL(movie.poster_path)}
          alt={movie.title}
        />
      </Link>
      {/* <h2 style={{ maxWidth: "100%", wordWrap: "break-word" }}>
          {movie.title}
        </h2> */}
    </div>
  );
}

export default React.memo(MovieItem);
