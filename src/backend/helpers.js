const { fromNullable, Just, Nothing } = require("data.maybe")

const h = {}

h.K = x => () => x
h.I = x => x

h.pluck = (...keys) => obj => (
  keys.reduce((mResult, key) => (
    mResult.chain(result => fromNullable(result[key]))
  ), fromNullable(obj))
)

h.pipe = (...fns) => init => (
  fns.reduce((res, f) => f(res), init)
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

h.responseFail = res => data => {
  res.status(403)
  res.json({
    success: false,
    error: data.toString()
  })
}

h.head = h.pluck(0)

h.last = xs => (
  xs.slice(-1).reduce((_, x) => (Just(x)), Nothing())
)

h.lowestArray = (...xxs) => (
  xxs.reduce((lowest, next) => (
    next.length < lowest.length ? next : lowest
  ))
)

h.zip = (f, init=[]) => (...xxs) => (
  h.lowestArray(xxs)
    .reduce((acc, xs, i) => (
      f(acc, ...(xxs.map(xs => xs[i])))
    ), init)
)

h.getOrElse = value => mx => mx.getOrElse(value)

h.sleep = ms => value => (
  new Promise(res => (
    setTimeout(res, ms, value)
  ))
)


module.exports = h
