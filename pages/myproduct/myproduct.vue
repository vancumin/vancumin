<template>
	<view>
		<myProductList></myProductList>
		<view class="new-product-button flex_center_center " @click="toNewProduct">+</view>
	</view>
</template>

<script setup>
	import myProductList from '/component/product/myProductList.vue'
	const toNewProduct=()=>{
		uni.navigateTo({
			url:'/pages/myproduct/newProduct/newProduct'
		})
	}
	
</script>

<style>
	.new-product-button {
		position: fixed;
		bottom: 10%;
		right: 10%;
		background-color: #ff4d94;
		color: #fff;
		border-radius: 50%;
		width: 100rpx;
		height: 100rpx;
		font-size: 35px;
		font-weight: 600;
		line-height: 80rpx;
	}
</style>