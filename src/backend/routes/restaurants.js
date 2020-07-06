const express = require("express")
const router = express.Router()
const { list : getRestaurants, get : getRestaurant } = require("../models/restaurants/")
const { incrementVote } = require("../models/votes/")
const { responseOk, responseFail } = require("../helpers")

router.get("/", function(req, res) {
  getRestaurants()
    .then(responseOk(res), responseFail(res))
})

router.get("/:id", function(req, res) {
  getRestaurant(req.params.id)
    .then(responseOk(res), responseFail(res))
})

router.post("/:id", function(req, res) {
  incrementVote(req.params.id, req.body.user)
    .then(responseOk(res), responseFail(res))
})

module.exports = router
