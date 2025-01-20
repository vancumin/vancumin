<template>
	<view>
		<view class="bgc_ffe7e6 flex-aic flexr-jsc order_notify_box" v-if="orderDataDetail.status=='待付款'">
			<text class="font_28 color_ff3b30">待付款：请在下单后24h内进行付款</text>
		</view>
		<view class="flex-aic flexr-jsb bgc_fff order_address_box m_t_24 m_b_24">
			<image class="order_location_icon m_r_16" :src="orderDataDetail.avatar_url" mode=""></image>
			<view class="flex-fitem">
				<text class="color_333 font_28 m_b_4">{{orderDataDetail.name}} {{orderDataDetail.telephone}}</text>
				<view class="text_nowrap color_999 font_24" style="max-width: 500rpx;">{{orderDataDetail.account}}
				</view>
			</view>
		</view>
		<view class="b_t_2 color_333 "></view>
		<order-goods-item :orderData='{
			product_name:orderDataDetail.product_name,
			image_url: orderDataDetail.image_url,
			product_cate: orderDataDetail.product_cate,
			detail: orderDataDetail.detail,
			price: orderDataDetail.price,
			stock_status: orderDataDetail.stock_status,
			address: orderDataDetail.address
		}'></order-goods-item>
		<view class="bgc_fff m_b_24" style="padding: 0 32rpx;">
			<order-details-item title="商品总价" :content="'￥'+orderDataDetail.price"></order-details-item>
			<order-details-item title="实付款" color="color_ff7000" :content="'￥'+orderDataDetail.price"
				size="font_40"></order-details-item>
			<order-details-item title="商品详情" :content="orderDataDetail.detail"></order-details-item>
		</view>
		<view class="bgc_fff" style="padding: 0 8rpx;">

			<uni-collapse-item title="订单时间链">
				<view style="padding:0 25rpx;">
					<order-details-item title="下单时间" color="color_999"
						:content="orderDataDetail.create_time"></order-details-item>
					<order-details-item title="支付时间" color="color_999"
						:content="orderDataDetail.pay_time"></order-details-item>
					<order-details-item title="发货时间" color="color_999"
						:content="orderDataDetail.send_time"></order-details-item>
					<order-details-item title="收货时间" color="color_999"
						:content="orderDataDetail.receive_time"></order-details-item>
				</view>
			</uni-collapse-item>

		</view>
		<view class="order_nav_view">
			<view class="order_nav_box pos_f bgc_fff flex-aic flexr-jfe">
				<!--  第一个按钮 实现取消订单，第二个按钮给商家发货，客户付款，客户付款后改为前往详情，第三按钮是评价界面，只有收货订单可以评价        !-->
				<vanButton @lyzTap="cancelorder" v-if="isBuyer&&orderStatus<2" :btnStyle="{
						padding:'0 16rpx',
						marginRight: '32rpx'
					}" titleSize="28rpx" height="56rpx" titleColor="#333" borderColor="#333" backgroundColor="#fff" title="取消订单">
				</vanButton>
				<vanButton @lyzTap="dealOrder" :btnStyle="{
					padding:'0 16rpx',
					marginRight: '32rpx'
				}" titleSize="28rpx" height="56rpx" titleColor="#fe5572" borderColor="#fe5572" backgroundColor="#fff" :title="dealButton">
				</vanButton>				
			</view>
		</view>
	</view>
</template>

