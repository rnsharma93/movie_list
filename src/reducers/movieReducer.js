import {
    SET_HOME_LOADING,
    SET_MOVIE_LIST,
    MOVIE_ERROR,
    GET_DETAIL
  } from "../actions/types";
  
  const initialState = {
    loading: false,
    data: [],
    error: null,
    cur_page:1,
    detail: {},
    total_page : 1,
  };
  
  export default (state = initialState, action) => {
    switch (action.type) {
      case SET_HOME_LOADING:
        // console.log("loading true");
        return {
          ...state,
          loading: true,
          error: "",
          data: [],
          detail:{}
        };
      case SET_MOVIE_LIST:
        //console.log(action.payload.results);
        return {
          ...state,
          data: action.payload.results,
          loading: false,
          cur_page: action.payload.page,
          total_page: action.payload.total_pages
        };
      case GET_DETAIL: 
        return {
            ...state,
            loading: false,
            detail: action.payload,

        }  
      case MOVIE_ERROR:
          console.log(action);
        return {
          ...state,
          error: action.payload,
          data: [],
          loading: false,
        };
      default:
        return state;
    }
  };
  