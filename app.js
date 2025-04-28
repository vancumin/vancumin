const express = require('express')
const app = express()
var bodyParser = require("body-parser")
const Joi = require('joi');
const cors = require('cors')
const multer = require('multer')
//托管区建立
const upload = multer({
	dest: './public/upload'
})
app.use(upload.any())
app.use(express.static("./public"))

app.use(cors())
app.use(bodyParser.urlencoded({
	extended: false
}))
app.use(bodyParser.json())



app.use((req, res, next) => {
	//默认status=1失败
	res.cc = (err, status = 1) => {
		res.send({
			status,
			message: err instanceof Error ? err.message : err
		})
	}
	next()
})

const jwtconfig = require('./jwt_config/index.js')
const {
	expressjwt: jwt
} = require("express-jwt")
// app.use(jwt({
// 	secret:jwtconfig.jwtSecretKey,algorithms:['HS256']
// }).unless({
// 	path:[/^\/api\//]
// }))



const product_router =require("./router/product")
app.use('/product', product_router)

const login_router=require('./router/login.js')
app.use('/login',login_router);

const user_router=require('./router/user.js')
app.use('/user',user_router)

const buy_router=require('./router/buy.js')
app.use('/buy',buy_router)

const order_router=require('./router/order.js')
app.use('/order',order_router)

const saler_router=require('./router/salerOrder.js')
app.use('/saler',saler_router)

app.use((err, req, res, next) => {
	if (err instanceof Joi.ValidationError) return res.cc(err)
})



app.listen(3007,'0.0.0.0', () => {
	//console.log('http://127.0.0.1:3007')
	console.log('//eip通信')
})