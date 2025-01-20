<template>
	<view>
		<uni-popup ref="popupRef" type="bottom">
			<view class="popup_box bgc_fff boxs_bb">
				<view class="b_b_2 p_b_24 flexr-jsb full_width">
					<view class="flex_left_center">
						<image class="goods_chart" :src=productData.product_img mode=""></image>
						<view>
							<view class="font_40"> {{productData.product_name}}</view>
							<view style="0 20rpx" class="flex-aife color_b5b5b5"><text>{{productData.address}} | {{productData.product_cate}}</text></view>
							<view class="color_ff0003 font_40 flex-fitem flex flex-aife full_width">
								<text class="font_28">¥</text><text>{{productData.price}}</text>
							</view>

						</view>
					</view>
					<view class='flexr-jfe'>
						<image @tap="popupRef.close()" class="goods_close"
							src="http://www.liwanying.top/applate-icon/close.png" mode=""></image>
					</view>
				</view>

				<view class="tac">
					<vanButton width="100%" borderColor="#fe5572" backgroundColor="#fe5572" title="确认"
						@lyzTap="emit('newOrder')"></vanButton>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script setup>
	import {
		ref
	} from "vue";
	import vanButton from '/component/sp/vanButton.vue'
	const emit = defineEmits(['toOrder', 'add', 'newOrder'])
	let popupRef = ref()
	let props = defineProps({
		num: {
			type: Number,
			default: 0,
		},
		productData: {
			type: Object,
			default: () => ({
				address: "",
				cate: '',
				price: '277',
				product_name: "",
				product_img: "https://img1.baidu.com/it/u=1147992555,4285883113&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500"
			})
		}
	})

	const showSku = (val) => {
		popupRef.value.open()
	}
	const closeSku = () => {
		popupRef.value.close()
	}
	defineExpose({
		showSku,
		closeSku
	})
</script>

<style lang="scss" scoped>
	.popup_box {
		padding: 32rpx 32rpx 8rpx 32rpx;
		border-radius: 16rpx 16rpx 0rpx 0rpx;
	}

	.goods_chart {
		width: 130rpx;
		height: 130rpx;
		border-radius: 6rpx;
		margin-right: 16rpx;
	}

	.goods_close {
		width: 32rpx;
		height: 32rpx;
	}
</style>