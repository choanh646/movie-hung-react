import React from "react";
import {
  GET_MOVIE_REQUEST,
  GET_MOVIE_SUCCESS,
  GET_MOVIE_FAILURE,
} from "../constants/movie";
import moviesAPI from "../services/movieAPI";

export function getMovieByCategory(category) {
  return async (dispatch) => {
    dispatch({ type: GET_MOVIE_REQUEST });
    try {
      const { data } = await moviesAPI.getMovieByCategory(category);

      dispatch({ type: GET_MOVIE_SUCCESS, payload: { data } });
    } catch (error) {
        console.log(error);
      dispatch({
        type: GET_MOVIE_FAILURE,
        payload: { error: error.response.data },
      });
    }
  };
}