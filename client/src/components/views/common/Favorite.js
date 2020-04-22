import React, { useEffect, useState, useCallback } from "react";

function Favorite({ movie }) {
  const [favorite, setFavorite] = useState(null);

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    fetch(`/api/favorite/${userId}/${movie.id}`)
      .then((response) => response.json())
      .then((json) => {
        if (json.success) {
          setFavorite(json.status);
        } else {
          alert("좋아요 여부를 가져오지 못했습니다.");
        }
      });
  }, [movie]);

  const handleClick = useCallback(() => {
    const userId = localStorage.getItem("userId");

    if (favorite) {
      fetch(`/api/favorite/${userId}/${movie.id}`, {
        method: "delete",
      })
        .then((response) => response.json())
        .then((json) => {
          if (json.success) {
            setFavorite(false);
          } else {
            alert("좋아요 취소에 실패하였습니다.");
          }
        });
    }

    if (!favorite) {
      fetch(`/api/favorite/${userId}/${movie.id}`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "post",
        body: JSON.stringify({
          movieTitle: movie.title,
          moviePosterPath: movie.poster_path,
        }),
      })
        .then((response) => response.json())
        .then((json) => {
          if (json.success) {
            setFavorite(true);
          } else {
            alert("좋아요 처리에 실패하였습니다.");
          }
        });
    }
  }, [favorite, movie]);

  if (favorite === null) return null;

  return (
    <button
      onClick={handleClick}
      style={{
        cursor: "pointer",
        border: "none",
        outline: "none",
        background: `${favorite ? "red" : "gray"}`,
        width: "5rem",
        height: "2rem",
        borderRadius: "1rem",
        color: "white",
      }}
    >
      좋아요
    </button>
  );
}

export default Favorite;
