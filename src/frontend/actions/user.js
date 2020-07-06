import { action } from "./helpers"
import { sleep } from "../helpers"
import { loginUser, createUser  } from "../api"

const scope = "user"

export const LOGGED_IN = `${scope}.LOGGED_IN`
export const loggedIn = action(LOGGED_IN, [ "data" ])

export const LOGGED_OUT = `${scope}.LOGGED_OUT`
export const loggedOut = action(LOGGED_OUT)

export const USER_REGISTERED = `${scope}.USER_REGISTERED`
export const userRegistered = action(USER_REGISTERED, [ "data" ])

export const ERROR_RECEIVED = `${scope}.ERROR_RECEIVED`
export const errorReceived = action(ERROR_RECEIVED, [ "error" ])

export const REQUESTING = `${scope}.REQUESTING`
export const requesting = action(REQUESTING)

export const REQUEST_END = `${scope}.REQUEST_END`
export const requestEnd = action(REQUEST_END)

export const UPDATE_USER_INFO = `${scope}.UPDATE_USER_INFO`
export const updateUserInfo = action(UPDATE_USER_INFO, [ "key", "value" ])


export const register = ({ username, password }) => dispatch => (
  Promise.resolve(dispatch(requesting()))
    .then(() => createUser({ username, password }))
    .then(sleep(3000))
    .then(
      ({ data }) => dispatch(loggedIn(data)),
      ({ error }) => sleep(1000)().then(() => dispatch(errorReceived({ error })))
    )
    .then(() => dispatch(requestEnd()))
)

export const login = ({ username, password }) => dispatch => (
  Promise.resolve(dispatch(requesting()))
    .then(() => loginUser({ username, password }))
    .then(sleep(2000))
    .then(
      ({ data }) => dispatch(loggedIn(data)),
      ({ error }) => sleep(1000)().then(() => dispatch(errorReceived({ error })))
    )
    .then(() => dispatch(requestEnd()))
)
