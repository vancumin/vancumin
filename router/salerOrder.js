const express= require('express')
const router =express.Router()

const salerHandle=require('../router_handle/salerOrder')

router.post('/getOnSale',salerHandle.getOnSale)
router.post('/getToSend',salerHandle.getToSend)
router.post('/getHasSend',salerHandle.getHasSend)
router.post('/getFinish',salerHandle.getFinish)
router.post('/dropProduct',salerHandle.dropProduct)
module.exports =router