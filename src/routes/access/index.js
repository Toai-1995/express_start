'use strict'

const express = require('express')
const accessController = require('../../controllers/access.controller')
const {asyncHandler} = require('../../helper/asyncHandler')
const { authentication } = require('../../auth/authUtils')

const router = express.Router()

// singup
router.post('/shop/login',asyncHandler(accessController.login))
router.post('/shop/signup',asyncHandler(accessController.signUp))

//authentication

router.use(authentication)

router.post('/shop/logout',asyncHandler(accessController.logout))


module.exports = router