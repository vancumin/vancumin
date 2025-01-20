<template>
	<view class="order_goods_card">
		<view class="bgc_fff order_goods_card_item">
			<view class="color_ff7000 font_28 m_b_24 b_b_2" style="padding-bottom: 5px;">{{props.orderData.status}}
			</view>
			<view class="flex m_b_12" @click="toOrder">
				<image class="order_goods_card_img m_r_24" :src='props.orderData.image_url' mode="aspectFill"></image>
				<view class="flex-fitem">
					<view class="color_333 font_32 text_nowrap" style="max-width: 420rpx;">
						{{props.orderData.product_name}}
					</view>
					<view class="flexr-jsb flex-aic">
						<view class="flex-aic flexr-jsb font_24 color_999 m_b_24">
							<text class="text_nowrap" style="max-width: 340rpx;">{{props.orderData.product_cate}}</text>
						</view>
						<view class="flex_center_center">
							<view class=" font_28 text_nowrap" style="max-width: 240rpx;">{{props.orderData.account}}</view>
							<image class='store_avatar  avatar_img' :src=props.orderData.avatar_url
								style="width:60rpx;height:60rpx;border:0.2px solid #f2f2f2;margin: 0 10rpx;"></image>
						</view>
					</view>
					<view class="color_ff0003">
						<text class="font_28">¥</text>
						<text class="font_40">{{props.orderData.price}}</text>
					</view>
				</view>
			</view>
			<view class="flex-aic flexr-jfe">
				<vanButton @lyzTap="cancelorder" :btnStyle="{
					padding:'0 16rpx',
					marginRight: '16rpx'
				}" titleSize="28rpx" height="56rpx" titleColor="#333" borderColor="#ddd" backgroundColor="#fff"
					v-if="props.orderData.status=='待发货'||props.orderData.status=='待付款'" title="取消订单">
				</vanButton>
				<vanButton @lyzTap="dealOrder(props.orderData.status)" :btnStyle="{
					padding:'0 16rpx',
				}" titleSize="28rpx" height="56rpx" titleColor="#fe5572" borderColor="#fe5572" backgroundColor="#fff"
					:title="orderButton">
				</vanButton>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		nextTick,
		onMounted,
		ref,
		watch
	} from 'vue';
	import {
		toPayOrder,
		toSendOrder,
		toReceiveOrder,
		cancelOrder
	} from '/api/order.js'
	//定义props传入货物信息 商品名，价格 ，种类 ，商户account,头像
	const props = defineProps({
		orderData: {
			type: Object,
			default: {
				product_id: "",
				user_id: "",
				product_cate: "",
				product_name: "",
				detail: "",
				price: "",
				stock_status: "",
				address: "",
				image_url: '',
				avatar_url: "",
				account: "",
				status: '',
				order_id: ''
			}
		},
	})
	const orderButton = ref('点击支付')
	const emit = defineEmits(['cancel', 'tapCard', 'logistics', 'reload'])
	import vanButton from '/component/sp/vanButton'
	const toOrder = () => {
		uni.navigateTo({
			url: '/pages/order/orderDetail?order_id=' + props.orderData.order_id + "&status=" + props.orderData
				.status
		})

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
					console.log(props.orderData.order_id)
					const r = await cancelOrder({
						order_id: props.orderData.order_id,
						product_id: props.orderData.product_id
					})
					console.log(r)
					if (r.data.message == '删除订单成功') {
						uni.showToast({
							title: '取消订单成功',
							icon: 'none'
						});
						uni.$emit('updateProduct')
						console.log('刷新')
						emit('reload')
					}
				}
			}
		})
	}

	const toPay = async () => {
		uni.showModal({
			title: '支付', // 弹窗标题
			content: '是否支付' + props.orderData.price + '元', // 弹窗内容
			showCancel: true, // 是否显示取消按钮，默认为 true
			cancelText: '取消', // 取消按钮的文字，默认为'取消'
			confirmText: '确定', // 确定按钮的文字，默认为'确定'
			success: async function(res) {
				if (res.confirm) {
					//支付界面
					const order_id = props.orderData.order_id
					const r = await toPayOrder({
						order_id: props.orderData.order_id
					})
					console.log(r.data)
					if (r.data.message == '支付成功') {
						uni.showToast({
							title: '支付成功',
							icon: 'none'
						});
						console.log('刷新')
						emit('reload')
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
					const order_id = props.orderData.order_id
					const r = await toSendOrder({
						order_id: props.orderData.order_id
					})
					console.log(r.data)
					if (r.data.message == '发货成功') {
						uni.showToast({
							title: '发货成功',
							icon: 'none'
						});
						console.log('刷新')
						emit('reload')
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
			content: '是否收货：' + props.orderData.product_name, // 弹窗内容
			showCancel: true, // 是否显示取消按钮，默认为 true
			cancelText: '取消', // 取消按钮的文字，默认为'取消'
			confirmText: '确定', // 确定按钮的文字，默认为'确定'
			success: async function(res) {
				if (res.confirm) {
					//支付界面
					const order_id = props.orderData.order_id
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
						emit('reload')
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
	const dealOrder = (status) => {
		console.log(status)
		if (status == '待付款') {
			toPay();
		} else if (status == '未发货') {
			uni.showToast({
				title: '等待卖家发货',
				icon: 'none'
			})
		} else if (status == '未收货') {
			toReceive();
		} else if (status == '已收货') {
			toComment();
		}
	}
	watch(
		() => props.orderData.status,
		(newStatus) => {
			// 根据新状态更新 orderButton 的值
			if (newStatus === '待付款') {
				orderButton.value = '点击支付';
			} else if (newStatus === '未发货') {
				orderButton.value = '等待发货';
			} else if (newStatus === '未收货') {
				orderButton.value = '点击收货';
			} else if (newStatus === '已收货') {
				orderButton.value = '点击评价';
			}
			console.log(orderButton.value);
		}, {
			immediate: true
		} // 立即执行，等同于 onMounted 中的逻辑
	);
</script>

<style lang="scss" scoped>
	.order_goods_card {
		padding: 24rpx 32rpx 0;
		background-color: #f2f2f2;
	}

	.order_goods_card_item {
		padding: 24rpx;
		border-radius: 12rpx;
	}

	.order_goods_card_img {
		width: 151rpx;
		height: 152rpx;
		border-radius: 12rpx;
		overflow: hidden;

	}
</style>