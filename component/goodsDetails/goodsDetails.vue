<template>
	<view>
		<goods-swiper :url="productData.url"></goods-swiper>
		<view class="goods_title boxs_bb m_b_24 bgc_fff">
			<view class="m_b_8 color_333 font_36 font_bold">{{productData.product_name}}</view>
			<view class="flex_right_center"><view class="color_999 font_28">{{productData.overview}}次浏览</view></view>
			<view class="flex m_b_24 flex-aife price_detail">
				<view class="price_color">
					<text class="font_64 m_r_24">¥{{productData.price}}</text>
				</view>
				<view class="store_data">
					<text class="font_36 color_999 m_b_12" style="margin: 0 15rpx;">{{productData.account}}</text>
					<image class="avatar_img store_avatar" :src="productData.avatar_url">
					</image>
				</view>
			</view>
		</view>
		<view class="bgc_fff font_28 color_333 m_b_24">
			<view class="goods_item_box boxs_bb">
				<text class="goods_item_cla color_999">地址</text><text>{{productData.address}}</text>
			</view>
			<view class="goods_item_box boxs_bb">
				<text class="goods_item_cla color_999">类别</text><text>{{productData.product_cate}}</text>
			</view>
			<view class="goods_item_box boxs_bb">
				<text class="goods_item_cla color_999">详情</text><text>{{productData.detail}}</text>
			</view>
		</view>
		<goods-sku ref="goodsSkuRef" @add="goodsAdd" @newOrder="toOrder" :productData="productData"></goods-sku>
		<goods-nav @add="goodsAdd" @pay="goodsTapPay" @love="goodsLove"  @unlove='goodsunlove'
		:stock="productData.stock_status" :incar="incar"
			:hasLove="hasLove"></goods-nav>
	</view>
</template>

