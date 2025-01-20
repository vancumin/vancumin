<template>
	<view class="main-contain">
		<div class="sender_part">
			<uni-forms :modelValue="productData" :rules="rules" ref="form" label-position="top">
				<uni-forms-item required label="商品名" name="product_name">
					<uni-easyinput type="text" v-model="productData.product_name" placeholder="请输入名称" />
				</uni-forms-item>
				<uni-forms-item required label="地址" name="address">
					<uni-data-picker placeholder="请选择地址" popup-title="请选择所在地区" :localdata="address_opt"
						v-model="productData.address">
					</uni-data-picker>
				</uni-forms-item>
				<uni-forms-item required name="product_cate" label="商品分类">
					<uni-data-picker placeholder="请选择分类" popup-title="请选择分类" :localdata="cate_opt"
						v-model="productData.product_cate">
					</uni-data-picker>
				</uni-forms-item>
				<uni-forms-item required name="price" label="商品价格">
					<uni-easyinput type="number" v-model="productData.price" placeholder="请输入价格" />
				</uni-forms-item>
				<uni-forms-item name="detail" label="商品详情">
					<uni-easyinput type="textarea" v-model="productData.detail" />
				</uni-forms-item>
			</uni-forms>

			<view class="example-body">
				<uni-file-picker limit="9" title="最多选择9张图片" @success="imasucc" @delete="imadelete"></uni-file-picker>
			</view>
			<button @click="onSubmit">提交</button>
		</div>
	</view>
</template>

<script lang="ts" setup>
	import { ref, onMounted, onUnmounted } from 'vue'
	import { newProduct, uploadImage, deleteImage, deleteAllNowImage } from '../../api/product.js'
	import { useUserInfo } from '../../store/user.js';
	const form = ref(null); // 创建一个ref来存储表单的引用 
	const productData = ref({
		user_id: '1',
		product_id: '',
		product_name: '',
		product_cate: '',
		detail: '',
		address: '',
		price: '',
	})
	const imageEvent = ref([])
	//记录id，方便退出时清除云端保存
	const cate_opt = [
		{
			value: '教辅资料',
			text: '教辅资料',
		},
		{
			value: '运动器材',
			text: '运动器材',
		},
		{
			value: '电子设备',
			text: '电子设备',
		},
		{
			value: '生活用品',
			text: '生活用品',
		},
		{
			value: '衣物饰品',
			text: '衣物饰品',
		},
		{
			value: '代步工具',
			text: '代步工具',
		},
		{
			value: '其它',
			text: '其它',
		},
	]
	const address_opt = [
		{
			text: '南湖校区',
			value: '南湖校区',
			children: [
				{
					text: '教学楼区',
					value: '教学楼区'
				},
				{
					text: '梅苑',
					value: '梅苑'
				},
				{
					text: '松苑',
					value: '松苑'
				},
				{
					text: '竹苑',
					value: '竹苑'
				},
				{
					text: '杏苑',
					value: '杏苑'
				},
				{
					text: '桃苑',
					value: '桃苑'
				},
				{
					text: '其它',
					value: '南湖校区-其它'
				}
			],
		},
		{
			text: '文昌校区',
			value: '文昌校区',
			children: [
				{
					text: '教学楼区',
					value: '教学楼区'
				},
				{
					text: '学2楼',
					value: '学2楼'
				},
				{
					text: '学4楼',
					value: '学4楼'
				},
				{
					text: '学5楼',
					value: '学5楼'
				},
				{
					text: '学6楼',
					value: '学6楼'
				},
				{
					text: '学7楼',
					value: '学7楼'
				},
				{
					text: '学8楼',
					value: '学8楼'
				},
				{
					text: '其它',
					value: '文昌校区-其它'
				}
			]
		}
	]
	const rules = ref({
		product_name: {
			rules: [{
				required: true,
				errorMessage: '请输入商品名',
			},
			]
		},
		product_cate: {
			rules: [{
				required: true,
				errorMessage: '请选择分类',
			}]
		},
		price: {
			rules: [{
				required: true,
				errorMessage: '价格不能为空',
			},
			]
		},
		address: {
			rules: [{
				required: true,
				errorMessage: '请填写地址',
			}]
		},
		detail: {
			rules: [{
				maxLength: 255,
				errorMessage: '最长可填写255字'
			}]
		}
	})
	const store=useUserInfo();
	
	const imasucc = (event) => {
		imageEvent.value.push({
			url: event.tempFiles[0].url,
			id: event.tempFiles[0].fileID,
		})
		console.log(event)
		//console.log(event.tempFiles[0].url)
		uploadImg(event.tempFiles[0].url)
	}
	const imadelete = (event) => {
		console.log(event)
		const indextoDelete = imageEvent.value.findIndex(item => item.id === event.tempFile.fileID);
		if (indextoDelete !== -1) {
			imageEvent.value.splice(indextoDelete, 1);
		}
		//console.log(event.tempFile)
		deleteImg(event.tempFilePath)
		deleteCloudImg(event.tempFile.fileID)
	}
	const exitClear = async () => {
		if (imageEvent.value.length > 0) {
			const res = await deleteAllNowImage({ product_id: productData.value.product_id })
			console.log(res)
		}
		for (const image of imageEvent.value) {
			await deleteCloudImg(image.id)
		}
		productData.value = {
			user_id: '1',
			product_id: '',
			product_name: '',
			product_cate: '',
			detail: '',
			address: '',
			price: '',
		};
	}
	function spDate() : string {
		const now = new Date();
		const year = now.getFullYear();
		const month = now.getMonth() + 1;
		const day = now.getDate();
		const hours = now.getHours();
		const minutes = now.getMinutes();
		const seconds = now.getSeconds();

		// 将每个部分格式化为两位数的字符串
		const pad = (num : number) : string => num.toString().padStart(2, '0');

		// 拼接字符串
		return `${year}${pad(month)}${pad(day)}${pad(hours)}${pad(minutes)}${pad(seconds)}`;
	}
	const uploadImg = async (image_url) => {
		const res = await uploadImage({ product_id: productData.value.product_id, image_url: image_url })
		console.log(res.data)
	}
	const deleteCloudImg = async (fileID) => {
		const res = await uniCloud.callFunction({
			name: 'fileDelete', // 替换为你的云函数名称
			data: {
				fileList: [fileID] // 传递文件ID数组
			}
		})
	}
	const deleteImg = async (image_url) => {
		const res = await deleteImage({ image_url: image_url })
		console.log(res)
	}
	const onSubmit = async () => {
		try {
			await form.value.validate(); // 调用validate方法进行表单校验
			// 如果校验通过，执行后续操作
			//console.log(productData.value);
			const res = await newProduct(productData.value)
			console.log(res.data)
			if (res.data.message == '提交成功') {
				uni.showToast({
					title: '商品上传成功!',
					mask: true,
					icon: 'none'
				});
			}
			imageEvent.value = [];
			//执行主界面的商品刷新
			
			uni.switchTab({
				url: '/pages/main/index'
			})
			uni.$emit('updateProduct')
		} catch (error) {
			// 如果校验失败，处理错误
			console.error('表单校验失败', error);
		}



	}
	onUnmounted(() => {
		exitClear();
	})
	onMounted(() => {
		productData.value.product_id = store.account + spDate();
		productData.value.user_id=store.user_id;
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
	.example-body{
		margin: 0 0 10px 0;
	}
</style>