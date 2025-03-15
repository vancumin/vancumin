const database = require('../database/index.js')
const bcrypt = require('bcrypt')
const crypto = require('crypto')
fs = require('fs')

exports.newProduct = (req, res) => {
	const sql = 'insert product set ? '
	const product_dict = {
		user_id: req.body.user_id,
		product_id: req.body.product_id,
		product_name: req.body.product_name,
		product_cate: req.body.product_cate,
		detail: req.body.detail,
		price: req.body.price,
		address: req.body.address,
		stock_status: 1
	} //1有货  0没货
	database.query(sql, [product_dict], (err, results) => {
		if (err) res.cc(err)
		else {
			res.send({
				status: 0,
				message: '提交成功'
			})
		}

	})
}
exports.uploadImage = (req, res) => {

	const sql = "insert into product_image set ?"
	const image_dict = {
		product_id: req.body.product_id,
		image_url: req.body.image_url
	}
	database.query(sql, [image_dict], (err, result) => {
		if (err) res.cc(err)
		else {
			res.send({
				status: 0,
				message: '上传成功'
			})
			//console.log(result)
		}

	})
}
exports.deleteImage = (req, res) => {
	const sql = "delete from product_image where image_url =?"
	//console.log(req.body.image_url)
	database.query(sql, [req.body.image_url], (err, result) => {
		if (err) res.cc(err)
		res.send({
			status: 0,
			message: '删除成功'
		})
	})
}
exports.deleteAllNowImage = (req, res) => {
	const sql = "delete from product_image where product_id =?"
	database.query(sql, [req.body.product_id], (err, result) => {
		if (err) res.cc(err)
		res.send({
			status: 0,
			message: '清理成功'
		})
	})
}
exports.getSwiper = (req, res) => {
	const sql = `
	   SELECT a.product_id, b.image_url
	   FROM product AS a
	   JOIN product_image AS b ON a.product_id = b.product_id
	   WHERE a.product_cate IN (
	     SELECT product_cate FROM product
	     GROUP BY product_cate
	   )
	   AND a.product_id = (
	     SELECT product_id FROM product
	     WHERE product_cate = a.product_cate
	     ORDER BY RAND()
	     LIMIT 1
	   )
	  `;
	database.query(sql, (err, result) => {
		if (err) res.cc(err)
		res.send(result)
	})
}

exports.getProduct = (req, res) => {
	//console.log('test')
	const sql = `
        SELECT 
            p.*,
            pi.image_url
        FROM 
            product p
		
        LEFT JOIN (
            SELECT 
                product_id, 
                MIN(image_id) AS min_image_id
            FROM 
                product_image
            GROUP BY 
                product_id
        ) AS pi_min ON p.product_id = pi_min.product_id
        LEFT JOIN product_image pi ON pi_min.product_id = pi.product_id AND pi_min.min_image_id = pi.image_id
		WHERE p.stock_status = 1
    `
	database.query(sql, (err, result) => {
		if (err) res.cc(err);
		else {
			res.send(result)
			//console.log(result)
		}
	})
}

exports.getProductDetail = (req, res) => {
	//image_url是一个列表放入所有图片

	//剩下属性从prouct表内获取
	const sql =
		"select user.account,user.avatar_url,product.* from user inner join product on user.user_id =product.user_id where product.product_id =?"
	const id = req.body.product_id
	database.query(sql, [id], (err, result) => {
		if (err) res.cc(err)
		const product = result[0]
		//console.log(product)
		const sql1 = "select image_url from product_image where product_id= ?"
		database.query(sql1, [id], (error, results) => {
			if (error) res.cc(error)
			product.url = results.map(item => item.image_url)
			if (product.stock_status == 1) {
				product.stock_status = true
			} else {
				product.stock_status = false
			}
			if (product.url.length < 1) {
				//console.log("保底图")
				product.url.push('/static/assets/png/no_pic.png')
			}
			res.send(product)
		})
	})
}
exports.searchProduct = (req, res) => {
	const tag = req.body.tag;

	// 使用参数化查询来防止 SQL 注入
	const sql = `
	    SELECT 
			u.account,
			u.avatar_url,
	        p.*,
	        pi.image_url
	    FROM 
	        product p
	    LEFT JOIN (
	        SELECT 
	            product_id, 
	            MIN(image_id) AS min_image_id
	        FROM 
	            product_image
	        GROUP BY 
	            product_id
	    ) AS pi_min ON p.product_id = pi_min.product_id
	    LEFT JOIN product_image pi ON pi_min.product_id = pi.product_id AND pi_min.min_image_id = pi.image_id
	    LEFT JOIN user u ON p.user_id = u.user_id
	    WHERE 
	        p.product_name LIKE ? OR
	        p.address LIKE ? OR
	        u.name LIKE ? OR
	        p.detail LIKE ?
	  `;

	// 使用 `%` 通配符在 LIKE 查询中
	const params = [`%${tag}%`, `%${tag}%`, `%${tag}%`, `%${tag}%`];
	database.query(sql, params, (err, result) => {
		if (err) res.cc(err)
		res.send(result)
	})
	//console.log('sousuo')
}
exports.cateProduct = (req, res) => {
	const cate = req.body.cate;
	const sql = `
	    SELECT 
	        p.*,
	        pi.image_url
	    FROM 
	        product p
	    LEFT JOIN (
	        SELECT 
	            product_id, 
	            MIN(image_id) AS min_image_id
	        FROM 
	            product_image
	        GROUP BY 
	            product_id
	    ) AS pi_min ON p.product_id = pi_min.product_id
	    LEFT JOIN product_image pi ON pi_min.product_id = pi.product_id AND pi_min.min_image_id = pi.image_id
	    LEFT JOIN user u ON p.user_id = u.user_id
	    WHERE 
	        p.product_cate = ?;
	  `;
	database.query(sql, cate, (err, result) => {
		if (err) res.cc(err)
		res.send(result)
	})
	console.log('fenlei')
}

