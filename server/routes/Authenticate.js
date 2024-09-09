const express = require('express')
const router = express.Router()
const { User } = require('../models')
const bcrypt = require('bcrypt')
const { sign } = require("jsonwebtoken")
const { check, validationResult, matchedData } = require('express-validator')

const validateRegister = [
  check('first_name', 'First Name is required').notEmpty(),
  check('last_name', 'Last Name is required').notEmpty(),
  check('email', 'Valid Email is required').isEmail().custom(async value => {
    const user = await User.findOne({ where: { email: value ?? '' } })
    if (user)
      throw new Error('Email already in use')
  }),
  check('password', 'Password is required').notEmpty()
]

router.post('/register', validateRegister, async (req, res) => {
  const result = validationResult(req)
  if (!result.isEmpty())
    return res.status(400).json(result)

  const data = matchedData(req)
  bcrypt.hash(data.password, 10).then(async (hash) => {
    data.password = hash
    await User.create(data)
    return res.json({ message: 'success' })
  })
})

const validateLogin = [
  check('email', 'Valid Email is required').isEmail().custom(async value => {
    const user = await User.findOne({ where: { email: value ?? '' } })
    if (!user)
      throw new Error('The email is not registered!')
  }),
  check('password', 'Password is required').notEmpty()
]

router.post('/login', validateLogin, async (req, res) => {
  const result = validationResult(req)
  if (!result.isEmpty())
    return res.status(400).json(result)

  const data = matchedData(req)
  const user = await User.findOne({ where: { email: data.email } })

  bcrypt.compare(data.password, user.password).then((match) => {
    if (!match) return res.status(400).json({ errors: [{ path: 'email', msg: 'Invalid Credentials' }] })

    const accessToken = sign({ id: user.id }, 'd4592ef93578e97d027b3115dfb8f3127ba8bdd87b0c3aec0de57e2b80847b93')
    /*res.cookie('access-token', accessToken, {
      maxAge: 2592000000, // 30 days in milliseconds
      httpOnly: true,
    })*/

    return res.json({ token: accessToken })
  })
})

module.exports = router