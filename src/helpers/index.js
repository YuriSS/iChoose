const { fromNullable } = require("data.maybe")

const h = {}

// :: (...String) -> Object -> a
h.pluck = (...keys) => obj => (
  keys.reduce((mResult, key) => (
    mResult.chain(result => fromNullable(result[key]))
  ), fromNullable(obj))
)

module.exports = h
