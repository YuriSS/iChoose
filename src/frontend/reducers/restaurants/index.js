import { combineReducers } from "redux";
const { Nothing } = require("data.maybe");
const { pluck } = require("../../helpers");
const { ERROR_RECEIVED, REQUESTING, REQUEST_END, RESTAURANTS_RECEIVED, SELECT_RESTAURANT } = require("../../actions/restaurants");

const data = (state=Nothing(), action) => {
  switch (action.type) {
    case (RESTAURANTS_RECEIVED):
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

const selected = (state=Nothing(), action) => {
  switch (action.type) {
    case (SELECT_RESTAURANT):
      return pluck("id")(action)
    default:
      return state
  }
}

export default combineReducers({
  data,
  error,
  loading,
  selected
})

