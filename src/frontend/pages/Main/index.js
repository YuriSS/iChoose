import React from "react"
import GlobalStyles from "../../components/Styles/"
import Background from "../../components/Background"
import Login from "../Login/"
import Home from "../Home/"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { Provider } from "react-redux"


const Main = ({ store }) => (
  <Provider store={store}>
    <GlobalStyles />
    <Background />
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/home" component={Home} />
      </Switch>
    </Router>
  </Provider>
)

export default Main
