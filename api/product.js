import instance from "../http/index.js";
import { RDSip } from '/main.js';

export const newProduct = async (data) => {
    const {
        user_id,
        product_id,
        product_name,
        product_cate,
        detail,
        address,
        price
    } = data;
    const res = await new Promise((resolve, reject) => {
        uni.request({
            url: RDSip + '/product/newProduct',
            method: 'POST',
            data: {
                // 请求的数据
                user_id,
                product_id,
                product_name,
                product_cate,
                detail,
                address,
                price
            },
            header: {
                'content-type': 'application/json'
            },
            success: function (res) {
                resolve(res);
            },
            fail: function (err) {
                reject(err);
            }
        });
    });
    return res;
}

export const getProduct = async () => {
    const res = await new Promise((resolve, reject) => {
        uni.request({
            url: RDSip + '/product/getProduct',
            method: 'POST',
            data: {
                // 请求的数据
            },
            header: {
                'content-type': 'application/json'
            },
            success: function (res) {
                resolve(res);
            },
            fail: function (err) {
                reject(err);
            }
        });
    });
    return res;
}

export const getSwiper = async () => {
    const res = await new Promise((resolve, reject) => {
        uni.request({
            url: RDSip + '/product/getSwiper',
            method: 'POST',
            data: {
                // 请求的数据
            },
            header: {
                'content-type': 'application/json'
            },
            success: function (res) {
                resolve(res);
            },
            fail: function (err) {
                reject(err);
            }
        });
    });
    return res;
}

export const getProductDetail = async (data) => {
    const { product_id } = data;
    const res = await new Promise((resolve, reject) => {
        uni.request({
            url: RDSip + '/product/getProductDetail',
            method: 'POST',
            data: {
                // 请求的数据
                product_id
            },
            header: {
                'content-type': 'application/json'
            },
            success: function (res) {
                resolve(res);
            },
            fail: function (err) {
                reject(err);
            }
        });
    });
    return res;
}

export const uploadImage = async (data) => {
    const { product_id, image_url } = data;
    const res = await new Promise((resolve, reject) => {
        uni.request({
            url: RDSip + '/product/uploadImage',
            method: 'POST',
            data: {
                // 请求的数据
                product_id,
                image_url
            },
            header: {
                'content-type': 'application/json'
            },
            success: function (res) {
                resolve(res);
            },
            fail: function (err) {
                reject(err);
            }
        });
    });
    return res;
}

export const deleteImage = async (data) => {
    const { image_url } = data;
    const res = await new Promise((resolve, reject) => {
        uni.request({
            url: RDSip + '/product/deleteImage',
            method: 'POST',
            data: {
                // 请求的数据
                image_url
            },
            header: {
                'content-type': 'application/json'
            },
            success: function (res) {
                resolve(res);
            },
            fail: function (err) {
                reject(err);
            }
        });
    });
    return res;
}

export const deleteAllNowImage = async (data) => {
    const { product_id } = data;
    const res = await new Promise((resolve, reject) => {
        uni.request({
            url: RDSip + '/product/deleteAllNowImage',
            method: 'POST',
            data: {
                // 请求的数据
                product_id
            },
            header: {
                'content-type': 'application/json'
            },
            success: function (res) {
                resolve(res);
            },
            fail: function (err) {
                reject(err);
            }
        });
    });
    return res;
}

export const searchProduct = async (data) => {
    const { tag } = data;
    const res = await new Promise((resolve, reject) => {
        uni.request({
            url: RDSip + '/product/searchProduct',
            method: 'POST',
            data: {
                // 请求的数据
                tag
            },
            header: {
                'content-type': 'application/json'
            },
            success: function (res) {
                resolve(res);
            },
            fail: function (err) {
                reject(err);
            }
        });
    });
    return res;
}

export const cateProduct = async (data) => {
    const { cate } = data;
    const res = await new Promise((resolve, reject) => {
        uni.request({
            url: RDSip + '/product/cateProduct',
            method: 'POST',
            data: {
                // 请求的数据
                cate
            },
            header: {
                'content-type': 'application/json'
            },
            success: function (res) {
                resolve(res);
            },
            fail: function (err) {
                reject(err);
            }
        });
    });
    return res;
}

export const loveProduct = async (data) => {
    const { user_id, product_id } = data;
    const res = await new Promise((resolve, reject) => {
        uni.request({
            url: RDSip + '/product/loveProduct',
            method: 'POST',
            data: {
                // 请求的数据
                user_id,
                product_id
            },
            header: {
                'content-type': 'application/json'
            },
            success: function (res) {
                resolve(res);
            },
            fail: function (err) {
                reject(err);
            }
        });
    });
    return res;
}

export const checkLoveProduct = async (data) => {
    const { user_id, product_id } = data;
    const res = await new Promise((resolve, reject) => {
        uni.request({
            url: RDSip + '/product/checkLoveProduct',
            method: 'POST',
            data: {
                // 请求的数据
                user_id,
                product_id
            },
            header: {
                'content-type': 'application/json'
            },
            success: function (res) {
                resolve(res);
            },
            fail: function (err) {
                reject(err);
            }
        });
    });
    return res;
}

export const getLoveProduct = async (data) => {
    const { user_id } = data;
    const res = await new Promise((resolve, reject) => {
        uni.request({
            url: RDSip + '/product/getLoveProduct',
            method: 'POST',
            data: {
                // 请求的数据
                user_id
            },
            header: {
                'content-type': 'application/json'
            },
            success: function (res) {
                resolve(res);
            },
            fail: function (err) {
                reject(err);
            }
        });
    });
    return res;
}

export const cancelLoveProduct = async (data) => {
    const { user_id, product_id } = data;
    const res = await new Promise((resolve, reject) => {
        uni.request({
            url: RDSip + '/product/cancelLoveProduct',
            method: 'POST',
            data: {
                // 请求的数据
                user_id,
                product_id
            },
            header: {
                'content-type': 'application/json'
            },
            success: function (res) {
                resolve(res);
            },
            fail: function (err) {
                reject(err);
            }
        });
    });
    return res;
}
export const addOverview  =async (data) => {
	const { product_id } = data;
	const res = await new Promise((resolve, reject) => {
	    uni.request({
	        url: RDSip + '/product/addOverview',
	        method: 'POST',
	        data: {
	            // 请求的数据
	            product_id
	        },
	        header: {
	            'content-type': 'application/json'
	        },
	        success: function (res) {
	            resolve(res);
	        },
	        fail: function (err) {
	            reject(err);
	        }
	    });
	});
	return res;
}

export const userClick  =async (data) => {
	const {user_id, product_id } = data;
	const res = await new Promise((resolve, reject) => {
	    uni.request({
	        url: RDSip + '/product/userClick',
	        method: 'POST',
	        data: {
	            // 请求的数据
				user_id,
	            product_id
	        },
	        header: {
	            'content-type': 'application/json'
	        },
	        success: function (res) {
	            resolve(res);
	        },
	        fail: function (err) {
	            reject(err);
	        }
	    });
	});
	return res;
}