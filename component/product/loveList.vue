<template>

	<view class="order_nav_view">
		
		<view style="padding-bottom: 30rpx;background-color:#f2f2f2">
			<template v-for="(item,index) in productList" v-if="productList.length>0">
				<myProductCard  :orderData="item"
					@reload="reloadOrder"></myProductCard>
			</template>
		</view>
		<view class="flexc-jsa" style="margin:30rpx 0" v-if="!productList.length>0">
			<image src='../../static/assets/png/no-order.png' class="empty-view "></image>
			<text class="font_44 empty-order-text">暂无商品</text>
		</view>
	</view>
</template>

<script lang='ts' setup>
	import vanTabs from '/component/sp/vanTabs'
	import myProductCard from '/component/product/myProductCard.vue'
	import {
		getOnSale,
		getToSend,
		getHasSend,
		getFinish
	} from '/api/saler.js'
	import {
		onMounted,
		ref
	} from 'vue'
	import { getLoveProduct } from '../../api/product'
	import {
		useUserInfo
	} from '/store/user.js'
	const store = useUserInfo();
	const tabIndex = ref(0)
	const productList = ref([])
	const getLove=async()=>{
		const res=await getLoveProduct({user_id:store.user_id})
		console.log(res)
		productList.value=res.data
	}
	const reloadOrder=()=>{
		getLove()
	}
	onMounted(()=>{
		getLove()
	})
</script>

<style lang='scss'>
	.order_nav_view {
		width: 100%;
		height: 84rpx;
	}

	.order_nav_box {
		padding-top: 20rpx;
		width: 100%;
		height: 84rpx;
		/* #ifdef H5 */
		top: var(--window-top);
		/* #endif */
		/* #ifndef H5 */
		top: 0;
		/* #endif */
		z-index: 1;
		left: 0;
		right: 0;
	}

	.empty-order-text {
		font-weight: 800;
		text-align: center;
		margin: 25rpx 0;
	}
</style>