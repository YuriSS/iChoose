import React from "react"
import { connect } from "react-redux"
import { getVotesData } from "../../reducers/votes/selectors"
import { getData } from "../../actions/votes"
import { Just } from "data.maybe"
import { pluck } from "../../helpers"
import { getRestaurantDataById } from "../../reducers/restaurants/selectors"
import { isLoading } from "../../reducers/votes/selectors"
import styled from "styled-components"


const Votes = ({ mVotes, getData, getRestaurantById, isLoading }) => {
  React.useEffect(() => {
    let timer
    mVotes.orElse(() => Just(getData())).getOrElse()
    timer = setInterval(() => !isLoading && getData(), 5000)
    return () => clearInterval(timer)
  }, [ mVotes, getData, isLoading ])

  return (
    <>
      <div className="mt4">Current rank</div>
      <List>
        { mVotes
          .map(votes => (
            votes.map((vote, i) => (
              <ListItem key={`${vote.restaurantId}-${i}`}>
                { getRestaurantById(vote.restaurantId).chain(pluck("name")).getOrElse("-") } ({vote.total})
              </ListItem>
            ))
          ))
          .getOrElse()
        }
      </List>
    </>
  )
}

export default connect(
  state => ({
    mVotes: getVotesData(state),
    getRestaurantById: getRestaurantDataById(state),
    isLoading: isLoading(state)
  }),
  { getData }
)(Votes)

const List = styled.ul.attrs({
  className: "list mb4 mh0 pa0"
})``

const ListItem = styled.li.attrs({
  className: "mb3 bb border-green pv3 ph2"
})`
  &::last-child {
    boroder: none;
    margin-bottom: 0;
  }
`
