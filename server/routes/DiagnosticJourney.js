const express = require('express')
const router = express.Router()
const { User } = require('../models')
const auth = require("../middlewares/AuthMiddleware")
const { check, validationResult, matchedData, param } = require('express-validator')
const { Op } = require("sequelize")

router.use(auth)

router.get('/register-test', (req, res) => {
  return res.json({ data: req.user })
})

const validateRegisterTest = [
  check('first_name', 'First Name is required').notEmpty(),
  check('last_name', 'Last Name is required').notEmpty(),
  check('email', 'Valid Email is required').isEmail().custom(async (value, { req }) => {
    const user = await User.findOne({ where: { id: { [Op.ne]: req.user.id }, email: value } })
    if (user)
      throw new Error('Email already in use')
  }),
  check('address', 'Address is required').notEmpty(),
  check('mobile', 'Mobile number is required').notEmpty().isLength({ min: 8 }),
  check('birth_date', 'Birth date is required').notEmpty().isDate(),
  check('gender', 'Gender is required').notEmpty()
]
router.post('/register-test', validateRegisterTest, async (req, res) => {
  const result = validationResult(req)
  if (!result.isEmpty())
    return res.status(400).json(result)

  const data = matchedData(req)
  if (req.user.diagnostic_journey == 'Not Started')
    data.diagnostic_journey = 'Register Test'
  await User.update(data, { where: { id: req.user.id } })
  return res.json({ message: 'success' })
})

const validateHq = [
  param('step', 'Invalid step').isIn(['step1', 'step2', 'step3', 'step4', 'step5', 'step6', 'step7', 'step8'])
]
router.get('/health-questionnaire/:step', validateHq, async (req, res) => {
  const result = validationResult(req)
  if (!result.isEmpty())
    return res.status(400).json(result)

  // const user = await User.findByPk(req.user.id, { attributes: ['first_name', 'last_name', 'birth_date', 'health_questionnaire'] })
  return res.json({ data: req.user })
})

router.post('/health-questionnaire/:step', validateHq, async (req, res) => {
  const step = req.params.step
  const data = { ...req.user }
  data.health_questionnaire = { ...req.user.health_questionnaire, [step]: req.body }
  if (req.user.diagnostic_journey == 'Register Test')
    data.diagnostic_journey = 'Health Questionnaire - ' + step
  await User.update(data, { where: { id: req.user.id } })
  const user2 = await User.findByPk(req.user.id)
  return res.json({ message: 'success', d: data })
})

module.exports = router