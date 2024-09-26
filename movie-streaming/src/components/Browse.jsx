import React from "react";
import { useParams, useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import MoviesContext from "./context/MoviesContext";
import { FaPlay } from "react-icons/fa";
import Video from "./browse/Video";
import Related from "./Related";

function Browse() {
  window.scrollTo(0, 0);

  const {
    browsedTvShow,
    browsedMovie,
    updateSelectedMovieId,
    updateSelectedTvShowId,
    selectedMovieId,
    selectedTvShowId,
  } = useContext(MoviesContext);
  const { showType, id } = useParams();

  const [genre, setGenre] = useState();
  const [title, setTitle] = useState();
  const [rating, setRating] = useState();
  const [duration, setDuration] = useState();
  const [country, setCountry] = useState();
  const [production, setProduction] = useState();

  useEffect(() => {
    if (showType == "tv") {
      setTitle(browsedTvShow.name);
      setRating(browsedTvShow.vote_average);
      setDuration(browsedTvShow.episode_run_time);
      setGenre(browsedTvShow.genres);
      setCountry(browsedTvShow.production_countries);
      setProduction(browsedTvShow.production_companies);
    }

    if (showType == "movie") {
      setGenre(browsedMovie.genre);
      setTitle(browsedMovie.title);
      setRating(browsedMovie.vote_average);
      setDuration(browsedMovie.runtime);
      setCountry(browsedMovie.production_countries);
      setProduction(browsedMovie.production_companies);
    }
  }, [browsedTvShow, browsedMovie]);

  //adding backdrop

  // for tracking the url change
  const location = useLocation();

  useEffect(() => {
    if (showType === "movie") updateSelectedMovieId(id);
    if (showType === "tv") updateSelectedTvShowId(id);
  }, [location]);
  //

  useEffect(() => {
    if (showType == "movie") {
      updateSelectedMovieId(id);
    }
  }, [selectedMovieId]);

  useEffect(() => {
    if (showType == "tv") {
      updateSelectedTvShowId(id);
    }
  }, [selectedTvShowId]);

  let poster, overview, released_date;
  if (showType == "tv") {
    poster = process.env.REACT_APP_TMDB_BACKDROP + browsedTvShow.poster_path;
    overview = browsedTvShow.overview;
    released_date = browsedTvShow.first_air_date;
  } else if (showType == "movie") {
    poster = process.env.REACT_APP_TMDB_BACKDROP + browsedMovie.poster_path;
    overview = browsedMovie.overview;
    released_date = browsedMovie.release_date;
  }

  const addBackdrop = () => {
    const backdrop = document.querySelector(".backdrop");
    if (backdrop) {
      backdrop.style.backgroundImage = `url(${
        process.env.REACT_APP_TMDB_BACKDROP
      }${
        showType == "tv"
          ? browsedTvShow.backdrop_path
          : browsedMovie.backdrop_path
      })`;
    }
  };

  const playTrailer = () => {
    document.querySelector(".embed").classList.remove("embed-none");
    setTimeout(() => {
      document.querySelector(".embed").classList.remove("hide-embed");
    }, 1)();
  };

  return (
    <>
      <div className="backdrop">
        <Video showType={showType} />
        <div className="movie-info h-100 d-flex align-items-center ">
          <div className="side-rating">
            <h2>{rating && rating.toFixed(1)}</h2>
          </div>

          {/* <div className="info d-flex justify-content-center w-75 mx-auto gap-5"> */}
          <div className="info row w-75 mx-auto">
            <div className="poster col-xs-10 col-lg-3 ">
              <img src={poster} alt="poster" />
            </div>

            <div className="description col-xs-10 col-lg-8 ">
              <h3>{title}</h3>
              {/* <p>small info</p> */}
              <p>overview:</p>
              <p className="overview">{overview}</p>
              <div className="d-flex gap-5">
                <div className="left-half">
                  released: <span className="details">{released_date}</span>
                  <br />
                  genre:{" "}
                  <span className="details">
                    {genre ? genre.map((element) => element.name + " , ") : ""}
                  </span>
                  <br />
                </div>
                <div className="right-half">
                  duration: <span className="details">{duration}</span>
                  <br />
                  country:{" "}
                  <span className="details">
                    {country ? country.map((element) => element.name) : ""}
                  </span>
                  <br />
                  production:{" "}
                  <span className="details">
                    {production
                      ? production.map((element) => element.name + " , ")
                      : ""}
                  </span>
                </div>
              </div>
              <div className="w-25 mt-3">
                <button
                  className="btn btn-watch"
                  type="button"
                  data-bs-toggle="modal"
                  data-bs-target="#video"
                  onClick={() => {
                    playTrailer();
                  }}
                >
                  <div className="d-flex gap-2 justify-content-center">
                    <FaPlay className="play-icon" />
                    watch trailer{" "}
                  </div>
                </button>{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="content container">
        {" "}
        <Related />
      </div>

      {addBackdrop()}
    </>
  );
}

export default Browse;
