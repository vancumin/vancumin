const database = require('../database/index.js')


exports.getUserInfo = (req, res) => {
	const sql = 'select * from user where user_id = ? '
	database.query(sql, [req.body.user_id], (err, results) => {
		if (err) res.cc(err)
		else {
			console.log(results[0])
			res.send(results[0])
		}
	})
}
exports.dropUserAvatar=(req,res)=>{
	const sql='update user set avatar_url=null where user_id = ? '
	database.query(sql, [req.body.user_id], (err, results) => {
		if (err) res.cc(err)
		else {
			res.send({
				status:0,
				message:'删图成功'
			})
		}
	})
}
exports.changeUserInfo = (req, res) => {
	const sql0='select * from user where account = ? and user_id != ?'
	database.query(sql0,[req.body.account,req.body.user_id],(e,r)=>{
		if(e)res.cc(e)
		if(r.length>0){
			return res.send({
				status:1,
				message:'用户名已存在'
			})
		}else{
			const sql = "update user set ? where user_id = ?"
			//console.log(req.body.avatar_url)
			//console.log(req.body.account)
			const id = req.body.user_id;
			const user_dict = {
				name: req.body.name,
				account: req.body.account,
				sex: req.body.sex,
				telephone: req.body.telephone,
				age: req.body.age,
				update_time: new Date()
			}
			if (req.body.avatar_url != '') {
				console.log(req.body.avatar_url)
				user_dict.avatar_url = req.body.avatar_url
			} else {
				console.log('空头像')
			}
			database.query(sql, [user_dict, id], (err, result) => {
				if (err) res.cc(err)
				if (result.changedRows == 1) {
					res.send({
						status: 0,
						message: '修改成功'
					})
				}else{
					res.send({
						status: 1,
						message: '修改失败'
					})
				}
			})
		}
	})
}