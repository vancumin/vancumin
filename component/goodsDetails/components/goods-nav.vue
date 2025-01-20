<template>
	<view class="goods_nav_view">
		<view class="pos_f g_nav_box bgc_fff flex flex-aic">
			<view class="flex-fitem flex-aic flexr-jsc font_24 color_333" @tap="toMain">
				<image class="g_nav_icon m_r_8" src="http://www.liwanying.top/applate-icon/shouye.png" mode=""></image>
				<text>首页</text>
			</view>
			<view @tap="emit('love')" class="flex-fitem flex-aic flexr-jsc font_24 color_333" v-if="!props.hasLove">
				<image class="g_nav_icon m_r_8"
					src= 'http://www.liwanying.top/applate-icon/shoucang.png' 
					mode=""></image>
				<text>收藏</text>
			</view>
			<view @tap="emit('unlove')" class="flex-fitem flex-aic flexr-jsc font_24 color_333" v-if="props.hasLove">
				<image class="g_nav_icon m_r_8"
					src='http://www.liwanying.top/applate-icon/shoucangxuanzhong.png' 
					mode=""></image>
				<text>已收藏</text>
			</view>
			<view class="btns_box color_fff font_32 flex flex-aic">
				<view class="bgc_ffa259 tac" @tap="emit('add')">{{toCar}}</view>
				<view class="bgc_ff7000 tac" :class="{empty:!props.stock}" @tap="emit('pay')">{{buyTitle}}</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	//添加无货的判断修改按钮
	import {
		ref,
		onMounted,
		nextTick,
		watchEffect,
		watch
	} from 'vue';
	const emit = defineEmits(['add', 'pay','love','unlove'])
	let props = defineProps({
		stock: {
			type: Boolean,
			default: true
		},
		incar: {
			type: Boolean,
			default: false
		},
		hasLove:{
			type: Boolean,
			default: false
		}
	})
	const buyTitle = ref("")
	const toCar = ref("")
	const toMain=()=>{
		uni.switchTab({
			url:'/pages/main/index'
		})
	}
	watch(() => [props.stock, props.incar,props.hasLove], ([newStock, newIncar,newhasLove], [oldStock, oldIncar,oldhasLove]) => {
	  console.log('界面更新');
	  //console.log(newStock);
	  //console.log(newIncar);
	  //console.log(newhasLove);
	  if (newStock) {
	    buyTitle.value = "立即购买";
	  } else {
	    buyTitle.value = "暂无货源";
	  }
	
	  if (newIncar) {
	    toCar.value = "已放入购物车";
	  } else {
	    toCar.value = "加入购物车";
	  }
	});
	onMounted(() => {
		if (props.stock) {
		  buyTitle.value = "立即购买";
		} else {
		  buyTitle.value = "暂无货源";
		}
			
		if (props.incar) {
		  toCar.value = "已放入购物车";
		} else {
		  toCar.value = "加入购物车";
		}
	})
</script>

<style lang="scss" scoped>
	.goods_nav_view {
		height: 100rpx;
		width: 100%;
		padding-bottom: constant(safe-area-inset-bottom);
		padding-bottom: env(safe-area-inset-bottom);
	}

	.g_nav_box {
		padding: 5rpx 24rpx 0 12rpx;
		bottom: 0;
		left: 0;
		right: 0;
		height: 100rpx;
		padding-bottom: constant(safe-area-inset-bottom);
		padding-bottom: env(safe-area-inset-bottom);
		box-shadow: 0rpx -2rpx 6rpx 0rpx rgba(215, 215, 215, 0.5);
	}

	.g_nav_icon {
		width: 40rpx;
		height: 40rpx;
	}

	.btns_box {
		border-radius: 6rpx;
		overflow: hidden;

		view {
			width: 200rpx;
			height: 80rpx;
			line-height: 80rpx;
		}
	}

	.empty {
		background-color: #999999
	}
</style>