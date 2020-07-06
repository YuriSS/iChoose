const { list : getRestaurants } = require("../restaurants/")
const { idKey : idKeyFromRestaurants } = require("../restaurants/selectors")
const { totalKey, votesKey, restaurantIdKey } = require("./selectors")
const { fromNullable, Just } = require("data.maybe")
const { log, head } = require("../../helpers")

const model = {}

const votes = []

let currentDay = 1

const createVotes = day => (
  getRestaurants()
    .then(restaurants => (
      restaurants.map(restaurant => ({
        day,
        [votesKey()]: [],
        [totalKey()]: 0,
        [restaurantIdKey()]: restaurant[idKeyFromRestaurants()]
      }))
    ))
    .then(xs => votes.push(...xs))
)

createVotes(currentDay)

model.list = () => Promise.resolve(votes)

model.getCurrentDay = () => Promise.resolve(currentDay)

model.incrementVote = ({ day, id, userId }) => (
  model.getByDay(day)
    .then(day => (
      day.some(d => d[votesKey()].some(vote => vote.userId === userId))
        ? Promise.reject("User already voted")
        : day
    ))
    .then(() => model.getByRestaurantId({ day, id }))
    .then(vote => {
      vote[totalKey()]++;
      vote[votesKey()].push({ userId, time: Date.now() })
      return vote
    })
)

model.getByRestaurantId = ({ day, id }) => (
  model.list()
    .then(votes => (
      fromNullable(votes.find(vote => (vote.day === day && vote[restaurantIdKey()] === id)))
        .map(Promise.resolve.bind(Promise))
        .orElse(() => Just(Promise.reject("Vote day not found")))
        .getOrElse()
    ))
)

model.getByDay = day => (
  model.list()
    .then(votes => (
      fromNullable(votes.filter(vote => vote.day === day))
        .map(xs => (
          xs.length === 0
            ? Promise.reject("Vote day not found")
            : Promise.resolve(xs)
          ))
        .orElse(() => Just(Promise.reject("Vote day not found")))
        .getOrElse()
    ))
)

model.getByCurrentDay = () => (
  model.getCurrentDay()
    .then(model.getByDay)
)

model.nextDay = () => (
  Promise.resolve(++currentDay)
    .then(createVotes)
)

model.getLastTopRestaurant = () => (
  model.getCurrentDay()
    .then(day => day - 1)
    .then(model.getByDay)
    .then(votes => (
      votes.reduce((top, next) => (
        top[totalKey()] >= next[totalKey()] ? top : next
      ))
    ))
)

module.exports = model
