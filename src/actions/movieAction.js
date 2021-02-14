import { findAllByDisplayValue } from "@testing-library/react";
import axios from "axios";
import { BASE_URL, MOVIE_URL, API_KEY } from "../Constants";
import {
  SET_HOME_LOADING,SET_MOVIE_LIST, MOVIE_ERROR, GET_DETAIL
} from "./types";

// Get Brands
export const getMovies = (page) => async (dispatch) => {
  try {
    dispatch(setLoading());
    const res = await axios.get(`${MOVIE_URL}&page=${page}`);
    //console.log(res.data);
    dispatch({
      type: SET_MOVIE_LIST,
      payload: res.data,
    });
  } catch (err) {
    //console.log(err);
    dispatch({
      type: MOVIE_ERROR,
      payload: err.status_message,
    });
  }
}

export const getDetail = (id) => async (dispatch) => {
    try {
        dispatch(setLoading());
        const res = await axios.get(`${BASE_URL}movie/${id}?api_key=${API_KEY}`);
        //console.log(res.data);
        dispatch({
            type: GET_DETAIL,
            payload: res.data,
        });    
    } catch (err) {
        let error_msg = "";
        if (err.response) {
            //console.log(err.response)
            error_msg = err.response.data.status_message;
        } else if (err.request) {
            //console.log(err.request);
            error_msg = "Request not ful-fill, please try again";
        } else {
            error_msg = "Please try again";
        }
        dispatch({
            type: MOVIE_ERROR,
            payload: error_msg
        });
    }
}

export const setLoading = () => {
  return {
    type: SET_HOME_LOADING,
  };
};

export const getImages = async (id) => {
    try {
        const res = await axios.get(`${BASE_URL}movie/${id}/images?api_key=${API_KEY}`);
        //console.log(res.data);
        return {status:1,data:res.data};    
    } catch (err) {
        let error_msg = "";
        if (err.response) {
            //console.log(err.response)
            error_msg = err.response.data.status_message;
        } else if (err.request) {
            //console.log(err.request);
            error_msg = "Request not ful-fill, please try again";
        } else {
            error_msg = "Please try again";
        }
        return {status:0,data:error_msg};
    }

}

export const searchMovie = async (query) => {
    try {
        const res = await axios.get(`${BASE_URL}search/movie?api_key=${API_KEY}&query=${query}`);
        //console.log(res.data);
        return {status:1,data:res.data};    
    } catch (err) {
        let error_msg = "";
        if (err.response) {
            //console.log(err.response)
            error_msg = err.response.data.status_message;
        } else if (err.request) {
            //console.log(err.request);
            error_msg = "Request not ful-fill, please try again";
        } else {
            error_msg = "Please try again";
        }
        return {status:0,data:error_msg};
    }

}
