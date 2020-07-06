import { combineReducers } from "redux";
import user from "./user/"
import restaurants from "./restaurants/"
import votes from "./votes/"

export default combineReducers({
  user,
  restaurants,
  votes
})
