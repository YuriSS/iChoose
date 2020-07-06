import { zip } from "../helpers"

export const action = (scope, keys=[]) => (...datas) => ({
  type: `${scope}`,
  ...(
    zip((acc, key, data) => (
      Object.assign(acc, { [key]: data })
    ), {})(keys, datas)
  )
})
