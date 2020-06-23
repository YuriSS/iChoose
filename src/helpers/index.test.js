const helpers = require("./index")

test("It should extract a property from an object", () => {
  const obj = { a: { b: { c: 3 } } }
  const value = helpers.pluck("a", "b", "c")(obj)
  expect(value.getOrElse(0)).toBe(3)
})
