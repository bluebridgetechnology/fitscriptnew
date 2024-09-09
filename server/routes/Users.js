const express = require('express')
const router = express.Router()
const { User } = require('../models')
const auth = require("../middlewares/AuthMiddleware")

router.use(auth)

router.get('/', async (req, res) => {
  const listOfUsers = await User.findAll()
  res.json({ data: listOfUsers })
})

router.post('/', async (req, res) => {
  const user = req.body
  await User.create(user)
  res.json(user)
})

module.exports = router