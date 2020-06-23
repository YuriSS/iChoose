const router = require("express").Router()
const { get : getVotes } = require("../models/votes")
const { responseOk, responseFail } = require("../helpers/")

router.get("/", function(req, res) {
  responseOk(res)(getVotes())
})

module.exports = router
