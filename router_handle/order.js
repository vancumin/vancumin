const database = require('../database/index.js')

//0未付款（购物车结算时取消了），,1已付款未交易，2 交易后未确认 3确认完成
exports.createOrder = (req, res) => {
	const sql = 'insert into product_order set ?'
	car_dict = {
		user_id: req.body.user_id,
		product_id: req.body.product_id,
		payment: req.body.price,
		status: 0,
		create_time: new Date()
	}
	database.query(sql, [car_dict], (err, results) => {
		if (err) res.cc(err)
		//占据，把商品改成无货
		else {
			const sql1 = "update product set stock_status = 0  where product_id= ?"
			database.query(sql1, [req.body.product_id], (error, result) => {
				if (error) res.cc(error)
				res.send({
					status: 0,
					message: '创建成功'
				})
			})
		}
	})
}

exports.payOrder = (req, res) => {
	const sql = 'update product_order set ? where order_id=?'
	car_dict = {
		order_id: req.body.order_id,
		status: 1,
		pay_time: new Date()
	}
	database.query(sql, [car_dict], (err, results) => {
		if (err) res.cc(err)
		else {
			res.send({
				status: 1,
				message: '支付成功'
			})
		}
	})
}
exports.sendOrder = (req, res) => {
	//商家决定进行交易
	const sql = 'update product_order set ? where order_id=?'
	car_dict = {
		order_id: req.body.order_id,
		status: 2,
		send_time: new Date()
	}
	database.query(sql, [car_dict], (err, results) => {
		if (err) res.cc(err)
		else {
			res.send({
				status: 1,
				message: '发货成功'
			})
		}
	})
}
exports.receiveOrder = (req, res) => {
	//收货
	const sql = 'update product_order set ? where order_id=?'
	car_dict = {
		order_id: req.body.order_id,
		status: 3,
		receive_time: new Date()
	}
	database.query(sql, [car_dict], (err, results) => {
		if (err) res.cc(err)
		else {
			res.send({
				status: 1,
				message: '发货成功'
			})
		}
	})
}
exports.getAllOrder = (req, res) => {
    const sql = "select product_id,status,order_id from product_order where user_id =?";
    database.query(sql, [req.body.user_id], (err, result) => {
        if (err) res.cc(err);
        // 商品 id 表
        if (result.length === 0) {
            return res.send();
        }
        const idList = result.map(item => `'${item.product_id}'`);
        const orderList = result.map(item => `'${item.order_id}'`);
        const productMap = result.reduce((acc, item) => {
            acc[item.product_id] = {
                status: item.status,
                order_id: item.order_id
            };
            return acc;
        }, {});
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
                    product_id
            ) pi ON p.product_id = pi.product_id
            WHERE 
                p.product_id IN (${idList})
        `;
        const list = ["待付款", "未发货", "待收货", "已收货"];
        database.query(sql1, (err1, results) => {
            if (err1) return res.cc(err1);
            const productList = results;
            const sql2 = `
                SELECT 
                    u.account,
                    u.avatar_url,
                    p.product_id,
                    po.status,
                    po.status as order_status,
                    po.order_id
                FROM 
                    user u
                INNER JOIN product p ON u.user_id = p.user_id
                INNER JOIN product_order po ON p.product_id = po.product_id
                WHERE 
                    p.product_id IN (${idList})
            `;
            database.query(sql2, (err2, results2) => {
                if (err2) res.cc(err2);
                console.log(results2);
                const salerList = results2.reduce((map, item) => {
                    map[item.product_id] = {
                        account: item.account,
                        avatar_url: item.avatar_url,
                        order_id: item.order_id,
                        status: list[item.order_status]
                    };
                    return map;
                }, {});
                const finalList = productList.filter(prodItem => {
                    return salerList.hasOwnProperty(prodItem.product_id);
                }).map(item => {
                    const correspondingItem = salerList[item.product_id];
                    return {
                      ...item,
                      ...correspondingItem
                    };
                });
                res.send(finalList);
            });
        });
    });
};
exports.getUnPayOrder = (req, res) => {
    const sql = "select product_id,status,order_id from product_order where user_id =? and status = 0";
    database.query(sql, [req.body.user_id], (err, result) => {
        if (err) res.cc(err);
        // 商品 id 表
        if (result.length === 0) {
            return res.send();
        }
        const idList = result.map(item => `'${item.product_id}'`);
        const orderList = result.map(item => `'${item.order_id}'`);
        const productMap = result.reduce((acc, item) => {
            acc[item.product_id] = {
                status: item.status,
                order_id: item.order_id
            };
            return acc;
        }, {});
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
                    product_id
            ) pi ON p.product_id = pi.product_id
            WHERE 
                p.product_id IN (${idList})
        `;
        // 获取商品内容
        database.query(sql1, (err1, results) => {
            if (err1) return res.cc(err1);
            const productList = results;
            const sql2 = `
                SELECT 
                    u.account,
                    u.avatar_url,
                    p.product_id,
                    po.order_id
                FROM 
                    user u
                INNER JOIN product p ON u.user_id = p.user_id
                INNER JOIN product_order po ON p.product_id = po.product_id
                WHERE 
                    p.product_id IN (${idList})
            `;
            // 卖家头像和信息，并获取 product_order 的 order_id
            database.query(sql2, (err2, results2) => {
                if (err2) res.cc(err2);
                console.log(results2);
                const salerList = results2.reduce((map, item) => {
                    map[item.product_id] = {
                       ...item,
                        status: '待付款' 
                    };
                    return map;
                }, {});
                const finalList = productList.filter(prodItem => {
                    // 检查 salerList 中是否有对应的 product_id
                    return salerList.hasOwnProperty(prodItem.product_id);
                }).map(item => {
                    // 找到 salerList 中对应 product_id 的元素
                    const correspondingItem = salerList[item.product_id];
                    return {
                       ...item,
                       ...correspondingItem // 合并 salerList 中的对象属性
                    };
                });
                res.send(finalList);
            });
        });
    });
};

