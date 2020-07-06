import React from "react"
import Button from "../../components/Button/"
import Message from "../../components/Message"
import { Select } from "../../components/Inputs/"
import { connect } from "react-redux"
import { Just } from "data.maybe"
import { K, pluck } from "../../helpers"
import { selectRestaurant } from "../../actions/restaurants"
import { voteSelectedRestaurant } from "../../actions/votes"
import { getVotesError } from "../../reducers/votes/selectors"

const Restaurants = ({ error, selectRestaurant, restaurants, voteSelectedRestaurant }) => (
  <>
    <Select onChange={selectRestaurant} label={Just("Vote for next restaurant")}>
      <option>Select a restaurant</option>
      { restaurants
        .map(restaurant => (<option value={restaurant.id} key={restaurant.id}>{restaurant.name}</option>))
      }
    </Select>
    { error
      .chain(pluck("error"))
      .cata({
        Nothing: K(null),
        Just: ({ error }) => <Message>{error.toString()}</Message>
      })
    }
    <Button onClick={voteSelectedRestaurant} block>Vote</Button>
  </>
)

export default connect(
  state => ({
    error: getVotesError(state)
  }),
  { selectRestaurant, voteSelectedRestaurant }
)(Restaurants)
