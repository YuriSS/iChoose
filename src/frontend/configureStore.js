import { createStore, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import logger from "redux-logger"
import rootReducer from "./reducers/"

const mids = [thunk]

if (process.env.NODE_ENV === "development") {
  mids.push(logger)
}

export const configureStore = initState => createStore(
    rootReducer,
    initState,
    applyMiddleware(...mids)
)

export default configureStore


