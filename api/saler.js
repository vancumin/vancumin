import instance from "../http/index.js";
import { RDSip } from '/main.js';

export const getOnSale = async (data) => {
    const { user_id } = data;
    const res = await new Promise((resolve, reject) => {
        uni.request({
            url: RDSip + '/saler/getOnSale',
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

export const getToSend = async (data) => {
    const { user_id } = data;
    const res = await new Promise((resolve, reject) => {
        uni.request({
            url: RDSip + '/saler/getToSend',
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

export const getHasSend = async (data) => {
    const { user_id } = data;
    const res = await new Promise((resolve, reject) => {
        uni.request({
            url: RDSip + '/saler/getHasSend',
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

export const getFinish = async (data) => {
    const { user_id } = data;
    const res = await new Promise((resolve, reject) => {
        uni.request({
            url: RDSip + '/saler/getFinish',
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

export const dropProduct = async (data) => {
    const { product_id } = data;
    const res = await new Promise((resolve, reject) => {
        uni.request({
            url: RDSip + '/saler/dropProduct',
            method: 'POST',
            data: {
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