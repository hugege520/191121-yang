import { combineReducers } from "redux";
import loginReducers  from "./login";
import headerReducers from "./header";
import categoryReducers from "./category";
export default combineReducers({
  uesrInfo:loginReducers,
  headerTitle:headerReducers,
  category:categoryReducers
})