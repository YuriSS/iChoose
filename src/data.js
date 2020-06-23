const { v4 : uuid } = require("uuid")

const data = {}

data.restaurants = [1, 2, 3, 4, 5]
  .map(n => ({
    id: uuid(),
    name: `Restaurante ${n}`
  }))

data.users = []

data.votes = []

module.exports = data