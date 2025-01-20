<template>
	<view class="data_title flex_center_center">
		<h1>我的信息</h1>
	</view>
	<view class="main-contain">
		<div class="sender_part">
			<uni-forms :modelValue="userData" :rules="rules" ref="form" label-position="top" >
				<uni-forms-item required label="姓名" name="product_name" >
					<uni-easyinput type="text" v-model="userData.name" placeholder="请输入姓名" :disabled="!inchange"/>
				</uni-forms-item>
				<uni-forms-item required label="用户名" name="product_name">
					<uni-easyinput type="text" v-model="userData.account" placeholder="请输入用户名"  :disabled="!inchange"/>
				</uni-forms-item>
				<uni-forms-item required label="电话" name="product_name">
					<uni-easyinput type="number" v-model="userData.telephone" placeholder="请输入电话号码" :disabled="!inchange"/>
				</uni-forms-item>
				<uni-forms-item  label="年龄" name="address">
					<uni-easyinput type="number" v-model="userData.age" placeholder="请输入年龄" :disabled="!inchange" />
				</uni-forms-item>
				<uni-forms-item name="price" label="性别">
					<uni-data-picker placeholder="请选择性别" popup-title="请选择" :localdata="sex_opt" v-model=
					"userData.sex" v-if="inchange">
					</uni-data-picker>
					<uni-easyinput type="text" v-model="userData.sex" placeholder="未设置性别" :disabled="!inchange" v-if="!inchange" />
				</uni-forms-item>
			</uni-forms>

			<view class="example-body" v-if="inchange">
				<uni-file-picker limit="1" title="选择你的头像(不选则保持默认)" @success="imasucc" @delete="imadelete"></uni-file-picker>
			</view>
			<view class="dataButton-view flex_center_center">
			<button @click="onSubmit" v-if="inchange">提交</button>		
				<button @click="toSubmit">{{changeText}}</button>
			</view>
			
		</div>
	</view>
</template>

<script lang="ts" setup>
	import { ref, onMounted, onUnmounted } from 'vue'
	import {changeUserInfo,dropUserAvatar} from '../../api/user.js'
	import {useUserInfo} from '../../store/user.js'
	const form = ref(null); // 创建一个ref来存储表单的引用 
	const inchange=ref(false)
	const changeText=ref("修改")
	const store =useUserInfo();
	const avatar_id = ref('')
	const userData = ref({
		user_id:'',
		name: '',
		account: '',
		sex: '',
		telephone: '',
		avatar_url: '',
		age: '',
	})
	//记录id，方便退出时清除云端保存
	const sex_opt = [
		{
			value: '男',
			text: '男',
		},
		{
			value: '女',
			text: '女',
		}
	]
	const rules = ref({
		name: {
			rules: [{
				required: true,
				errorMessage: '请输入姓名',
			},
			{
				minLength: 2,
				maxLength: 30,
				errorMessage: '姓名长度须在2-30个字符之间'
			}
			]
		},
		telephone: {
			rules: [{
				required: true,
				errorMessage: '请输入电话号码',
				pattern: /^1[3-9]\d{9}$/,
			},
			]
		},
		account: {
			rules: [{
				required: true,
				errorMessage: '用户名不能为空',
			}, {
				minLength: 2,
				maxLength: 15,
				errorMessage: '账户长度须在2-15个字符之间'
			}
			]
		}
	})
	const toSubmit=()=>{
		if(!inchange.value){
			inchange.value=true;
			changeText.value="取消"
		}else{
			inchange.value=false;
			changeText.value="修改"
		}
	}
	
	const imasucc = (event) => {
		avatar_id.value = event.tempFiles[0].fileID
		userData.value.avatar_url=event.tempFiles[0].url
		console.log(event)
		//console.log(event.tempFiles[0].url)
	}
	const imadelete = async(event) => {
		console.log(event)
		avatar_id.value = "";
		//console.log(event.tempFile)
		deleteSqlImg()
		deleteCloudImg(event.tempFile.fileID)
	}
	const exitClear = async () => {
	
		await deleteCloudImg(avatar_id.value)

	}
	const deleteSqlImg=async()=>{
		const res=await dropUserAvatar({user_id:store.user_id})
		console.log(res.data)
		avatar_id.value =""
		userData.value.avatar_url=store.avatar_url
	}
	const deleteCloudImg = async (fileID) => {
		const res = await uniCloud.callFunction({
			name: 'fileDelete', // 替换为你的云函数名称
			data: {
				fileList: [fileID] // 传递文件ID数组
			}
		})
		console.log(res)
	}

	const onSubmit = async () => {
		//上传表单信息
		try {
			await form.value.validate(); // 调用validate方法进行表单校验
			// 如果校验通过，执行后续操作
			//console.log(productData.value);
			console.log(userData.value.user_id)
			const res = await changeUserInfo(userData.value)
			console.log(res.data)
			if (res.data.message == '修改成功') {
				inchange.value=false;
				uni.showToast({
					title: '信息修改成功!',
					mask: true,
					icon: 'none'
				});
				avatar_id.value=""
				await store.userInfo(store.user_id)
				uni.reLaunch({
					url: "/pages/user/index"
				})
			}	else if(res.data.message=='用户名已存在')		{
				uni.showToast({
					title: '用户名已存在!',
					mask: true,
					icon: 'none'
				});
			}else{
				uni.showToast({
					title: '信息修改失败!',
					mask: true,
					icon: 'none'
				});
			}
		} catch (error) {
			// 如果校验失败，处理错误
			console.error('表单校验失败', error);
		}
	}
	const initDataForm=async()=>{
		userData.value.user_id=store.user_id
		userData.value.name=store.name
		userData.value.account=store.account
		userData.value.telephone= store.telephone
		userData.value.sex= store.sex
		userData.value.age= store.age
	}
	
	onUnmounted(() => {
		exitClear();
	})
	onMounted(() => {
		initDataForm()
	})
</script>

<style scoped>
	.main-contain {
		display: flex;
		justify-content: center;
		padding: 10rpx 0;
	}

	.sender_part {
		width: 85%;
		display: flex;
		flex-direction: column;
	}
	.dataButton-view{
		margin:30rpx 0;
	}
	.dataButton-view>button{
		width:40%;
		margin: 0 25rpx;
	}
</style>