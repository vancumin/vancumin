<template>
	<view @tap.stop="tapBtn" hover-class="hover_box" class="btn_box font_32 tac boxs_bb" :style="{
		borderColor:borderColor,
		color:titleColor,
		width:width,
		height: height,
		backgroundColor:backgroundColor,
		opacity:disabled ? '0.7' : '1',
		...btnStyle
	}">
		<slot name="title">
			<view class="flex-fitem flex-aic flexr-jsc" style="height: 100%;width: 
			100%;">
				<view :style="{
					fontSize:titleSize
				}">{{title}}</view>
			</view>
		</slot>
	</view>
</template>

<script setup>
	let props = defineProps({
		title: {
			type: String,
			default: ''
		},
		disabled: {
			type: Boolean,
			default: false
		},
		width: {
			type: String,
			default: ''
		},
		height: {
			type: String,
			default: '80rpx'
		},
		titleSize:{
			type: String,
			default: ''
		},
		titleColor:{
			type: String,
			default: '#fff'
		},
		borderColor:{
			type: String,
			default: '#3C7FFF'
		},
		backgroundColor:{
			type: String,
			default: '#3C7FFF'
		},
		btnStyle:{
			type: Object,
			default: {}
		},
	});
	const emit = defineEmits(['lyzTap'])
	const tapBtn = () => {
		if(!props.disabled) emit('lyzTap')
	}
</script>

<style lang="scss" scoped>
.btn_box {
	display: inline-block;
	padding:0 40rpx;
	box-sizing: border-box;
	border-radius: 6rpx;
	border: 2rpx solid;
}
.hover_box {
	opacity: 0.7;
}
</style>
