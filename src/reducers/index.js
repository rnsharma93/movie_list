import { MovieRounded } from "@material-ui/icons";
import { combineReducers } from "redux";
import movieReducer from "./movieReducer";

export default combineReducers({
  movie: movieReducer
  
});
