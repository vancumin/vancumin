<template>
	<view class="search_box pos_r">
		<image class="search_icon pos_a" src="http://www.liwanying.top/applate-icon/icon_search.png" mode=""></image>
		<input class="search_input bgc_f8f8f8 boxs_bb" placeholder="请输入商品"/>
	</view>
</template>

<script setup>
	
</script>

<style lang="scss" scoped>
.search_box {
	padding: 24rpx 32rpx;
}
.search_icon {
	top: 42rpx;
	left: 64rpx;
	width: 40rpx;
	height: 40rpx;
}
.search_input {
	width: 100%;
	display: block;
	height: 76rpx;
	border-radius: 76rpx;
	padding-left: 88rpx;
}
</style>