import React from "react";
import buildImageURL from "../../../lib/buildImageURL";

function MainImageContent({ movie, title }) {
  if (!movie) return null;

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "max(40vw, 40vh)",
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
        {title && (
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
        )}
        {/* <p style={{ margin: "1rem 0 0 0" }}>{movie.overview}</p> */}
      </article>
    </div>
  );
}

function MainImage({ movie, title, anchor }) {
  return anchor ? (
    <a href={`/movie/${movie.id}`}>
      <MainImageContent movie={movie} title={title} />
    </a>
  ) : (
    <MainImageContent movie={movie} title={title} />
  );
}

export default MainImage;
