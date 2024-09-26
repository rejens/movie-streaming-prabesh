import React from "react";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import MoviesContext from "./context/MoviesContext";
import PamphletList from "./shared/PamphletList";
function Search() {
  const {
    searchedMovies,
    searchedTvs,
    searchMovie,
    searchTv,
    search,
    setSearch,
  } = useContext(MoviesContext);

  const { name } = useParams();

  if (!search) {
    setSearch(name);
  }
  useEffect(() => {
    searchMovie(search);
    searchTv(search);
  }, [search]);


  return (
    <div className="content">
      <PamphletList type="movie" title="movies" shows={searchedMovies} />
      <PamphletList type="tvShow" title="tv shows" shows={searchedTvs} />
    </div>
  );
}

export default Search;
