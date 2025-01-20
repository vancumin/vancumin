import instance from "../http/index.js";
import { RDSip } from '/main.js';

export const getUserInfo = async (data) => {
    const { user_id } = data;
    const res = await new Promise((resolve, reject) => {
        uni.request({
            url: RDSip + '/user/getUserInfo',
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

export const changeUserInfo = async (data) => {
    const {
        user_id,
        account,
        name,
        sex,
        telephone,
        age,
        avatar_url
    } = data;
    const res = await new Promise((resolve, reject) => {
        uni.request({
            url: RDSip + '/user/changeUserInfo',
            method: 'POST',
            data: {
                user_id,
                account,
                name,
                sex,
                telephone,
                age,
                avatar_url
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

export const dropUserAvatar = async (data) => {
    const { user_id } = data;
    const res = await new Promise((resolve, reject) => {
        uni.request({
            url: RDSip + '/user/dropUserAvatar',
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