import { useContext, useState } from "react";
import MoviesContext from "../../context/MoviesContext";

export default function Dashboard() {
   const { trendingMovies, trendingTvShows } = useContext(MoviesContext);

   const [trending, setTrending] = useState([
      ...trendingMovies,
      ...trendingTvShows,
   ]);

   const genres = {
      28: "Action",
      12: "Adventure",
      16: "Animation",
      35: "Comedy",
      80: "Crime",
      99: "Documentary",
      18: "Drama",
      10751: "Family",
      14: "Fantasy",
      36: "History",
      27: "Horror",
      10402: "Music",
      9648: "Mystery",
      10749: "Romance",
      878: "ScienceFiction",
      10770: "TVMovie",
      53: "Thriller",
      10752: "War",
      37: "Western",
   };

   // Calculate the number of movies for each genre
   const moviesCountByGenre = {};
   Object.keys(genres).forEach((genreId) => {
      const genreName = genres[genreId];
      const moviesInGenre = trending.filter((movie) =>
         movie.genre_ids.includes(parseInt(genreId))
      );
      moviesCountByGenre[genreName] = moviesInGenre.length;
   });

   const cards = Object.keys(genres).map((genreId) => {
      const genreName = genres[genreId];
      return (
         <div className="col-md-3" key={genreId}>
            <div className="card">
               <div className="card-body">
                  <h5 className="card-title">{genreName}</h5>
                  <p className="card-text">
                     Number of Movies: {moviesCountByGenre[genreName]}
                  </p>
               </div>
            </div>
         </div>
      );
   });

   const rows = [];
   for (let i = 0; i < cards.length; i += 4) {
      rows.push(
         <div className="row" key={i}>
            {cards.slice(i, i + 4)}
         </div>
      );
   }

   return <div>{rows}</div>;
}
