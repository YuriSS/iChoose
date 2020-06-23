const { list : getRestaurants } = require("../restaurants/")
const { K } = require("../../helpers")
const { totalKey, votesKey, restaurantIdKey } = require("./selectors")
const { idKey : idKeyFromRestaurants } = require("../restaurants/selectors")

const model = {}

const votes = getRestaurants()
  .map(restaurant => ({
    [votesKey()]: [],
    [totalKey()]: 0,
    [restaurantIdKey()]: restaurant[idKeyFromRestaurants()]
  }))

model.get = K(votes)

model.incrementVote = (restaurantId, userId) => (
  Promise.resolve(model.get().find(vote => vote[restaurantIdKey()] === restaurantId))
    .then(vote => vote ? vote : Promise.reject(`Não existe o restaurante.`))
    .then(vote => {
      vote[totalKey()]++;
      vote[votesKey()] = vote[votesKey()].concat({ userId, time: Date.now() })
      return vote
    })
)

module.exports = model
