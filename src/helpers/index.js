const { fromNullable } = require("data.maybe")

const h = {}

h.K = x => () => x

h.pluck = (...keys) => obj => (
  keys.reduce((mResult, key) => (
    mResult.chain(result => fromNullable(result[key]))
  ), fromNullable(obj))
)

h.log = msg => x => {
  console.log(`## LOG ${msg} ##`, x)
  return x
}

h.mapLog = (f, msg) => x => {
  console.log(`## LOG ${msg} ##`, f(x))
  return x
}

h.responseOk = res => data => res.json({
  success: true,
  data
})

h.responseFail = res => data => res.json({
  success: false,
  error: data.toString()
})

module.exports = h
