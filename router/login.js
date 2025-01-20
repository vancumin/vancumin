const express= require('express')
const router =express.Router()

const loginHandle=require('../router_handle/login')


router.post('/login',loginHandle.login)
router.post('/register',loginHandle.register)
module.exports =router