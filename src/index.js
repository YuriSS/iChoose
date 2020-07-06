import React from "react"
import ReactDOM from "react-dom"
import App from "./frontend/pages/Main/"
import * as serviceWorker from "./frontend/serviceWorker"
import "tachyons/css/tachyons.min.css"
import configureStore from "./frontend/configureStore"

ReactDOM.render(
  <React.StrictMode>
    <App store={configureStore()} />
  </React.StrictMode>,
  document.getElementById("root")
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
