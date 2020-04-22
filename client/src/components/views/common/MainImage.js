import React from "react";
import { Link } from "react-router-dom";
import buildImageURL from "../../../lib/buildImageURL";

function MainImageContent({ movie, text }) {
  if (!movie) return null;

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "max(30vw, 40vh)",
        backgroundImage: `url(${buildImageURL(
          movie.backdrop_path,
          "original"
        )})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center center",
        textShadow: "0 0 10px black",
      }}
    >
      {text && (
        <article
          style={{
            color: "white",
            position: "absolute",
            left: "0rem",
            bottom: "0rem",
            padding: "max(3vw, 3vh)",
            width: "100%",
          }}
        >
          <h2
            style={{
              fontWeight: "bolder",
              color: "inherit",
              fontSize: "max(3vw, 3vh)",
              margin: "0",
              lineHeight: "1",
            }}
          >
            {movie.title}
          </h2>
          {/* <p style={{ margin: "0 0 0 0", fontSize: "max(1.5vw, 1.5vh)" }}>
            {movie.overview}
          </p> */}
        </article>
      )}
    </div>
  );
}

function MainImage({ movie, text, anchor }) {
  return anchor ? (
    <Link to={`/movie/${movie.id}`}>
      <MainImageContent movie={movie} text={text} />
    </Link>
  ) : (
    <MainImageContent movie={movie} text={text} />
  );
}

export default MainImage;
