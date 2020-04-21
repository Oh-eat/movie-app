import React from "react";
import { IMAGE_BASE_URL } from "../../../Config";

function MainImage({ movie }) {
  if (!movie) return null;

  return (
    <a href={`/movie/${movie.id}`}>
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "40vh",
          backgroundImage: `url(${IMAGE_BASE_URL}/original/${movie.backdrop_path})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center center",
          textShadow: "0 0 3px black",
        }}
      >
        <article
          style={{
            color: "white",
            position: "absolute",
            left: "2rem",
            bottom: "2rem",
            width: "50%",
          }}
        >
          <h2
            style={{
              color: "inherit",
              fontSize: "2.5rem",
              margin: "0",
              lineHeight: "1",
            }}
          >
            {movie.title}
          </h2>
          {/* <p style={{ margin: "1rem 0 0 0" }}>{movie.overview}</p> */}
        </article>
      </div>
    </a>
  );
}

export default MainImage;