<script setup>
	//v
	import goodsSwiper from './components/goods-swiper.vue'
	import goodsNav from './components/goods-nav.vue'
	import goodsSku from './components/goods-sku.vue'
	import {
		ref,
		onMounted,
		nextTick
	} from "vue";
	import {
		getProductDetail,
		loveProduct,
		checkLoveProduct,
		cancelLoveProduct,
		addOverview,
		userClick
	} from '../../api/product.js'
	import {
		addToCar,
		deleteInCar,
		checkInCar
	} from '../../api/buy.js'
	import {
		useUserInfo
	} from '../../store/user.js'
	import {
		createOrder
	} from '/api/order.js'
	const props=defineProps({
		product_id:String
	})
	const store = useUserInfo()
	let goodsSkuRef = ref()
	const incar = ref()
	const hasLove = ref()
	const productData = ref({
		address: "",
		cate: '',
		price: '277',
		product_name: "",
		stock_status: true,
		product_id: ''
	})
	const showSku = () => {
		goodsSkuRef.value.showSku()
	}
	const closeSku = () => {
		goodsSkuRef.value.closeSku()
	}
	const goodsunlove=async()=>{
		const res=await cancelLoveProduct({
			user_id: store.user_id,
			product_id: productData.value.product_id
		})
		//console.log(res)
		if (res.data.message == '取消收藏成功') {
			uni.showToast({
				title: '取消收藏成功',
				icon: 'none'
			})
			hasLove.value = false;
		} else {
			uni.showToast({
				title: '取消收藏失败',
				icon: 'none'
			})
		}
	}
	const goodsLove = async () => {

		const res = await loveProduct({
			user_id: store.user_id,
			product_id: productData.value.product_id
		})
		//console.log(res)
		if (res.data.message == '收藏成功') {
			uni.showToast({
				title: '收藏成功，已加入收藏夹',
				icon: 'none'
			})
			hasLove.value = true;
		} else {
			uni.showToast({
				title: '收藏失败',
				icon: 'none'
			})
		}
	}
	const goodsAdd = async () => {
		if (!productData.value.stock_status) {
			uni.showToast({
				title: '暂无货源！',
				mask: true,
				icon: 'none'
			});
		} else {
			if (incar.value) {
				uni.showToast({
					title: '已加入购物车',
					mask: true,
					icon: 'none'
				})
			} else {
				const res = await addToCar({
					user_id: store.user_id,
					product_id: props.product_id
				})
				if (res.data.message == "添加成功") {
					uni.showToast({
						title: '添加成功，在购物车等亲!',
						mask: true,
						icon: 'none'
					});
					incar.value = true;
					uni.$emit('updateCar')
				} else {
					uni.showToast({
						title: '添加失败',
						mask: true,
						icon: 'none'
					});
				}
				//加入购物车
			}
		}
	}

	const toOrder = async () => {
		//直接创建订单
		const res = await createOrder({
			user_id: store.user_id,
			product_id: productData.value.product_id,
			price: productData.value.price
		})
		console.log(res.data)
		let stop = false
		if (res.data.message == '创建成功') {
			if (incar.value) {
				//在车里需要从车里删掉
				const carRes = await deleteInCar({
					user_id: store.user_id,
					product_id: productData.value.product_id
				})
				if (carRes.data.message == '删除成功') {
					console.log('已从车里删除')
					incar.value = false
				} else {
					console.log('从车里删除失败，无法创建订单')
					stop = true;
				}
			}
			if (!stop) {
				//console.log('弹出')
				closeSku()
				uni.$emit('updateProduct')
				uni.showModal({
					title: '支付', // 弹窗标题
					content: '订单已创建，是否前往支付', // 弹窗内容
					showCancel: true, // 是否显示取消按钮，默认为 true
					cancelText: '取消', // 取消按钮的文字，默认为'取消'
					confirmText: '确定', // 确定按钮的文字，默认为'确定'
					success: function(res) {
						if (res.confirm) {
							uni.navigateTo({
								url: '/pages/order/order'
							})
						} else if (res.cancel) {
							uni.showToast({
								title: '等待支付中',
								icon: 'none'
							});
						}
					}
				});
			}

		}
	}
	const goodsTapPay = () => {
		if (!productData.value.stock_status) { //没货
			uni.showToast({
				title: '暂无货源！',
				mask: true,
				icon: 'none'
			});
		} else {
			goodsSkuRef.value.showSku()
		}
	}
	const getDetail = async () => {
		const product_id = props.product_id;
		productData.value.product_id = product_id;
		//console.log(productData.value)
		const res = await getProductDetail({
			product_id: product_id
		})
		console.log(res.data)
		productData.value = res.data
	}
	const checkInOrnot = async () => {
		const res = await checkInCar({
			user_id: store.user_id,
			product_id: props.product_id
		})
		if (res.data.message == '已加入') {
			incar.value = true
		} else {
			incar.value = false
		}

		//console.log(incar.value)
		console.log(res.data)
	}
	const checkLoveOrNot = async () => {
		const res = await checkLoveProduct({
			user_id: store.user_id,
			product_id:props.product_id
		})
		if (res.data.message == '已收藏') {
			hasLove.value = true;
		} else {
			hasLove.value = false;
		}
	}
	const overviewAdd=async()=>{
		const res=await addOverview({
			product_id:props.product_id
		})
		console.log(res.data.message)
	}
	const userclick=async()=>{
		const res = await userClick({
			user_id: store.user_id,
			product_id:props.product_id
		})
		console.log(res.data.message)
	}
	onMounted(() => {
		console.log(store.user_id)
		console.log(props.product_id)
		getDetail()
		checkInOrnot()
		checkLoveOrNot()
		overviewAdd()
		userclick()
	})
</script>

<style lang="scss" scoped>
	.price_detail {
		display: flex;
		justify-content: space-between;
	}

	page {
		background-color: #f8f8f8;
	}

	.goods_title {
		padding: 0 32rpx;
	}

	.price_color {
		color: #FAAD14;
		background: linear-gradient(360deg, #FF3636 0%, #FF6600 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}

	.goods_item_box {
		padding: 20rpx 32rpx;
	}

	.goods_item_cla {
		margin-right: 16rpx;
	}

	.goods_item_icon {
		width: 12rpx;
		height: 24rpx;
	}

	.bb_title {
		padding: 24rpx 0;

		text {
			margin: 0 16rpx;
		}

		view {
			width: 100rpx;
			height: 2rpx;
		}
	}

	.store_data {
		display: flex;
		justify-content: space-around;
		align-items: center;
	}
</style>