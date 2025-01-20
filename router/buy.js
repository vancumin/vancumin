const express= require('express')
const router =express.Router()

const buyHandle=require('../router_handle/buy')

router.post('/addToCar',buyHandle.addToCar)
router.post('/checkInCar',buyHandle.checkInCar)
router.post('/deleteInCar',buyHandle.deleteInCar)
router.post('/showCar',buyHandle.showCar)
module.exports =router