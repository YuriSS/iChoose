const express = require("express")
const pkg = require("../package.json")
const { pluck } = require("./helpers/")
const { restaurants, users, votes } = require("./data")

const PORT = process.env.PORT || 3000

const app = express()

const getPackageVersion = pluck("version")

app.get("/", function(req, res) {
  res.json({
    api: "iChoose",
    appVersion: getPackageVersion(pkg).getOrElse("0.0.0")
  })
})

app.get("/restaurants", function(req, res) {
  res.json({ restaurants })
})

app.get("/users", function(req, res) {
  res.json({ users })
})

app.get("/votes", function(req, res) {
  res.json({ votes })
})

const server = app.listen(PORT, function() {
  console.log(`iChoose server listening on ${server.address().port}`)
})
