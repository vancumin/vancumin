
import {RDSip}from '/main.js'

export const addToCar = async (data) => {
    const {
        user_id,
        product_id
    } = data;
    const res = await new Promise((resolve, reject) => {
        uni.request({
            url: RDSip + '/buy/addToCar',
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

export const checkInCar = async (data) => {
    const {
        user_id,
        product_id
    } = data;
    const res = await new Promise((resolve, reject) => {
        uni.request({
            url: RDSip + '/buy/checkInCar',
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

export const deleteInCar = async (data) => {
    const {
        user_id,
        product_id
    } = data;
    const res = await new Promise((resolve, reject) => {
        uni.request({
            url: RDSip + '/buy/deleteInCar',
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

export const showCar = async (data) => {
    const {
        user_id
    } = data;
    const res = await new Promise((resolve, reject) => {
        uni.request({
            url: RDSip + '/buy/showCar',
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