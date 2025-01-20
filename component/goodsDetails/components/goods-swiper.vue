<template>
	<view style="padding: 24rpx 0 20rpx;" class="bgc_fff">
		<swiper class="swiper" circular="true" indicator-active-color="#fff" indicator-color="rgba(255,255,255,0.6)"
			:indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
			<swiper-item class="swiper-item flexr-jsc flex-aic" v-for="(item,index) in url">
				<image mode="aspectFill" class="swiper-item-img"
					:src="item">
				</image>
			</swiper-item>
		</swiper>
	</view>
</template>

<script setup>
	import {ref,onMounted} from 'vue'
	let props=defineProps({
		url:{
			type:Array,
			default:[]
		}
	})
</script>

<style lang="scss" scoped>
.swiper {
		height: 560rpx;
		.swiper-item {
			width: 100%;
			height: 100%;
		}
		.swiper-item-img {
			width: 686rpx;
			border-radius: 10rpx;
			height: 100%;
		}
	}
</style>