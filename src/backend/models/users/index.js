const { v4 } = require("uuid")
const { K, I, last, pluck, pipe, getOrElse } = require("../../helpers")
const Maybe = require("data.maybe")

const model = {}

const users = [{ id: "admin-id", username: "admin", password: "1", privilege: "admin" }]

model.list = K(users)

model.getByUsername = username => (
  Maybe.fromNullable(model.list().find(user => user.username === username))
    .map(Promise.resolve.bind(Promise))
    .orElse(() => Maybe.Just(Promise.reject("Username not found")))
    .getOrElse()
)

model.create = body => (
  Maybe.of(username => password => (
    { id: v4(), username, password, privilege: "user" }
  ))
  .ap(pluck("username")(body))
  .ap(pluck("password")(body))
  .map(infos => (
    model.getByUsername(infos.username)
      .then(
        () => Promise.reject("User already exist"),
        () => Promise.resolve(users.push(infos)).then(pipe(model.list, last, getOrElse({})))
      )
  ))
  .orElse(() => Maybe.Just(Promise.reject("Username or password property not found")))
  .getOrElse()
)

model.login = body => (
  Maybe.of(username => password => (
    { username, password }
  ))
  .ap(pluck("username")(body))
  .ap(pluck("password")(body))
  .map(infos => (
    model.getByUsername(infos.username)
      .then(user => (
        (user.password === infos.password)
          ? Promise.resolve(user)
          : Promise.reject()
      ))
      .then(
        I,
        () => Promise.reject("Username or password are wrong")
      )
  ))
  .orElse(() => Maybe.Just(Promise.reject("Username or password property not found")))
  .getOrElse()
)

module.exports = model
