import { useContext, useState } from "react";
import MoviesContext from "../../context/MoviesContext";
import "../../../assets/styles/admin/Movies.scss";

export default function Movies() {
   const { trendingTvShows } = useContext(MoviesContext);


   return (
      <div>
         {" "}
         <table>
            <thead>
               <tr>
                  <th>Title</th>
                  <th>Release Date</th>
                  <th>Popularity</th>
                  <th>Vote Average</th>
               </tr>
            </thead>
            <tbody>
               {trendingTvShows.map((movie) => (
                  <tr key={movie.id}>
                     <td>{movie.original_name}</td>
                     <td>{movie.first_air_date}</td>
                     <td>{movie.popularity}</td>
                     <td>{movie.vote_average}</td>
                  </tr>
               ))}
            </tbody>
         </table>
      </div>
   );
}
