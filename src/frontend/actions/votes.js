import { action } from "./helpers"
import { getCurrentVotes, voteRestaurant, getLastTopRestaurant, closeVotesForCurrentDay } from "../api"
import { getSelectedRestaurant } from "../reducers/restaurants/selectors"
import { getUserData } from "../reducers/user/selectors"

const scope = "votes"

export const CURRENT_DAY_RECEIVED = `${scope}.CURRENT_DAY_RECEIVED`
export const currentDayReceived = action(CURRENT_DAY_RECEIVED, [ "day" ])

export const TOP_LAST_RESTAURANT_RECEIVED = `${scope}.TOP_LAST_RESTAURANT_RECEIVED`
export const topLastRestaurantReceived = action(TOP_LAST_RESTAURANT_RECEIVED, [ "data" ])

export const ERROR_RECEIVED = `${scope}.ERROR_RECEIVED`
export const errorReceived = action(ERROR_RECEIVED, [ "error" ])

export const REQUESTING = `${scope}.REQUESTING`
export const requesting = action(REQUESTING)

export const REQUEST_END = `${scope}.REQUEST_END`
export const requestEnd = action(REQUEST_END)

export const VOTE_OK = `${scope}.VOTE_OK`
export const voteOk = action(VOTE_OK)

export const LAST_TOP_RECEIVED = `${scope}.LAST_TOP_RECEIVED`
export const lastTopReceived = action(LAST_TOP_RECEIVED, [ "data" ])



export const getVotes = () => dispatch => (
  Promise.resolve(dispatch(requesting()))
    .then(getCurrentVotes)
    .then(
      ({ data }) => dispatch(currentDayReceived(data)),
      ({ error }) => dispatch(errorReceived({ error }))
    )
    .then(() => dispatch(requestEnd()))
)

export const getLastTop = () => dispatch => (
  Promise.resolve(dispatch(requesting()))
    .then(getLastTopRestaurant)
    .then(
      ({ data }) => dispatch(lastTopReceived(data)),
      () => null
    )
    .then(() => dispatch(requestEnd()))
)

export const getData = () => dispatch => (
  dispatch(getVotes())
    .then(() => dispatch(getLastTop()))
)

export const voteSelectedRestaurant = () => (dispatch, getState) => (
  Promise.resolve(dispatch(requesting()))
    .then(() => Promise.all([ getSelectedRestaurant(getState()).getOrElse(), getUserData(getState()) ]))
    .then(([ id, user ]) => voteRestaurant({ id, userId: user.id }))
    .then(() => dispatch(requestEnd()))
    .then(() => dispatch(getData()))
    .then(
      ({ data }) => dispatch(voteOk(data)),
      (error) => dispatch(errorReceived({ error }))
    )
)

export const closeDay = () => dispatch => (
  Promise.resolve(dispatch(requesting()))
    .then(closeVotesForCurrentDay)
    .then(() => dispatch(requestEnd()))
    .then(() => dispatch(getData()))
)