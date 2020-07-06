const { idKey, nameKey } = require("./selectors")

const data = ["1", "2", "3", "4", "5"]
  .map(n => ({
    [idKey()]: n,
    [nameKey()]: `Restaurante ${n}`
  }))

const model = {}

model.list = () => Promise.resolve(data)

model.get = id => (
  Promise.resolve(model.list())
    .then(data => data.find(restaurant => restaurant[idKey()] === id))
    .then(restaurant => (
      restaurant ? restaurant : Promise.reject(`Não existe restaurante de ID ${id}`)
    ))
)

module.exports = model
