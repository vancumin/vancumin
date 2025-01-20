<script>
	import { useUserInfo } from '/store/user.js'
	export default {
		onLaunch: function() {
			console.log('App Launch')
			const store = useUserInfo()
			if(store.user_id==''){
				uni.redirectTo({
				  url: '/pages/user/login'
				});
			}
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import 'vancommon.css';
</style>
