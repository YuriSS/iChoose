import React from "react"
import Logo from "../../components/Logo"
import Button from "../../components/Button/"
import Restaurants from "./Restaurants"
import { Content } from "../../components/Containers"
import { connect } from "react-redux"
import { pluck } from "../../helpers"
import { isLogged, getUserData } from "../../reducers/user/selectors"
import { useHistory } from "react-router-dom"
import { getRestaurants } from "../../actions/restaurants"
import { getRestaurantsData } from "../../reducers/restaurants/selectors"
import Votes from "./Votes"
import LastTop from "./LastTop"
import { closeDay } from "../../actions/votes"


const Home = ({ closeDay, isAdmin, name, isLogged, mRestaurants, getRestaurants }) => {
  let history = useHistory()

  React.useEffect(() => {
    if (!isLogged) {
      history.push("/")
    } else {
      mRestaurants.cata({
        Nothing: () => getRestaurants(),
        Just: () => null
      })
    }
  }, [ isLogged, mRestaurants, getRestaurants, history ])

  return (
    <Content width={600}>
      <Logo />
      <h2>Hello, { name }!</h2>
      <LastTop />
      { mRestaurants
        .map(restaurants => (
          <Restaurants restaurants={restaurants} />
        ))
        .getOrElse(<span>Loading restaurants...</span>)
      }
      <Votes />
      { !isAdmin
          ? null
          : (
              <div>
                <Button block onClick={closeDay}>Finish Vote</Button>
              </div>
          )
      }
    </Content>
  )
}

export default  connect(
  state => ({
    name: pluck("username")(getUserData(state)).getOrElse("Anonymous"),
    isAdmin: pluck("privilege")(getUserData(state)).map(x => x === "admin").getOrElse(false),
    isLogged: isLogged(state),
    mRestaurants: getRestaurantsData(state),
  }),
  { getRestaurants, closeDay }
)(Home)
