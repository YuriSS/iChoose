const express = require("express")
const pkg = require("../package.json")
const { pluck } = require("./helpers/")
const { restaurants : restaurantsRoutes, users : usersRoutes, votes : votesRoutes } = require("./routes/")

const PORT = process.env.PORT || 3000

const app = express()

const getPackageVersion = pluck("version")

app.get("/", function(req, res) {
  res.json({
    api: "iChoose",
    appVersion: getPackageVersion(pkg).getOrElse("0.0.0")
  })
})

app.use("/restaurants", restaurantsRoutes)
app.use("/users", usersRoutes)
app.use("/votes", votesRoutes)

const server = app.listen(PORT, function() {
  console.log(`iChoose server listening on ${server.address().port}`)
})
