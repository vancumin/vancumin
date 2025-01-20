<template>
	<view class="b_t_2 color_333 font_28 flex-aic flexr-jsb details_item">
		<view style="margin:0 25rpx 0 0;">{{title}}</view>
		<slot name="content">
			<view class="font_500" :class="[color,size]">{{content}}</view>
		</slot>
	</view>
</template>

<script setup>
	//21个字符后换行改样式
	let props = defineProps({
		color: {
			type: String,
			default: 'color_333'
		},
		title: {
			type: String,
			default: ''
		},
		size: {
			type: String,
			default: 'font_28'
		},
		content: {
			type: String,
			default: ''
		}
	})
</script>

<style lang="scss" scoped>
	.details_item {
		padding: 24rpx 0;
	}
</style>
