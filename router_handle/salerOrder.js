const database = require('../database/index.js')

//获得在售，被下单待发货，待收货，已售出
exports.getOnSale = (req, res) => {
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
	        WHERE p.user_id = ?	  and p.stock_status=1  `
	database.query(sql, [req.body.user_id], (err, result) => {
		if (err) res.cc(err);
		else {
			result.forEach(item => {
				item.status = '在售中';
			});
			res.send(result)
		}
	})
}
exports.getToSend = (req, res) => {
	//获得自己的卖出订单,先获得买家的信息，再去搜索product_id，然后去order表内找
	const sql = 'select product_id from product where user_id = ?'
	database.query(sql, [req.body.user_id], (err, results) => {
		if (err) res.cc(err)
		console.log(results)
		if (results.length == 0) {
			console.log('no product')
			res.send()
		} else {
			const productIds = results.map(item => `'${item.product_id}'`);
			console.log(productIds)
			const sql1 = `
			    SELECT 
			        p.*,
			        pi.image_url
			    FROM 
			        product p
			    LEFT JOIN (
			        SELECT 
			            product_id, 
			            MIN(image_id) AS min_image_id,
			            image_url
			        FROM 
			            product_image
			        WHERE 
			            product_id IN (${productIds.join(',')})
			        GROUP BY 
			            product_id
			    ) AS pi ON p.product_id = pi.product_id
			    WHERE 
			        p.product_id IN (${productIds.join(',')})
			`; //获得了商品详细信息
			database.query(sql1, (err1, results1) => {
				if (err1) res.cc(err1)
				if (results1.length == 0) {
					res.send()
				} else {
					//获取买家信息
					const productList = results1;
					const sql2 = `SELECT
						o.product_id,
						o.status,
						o.order_id,
						u.avatar_url,
						u.account
					FROM 
						product_order o
					INNER JOIN user u ON o.user_id = u.user_id
					WHERE 
						o.product_id IN (${productIds.join(',')})
						and o.status= 1`
					database.query(sql2, (err2, results2) => {
						if (err2) res.cc(err2)
						//res.send(results2)
						console.log('未发货订单'+results2)
						const buyerList = results2.reduce((map, item) => {
						    map[item.product_id] = {
						        ...item,
						    };
						    return map;
						}, {});
						//console.log(productList)
						  const finalList = productList.filter(prodItem => {
						        // 检查 buyerList 中是否有对应的 product_id
						        return buyerList.hasOwnProperty(prodItem.product_id);
						    }).map(item => {
						        // 找到 buyerList 中对应 product_id 的元素
						        const correspondingItem = buyerList[item.product_id];
						        return {
						            ...item,
						            ...correspondingItem // 合并 buyerList 中的对象属性
						        };
						    });
						//console.log(finalList)
						finalList.forEach(item => {
							item.status = '待发货';
						});
						res.send(finalList)
					})
				}
			})
		}
	})
}
exports.getHasSend = (req, res) => {
	const sql = 'select product_id from product where user_id = ?'
	database.query(sql, [req.body.user_id], (err, results) => {
		if (err) res.cc(err)
		//console.log(results)
		if (results.length == 0) {
			res.send()
		} else {
			const productIds = results.map(item => `'${item.product_id}'`);
			console.log(productIds)
			const sql1 = `
			    SELECT 
			        p.*,
			        pi.image_url
			    FROM 
			        product p
			    LEFT JOIN (
			        SELECT 
			            product_id, 
			            MIN(image_id) AS min_image_id,
			            image_url
			        FROM 
			            product_image
			        WHERE 
			            product_id IN (${productIds.join(',')})
			        GROUP BY 
			            product_id
			    ) AS pi ON p.product_id = pi.product_id
			    WHERE 
			        p.product_id IN (${productIds.join(',')})
			`; //获得了商品详细信息
			database.query(sql1, (err1, results1) => {
				if (err1) res.cc(err1)
				if (results1.length == 0) {
					res.send()
				} else {
					//获取买家信息
					const productList = results1;
					const sql2 = `SELECT
						o.product_id,
						o.status,
						o.order_id,
						u.avatar_url,
						u.account
					FROM 
						product_order o
					INNER JOIN user u ON o.user_id = u.user_id
					WHERE 
						o.product_id IN (${productIds.join(',')})
						and o.status= 2`
					database.query(sql2, (err2, results2) => {
						if (err2) res.cc(err2)
						//res.send(results2)
						console.log('已发货订单'+results2)
						const buyerList = results2.reduce((map, item) => {
						    map[item.product_id] = {
						        ...item,
						    };
						    return map;
						}, {});
						//console.log(productList)
						  const finalList = productList.filter(prodItem => {
						        // 检查 buyerList 中是否有对应的 product_id
						        return buyerList.hasOwnProperty(prodItem.product_id);
						    }).map(item => {
						        // 找到 buyerList 中对应 product_id 的元素
						        const correspondingItem = buyerList[item.product_id];
						        return {
						            ...item,
						            ...correspondingItem // 合并 buyerList 中的对象属性
						        };
						    });
						//console.log(finalList)
						finalList.forEach(item => {
							item.status = '已发货';
						});
						res.send(finalList)
					})
				}
			})
		}
	})

}
exports.getFinish = (req, res) => {
	const sql = 'select product_id from product where user_id = ?'
	database.query(sql, [req.body.user_id], (err, results) => {
		if (err) res.cc(err)
		//console.log(results)
		if (results.length == 0) {
			res.send()
		} else {
			const productIds = results.map(item => `'${item.product_id}'`);
			console.log(productIds)
			const sql1 = `
			    SELECT 
			        p.*,
			        pi.image_url
			    FROM 
			        product p
			    LEFT JOIN (
			        SELECT 
			            product_id, 
			            MIN(image_id) AS min_image_id,
			            image_url
			        FROM 
			            product_image
			        WHERE 
			            product_id IN (${productIds.join(',')})
			        GROUP BY 
			            product_id
			    ) AS pi ON p.product_id = pi.product_id
			    WHERE 
			        p.product_id IN (${productIds.join(',')})
			`; //获得了商品详细信息
			database.query(sql1, (err1, results1) => {
				if (err1) res.cc(err1)
				if (results1.length == 0) {
					res.send()
				} else {
					//获取买家信息
					const productList = results1;
					const sql2 = `SELECT 
						o.product_id,
						o.status,
						o.order_id,
						u.avatar_url,
						u.account
					FROM 
						product_order o
					INNER JOIN user u ON o.user_id = u.user_id
					WHERE 
						o.product_id IN (${productIds.join(',')})
						and o.status= 3`
					database.query(sql2, (err2, results2) => {
						if (err2) res.cc(err2)
						//res.send(results2)
						//console.log('已收货订单')
						console.log(results2)
						const buyerList = results2.reduce((map, item) => {
						    map[item.product_id] = {
						        ...item,
						    };
						    return map;
						}, {});
						//console.log(productList)
						  const finalList = productList.filter(prodItem => {
						        // 检查 buyerList 中是否有对应的 product_id
						        return buyerList.hasOwnProperty(prodItem.product_id);
						    }).map(item => {
						        // 找到 buyerList 中对应 product_id 的元素
						        const correspondingItem = buyerList[item.product_id];
						        return {
						            ...item,
						            ...correspondingItem // 合并 buyerList 中的对象属性
						        };
						    });
						//console.log(finalList)
						finalList.forEach(item => {
							item.status = '已收货';
						});
						res.send(finalList)
					})
				}
			})
		}
	})
}
	
exports.dropProduct=(req,res)=>{
	const sql='delete from product where product_id = ?'
	database.query(sql,[req.body.product_id],(err,result)=>{
		if(err)res.cc(err)
		//res.send(result)
		if(result.affectedRows==1){
			res.send({
				status:0,
				message:'下架成功'
			})
		}else{
			res.send({
				status:1,
				message:'下架失败'
			})
		}
	})
}