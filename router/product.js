const express= require('express')
const router =express.Router()

const productHandle=require('../router_handle/product')

router.post('/newProduct',productHandle.newProduct)
router.post('/getProduct',productHandle.getProduct)
router.post('/getSwiper',productHandle.getSwiper)
router.post('/getProductDetail',productHandle.getProductDetail)

router.post('/uploadImage',productHandle.uploadImage)
router.post('/deleteImage',productHandle.deleteImage)
router.post('/deleteAllNowImage',productHandle.deleteAllNowImage)

router.post('/searchProduct',productHandle.searchProduct)
router.post('/cateProduct',productHandle.cateProduct)
router.post('/loveProduct',productHandle.loveProduct)
router.post('/checkLoveProduct',productHandle.checkLoveProduct)
router.post('/getLoveProduct',productHandle.getLoveProduct)
router.post('/cancelLoveProduct',productHandle.cancelLoveProduct)
router.post('/addOverview',productHandle.addOverview)
router.post('/userClick',productHandle.userClick)
module.exports =router