<script setup>
	import orderGoodsItem from './components/order-goods-item.vue'
	import orderDetailsItem from './components/order-details-item.vue'
	import vanButton from '/component/sp/vanButton.vue'
	import {
		getOrderDetail,
		cancelOrder,
		toPayOrder,
		toSendOrder,
		toReceiveOrder
	} from '/api/order.js'
	import {
		onMounted,
		ref,
		watch
	} from 'vue'
	import {
		useUserInfo
	} from '/store/user.js'
	const props = defineProps({
		order_id: String,
		status: String
	})
	const store = useUserInfo()
	const orderDataDetail = ref({

	})
	const isBuyer = ref()
	const orderStatus = ref()
	const dealButton=ref('')
	const getDetail = async () => {
		const order_id = props.order_id;
		const status = props.status
		//console.log(order_id)
		const res = await getOrderDetail({
			order_id: order_id
		})
		//console.log(res.data)
		orderDataDetail.value = res.data
		orderStatus.value = Number(orderDataDetail.value.status)
		orderDataDetail.value.status = status;
		console.log(orderDataDetail.value)
		console.log(orderStatus.value)
		judgeIdentity()
	}
	const dealOrder=()=>{
		if(isBuyer.value){
			//买家界面
			dealBuyer(orderStatus.value)
		}else {
			//卖家界面
			dealSaler(orderStatus.value)
		}
	}
	
	const cancelorder = async () => {
		uni.showModal({
			title: "提示",
			content: "是否取消该订单？",
			confirmColor: "#fe5572",
			cancelText: '取消', // 取消按钮的文字，默认为'取消'
			confirmText: '确定', // 确定按钮的文字，默认为'确定'
			success: async function(res) {
				if (res.confirm) {
					//取消界面
					console.log(orderDataDetail.value.order_id)
					const r = await cancelOrder({
						order_id: orderDataDetail.value.order_id,
						product_id: orderDataDetail.value.product_id
					})
					console.log(r)
					if (r.data.message == '删除订单成功') {
						uni.showToast({
							title: '取消订单成功',
							icon: 'none'
						});
						uni.$emit('updateProduct')
						console.log('刷新')
						uni.$emit('reload')
					}
				}
			}
		})
	}
	
	const toPay = async () => {
		uni.showModal({
			title: '支付', // 弹窗标题
			content: '是否支付' + orderDataDetail.value.payment + '元', // 弹窗内容
			showCancel: true, // 是否显示取消按钮，默认为 true
			cancelText: '取消', // 取消按钮的文字，默认为'取消'
			confirmText: '确定', // 确定按钮的文字，默认为'确定'
			success: async function(res) {
				if (res.confirm) {
					//支付界面
					const order_id = orderDataDetail.value.order_id
					const r = await toPayOrder({
						order_id: orderDataDetail.value.order_id
					})
					console.log(r.data)
					if (r.data.message == '支付成功') {
						uni.showToast({
							title: '支付成功',
							icon: 'none'
						});
						console.log('刷新')
						uni.$emit('reload')
						getDetail()
					} else {
						uni.showToast({
							title: '支付失败',
							icon: 'none'
						});
					}
				}
			}
		});
	
	}
	const toSend = async () => {
		uni.showModal({
			title: '支付', // 弹窗标题
			content: '是否发货商品' + props.orderData.product_name, // 弹窗内容
			showCancel: true, // 是否显示取消按钮，默认为 true
			cancelText: '取消', // 取消按钮的文字，默认为'取消'
			confirmText: '确定', // 确定按钮的文字，默认为'确定'
			success: async function(res) {
				if (res.confirm) {
					//支付界面
					const order_id = orderDataDetail.value.order_id
					const r = await toSendOrder({
						order_id: orderDataDetail.value.order_id
					})
					console.log(r.data)
					if (r.data.message == '发货成功') {
						uni.showToast({
							title: '发货成功',
							icon: 'none'
						});
						console.log('刷新')
						uni.$emit('reload')
						getDetail()
					} else {
						uni.showToast({
							title: '发货失败',
							icon: 'none'
						});
					}
				}
			}
		});
	}
	const toReceive = async () => {
		uni.showModal({
			title: '支付', // 弹窗标题
			content: '是否收货：' + orderDataDetail.value.product_name, // 弹窗内容
			showCancel: true, // 是否显示取消按钮，默认为 true
			cancelText: '取消', // 取消按钮的文字，默认为'取消'
			confirmText: '确定', // 确定按钮的文字，默认为'确定'
			success: async function(res) {
				if (res.confirm) {
					//支付界面
					const order_id = orderDataDetail.value.order_id
					console.log('order')
					console.log(order_id)
					const r = await toReceiveOrder({
						order_id: order_id
					})
					console.log(r.data)
					if (r.data.message == '收货成功') {
						uni.showToast({
							title: '收货成功',
							icon: 'none'
						});
						console.log('刷新')
						getDetail()
						uni.$emit('reload')
					} else {
						uni.showToast({
							title: '收货失败',
							icon: 'none'
						});
					}
				}
			}
		});
	}
	const toComment = async () => {
		//弹出评论界面
		console.log('评价')
		uni.showToast({
			title: '评价功能未上线',
			icon: 'none'
		})
	}
	const dealBuyer = (status) => {
		console.log(status)
		if (status == 0) {
			toPay();
		} else if (status == 1) {
			uni.showToast({
				title: '等待卖家发货',
				icon: 'none'
			})
		} else if (status == 2) {
			toReceive();
		} else if (status == 3) {
			toComment();
		}
	}
	const dealSaler = (status) => {
		console.log(status)
		if(status==1){
			toSend()
		}
		else if(status==2){
			uni.showToast({
				title:'等待买家收货',
				icon:'none'
			})
		}else if(status==3){
			toComment();
		}
	}
	const judgeIdentity = () => {
		//console.log(store.user_id)
		if (Number(orderDataDetail.value.user_id) != Number(store.user_id)) {
			isBuyer.value = true
		} else {
			isBuyer.value = false
		}
		//console.log(isBuyer.value)
	}
	watch(
		() => orderStatus.value,
		(newStatus) => {
			// 根据新状态更新 orderButton 的值
			if (newStatus === 0) {
				dealButton.value = '点击支付';
			} else if (newStatus === 1) {
				if(isBuyer.value){
					dealButton.value = '等待发货';
				}else{
					dealButton.value = '点击发货';
				}
			} else if (newStatus === 2) {
				if(isBuyer.value){
					dealButton.value = '点击收货';
				}else{
					dealButton.value = '等待收货';
				}
			} else if (newStatus === 3) {				
				if(isBuyer.value){
					dealButton.value = '点击评价';
				}else{
					dealButton.value = '订单完成';
				}
			}
			console.log(dealButton.value);
		}, {
			immediate: true
		} // 立即执行，等同于 onMounted 中的逻辑
	);
	onMounted(() => {
		getDetail()
	})
</script>

<style lang="scss">
	page {
		background-color: #f8f8f8;
	}

	.order_notify_box {
		height: 68rpx;
	}

	.order_address_box {
		padding: 28rpx 32rpx;
	}

	.order_location_icon {
		width: 40rpx;
		height: 40rpx;
	}

	.order_nav_view {
		height: 100rpx;
		width: 100%;
		padding-bottom: constant(safe-area-inset-bottom);

	}

	.order_nav_box {
		bottom: 0;
		left: 0;
		right: 0;
		height: 100rpx;
		width: 100%;
		padding-bottom: constant(safe-area-inset-bottom);
		padding-bottom: env(safe-area-inset-bottom);
	}
</style>