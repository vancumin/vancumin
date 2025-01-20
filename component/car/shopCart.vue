<template>
	<view class='carpage'>
		<view v-if="cartList.length" class="shop-cart" v-for="(item, index) in cartList" :key="item[selectKey]">
			<uni-icons class="delete-icon" @click="handleCartDelete(index)" type="clear" size="60rpx"></uni-icons>
			<view class="shop-info">
				<view class="checkbox" @click="handleTriggerSelect(item)"
					:class="selectCartList.includes(item[selectKey]) ? 'selected':''">
					<uni-icons class="selected-icon" v-if="selectCartList.includes(item[selectKey])"
						type="checkmarkempty" size="28rpx"></uni-icons>
				</view>
				<image mode="aspectFill" class="shop-image" :src="item.image_url" @click="handleToDetail(item)">
				</image>
			</view>
			<view class="basic">
				<view class="shop-name" @click="handleToDetail(item)">{{item.product_name}}</view>
				<view class="tag-list flexr-jsb flex-aic">
					<uni-tag :text="item.product_cate" inverted type="primary"></uni-tag>
					<view>
						<text>{{item.account}}</text>
						<image class='store_avatar  avatar_img' :src=item.avatar_url
							style="width:60rpx;height:60rpx;border:0.2px solid #f2f2f2;margin: 0 10rpx;"></image>
					</view>
				</view>
				<view class="basic-footer">
					<text style="font-weight: 200;">{{item.address}}</text>
					<view class="price-content">
						<view class="unit">￥</view>
						<view class="price">{{(item.price).toFixed(2) || '--'}}</view>
					</view>
				</view>
			</view>
		</view>
		<view v-if="!cartList.length" class="empty">
			<image mode="widthFix" class="empty-image" src="./empty.png"></image>
			<view class="empty-text">购物车空空如也</view>
		</view>
		<view class="cart-footer">
			<view class="cart-select" @click="handleTrigerSelectAll">
				<template v-if="cartList.length">
					<view class="checkbox" :class="selectedAll ? 'selected' : ''">
						<uni-icons v-if="selectedAll" class="selected-icon" type="checkmarkempty"
							size="28rpx"></uni-icons>
					</view>
					全选
				</template>
			</view>
			<view class="cart-button">
				合计:
				<view class="price-content">
					<view class="unit">￥</view>
					<view class="price">{{(selectedPrice).toFixed(2)}}</view>
				</view>
				<view class="cart-submit" @click="handleSubmit">提交订单</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		watch,
		ref,
		defineProps,
		defineEmits,
		onMounted
	} from 'vue';

	// 定义props
	const props = defineProps({
		cartList: {
			type: Array,
			default: () => []
		},
		selectCartList: {
			type: Array,
			default: () => []
		},
		selectKey: {
			type: String,
			default: 'product_id'
		}
	});

	// 定义emits
	const emit = defineEmits(['operateCount', 'triggerSelect', 'triggerSelectAll', 'toDetail', 'cartDelete', 'submit']);

	// 定义响应式数据
	const selectedAll = ref(false);
	const selectedPrice = ref(0);

	// 监听selectCartList的变化
	watch(() => props.selectCartList, () => {
		calculatePrice();
	}, {
		deep: true
	});
	// 定义方法
	function handleOperateCount(params) {
		emit('operateCount', params);
	}

	function handleTriggerSelect(item) {
		emit('triggerSelect', item);
	}

	function handleTrigerSelectAll(item) {
		emit('triggerSelectAll', selectedAll.value);
	}

	function handleToDetail(item) {
		emit('toDetail', item);
	}

	function handleCartDelete(index) {
		emit('cartDelete', index);
	}

	function handleSubmit() {
		emit('submit', selectedPrice.value);
	}
	defineExpose({
		calculatePrice,
	});

	function calculatePrice() {
		let price = 0;
		const len = props.cartList.length;
		const selectedList = props.cartList.filter(item => props.selectCartList.includes(item[props.selectKey]));
		selectedPrice.value = selectedList.reduce((price, item) => {
			return price + item.price;
		}, 0);
		selectedAll.value = len && len === props.selectCartList.length;
	}
	onMounted(() => {

	})
</script>

<style lang="scss" scoped>
	.carpage {
		height: 120vh;
		padding: 20rpx 0;
		background-color: aliceblue;
	}

	.checkbox {
		display: flex;
		justify-items: center;
		align-items: center;
		width: 32rpx;
		height: 32rpx;
		border: 2rpx solid rgba(0, 0, 0, 0.6);
		border-radius: 50%;
		margin: 0 24rpx 0 8rpx;

		&.selected {
			padding: 2rpx;
			border: none;
			background: linear-gradient(to right, #FEEF3C, #F3CD34);

			.selected-icon {
				margin: 2rpx;
				color: #fff !important;
			}
		}
	}

	.price-content {
		display: flex;
		align-items: flex-end;
		color: rgb(225, 76, 68);
		font-weight: 600;

		.unit {
			font-size: 24rpx;
		}

		.price {
			font-size: 36rpx;
		}
	}

	.shop-cart {
		width: 718rpx;
		background: #fff;
		margin: 30rpx 16rpx;
		padding: 16rpx;
		box-sizing: border-box;
		border-radius: 16rpx;
		display: flex;
		position: relative;

		//border: 1px solid gray;
		.delete-icon {
			position: absolute;
			top: -15rpx;
			right: -15rpx;
			color: #df3e36 !important;
		}

		.shop-info {
			display: flex;
			align-items: center;

			.shop-image {
				width: 160rpx;
				height: 160rpx;
				border-radius: 12rpx;
			}
		}

		.basic {
			flex: 1;
			display: flex;
			flex-direction: column;
			padding: 0 16rpx;

			.shop-name {
				font-size: 32rpx;
			}

			.tag-list {
				margin-top: 8rpx;
			}

			.basic-footer {
				display: flex;
				justify-content: space-between;

				.cart-num {
					display: flex;

					.count {
						width: 80rpx;
						text-align: center;
					}

					.symbol {
						display: flex;
						align-items: center;
						justify-content: center;
						width: 30rpx;
						height: 30rpx;
						background: rgb(240, 240, 240);
					}
				}
			}
		}
	}

	.empty {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 750rpx;

		.empty-image {
			width: 600rpx;
			margin-top: 48rpx;
		}

		.empty-text {
			text-align: center;
			color: rgba(0, 0, 0, .4);
		}
	}

	.cart-footer {
		position: fixed;
		bottom: 0px;
		background: #fff;
		width: 702rpx;
		padding: 24rpx;
		box-sizing: border-box;
		left: 24rpx;
		border-radius: 16rpx;
		display: flex;
		justify-content: space-between;

		.cart-select {
			display: flex;
			align-items: center;
		}

		.cart-button {
			display: flex;
			align-items: center;

			.cart-submit {
				margin-left: 24rpx;
				background: linear-gradient(to right, #FEEF3C, #F3CD34);
				border-radius: 60rpx;
				height: 60rpx;
				width: 150rpx;
				display: flex;
				justify-content: center;
				align-items: center;
			}
		}
	}
</style>