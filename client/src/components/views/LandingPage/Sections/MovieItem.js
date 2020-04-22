import React from "react";
import { IMAGE_BASE_URL } from "../../../Config";
import buildImageURL from "../../../../lib/buildImageURL";

function MovieItem({ movie, delay = 0 }) {
  return (
    <div
      className="movie_item"
      key={movie.id}
      style={{ display: "block", animationDelay: `${delay * 0.1}s` }}
    >
      <a href={`/movie/${movie.id}`}>
        <img
          style={{
            //   display: "block",
            width: "100%",
            height: "auto",
            objectFit: "cover",
          }}
          src={buildImageURL(movie.poster_path)}
        />
      </a>
      {/* <h2 style={{ maxWidth: "100%", wordWrap: "break-word" }}>
          {movie.title}
        </h2> */}
    </div>
  );
}

export default React.memo(MovieItem);
