import { combineReducers } from "redux";
import Maybe from "data.maybe/lib/maybe";
const { Nothing } = require("data.maybe");
const { pluck } = require("../../helpers");
const { LOGGED_IN, LOGGED_OUT, ERROR_RECEIVED, USER_REGISTERED, REQUESTING, REQUEST_END, UPDATE_USER_INFO } = require("../../actions/user");

const data = (state={}, action) => {
  switch (action.type) {
    case (UPDATE_USER_INFO):
      return Maybe.of(key => value => ({ ...state, [key]: value }))
        .ap(pluck("key")(action))
        .ap(pluck("value")(action))
        .getOrElse(state)
    case (LOGGED_IN):
    case (USER_REGISTERED):
      return Maybe.of(username => privilege => id => ({ ...state , id, username, privilege }))
        .ap(pluck("data", "username")(action))
        .ap(pluck("data", "privilege")(action))
        .ap(pluck("data", "id")(action))
        .getOrElse(state)
    default:
      return state
  }
}

const error = (state=Nothing(), action) => {
  switch (action.type) {
    case (ERROR_RECEIVED):
      return pluck("error")(action)
    case (LOGGED_IN):
    case (LOGGED_OUT):
    case (USER_REGISTERED):
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

const logged = (state=false, action) => {
  switch (action.type) {
    case (LOGGED_IN):
      return true
    case (LOGGED_OUT):
      return false
    default:
      return state
  }
}

export default combineReducers({
  data,
  error,
  loading,
  logged
})
