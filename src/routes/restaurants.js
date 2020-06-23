const express = require("express")
const router = express.Router()
const { list : getRestaurants, get : getRestaurant } = require("../models/restaurants/")
const { incrementVote } = require("../models/votes/")
const { responseOk, responseFail } = require("../helpers/")

router.get("/", function(req, res) {
  responseOk(res)(getRestaurants())
})

router.get("/:id", function(req, res) {
  getRestaurant(req.params.id)
    .then(responseOk(res), responseFail(res))
})

router.get("/:id/:user", function(req, res) {
  incrementVote(req.params.id, req.params.user)
    .then(responseOk(res), responseFail(res))
})

module.exports = router
