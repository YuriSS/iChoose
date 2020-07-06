import { combineReducers } from "redux";
const { Nothing } = require("data.maybe");
const { pluck } = require("../../helpers");
const { ERROR_RECEIVED, REQUESTING, REQUEST_END, CURRENT_DAY_RECEIVED, LAST_TOP_RECEIVED } = require("../../actions/votes");

const data = (state=Nothing(), action) => {
  switch (action.type) {
    case (CURRENT_DAY_RECEIVED):
      return pluck("day")(action)
    default:
      return state
  }
}

const lastTopRestaurant = (state=Nothing(), action) => {
  switch (action.type) {
    case (LAST_TOP_RECEIVED):
      return pluck("data")(action)
    default:
      return state
  }
}

const error = (state=Nothing(), action) => {
  switch (action.type) {
    case (ERROR_RECEIVED):
      return pluck("error")(action)
    case (REQUESTING):
      return Nothing()
    default:
      return state
  }
}

const loading = (state=false, action) => {
  switch (action.type) {
    case (REQUESTING):
      return true
    case (REQUEST_END):
      return false
    default:
      return state
  }
}


export default combineReducers({
  data,
  error,
  loading,
  lastTopRestaurant
})