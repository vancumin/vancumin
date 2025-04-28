const database = require("../database/index.js")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const jwtconfig = require('../jwt_config/index.js')

//注册功能，先查看数据空与否，再进入数据库查询，最后导入
exports.register = (req, res) => {
	const reqinfo = req.body
	const sql = "select * from user where account = ?"
	database.query(sql, reqinfo.account, (err, results) => {
		if (results.length >= 1) {
			return res.send({
				status: 1,
				message: "账号已存在",
			})
		}else{
			reqinfo.password = bcrypt.hashSync(reqinfo.password, 10)
			//加密
			const sql1 = "insert into user set ?"
			const create_time = new Date()
			//创建完整数据输入数据库
			database.query(sql1, {
				account: reqinfo.account,
				password: reqinfo.password,
				create_time: create_time,
				role:1,
				avatar_url:"https://env-00jxhjkqc21g.normal.cloudstatic.cn/empty-user.png?expire_at=1732869184&er_sign=5de897c3e777c9bb912bdda92b58fd65"
			}, (error, results) => {
				if (error) {
					return res.send({
						status: 1,
						message: "注册失败",
						error: error.message
					})
				}else{
					return res.send({
						status: 0,
						message: '注册成功'
					})
				}
				
			})
		}
	})

	
}
//先验证是否为空，再进入数据库查询，验证密码是否错误和冻结状态
exports.login = (req, res) => {
	const loginfo = req.body
	const sql = "select * from user where account =?"
	database.query(sql, loginfo.account, (error, results) => {
		if (error) {
			return res.cc(error)
		}
		if (results.length < 1) return res.cc("账号不存在")
		const compareResult = bcrypt.compareSync(loginfo.password, results[0].password)
		console.log(compareResult)
		if (!compareResult) {
			return res.cc('密码错误')
		}else{
			const user = {
				...results[0],
				password: '',
				imageUrl: '',
				create_time: '',
				update_time: '',
			}
			const tokenStr = jwt.sign(user, jwtconfig.jwtSecretKey, {
				expiresIn: "24h",
			})
			res.send({
				status: 0,
				results: results[0],
				message: '登陆成功',
				token: 'Bearer' + tokenStr,
			})
		}
		
	})
}