exports.getUnSendOrder = (req, res) => {
    const sql = "select product_id,status,order_id from product_order where user_id =? and status = 1";
    database.query(sql, [req.body.user_id], (err, result) => {
        if (err) res.cc(err);
        // 商品 id 表
        if (result.length === 0) {
            return res.send();
        }
        const idList = result.map(item => `'${item.product_id}'`);
        const orderList = result.map(item => `'${item.order_id}'`);
        const productMap = result.reduce((acc, item) => {
            acc[item.product_id] = {
                status: item.status,
                order_id: item.order_id
            };
            return acc;
        }, {});
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
                    product_id
            ) pi ON p.product_id = pi.product_id
            WHERE 
                p.product_id IN (${idList})
        `;
        // 获取商品内容
        database.query(sql1, (err1, results) => {
            if (err1) return res.cc(err1);
            const productList = results;
            const sql2 = `
                SELECT 
                    u.account,
                    u.avatar_url,
                    p.product_id,
                    po.order_id
                FROM 
                    user u
                INNER JOIN product p ON u.user_id = p.user_id
                INNER JOIN product_order po ON p.product_id = po.product_id
                WHERE 
                    p.product_id IN (${idList})
            `;
            // 卖家头像和信息，并获取 product_order 的 order_id
            database.query(sql2, (err2, results2) => {
                if (err2) res.cc(err2);
                console.log(results2);
                const salerList = results2.reduce((map, item) => {
                    map[item.product_id] = {
                       ...item,
                        status: '未发货' 
                    };
                    return map;
                }, {});
                const finalList = productList.filter(prodItem => {
                    // 检查 salerList 中是否有对应的 product_id
                    return salerList.hasOwnProperty(prodItem.product_id);
                }).map(item => {
                    // 找到 salerList 中对应 product_id 的元素
                    const correspondingItem = salerList[item.product_id];
                    return {
                       ...item,
                       ...correspondingItem // 合并 salerList 中的对象属性
                    };
                });
                res.send(finalList);
            });
        });
    });
};

exports.getUnReceiveOrder = (req, res) => {
    const sql = "select product_id,status,order_id from product_order where user_id =? and status = 2";
    database.query(sql, [req.body.user_id], (err, result) => {
        if (err) res.cc(err);
        // 商品 id 表
        if (result.length === 0) {
            return res.send();
        }
        const idList = result.map(item => `'${item.product_id}'`);
        const orderList = result.map(item => `'${item.order_id}'`);
        const productMap = result.reduce((acc, item) => {
            acc[item.product_id] = {
                status: item.status,
                order_id: item.order_id
            };
            return acc;
        }, {});
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
                    product_id
            ) pi ON p.product_id = pi.product_id
            WHERE 
                p.product_id IN (${idList})
        `;
        // 获取商品内容
        database.query(sql1, (err1, results) => {
            if (err1) return res.cc(err1);
            const productList = results;
            const sql2 = `
                SELECT 
                    u.account,
                    u.avatar_url,
                    p.product_id,
                    po.order_id
                FROM 
                    user u
                INNER JOIN product p ON u.user_id = p.user_id
                INNER JOIN product_order po ON p.product_id = po.product_id
                WHERE 
                    p.product_id IN (${idList})
            `;
            // 卖家头像和信息，并获取 product_order 的 order_id
            database.query(sql2, (err2, results2) => {
                if (err2) res.cc(err2);
                console.log(results2);
                const salerList = results2.reduce((map, item) => {
                    map[item.product_id] = {
                       ...item,
                        status: '未收货' 
                    };
                    return map;
                }, {});
                const finalList = productList.filter(prodItem => {
                    // 检查 salerList 中是否有对应的 product_id
                    return salerList.hasOwnProperty(prodItem.product_id);
                }).map(item => {
                    // 找到 salerList 中对应 product_id 的元素
                    const correspondingItem = salerList[item.product_id];
                    return {
                       ...item,
                       ...correspondingItem // 合并 salerList 中的对象属性
                    };
                });
                res.send(finalList);
            });
        });
    });
};

