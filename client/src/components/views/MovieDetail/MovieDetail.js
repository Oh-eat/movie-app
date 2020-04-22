import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_URL, API_KEY } from "../../Config";
import buildImageURL from "../../../lib/buildImageURL";
import Favorite from "../common/Favorite";
import MainImage from "../common/MainImage";

function fetchData(endpoint, setter) {
  return fetch(endpoint)
    .then((response) => response.json())
    .then(setter);
}

function MovieDetail({ match }) {
  const [detail, setDetail] = useState(null);
  const [credit, setCredit] = useState(null);
  const [images, setImages] = useState(null);
  const [videos, setVideos] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const movieId = match.params.movieId;
    const detailEndpoint = `${API_URL}/movie/${movieId}?api_key=${API_KEY}&language=ko-KR`;
    const creditEndpoint = `${API_URL}/movie/${movieId}/credits?api_key=${API_KEY}`;
    const imageEndpoint = `${API_URL}/movie/${movieId}/images?api_key=${API_KEY}`;
    const videoEndpoint = `${API_URL}/movie/${movieId}/videos?api_key=${API_KEY}`;

    Promise.all([
      fetchData(detailEndpoint, setDetail),
      fetchData(creditEndpoint, setCredit),
      fetchData(imageEndpoint, setImages),
      fetchData(videoEndpoint, setVideos),
    ]).then(() => setLoading(false));
    // .then(([detailData, creditData, imageData, videoData]) => {
    //   setDetail(detailData);
    //   setCredit(creditData);
    //   setImages(imageData);
    //   setVideos(videoData);
    // });
  }, [match.params]);

  if (loading) return <h1>Loading...</h1>;
  if (!detail || !credit || !images || !videos) return null;
  // console.log(detail, credit, images, videos);

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <MainImage movie={detail} />
      <div style={{ width: "85%", margin: "0 auto" }}>
        <div style={{ display: "flex", marginTop: "1rem" }}>
          <img
            style={{ width: "15rem", maxHeight: "40vh" }}
            src={buildImageURL(detail.poster_path)}
            alt=""
          />
          <div
            style={{
              marginLeft: "1rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <h1 style={{ margin: "0" }}>
              {detail.homepage ? (
                <a href={detail.homepage} target="_blank">
                  {detail.title}
                </a>
              ) : (
                <>{detail.title}</>
              )}
            </h1>
            <i style={{ margin: "0.5rem" }}>{detail.original_title}</i>
            <ul>
              {detail.genres.map((genre) => (
                <li
                  style={{ display: "inline-block", margin: "0 0.5rem" }}
                  key={genre.id}
                >
                  {genre.name}
                </li>
              ))}
            </ul>
            <ul>
              <li style={{ display: "inline-block", margin: "0 0.5rem" }}>
                상영 시간: {detail.runtime}분
              </li>
              <li style={{ display: "inline-block", margin: "0 0.5rem" }}>
                평점: {detail.vote_average}
              </li>
            </ul>
            <h2>{detail.tagline}</h2>
            <p>{detail.overview}</p>
            <Favorite movie={detail} />
          </div>
        </div>
        <ul
          style={{
            width: "100%",
            margin: "1rem 0 0 0",
            padding: "0",
            display: "grid",
            gridGap: "1rem",
            gridTemplateColumns: "repeat(auto-fill, minmax(15vw, 1fr))",
          }}
        >
          {credit.cast.map((cast, index) => (
            <li
              className="movie_item"
              style={{ display: "block", width: "100%", textAlign: "center" }}
              key={index}
            >
              <img src={buildImageURL(cast.profile_path)} alt="" />
              <strong>{cast.character}</strong>
              <br />
              <span>{cast.name}</span>
            </li>
          ))}
        </ul>
        <ul
          style={{
            width: "100%",
            margin: "1rem 0 0 0",
            padding: "0",
            display: "grid",
            gridGap: "1rem",
            gridTemplateColumns: "repeat(auto-fill, minmax(15vw, 1fr))",
          }}
        >
          {credit.crew.map((crew, index) => (
            <li
              className="movie_item"
              style={{ display: "block", width: "100%", textAlign: "center" }}
              key={index}
            >
              <img src={buildImageURL(crew.profile_path)} alt="" />
              <strong>{crew.name}</strong>
              <br />
              <span>{crew.job}</span>
            </li>
          ))}
        </ul>
        <ul
          style={{
            width: "100%",
            margin: "1rem 0 0 0",
            padding: "0",
            display: "grid",
            gridGap: "1rem",
            gridTemplateColumns: "repeat(auto-fill, minmax(30%, 1fr))",
          }}
        >
          {images.backdrops.map((image, index) => (
            <li
              style={{ display: "block", width: "100%", textAlign: "center" }}
              key={index}
              alt=""
            >
              <img src={buildImageURL(image.file_path, "w1280")} alt="" />
            </li>
          ))}
        </ul>
        <ul
          style={{
            width: "100%",
            margin: "1rem 0 0 0",
            padding: "0",
            display: "grid",
            gridGap: "1rem",
            gridTemplateColumns: "repeat(auto-fill, minmax(15vw, 1fr))",
          }}
        >
          {images.posters.slice(0, 5).map((image, index) => (
            <li
              style={{ display: "block", width: "100%", textAlign: "center" }}
              key={index}
            >
              <img src={buildImageURL(image.file_path, "w1280")} alt="" />
            </li>
          ))}
        </ul>
        {/* <ul
          style={{
            width: "100%",
            margin: "1rem 0 0 0",
            padding: "0",
            display: "grid",
            gridGap: "1rem",
            gridTemplateColumns: "repeat(auto-fill, minmax(40%, 1fr))",
          }}
        >
          {videos.results.slice(0, 5).map((video, index) => (
            <li
              style={{ display: "block", width: "100%", textAlign: "center" }}
              key={index}
            >
              <video
                style={{
                  width: "100%",
                  height: "auto",
                  border: "1px solid black",
                }}
                src={`https://www.youtube.com/watch?v=${video.key}`}
              />
            </li>
          ))}
        </ul> */}
      </div>
    </div>
  );
}

export default MovieDetail;
