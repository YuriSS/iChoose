const router = require("express").Router()
const { list : getVotes, getByCurrentDay, nextDay, incrementVote, getCurrentDay, getLastTopRestaurant } = require("../models/votes")
const { responseOk, responseFail } = require("../helpers")

router.get("/", function(req, res) {
  getVotes()
    .then(responseOk(res), responseFail(res))
})

router.get("/current_day", function(req, res) {
  getByCurrentDay()
    .then(responseOk(res), responseFail(res))
})

router.get("/last_top", function(req, res) {
  getLastTopRestaurant()
    .then(responseOk(res), responseFail(res))
})

router.post("/next_day", function(req, res) {
  nextDay()
    .then(responseOk(res), responseFail(res))
})

router.post("/", function(req, res) {
  getCurrentDay()
    .then(day => incrementVote({ day, ...req.body }))
    .then(responseOk(res), responseFail(res))
})

module.exports = router