exports.getHasReceiveOrder = (req, res) => {
    const sql = "select product_id,status,order_id from product_order where user_id =? and status = 3";
    database.query(sql, [req.body.user_id], (err, result) => {
        if (err) res.cc(err);
        // 商品 id 表
        if (result.length === 0) {
            return res.send();
        }
        const idList = result.map(item => `'${item.product_id}'`);
        const orderList = result.map(item => `'${item.order_id}'`);
        const productMap = result.reduce((acc, item) => {
            acc[item.product_id] = {
                status: item.status,
                order_id: item.order_id
            };
            return acc;
        }, {});
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
                    product_id
            ) pi ON p.product_id = pi.product_id
            WHERE 
                p.product_id IN (${idList})
        `;
        // 获取商品内容
        database.query(sql1, (err1, results) => {
            if (err1) return res.cc(err1);
            const productList = results;
            const sql2 = `
                SELECT 
                    u.account,
                    u.avatar_url,
                    p.product_id,
                    po.order_id
                FROM 
                    user u
                INNER JOIN product p ON u.user_id = p.user_id
                INNER JOIN product_order po ON p.product_id = po.product_id
                WHERE 
                    p.product_id IN (${idList})
            `;
            // 卖家头像和信息，并获取 product_order 的 order_id
            database.query(sql2, (err2, results2) => {
                if (err2) res.cc(err2);
                console.log(results2);
                const salerList = results2.reduce((map, item) => {
                    map[item.product_id] = {
                       ...item,
                        status: '已收货' 
                    };
                    return map;
                }, {});
                const finalList = productList.filter(prodItem => {
                    // 检查 salerList 中是否有对应的 product_id
                    return salerList.hasOwnProperty(prodItem.product_id);
                }).map(item => {
                    // 找到 salerList 中对应 product_id 的元素
                    const correspondingItem = salerList[item.product_id];
                    return {
                       ...item,
                       ...correspondingItem // 合并 salerList 中的对象属性
                    };
                });
                res.send(finalList);
            });
        });
    });
};

exports.cancelOrder = (req, res) => {
	const sql = "delete from product_order where order_id = ?"
	//console.log(req.body.order_id)
	database.query(sql, [req.body.order_id], (err, result) => {
		if (err) res.cc(err)
		//res.send(result)
		if (result.affectedRows == 1) {
			//成功后恢复库存
			const sql1 = 'update product set stock_status = 1 where product_id = ?'
			database.query(sql1, [req.body.product_id], (error, results) => {
				if (error) {
					return res.cc(error)
				}
				console.log('重新上架' + req.body.product_id)
			})
			res.send({
				status: 0,
				message: '删除订单成功'
			})
		} else {
			res.send({
				status: 1,
				message: '删除订单失败'
			})
		}
	})
}
exports.toPayOrder = (req, res) => {
	const sql = "update  product_order set ? where order_id = ?"
	const status_dict = {
		status: 1,
		pay_time: new Date()
	}
	database.query(sql, [status_dict, req.body.order_id], (err, results) => {
		if (err) res.cc(err)
		res.send({
			status: 0,
			message: '支付成功'
		})
	})
}

exports.toSendOrder = (req, res) => {
	const sql = "update  product_order set ? where order_id = ?"
	const status_dict = {
		status: 2,
		send_time: new Date()
	}
	database.query(sql, [status_dict, req.body.order_id], (err, results) => {
		if (err) res.cc(err)
		res.send({
			status: 0,
			message: '发货成功'
		})
	})
}
exports.toReceiveOrder = (req, res) => {
	const sql = "update product_order set ? where order_id = ?"
	const status_dict = {
		status: 3,
		receive_time: new Date()
	}
	database.query(sql, [status_dict, req.body.order_id], (err, results) => {
		if (err) res.cc(err)
		res.send({
			status: 0,
			message: '收货成功'
		})
	})
}
exports.getOrderDetail = (req, res) => {
	const sql = `SELECT 
	uo.*,
		u.account,
		u.avatar_url,
		u.telephone,
		u.name,
		p.*,
		pi.image_url
	FROM
	product_order uo
	JOIN
	user u ON uo.user_id = u.user_id
	JOIN
	product p ON uo.product_id = p.product_id
	LEFT JOIN
		(SELECT product_id,
			MIN(image_id) AS min_image_id FROM product_image GROUP BY product_id) AS pi_min ON uo.product_id =
		pi_min.product_id
	LEFT JOIN
	product_image pi ON pi_min.min_image_id = pi.image_id
	WHERE
	uo.order_id = ? `
	database.query(sql, [req.body.order_id], (err, result) => {
		if (err) res.cc(err)
		res.send(result[0])
	})
}