const database = require('../database/index.js')


exports.addToCar = (req, res) => {
	const sql = 'insert into car set ?'
	car_dict = {
		user_id: req.body.user_id,
		product_id: req.body.product_id
	}
	database.query(sql, [car_dict], (err, results) => {
		if (err) res.cc(err)
		else {
			res.send({
				status: 0,
				message: "添加成功"
			})
		}
	})
}
exports.checkInCar = (req, res) => {
	const sql = "select * from car where user_id =? and product_id = ?"
	//console.log(req.body)
	database.query(sql, [req.body.user_id, req.body.product_id], (err, results) => {
		if (err) res.cc(err)
		if (results.length) {
			res.send({
				status: 0,
				message: '已加入'
			})
		} else {
			res.send({
				status: 1,
				message: '未加入'
			})
		}
	})
}
exports.deleteInCar = (req, res) => {
	const sql = 'delete from car where user_id =? and product_id = ?'
	//console.log(req.body)
	database.query(sql, [req.body.user_id, req.body.product_id], (err, results) => {
		if (err) res.cc(err)
		//res.send(results)
		res.send({
			status: 0,
			message: '删除成功'
		})
	})
}
exports.showCar = (req, res) => {
	const sql0 = 'select account,avatar_url from user where user_id = ?'
	database.query(sql0, [req.body.user_id], (e, re) => {
		if (e) res.cc(e)
		//console.log(re)
		if (re.length == 0) {
			res.send(re)
		} else {
			const account = re[0].account;
			const url = re[0].avatar_url;

			const sql = "select product_id from car where user_id =?"
			database.query(sql, [req.body.user_id], (err, result) => {
				if (err) res.cc(err)
				if(result.length==0){
					res.send()
				}else{
					const idList = result.map(item => `'${item.product_id}'`);
					const sql1 = `
							      SELECT 
							        p.*,
							        pi.image_url
							      FROM 
							        product p
							      LEFT JOIN (
							        SELECT 
							          product_id, 
							          MIN(image_id) as min_image_id, 
							          image_url
							        FROM 
							          product_image
							        WHERE 
							          product_id IN (${idList})
							        GROUP BY 
							          product_id,image_url
							      ) pi ON p.product_id = pi.product_id
							      WHERE 
							        p.product_id IN (${idList})
							    `;
					database.query(sql1, (err1, results) => {
						if (err1) return res.cc(err1);
						results.forEach(item => {
							item.avatar_url = url;
							item.account = account;
							if (item.image_url == null) {
								item.image_url = "/static/assets/png/no_pic.png"
							}
						});
					
						res.send(results);
					});
				}
				
			})
		}

	})
}