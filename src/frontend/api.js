
const HOST = process.env.NODE_ENV === "development" ? (process.env.REACT_HOST || "http://localhost") : ""

export const createUser = ({ username, password }) => (
  post("/api/users/", { username, password })
)

export const loginUser = ({ username, password }) => (
  post("/api/users/login", { username, password })
)

export const getRestaurants = () => (
  get("/api/restaurants")
)

export const getCurrentVotes = () => (
  get("/api/votes/current_day")
)

export const closeVotesForCurrentDay = () => (
  post("/api/votes/next_day")
)

export const voteRestaurant = ({ id, userId }) => (
  post("/api/votes/", { id, userId })
)

export const getLastTopRestaurant = () => (
  get("/api/votes/last_top")
)


const post = (path, body={}) => (
  fetch(HOST.concat(path), {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then(res => (
    res.status === 200
      ? res.json()
      : res.json().then(error => Promise.reject(error))
  ))
)

const get = (path) => (
  fetch(HOST.concat(path), {
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then(res => (
    res.status === 200
      ? res.json()
      : res.json().then(error => Promise.reject(error))
  ))
)
