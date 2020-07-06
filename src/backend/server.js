const express = require("express")
const path = require("path")
const pkg = require("../../package.json")
const cors = require("cors")
const { pluck } = require("./helpers")
const { restaurants : restaurantsRoutes, users : usersRoutes, votes : votesRoutes } = require("./routes/")
const bodyParser = require("body-parser")

const PORT = process.env.BACKEND_PORT || 80

const app = express()

const getPackageName = pluck("name")
const getPackageVersion = pluck("version")

app.use(cors({ origin: true }))

app.use(bodyParser.json())

app.use(express.static(path.resolve(__dirname, "../../build/")))

app.get("/api", function(req, res) {
  res.json({
    api: getPackageName(pkg).getOrElse("ichoose"),
    appVersion: getPackageVersion(pkg).getOrElse("0.0.0")
  })
})

app.use("/api/restaurants", restaurantsRoutes)
app.use("/api/users", usersRoutes)
app.use("/api/votes", votesRoutes)

app.get("*", function(req, res) {
  const root = path.resolve(__dirname, "../../build/")
  res.sendFile("index.html", { root }, res.end.bind(res))
})

const server = app.listen(PORT, function() {
  console.log(`iChoose server listening on ${server.address().port}`)
})
