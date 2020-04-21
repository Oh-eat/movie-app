import React, { useEffect, useState } from "react";
import { API_URL, API_KEY, IMAGE_BASE_URL } from "../../Config";
import MainImage from "./Sections/MainImage";

function LandingPage() {
  const [movies, setMovies] = useState(null);

  useEffect(() => {
    const endpoint = `${API_URL}/movie/popular?language=en-US&page=1&api_key=${API_KEY}`;

    fetch(endpoint)
      .then((respone) => respone.json())
      .then((json) => setMovies(json.results));
  }, []);

  if (!movies) return null;
  console.log(movies[0]);

  return (
    <div style={{ width: "100%", margin: "0" }}>
      <div style={{ width: "85%", margin: "1rem auto" }}>
        <MainImage movie={movies[0]} />
        <h2>Movies by latest</h2>
        <hr />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(10vw, 15vw))",
            justifyContent: "space-between",
            gridGap: "1rem 1rem",
          }}
        >
          {movies.map((movie) => (
            <div key={movie.id} style={{ display: "block" }}>
              <img
                style={{
                  //   display: "block",
                  width: "100%",
                  height: "auto",
                  objectFit: "cover",
                }}
                src={`${IMAGE_BASE_URL}/w500/${movie.poster_path}`}
              />
              {/* <h2 style={{ maxWidth: "100%", wordWrap: "break-word" }}>
                {movie.title}
              </h2> */}
            </div>
          ))}
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button>Load More</button>
      </div>
    </div>
  );
}

export default LandingPage;
