'use strict'

const express = require('express')
const accessController = require('../../controllers/access.controller')

const router = express.Router()

router.post('/shop/login',accessController.login)
router.post('/shop/signup',accessController.signUp)

module.exports = router