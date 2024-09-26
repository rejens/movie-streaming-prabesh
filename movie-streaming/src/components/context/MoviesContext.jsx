import React from "react";
import axios from "axios";
import { useEffect, createContext, useReducer } from "react";
import MoviesReducer from "./MoviesReducer";

import mergeSort from "../admin/algorithms/mergeSort";

const MoviesContext = createContext();

function MoviesContextProvider({ children }) {
   const initialState = {
      apiKey: process.env.REACT_APP_TMDB_API,
      token: process.env.REACT_APP_TMDB_TOKEN,
      trendingMovies: [],
      trendingTvShows: [],
      latestMovies: [],
      browsedMovie: [],
      browsedTvShow: [],
      selectedMovieId: "",
      selectedTvShowId: "",
      movieVideo: [],
      tvVideo: [],
      searchedMovies: [],
      searchedTvs: [],
      search: "",
      similarMovies: [],
      similarTvs: [],
      users: [],
   };

   const [state, dispatch] = useReducer(MoviesReducer, initialState);

   //fetches trending movies
   const fetchTrendingMovies = async () => {
      try {
         const response = await axios.get(
            `https://api.themoviedb.org/3/trending/movie/day?api_key=${state.apiKey}`,
            {
               headers: {
                  Authorization: state.token,
               },
            }
         );
         const trendingMovies = response.data.results;
         dispatch({ type: "GET_TRENDING_MOVIES", payload: trendingMovies });
      } catch (error) {
         //console.error(error);
      }
   };

   //fetches trending tvshows
   const fetchTrendingTvShows = async () => {
      try {
         const response = await axios.get(
            `https://api.themoviedb.org/3/trending/tv/day?api_key=${state.apiKey}`,
            {
               headers: {
                  Authorization: state.token,
               },
            }
         );
         const latestTvShows = response.data.results;
         dispatch({ type: "GET_TRENDING_TVSHOWS", payload: latestTvShows });
      } catch (error) {
         //console.error(error);
      }
   };

   //fetched browsed movie
   const browseMovie = async (movieId) => {
      try {
         const response = await axios.get(
            `https://api.themoviedb.org/3/movie/${movieId}?api_key=${state.apiKey}&language=en-US`,
            {
               headers: {
                  Authorization: state.token,
               },
            }
         );
         const browsedMovie = response.data.results;
         dispatch({ type: "GET_BROWSED_MOVIE", payload: browsedMovie });
      } catch (error) {
         //console.error(error);
      }
   };

   //updates the state with id of selected movie/tvshow
   const updateSelectedMovieId = async (id) => {
      dispatch({ type: "GET_SELECTED_MOVIE_ID", payload: id });
   };
   const updateSelectedTvShowId = async (id) => {
      dispatch({ type: "GET_SELECTED_TVSHOW_ID", payload: id });
   };

   const updateBrowsedMovie = async () => {
      try {
         const response = await axios.get(
            `https://api.themoviedb.org/3/movie/${state.selectedMovieId}?api_key=${state.apiKey}&language=en-US`,
            {
               headers: {
                  Authorization: state.token,
               },
            }
         );
         const browsedMovie = response.data;
         dispatch({ type: "GET_BROWSED_MOVIE", payload: browsedMovie });
      } catch (error) {
         //console.error(error);
      }
   };

   const updateBrowsedTvShow = async () => {
      try {
         const response = await axios.get(
            `https://api.themoviedb.org/3/tv/${state.selectedTvShowId}?api_key=${state.apiKey}&language=en-US`,
            {
               headers: {
                  Authorization: state.token,
               },
            }
         );
         const browsedTvShow = response.data;
         dispatch({ type: "GET_BROWSED_TVSHOW", payload: browsedTvShow });
      } catch (error) {
         //console.error(error);
      }
   };

   //fetching video details
   const getMovieVideo = async () => {
      try {
         const response = await axios.get(
            `https://api.themoviedb.org/3/movie/${state.selectedMovieId}/videos?api_key=${state.apiKey}`,
            {
               headers: {
                  Authorization: state.token,
               },
            }
         );
         const browsedMovieVideo = response.data;
         dispatch({
            type: "GET_BROWSED_MOVIE_VIDEO",
            payload: browsedMovieVideo,
         });
      } catch (error) {
         //console.error(error);
      }
   };

   const getTvVideo = async () => {
      try {
         const response = await axios.get(
            `https://api.themoviedb.org/3/tv/${state.selectedTvShowId}/videos?api_key=${state.apiKey}`,
            {
               headers: {
                  Authorization: state.token,
               },
            }
         );
         const browsedTvVideo = response.data;
         dispatch({
            type: "GET_BROWSED_TVSHOW_VIDEO",
            payload: browsedTvVideo,
         });
      } catch (error) {
         //console.error(error);
      }
   };

   const searchMovie = async (name) => {
      try {
         const response = await axios.get(
            `https://api.themoviedb.org/3/search/movie?api_key=${state.apiKey}&language=en-US&query=${name}&page=1&include_adult=false`,
            {
               headers: {
                  Authorization: state.token,
               },
            }
         );
         const searchedMovie = response.data.results;
         dispatch({ type: "GET_SEARCHED_MOVIE", payload: searchedMovie });
      } catch (error) {
         //console.error(error);
      }
   };

   const searchTv = async (name) => {
      try {
         const response = await axios.get(
            `https://api.themoviedb.org/3/search/tv?api_key=${state.apiKey}&language=en-US&query=${name}&page=1&include_adult=false`,
            {
               headers: {
                  Authorization: state.token,
               },
            }
         );
         const searchedTv = response.data.results;
         dispatch({ type: "GET_SEARCHED_TV", payload: searchedTv });
      } catch (error) {
         //console.error(error);
      }
   };

   //similar movies and tv shows
   const getSimilarMovies = async (movieId) => {
      try {
         const response = await axios.get(
            `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${state.apiKey}&language=en-US&page=1`,
            {
               headers: {
                  Authorization: state.token,
               },
            }
         );
         const similarMovie = response.data.results;
         dispatch({ type: "GET_SIMILAR_MOVIES", payload: similarMovie });
      } catch (error) {
         //console.error(error);
      }
   };

   const getSimilarTvShows = async (tvId) => {
      try {
         const response = await axios.get(
            `https://api.themoviedb.org/3/tv/${tvId}/similar?api_key=${state.apiKey}&language=en-US&page=1`,
            {
               headers: {
                  Authorization: state.token,
               },
            }
         );
         const similarTv = response.data.results;
         dispatch({ type: "GET_SIMILAR_TVS", payload: similarTv });
      } catch (error) {
         //console.error(error);
      }
   };

   //fetches users from the database
   const fetchUsers = async () => {
      try {
         const response = await axios.get(
            `${process.env.REACT_APP_SERVER}/users`
         );
         mergeSort(response.data);
         const data = response.data;
         dispatch({ type: "GET_USERS", payload: data });
      } catch (err) {
         console.log(err);
      }
   };

   const setSearch = (value) => {
      dispatch({ type: "GET_SEARCHED_NAME", payload: value });
   };

   useEffect(() => {
      getMovieVideo();
      getTvVideo();
   }, [state.browsedTvShow, state.browsedMovie]);

   useEffect(() => {
      updateBrowsedTvShow();
   }, [state.selectedTvShowId]);

   useEffect(() => {
      updateBrowsedMovie();
   }, [state.selectedMovieId]);

   useEffect(() => {
      fetchTrendingMovies();
      fetchTrendingTvShows();
      fetchUsers();
   }, []);

   return (
      <MoviesContext.Provider
         value={{
            ...state,
            browseMovie,
            updateSelectedMovieId,
            updateSelectedTvShowId,
            getMovieVideo,
            getTvVideo,
            searchMovie,
            searchTv,
            setSearch,
            getSimilarTvShows,
            getSimilarMovies,
         }}
      >
         {children}
      </MoviesContext.Provider>
   );
}

export default MoviesContext;
export { MoviesContextProvider };