exports.loveProduct = (req, res) => {
	//传入user_id,product_id

	const love_dict = {
		user_id: req.body.user_id,
		product_id: req.body.product_id
	}
	const sql = 'insert into love set ?'
	database.query(sql, [love_dict], (err, result) => {
		if (err) res.cc(err)
		res.send({
			status: 0,
			message: '收藏成功'
		})
	})
}
exports.checkLoveProduct = (req, res) => {
	const sql = 'select * from love where user_id =? and product_id = ? '
	database.query(sql, [req.body.user_id, req.body.product_id], (err, result) => {
		if (err) res.cc(err)
		if (result.length == 1) {
			res.send({
				status: 0,
				message: '已收藏'
			})
		} else {
			res.send({
				status: 1,
				message: '未收藏'
			})
		}
	})
}
exports.getLoveProduct = (req, res) => {
	const sql = "select product_id from love where user_id =?"
	database.query(sql, [req.body.user_id], (err, result) => {
		if (err) res.cc(err)
		//商品id表
		if (result.length == 0) {
			return res.send()
		}
		const idList = result.map(item => item.product_id);
		const sql1 = `
		SELECT 
		  p.*,
		  pi.image_url,
		  '已收藏' as status,
		  u.avatar_url,
		  u.account
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
		    product_id IN (?)
		  GROUP BY 
		    product_id,image_url
		) pi ON p.product_id = pi.product_id
		LEFT JOIN user u ON p.user_id = u.user_id
		WHERE 
		  p.product_id IN (?)
		`;

		// 注意：这里传递 idList 两次，一次用于 product_image 的查询，一次用于 product 的查询
		database.query(sql1, [idList, idList], (err, result) => {
			if (err) res.cc(err);
			res.send(result);
		});


	});
}

exports.cancelLoveProduct = (req, res) => {
	const sql = 'delete from love where user_id =? and product_id = ? '
	database.query(sql, [req.body.user_id, req.body.product_id], (err, result) => {
		if (err) res.cc(err)
		res.send({
			status: 0,
			message: '取消收藏成功'
		})
	})
}
exports.addOverview = (req, res) => {
	const sql = 'update  product set overview =overview + 1 where product_id = ?'
	const pid = req.body.product_id;
	database.query(sql, pid, (err, result) => {
		if (err) res.cc(err)
		res.send({
			status: 0,
			message: pid + '点击量+1'
		})
	})
}
exports.userClick = (req, res) => {
	//查找是否已经点击过，有就更新时间，否则插入
	const sql0 = "select * from user_click where user_id =? and product_id= ?"
	database.query(sql0, [req.body.user_id, req.body.product_id], (error, results) => {
		if (error) return res.cc(error);
		//console.log(results.length)
		if (results.length > 0) {
			const sql = "update user_click set ? where user_id = ? and  product_id =?"
			database.query(sql, [{
				click_time: new Date()
			}, req.body.user_id, req.body.product_id], (err, result) => {
				if (err) return res.cc(err)
				res.send({
					status: 0,
					message: '点击完成'
				})
			})
		} else {
			const sql = "insert into  user_click set ?"
			const click_dict = {
				user_id: req.body.user_id,
				product_id: req.body.product_id,
				click_time: new Date()
			}
			database.query(sql, [click_dict], (err, result) => {
				if (err) return res.cc(err)
				res.send({
					status: 0,
					message: '点击完成'
				})
			})
		}
	})
}


exports.getSpProduct = (req, res) => {
	console.log('test')
	const List = []
	const min = 1;
	const max = 285;
	while (List.length <=12) {
		let num = Math.floor(Math.random() * (max - min + 1)) + min;
		// 检查随机数是否已经存在于数组中
		if (!List.includes(num)) {
			List.push(num);
		}
	}
	console.log(List);

	//会接入一个List放入一堆id
	const sql = `
        SELECT 
            p.*,
            pi.image_url
        FROM 
            product p
		
        LEFT JOIN (
            SELECT 
                product_id, 
                MIN(image_id) AS min_image_id
            FROM 
                product_image
            GROUP BY 
                product_id
        ) AS pi_min ON p.product_id = pi_min.product_id
        LEFT JOIN product_image pi ON pi_min.product_id = pi.product_id AND pi_min.min_image_id = pi.image_id
		WHERE p.stock_status = 1 and p.only_id IN (${List})
    `
	database.query(sql, (err, result) => {
		if (err) res.cc(err);
		else {
			res.send(result)
			//console.log(result)
		}
	})
}