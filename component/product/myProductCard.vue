<template>
	<view class="order_goods_card" >
		<view class="bgc_fff order_goods_card_item">
			<view class="color_ff7000 font_28 m_b_24 b_b_2" style="padding-bottom: 5px;">{{props.orderData.status}}</view>
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
						<view>
							<text>{{props.orderData.account}}</text>
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
				<vanButton @lyzTap="cancellove" v-if="props.orderData.status=='已收藏'" :btnStyle="{
					padding:'0 16rpx',
					marginRight: '16rpx'
				}" titleSize="28rpx" height="56rpx" titleColor="#333" borderColor="#ddd" backgroundColor="#fff" :title="cancelButton">
				</vanButton>
				<vanButton @lyzTap="cancelorder" v-if="props.orderData.status=='在售中'||props.orderData.status=='待发货'" :btnStyle="{
					padding:'0 16rpx',
					marginRight: '16rpx'
				}" titleSize="28rpx" height="56rpx" titleColor="#333" borderColor="#ddd" backgroundColor="#fff" :title="cancelButton">
				</vanButton>
				<vanButton @lyzTap="dealOrder(props.orderData.status)" :btnStyle="{
					padding:'0 16rpx',
				}" titleSize="28rpx" height="56rpx" titleColor="#fe5572" borderColor="#fe5572" backgroundColor="#fff" :title="orderButton">
				</vanButton>
			</view>
		</view>
	</view>
</template>

<script setup>
	//用来记录订单，在售商品和收藏商品三功能
	import { nextTick,onMounted,ref,watch } from 'vue';
	import{dropProduct,getOnSale,getToSend,getHasSend,getFinish}from '/api/saler.js'
	import{toSendOrder} from '/api/order.js'
	import { cancelLoveProduct } from '../../api/product';
	import {useUserInfo} from '../../store/user.js'
	//定义props传入货物信息 商品名，价格 ，种类 ，商户account,头像
	const store=useUserInfo()
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
				order_id:''
			}
		},
	})
	const orderButton=ref('点击查看')
	const cancelButton=ref('')
	const emit = defineEmits(['cancel', 'tapCard', 'logistics','reload'])
	import vanButton from '/component/sp/vanButton'
	const cancelorder = async () => {
		uni.showModal({
			title: "提示",
			content: "是否下架此商品？",
			confirmColor: "#fe5572",
			cancelText: '取消', // 取消按钮的文字，默认为'取消'
			confirmText: '确定', // 确定按钮的文字，默认为'确定'
			success:async function(res) {
				if (res.confirm) {
					//取消界面
					console.log( props.orderData.order_id)
					const r = await dropProduct({
						product_id:props.orderData.product_id
					})
					console.log(r)
					if (r.data.message == '下架成功') {
						uni.showToast({
							title: '下架成功',
							icon: 'none'
						});
						console.log('刷新')
						emit('reload')
					}else{
						uni.showToast({
							title: '下架失败',
							icon: 'none'
						});
					}
				}
			}
		})
	}
	const cancellove=async()=>{
		const res=await cancelLoveProduct({user_id:store.user_id,product_id:props.orderData.product_id})
		if(res.data.message=='取消收藏成功'){
			uni.showToast({
				title: '取消收藏成功',
				icon: 'none'
			});
			emit('reload')
		}else{
			uni.showToast({
				title: '取消收藏失败',
				icon: 'none'
			});
		}
	}
	const toDetail =()=>{
		uni.navigateTo({
			url:'/pages/shopping/store?product_id='+props.orderData.product_id
		})
	}
	const toOrder=()=>{
		if(props.orderData.status=='在售中'||props.orderData.status=='已收藏'){
			toDetail()
		}else{
			uni.navigateTo({
				url:'/pages/order/orderDetail?order_id='+props.orderData.order_id+"&status="+props.orderData.status
			})
		}
	}
	const toSend = async () => {
		uni.showModal({
			title: '支付', // 弹窗标题
			content: '是否发货商品' + props.orderData.product_name , // 弹窗内容
			showCancel: true, // 是否显示取消按钮，默认为 true
			cancelText: '取消', // 取消按钮的文字，默认为'取消'
			confirmText: '确定', // 确定按钮的文字，默认为'确定'
			success:async function(res) {
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
	
	const toComment = async () => {
		//查看评价
		console.log('评价')
		uni.showToast({
			title: '评价功能未上线',
			icon: 'none'
		})
	}
	const dealOrder = (status) => {
		console.log(status)
		if(status=='在售中'||status=='已收藏'){
			toDetail()
		}else if(status=='待发货'){
			toSend()
		}
		else if(status=='已发货'){
			uni.showToast({
				title:'等待买家收货',
				icon:'none'
			})
		}else if(status=='已收货'){
			toComment();
		}
	}
	watch(
	  () => props.orderData.status,
	  (newStatus) => {
	    // 根据新状态更新 orderButton 的值
		console.log(newStatus)
	    if (newStatus === '在售中') {
	      orderButton.value = '查看详情';
		  cancelButton.value='下架商品'
	    } else if (newStatus === '已收藏') {
	      orderButton.value = '查看详情';
		  cancelButton.value='取消收藏'
	    }
		else if (newStatus === '待发货') {
	      orderButton.value = '点击发货';
		  cancelButton.value='取消订单'
	    } else if (newStatus === '已发货') {
	      orderButton.value = '等待收货';
	    } else if (newStatus === '已收货') {
	      orderButton.value = '查看评价';
	    }
	    console.log(orderButton.value);
		console.log(cancelButton.value)
	  },
	  { immediate: true } // 立即执行，等同于 onMounted 中的逻辑
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