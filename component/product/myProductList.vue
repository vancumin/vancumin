<template>

	<view class="order_nav_view">
		<view class="bgc_fff order_nav_box ">
			<vanTabs v-model="tabIndex" :columns="tabColumns" @update:modelValue="changeTabs">
			</vanTabs>
		</view>
		<view style="padding-bottom: 30rpx;background-color:#f2f2f2">
			<template v-for="(item,index) in orderList" v-if="orderList.length>0">
				<myProductCard  :orderData="item"
					@reload="reloadOrder"></myProductCard>
			</template>
		</view>
		<view class="flexc-jsa" style="margin:30rpx 0" v-if="!orderList.length>0">
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
	import {
		useUserInfo
	} from '/store/user.js'
	const store = useUserInfo();
	const tabIndex = ref(0)
	const tabColumns = ref([{
		title: '在售中',
		id: '4'
	}, {
		title: '待发货',
		id: '5'
	}, {
		title: '已发货',
		id: '6'
	}, {
		title: '已收货',
		id: '7'
	}])
	const orderList = ref([])
	const changeTabs = (index) => {
		console.log('选中的tab索引变化了', index);
		//执行传入vanTabs内的消息改变
		//根据不同的index获取不同的表更新list栏，然后传入card的循环列表更新订单和对应的按钮逻辑
		getOrderByIndex(index)
	}
	const getOrderByIndex = async (index) => {
		console.log(index)
		if (index == 0) {
			const res = await getOnSale({
				user_id: store.user_id
			})
			console.log(res.data)
			orderList.value = res.data
		} else if (index == 1) {
			const res = await getToSend({
				user_id: store.user_id
			})
			console.log(res.data)
			orderList.value = res.data
		} else if (index == 2) {
			const res = await getHasSend({
				user_id: store.user_id
			})
			console.log(res.data)
			orderList.value = res.data
		} else if (index == 3) {
			const res = await getFinish({
				user_id: store.user_id
			})
			console.log(res.data)
			orderList.value = res.data
		}
	}

	function reloadOrder() {
		console.log("刷新目标index" + tabIndex.value)
		getOrderByIndex(tabIndex.value)
	}
	
	onMounted(()=>{
		getOrderByIndex(tabIndex.value)
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