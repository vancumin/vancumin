<template>
	<view class="order_goods_box bgc_fff">
		<view class="flex">
			<image class="item_goods_img m_r_16" :src="props.orderData.image_url" mode=""></image>
			<view class="flex-fitem">
				<view class="m_b_8 flex-aic flexr-jsb">
					<text class="color_333 font_24 text_nowrap" style="max-width: 480rpx;">{{props.orderData.product_name}}</text>
				</view>
				<view class="color_999 font_24 m_b_4 text_nowrap" style="max-width: 560rpx;">{{props.orderData.product_cate}}</view>
				<view class="color_999 font_24 text_nowrap flex-aic flexr-jsb" style="max-width: 560rpx;">
					<text>{{props.orderData.address}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	const props=defineProps({
		orderData: {
			type: Object,
			default: {
				product_cate: "",
				product_name: "",
				detail: "",
				price: "",
				stock_status: "",
				address: "",
				image_url: '',
			}
		},
	})
</script>

<style lang="scss" scoped>
.item_goods_img {
	width: 108rpx;
	height: 108rpx;
	border-radius: 2rpx;
	overflow: hidden;
}
.order_goods_box {
	padding: 24rpx 32rpx;
}
</style>