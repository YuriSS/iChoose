import { fromNullable, Just, Nothing } from "data.maybe"

export const K = x => () => x
export const I = x => x

export const pluck = (...keys) => obj => (
  keys.reduce((mResult, key) => (
    mResult.chain(result => fromNullable(result[key]))
  ), fromNullable(obj))
)

export const pipe = (...fns) => init => (
  fns.reduce((res, f) => f(res), init)
)

export const log = msg => x => {
  console.log(`## LOG ${msg} ##`, x)
  return x
}

export const mapLog = (f, msg) => x => {
  console.log(`## LOG ${msg} ##`, f(x))
  return x
}

export const responseOk = res => data => res.json({
  success: true,
  data
})

export const responseFail = res => data => {
  res.status(403)
  res.json({
    success: false,
    error: data.toString()
  })
}

export const head = pluck(0)

export const last = xs => (
  xs.slice(-1).reduce((_, x) => (Just(x)), Nothing())
)

export const lowestArray = (...xxs) => (
  xxs.reduce((lowest, next) => (
    next.length < lowest.length ? next : lowest
  ))
)

export const zip = (f, init=[]) => (...xxs) => (
  lowestArray(xxs)
    .reduce((acc, xs, i) => (
      f(acc, ...(xxs.map(xs => xs[i])))
    ), init)
)

export const getOrElse = value => mx => mx.getOrElse(value)

export const sleep = ms => value => (
  new Promise(res => (
    setTimeout(res, ms, value)
  ))
)
