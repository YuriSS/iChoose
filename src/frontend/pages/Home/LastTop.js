import React from "react"
import { connect } from "react-redux"
import { getLastTop } from "../../actions/votes"
import { getLastTopRestaurant } from "../../reducers/votes/selectors"
import { getRestaurantDataById } from "../../reducers/restaurants/selectors"
import { pluck } from "../../helpers"
import styled from "styled-components"


const Top = ({ getLastTop, mRestaurant, getRestaurant }) => (
  <div>
    { mRestaurant
      .chain(pluck("restaurantId"))
      .chain(getRestaurant)
      .chain(pluck("name"))
      .map(name => (<Restaurant>Today restaurant is { name }</Restaurant>))
      .getOrElse()
    }
  </div>
)

export default connect(
  state => ({
    mRestaurant: getLastTopRestaurant(state),
    getRestaurant: getRestaurantDataById(state)
  }),
  { getLastTop }
)(Top)

const Restaurant = styled.div.attrs({
  className: "mb4 bg-orange pa3 f4"
})``