import instance from "../http/index.js";
import { RDSip } from '/main.js';

export const createOrder = async (data) => {
    const { user_id, product_id, price } = data;
    const res = await new Promise((resolve, reject) => {
        uni.request({
            url: RDSip + '/order/createOrder',
            method: 'POST',
            data: {
                user_id,
                product_id,
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

export const payOrder = async (data) => {
    const { order_id } = data;
    const res = await new Promise((resolve, reject) => {
        uni.request({
            url: RDSip + '/order/payOrder',
            method: 'POST',
            data: {
                order_id
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

export const sendOrder = async (data) => {
    const { user_id, product_id } = data;
    const res = await new Promise((resolve, reject) => {
        uni.request({
            url: RDSip + '/order/sendOrder',
            method: 'POST',
            data: {
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

export const receiveOrder = async (data) => {
    const { user_id, product_id } = data;
    const res = await new Promise((resolve, reject) => {
        uni.request({
            url: RDSip + '/order/receiveOrder',
            method: 'POST',
            data: {
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

export const getAllOrder = async (data) => {
    const { user_id } = data;
    const res = await new Promise((resolve, reject) => {
        uni.request({
            url: RDSip + '/order/getAllOrder',
            method: 'POST',
            data: {
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

export const getUnPayOrder = async (data) => {
    const { user_id } = data;
    const res = await new Promise((resolve, reject) => {
        uni.request({
            url: RDSip + '/order/getUnPayOrder',
            method: 'POST',
            data: {
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

export const getUnSendOrder = async (data) => {
    const { user_id } = data;
    const res = await new Promise((resolve, reject) => {
        uni.request({
            url: RDSip + '/order/getUnSendOrder',
            method: 'POST',
            data: {
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

export const getUnReceiveOrder = async (data) => {
    const { user_id } = data;
    const res = await new Promise((resolve, reject) => {
        uni.request({
            url: RDSip + '/order/getUnReceiveOrder',
            method: 'POST',
            data: {
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

export const getHasReceiveOrder = async (data) => {
    const { user_id } = data;
    const res = await new Promise((resolve, reject) => {
        uni.request({
            url: RDSip + '/order/getHasReceiveOrder',
            method: 'POST',
            data: {
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

export const cancelOrder = async (data) => {
    const { order_id, product_id } = data;
    const res = await new Promise((resolve, reject) => {
        uni.request({
            url: RDSip + '/order/cancelOrder',
            method: 'POST',
            data: {
                order_id,
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

export const toPayOrder = async (data) => {
    const { order_id } = data;
    const res = await new Promise((resolve, reject) => {
        uni.request({
            url: RDSip + '/order/toPayOrder',
            method: 'POST',
            data: {
                order_id
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

export const toSendOrder = async (data) => {
    const { order_id } = data;
    const res = await new Promise((resolve, reject) => {
        uni.request({
            url: RDSip + '/order/toSendOrder',
            method: 'POST',
            data: {
                order_id
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

export const toReceiveOrder = async (data) => {
    const { order_id } = data;
    const res = await new Promise((resolve, reject) => {
        uni.request({
            url: RDSip + '/order/toReceiveOrder',
            method: 'POST',
            data: {
                order_id
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

export const getOrderDetail = async (data) => {
    const { order_id } = data;
    const res = await new Promise((resolve, reject) => {
        uni.request({
            url: RDSip + '/order/getOrderDetail',
            method: 'POST',
            data: {
                order_id
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