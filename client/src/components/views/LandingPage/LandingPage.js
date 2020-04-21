import React, { useEffect, useState, useCallback, useRef } from "react";
import { API_URL, API_KEY } from "../../Config";
import MainImage from "./Sections/MainImage";
import MovieGrid from "./Sections/MovieGrid";

function LandingPage() {
  const [movies, setMovies] = useState(null);
  const lastPage = useRef(1);
  const loading = useRef(false);

  const fetchMovies = useCallback(() => {
    if (loading.current) return;
    if (lastPage.current > 500) return;

    const endpoint = `${API_URL}/movie/now_playing?language=ko-KR&page=${lastPage.current++}&api_key=${API_KEY}`;
    loading.current = true;
    fetch(endpoint)
      .then((respone) => respone.json())
      .then((json) => {
        if (!movies) {
          setMovies(json.results);
        } else {
          setMovies(movies.concat(json.results));
        }
        loading.current = false;
      });
  }, [movies]);

  const infinityScroll = useCallback(() => {
    const scrollHeight = Math.max(
      document.documentElement.scrollHeight,
      document.body.scrollHeight
    );
    const scrollTop = Math.max(
      document.documentElement.scrollTop,
      document.body.scrollTop
    );
    const clientHeight = Math.max(
      document.documentElement.clientHeight,
      document.body.clientHeight
    );

    if (scrollHeight <= scrollTop + clientHeight) {
      fetchMovies();
    }
  }, [fetchMovies]);

  useEffect(() => {
    const height = Math.max(
      document.body.clientHeight,
      document.body.offsetHeight,
      document.body.scrollHeight,
      document.scrollingElement.scrollHeight,
      document.scrollingElement.clientHeight
    );
    if (!movies) {
      fetchMovies();
    } else if (height <= window.innerHeight) {
      fetchMovies();
    }
  }, [movies, fetchMovies]);

  useEffect(() => {
    window.addEventListener("scroll", infinityScroll);
    return () => {
      window.removeEventListener("scroll", infinityScroll);
    };
  }, [infinityScroll]);

  const handleClick = useCallback(() => {
    fetchMovies();
  }, [fetchMovies]);

  if (!movies) return null;

  return (
    <div style={{ width: "100%", margin: "0" }}>
      <MainImage movie={movies[0]} />
      <div style={{ width: "85%", margin: "1rem auto" }}>
        <h2>Movies by latest</h2>
        <hr />
        <MovieGrid movies={movies} />
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        {lastPage.current < 500 && (
          <button onClick={handleClick}>Load More</button>
        )}
      </div>
    </div>
  );
}

export default LandingPage;
