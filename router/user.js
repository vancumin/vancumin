const express= require('express')
const router =express.Router()

const userHandle=require('../router_handle/user')

router.post('/getUserInfo',userHandle.getUserInfo)
router.post('/dropUserAvatar',userHandle.dropUserAvatar)
router.post('/changeUserInfo',userHandle.changeUserInfo)
module.exports =router