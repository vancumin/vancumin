import instance from "../http/index.js";
import { RDSip } from '/main.js';

export const login = async (data) => {
    const { account, password } = data;
    const res = await new Promise((resolve, reject) => {
        uni.request({
            url: RDSip + '/login/login',
            method: 'POST',
            data: {
                account,
                password
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

export const register = async (data) => {
    const { account, password } = data;
    const res = await new Promise((resolve, reject) => {
        uni.request({
            url: RDSip + '/login/register',
            method: 'POST',
            data: {
                account,
                password
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