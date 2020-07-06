const model = require("./index")

test("It should get votes", () => {
  const mock = { day: 1, data: [{ votes: [], total: 0, restaurantId: "1" }, { votes: [], total: 0, restaurantId: "2" }, { votes: [], total: 0, restaurantId: "3" }, { votes: [], total: 0, restaurantId: "4" }, { votes: [], total: 0, restaurantId: "5" }] }
  model.list().then(x => expect(x).toContainEqual(mock)).catch(e => null)
})

test("It should increment votes", async () => {
  await model.incrementVote({ day: 1, id: "1", userId: 1 }).then(() => null, () => null)
  const vote = await model.getByRestaurantId({ day: 1, id: "1" })
  expect(vote.total).toBe(1)
})

test("It should not increment votes", async () => {
  await model.incrementVote({ day: 1, id: "1", userId: 1 }).then(() => null, () => null)
  const vote = await model.getByRestaurantId({ day: 1, id: "1" })
  expect(vote.total).toBe(1)
})

test("It should increment votes for the next day", async () => {
  await model.nextDay()
  await model.incrementVote({ day: 2, id: "1", userId: 1 }).then(() => null, () => null)
  await model.incrementVote({ day: 2, id: "1", userId: 1 }).then(() => null, () => null)
  await model.incrementVote({ day: 2, id: "1", userId: 2 }).then(() => null, () => null)
  const vote = await model.getByRestaurantId({ day: 2, id: "1" })
  expect(vote.total).toBe(2)
})

test("It should not increment votes for the next day", async () => {
  await model.incrementVote({ day: 3, id: "1", userId: 1 }).then(() => null, () => null)
  await model.incrementVote({ day: 3, id: "1", userId: 1 }).then(() => null, () => null)
  await model.incrementVote({ day: 3, id: "1", userId: 2 }).then(() => null, () => null)
  const vote = await model.getByRestaurantId({ day: 3, id: "1" }).then(() => true, () => false)
  expect(vote).toBe(false)
})
