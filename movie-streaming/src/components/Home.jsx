import { React, useContext } from "react";
import PamphletList from "./shared/PamphletList";
import MoviesContext from "./context/MoviesContext";

function Home() {
  const { trendingMovies, latestMovies, trendingTvShows } =
    useContext(MoviesContext);
  return (
    <div className="content">
      <PamphletList
        title="Trending movies"
        type="movie"
        shows={trendingMovies}
      />
      <PamphletList
        title="trending tv shows"
        type="tvShow"
        shows={trendingTvShows}
      />
      {/* <PamphletList title="Latest" /> */}
    </div>
  );
}

export default Home;
