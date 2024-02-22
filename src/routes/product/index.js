'use strict'

const express = require('express')
const productController = require('../../controllers/product.controller')
const { authentication } = require('../../auth/authUtils')
const {asyncHandler} = require('../../helper/asyncHandler')

const router = express.Router()

//authentication

router.use(authentication)

router.post('',asyncHandler(productController.createProduct))
router.post('/publish/:id_',asyncHandler(productController.publishProductShop))

//query
router.get('/draft/all',asyncHandler(productController.getAllDraftForShop) )
router.get('/publish/all',asyncHandler(productController.getAllPublishForShop) )

module.exports = router