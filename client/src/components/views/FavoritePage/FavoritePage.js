import React, { useEffect, useState } from "react";
import MovieGrid from "../common/MovieGrid";

function FavoritePage(props) {
  const [favoriteMovies, setFavoriteMovies] = useState(null);

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    fetch(`/api/favorite/${userId}`)
      .then((response) => response.json())
      .then((json) => {
        if (json.success) {
          const mapped = json.favoriteMovies.map(
            ({ movieId, movieTitle, moviePosterPath }) => ({
              id: movieId,
              title: movieTitle,
              poster_path: moviePosterPath,
            })
          );
          setFavoriteMovies(mapped);
        } else {
          alert("좋아요 목록 수신에 실패하였습니다.");
        }
      });
  }, []);

  if (!favoriteMovies) return null;

  return (
    <div style={{ width: "100%", margin: "0" }}>
      <div style={{ width: "85%", margin: "1rem auto" }}>
        <h2>Favorite Movies</h2>
        <hr />
        {favoriteMovies.length > 0 ? (
          <MovieGrid movies={favoriteMovies} />
        ) : (
          <h1>좋아하는 영화가 없습니다 :(</h1>
        )}
      </div>
    </div>
  );
}

export default FavoritePage;
