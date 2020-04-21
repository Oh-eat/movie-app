import React from "react";
import { IMAGE_BASE_URL } from "../../../Config";

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
          src={
            movie.poster_path
              ? `${IMAGE_BASE_URL}/w500/${movie.poster_path}`
              : "https://dalk4zrp4jp3q.cloudfront.net/images/mac_YFVkNF/movie_placeholder_big_2x.png"
          }
        />
      </a>
      {/* <h2 style={{ maxWidth: "100%", wordWrap: "break-word" }}>
          {movie.title}
        </h2> */}
    </div>
  );
}

export default React.memo(MovieItem);
