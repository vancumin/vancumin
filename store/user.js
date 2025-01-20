import {
	defineStore
} from 'pinia';
import {
	getUserInfo
} from '../api/user.js'
export const useUserInfo = defineStore('userinfo', {
	state: () => ({
		avatar_url: "",
		account: '',
		sex: '',
		user_id: '',
		name: '',
		role: '',
		telephone: '',
		age: ''
	}),
	getters: {

	},
	actions: {
		//用来获取和更新全局信息，如信息改变，平时用于随时获得user_id
		async userInfo(id) {
			const res = await getUserInfo({
				user_id: id
			});
			console.log('pinia')
			console.log(res.data)
			this.avatar_url = res.data.avatar_url;
			this.account = res.data.account;
			this.sex = res.data.sex;
			this.user_id = res.data.user_id;
			this.name = res.data.name;
			this.role = res.data.role;
			this.telephone = res.data.telephone;
			this.age=res.data.age;
		},
		clearStore() {
			this.avatar_url =
				'https://env-00jxhjkqc21g.normal.cloudstatic.cn/empty-user.png?expire_at=1732869184&er_sign=5de897c3e777c9bb912bdda92b58fd65'
			this.account = ''
			this.sex = ''
			this.user_id = ''
			this.name = ''
			this.role = ''
		}
	},
	persist: {
		// enabled: true,
		// key: 'userinfo',
		// storage: localStorage // 确保是小写的 L
		storage: {
			getItem(key) {
				return uni.getStorageSync(key)
			},
			setItem(key, value) {
				return uni.setStorageSync(key, value)
			}
		}
	}
});