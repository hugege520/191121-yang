import {combineReducers} from "redux";
import countReducers from "./count";
import personReducers from "./person";

export default combineReducers({
  number:countReducers,
  person:personReducers
})