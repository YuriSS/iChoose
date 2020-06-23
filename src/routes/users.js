const router = require("express").Router()
const { get : getUsers } = require("../models/users")
const { responseOk, responseFail } = require("../helpers/")

router.get("/", function(req, res) {
  responseOk(res)(getUsers())
})

module.exports = router
