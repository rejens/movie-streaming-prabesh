import React from "react";
import Card from "react-bootstrap/Card";
import { FaStar, FaPlay } from "react-icons/fa";
import { Link } from "react-router-dom";

function Movie({ info, type }) {
  let rating, release, poster;
  //for tv show
  if (type === "tvShow") {
    rating = info.vote_average;
    release = info.first_air_date.split("-")[0];
    poster = process.env.REACT_APP_TMDB_POSTER + info.poster_path;
  }
  //for movie
  if (type === "movie") {
    rating = info.vote_average;
    release = info.release_date.split("-")[0];
    poster = process.env.REACT_APP_TMDB_POSTER + info.poster_path;
  }
  return (
    <>
      <Card className="card">
        <Link to={`/browse/${type === "movie" ? "movie" : "tv"}/${info.id}`}>
          <Card.Img variant="top" className="poster-img" src={poster} />
        </Link>
        <Card.Body className="card-body">
          <Card.Title>
            <div className="meta-info d-flex gap-2">
              {" "}
              <FaStar className="star" />
              <div> {rating.toFixed(1)}</div>
              <div>{release}</div>
            </div>
          </Card.Title>
          <Card.Text className="movie-name">
            {type === "movie" ? info.title : info.name}
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <div className="d-grid gap-2 col-10 mx-auto">
            <Link
              to={`/browse/${type === "movie" ? "movie" : "tv"}/${info.id}`}
            >
              <button className="btn btn-watch" type="button">
                <div className="d-flex gap-2 justify-content-center">
                  <FaPlay className="play-icon" />
                  watch now{" "}
                </div>
              </button>
            </Link>
          </div>
        </Card.Footer>
      </Card>
    </>
  );
}

export default Movie;
