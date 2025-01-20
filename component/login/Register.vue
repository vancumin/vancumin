<template>
	<view class="content">

		<image style="width:100%;position: absolute;bottom:0;left:0;width:100%;" mode="widthFix"
			src="/static/assets/svg/loginBottom.svg"></image>

		<view class="loginBox">
			<h1 style="text-align: center;margin-bottom:80rpx;color:blue">账号注册</h1>
			<view class="inputBox">
				<uni-forms :modelValue="registerData" :rules="rules" ref="form" style="margin-bottom:20px">
					<uni-forms-item label="姓名" name="account">						
						<uni-easyinput type="text" v-model="registerData.account" placeholder="请输入用户名" />
					</uni-forms-item>
					<uni-forms-item  name="password" label="密码">			
						<uni-easyinput type="password" v-model="registerData.password" placeholder="请输入密码" />
					</uni-forms-item>
				</uni-forms>
				<button @click="Register">注册</button>
				<view class="forgetPwd">
					<span @click="tologin">返回</span>
				</view>
			</view>
		</view>
	</view>
</template>

<script lang="ts" setup>
	import SvgIcon from '/component/sp/SvgIcon.vue'
	import {ref,onMounted} from 'vue'
	import {register} from '../../api/login.js'
	const form =ref(null)
	const registerData=ref({
		account:'',
		password:''
	})
	const rules = ref({
		account: {
			rules: [{
				required: true,
				errorMessage: '用户名不能为空',
			},
			]
		},
		password: {
			rules: [{
				required: true,
				errorMessage: '请设置密码',
			},
			{
				pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,12}$/,
				errorMessage: '密码格式不正确，必须由字母和数字组成，且长度为6-12位'
			}
			]
		},
		
	})
	const Register=async()=>{
		try {
			await form.value.validate(); // 调用validate方法进行表单校验
			// 如果校验通过，执行后续操作
			//console.log(productData.value);
			console.log('格式通过')
			const res= await register(registerData.value)
			console.log(res.data)
			if(res.data.message=='注册成功'){
				uni.showToast({
					title: '注册成功',
					icon:'none'
				});
				uni.redirectTo({
					url:'/pages/user/login'
				})
			}else if(res.data.message=='账号已存在'){
				uni.showToast({
					title: '用户已存在',
					icon:'none'
				});
			}else if(res.data.message=="注册失败"){
				uni.showToast({
					title: '注册失败: '+res.data.error,
					icon:'none'
				});
			}
		} catch (error) {
			// 如果校验失败，处理错误
			console.error('表单校验失败', error);
		}
	}

	const tologin=()=>{
		uni.navigateTo({
		  url: '/pages/user/login'
		});
	}
</script>

<style scoped>
	.uni-forms-item.is-direction-left[data-v-462874dd] {
	    display: flex;
	    flex-direction: column;
		
	}
	.uni-forms-item__label[data-v-462874dd]{
		font-size:20px !important
	}
	svg {
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 40%;
		box-sizing: border-box;
		display: block;
		background-color: #ffffff;
	}

	.loginBox {
		position: absolute;
		top: 40%;
		left: 50%;
		transform: translate(-50%, -60%);
		width: 90%;
		border-radius: 20rpx;
		padding: 60rpx;
		box-sizing: border-box;
		margin:20px 0;
	}

	h3 {
		color: rgb(66, 157, 250);
		font-size: 40rpx;
		letter-spacing: 10rpx;
		margin-bottom: 40rpx;
	}

	.inputBox {
	}

	.ipt {
		height: 86rpx;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		margin-bottom: 40rpx;
		background-color: #f5f5f5;
		border-radius: 10rpx;
		padding-left: 10rpx;
	}

	.ipt input {
		margin-left: 20rpx;
		font-size: 28rpx;
	}

	.ipt input {
		margin-left: 20rpx;
	}

	.forgetPwd {
		margin-top: 30rpx;
		font-size: 26rpx;
		color: #b5b5b5;
		text-align: end;
		padding: 0 10rpx;
		display: flex;
		justify-content: space-between;
	}

	button {
		margin-top: 20rpx;
		line-height: 85rpx;
		text-align: center;
		background: rgb(66, 157, 250);
		border-radius: 40rpx;
		color: #fff;
		margin-top: 40rpx;
	}

	.tip {
		text-align: center;
		font-size: 28rpx;
		position: fixed;
		bottom: 50rpx;
		left: 50%;
		transform: translate(-50%, -50%);
		color: #f4f4f4;
	}

	.tipbox {
		text-align: center;
		margin-top: 100rpx;
	}

	.otherUser {
		margin-top: 30rpx;
		display: flex;
		justify-content: center;
	}

	.txt {
		font-size: 28rpx;
		color: #cbcbcb;
	}

	.otherUser .uni-icons {
		margin-left: 20rpx;
	}

	.yzm {
		text-align: end;
		font-size: 24rpx;
		background: linear-gradient(to right, rgb(66, 157, 250), rgb(0, 170, 127));
		height: 60rpx;
		width: 150rpx;
		line-height: 60rpx;
		text-align: center;
		border-radius: 10rpx;
		color: #fff;
	}
</style>