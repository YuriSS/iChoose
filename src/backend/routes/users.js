const router = require("express").Router()
const { list : getUsers, create : createUser, login : loginUser } = require("../models/users")
const { responseOk, responseFail } = require("../helpers")

router.get("/", function(req, res) {
  responseOk(res)(getUsers())
})

router.post("/", function(req, res) {
  createUser(req.body)
    .then(responseOk(res), responseFail(res))
})

router.post("/login", function(req, res) {
  loginUser(req.body)
    .then(responseOk(res), responseFail(res))
})

module.exports = router
