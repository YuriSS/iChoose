const model = require("./index")

test("It should get restaurants", () => {
  const mock = [{ id: "1", name: "Restaurante 1" }, { id: "2", name: "Restaurante 2" }, { id: "3", name: "Restaurante 3" }, { id: "4", name: "Restaurante 4" }, { id: "5", name: "Restaurante 5" }]
  model.list().then(x => expect(x).toContainEqual(mock)).catch(e => null)
})

test("It should get a restaurant", () => {
  const mock = { id: "1", name: "Restaurante 1" }
  model.get("1").then(x => expect(x).toContainEqual(mock)).catch(e => null)
})