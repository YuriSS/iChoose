import { fromNullable } from "data.maybe"

export const getRestaurants = state => (
  state.restaurants
)

export const getRestaurantsData = state => (
  getRestaurants(state).data
)

export const getRestaurantsError = state => (
  getRestaurants(state).error
)

export const isLoading = state => (
  getRestaurants(state).loading
)

export const getRestaurantDataById = state => id => (
  getRestaurantsData(state)
    .chain(xs => fromNullable(xs.find(x => x.id === id)))
)

export const getSelectedRestaurant = state => (
  getRestaurants(state).selected
)