import { action } from "./helpers";
import { getRestaurants as getRestaurantsApi } from "../api"
import { sleep } from "../helpers";

const scope = "restaurants"

export const RESTAURANTS_RECEIVED = "RESUTANRATS_RECEIVED"
export const restaurantsReceived = action(RESTAURANTS_RECEIVED, [ "data" ])

export const ERROR_RECEIVED = `${scope}.ERROR_RECEIVED`
export const errorReceived = action(ERROR_RECEIVED, [ "error" ])

export const REQUESTING = `${scope}.REQUESTING`
export const requesting = action(REQUESTING)

export const REQUEST_END = `${scope}.REQUEST_END`
export const requestEnd = action(REQUEST_END)

export const SELECT_RESTAURANT = `${scope}.SELECT_RESTAURANT`
export const selectRestaurant = action(SELECT_RESTAURANT, [ "id" ])


export const getRestaurants = () => (dispatch) => (
  Promise.resolve(dispatch(requesting()))
    .then(getRestaurantsApi)
    .then(sleep(1000))
    .then(
      ({ data }) => dispatch(restaurantsReceived(data)),
      ({ error }) => sleep(1000)().then(() => dispatch(errorReceived({ error })))
    )
    .then(() => dispatch(requestEnd()))
)
