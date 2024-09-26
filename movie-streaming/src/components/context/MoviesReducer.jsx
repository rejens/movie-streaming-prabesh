import React from "react";

function MoviesReducer(state, action) {
   switch (action.type) {
      case "GET_TRENDING_MOVIES":
         return { ...state, trendingMovies: action.payload };

      case "GET_TRENDING_TVSHOWS":
         return { ...state, trendingTvShows: action.payload };

      case "GET_LATEST_MOVIES":
         return { ...state, latestMovies: action.payload };

      case "GET_SELECTED_MOVIE_ID":
         return { ...state, selectedMovieId: action.payload };

      case "GET_SELECTED_TVSHOW_ID":
         return { ...state, selectedTvShowId: action.payload };

      case "GET_BROWSED_MOVIE":
         return { ...state, browsedMovie: action.payload };

      case "GET_BROWSED_TVSHOW":
         return { ...state, browsedTvShow: action.payload };

      case "GET_BROWSED_TVSHOW_VIDEO":
         return { ...state, tvVideo: action.payload };

      case "GET_BROWSED_MOVIE_VIDEO":
         return { ...state, movieVideo: action.payload };

      case "GET_SEARCHED_TV":
         return { ...state, searchedTvs: action.payload };

      case "GET_SEARCHED_MOVIE":
         return { ...state, searchedMovies: action.payload };

      case "GET_SEARCHED_NAME":
         return { ...state, search: action.payload };

      case "GET_SIMILAR_TVS":
         return { ...state, similarTvs: action.payload };

      case "GET_SIMILAR_MOVIES":
         return { ...state, similarMovies: action.payload };

      //for admin panel
      case "GET_USERS":
         return { ...state, users: action.payload };

      default:
         return state;
   }
}

export default MoviesReducer;
