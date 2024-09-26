import React from "react";
import { useEffect, useContext } from "react";
import { useParams, useLocation, useState } from "react-router-dom";

import PamphletList from "./shared/PamphletList";
import MoviesContext from "./context/MoviesContext";

function Related() {
  const { getSimilarTvShows, getSimilarMovies, similarTvs, similarMovies } =
    useContext(MoviesContext);

  //   const [currentUrl, setCurrentUrl] = useState(location.pathname);

  ////
  const { showType, id } = useParams();
  const location = useLocation();

  useEffect(() => {
    if (showType === "movie") getSimilarMovies(id);
    if (showType === "tv") getSimilarTvShows(id);
  }, [location]);
  //////

  useEffect(() => {
    if (showType === "movie") getSimilarMovies(id);
    if (showType === "tv") getSimilarTvShows(id);
  }, []);
  // similarTvs && similarMovies &&

  return (
    <>
      {showType == "movie" ? (
        <PamphletList
          title="Similar Movies"
          type="movie"
          shows={similarMovies}
        />
      ) : (
        <PamphletList
          title="Similar Tv Shows"
          type="tvShow"
          shows={similarTvs}
        />
      )}
      {similarMovies.length == 0 && "sorry no similar shows"}
    </>
  );
}

export default Related;
