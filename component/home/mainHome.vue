<template>
	<view class="homepage">
		<view class="people">

			<view class="info">
				<view class="nick">
					<text>{{userData.account}}</text>
					<view class="sex">
						<div class="sex-logo-male flex_center_center"  v-if="userData.sex=='男' " >
							<SvgIcon icon-name="nanxing" size="23" ></SvgIcon>
						</div>
						<div class="sex-logo-female flex_center_center" v-if="userData.sex=='女' ">
							<SvgIcon icon-name="nvxing"   size="23" class='sex-logo-female'></SvgIcon>
						</div>
					</view>
				</view>
				<view class="grade ">
					<view class='flexc'>
						<text>
							{{userData.name}}
						</text>
						<text style="font-size: 28rpx;">
							{{userData.telephone}}
						</text>
					</view>
				</view>
			</view>
			<view class="headImg">
				<image :src="userData.avatar_url" class="avtar_img store_avatar user_border"></image>
			</view>
		</view>
		<view class="infos">
			<view class="tool">
				<view @click="toOrder(1)">
					<SvgIcon icon-name="liulanjilu" size="52"> </SvgIcon>
					<text>待付款</text>
				</view>
				<view @click="toOrder(2)">
					<SvgIcon icon-name="lishidingdan" size="50"> </SvgIcon>
					<text>待发货</text>
				</view>
				<view @click="toOrder(3)">
					<SvgIcon icon-name="author" size="52"> </SvgIcon>
					<text>待收货</text>
				</view>
				<view @click="toOrder(4)">
					<SvgIcon icon-name="qianbao" size="52"> </SvgIcon>
					<text>退款/售后</text>
				</view>
			</view>
			<view class="set flex_left_center">
				<view @click="toDataForm">
					<SvgIcon icon-name="author" size="25"> </SvgIcon>
					<text>用户信息</text>
				</view>
				<view class=" color_333 "></view>
				<view @click='tomyProduct'>
					<SvgIcon icon-name="dianpu" size="25"> </SvgIcon>
					<text>我的商品</text>
				</view>
				<view class=" color_333 "></view>
				<view @click='toLove'>
					<SvgIcon icon-name="shoucang" size="25"> </SvgIcon>
					<text>我的收藏</text>
				</view>
				<view class=" color_333 "></view>
				<view @click="tologin">
					<SvgIcon icon-name="fanhui" size="25"> </SvgIcon>
					<text>退出登录</text>
				</view>
			</view>
		</view>

	</view>
</template>

<script lang="ts" setup>
	import { ref, onMounted } from 'vue'
	import SvgIcon from '/component/sp/SvgIcon'
	import { useUserInfo } from '../../store/user.js'
	
	
	const store = useUserInfo()
	const userData = ref({
		account: '',
		avatar_url: '',
		name: '',
		sex: '',
		telephone: '',
	})
	const toDataForm = () => {
		uni.navigateTo({
			url: '/pages/user/userinfo'
		});
	}
	const tomyProduct=()=>{
		uni.navigateTo({
			url: '/pages/myproduct/myproduct'
		});
	}
	const toOrder = (index) => {
		uni.navigateTo({
			url: '/pages/order/order?tabIndex=' + index
		});
	}
	const toLove=()=>{
		uni.navigateTo({
			url: '/pages/user/love' 
		});
	}
	const tologin = () => {
		store.clearStore()
		uni.redirectTo({
			url: '/pages/user/login'
		});
	}
	const getData = () => {
		userData.value.account = store.account;
		userData.value.avatar_url = store.avatar_url;
		userData.value.name = store.name;
		userData.value.telephone = store.telephone;
		userData.value.sex = store.sex;
	}
	onMounted(() => {
		console.log(store.user_id)
		getData();
		console.log(userData.value)
	})

</script>

<style lang="scss" scoped>
	.homepage {
		width: 100%;
		height: 1624rpx;
		background: linear-gradient(1deg, #e5fff2 0%, #ccffdd 68%, #e5fff2 100%);

		& text {
			color: #333333;
			font-family: PingFangSC-Semibold, PingFang SC;
		}

		.bar {
			.right {
				display: flex;

				& view {
					width: 52rpx;
					height: 52rpx;
					margin-left: 26rpx;
					border-radius: 15rpx;
					background: #F0EEFF;
					display: flex;
					justify-content: center;
					align-items: center;
					box-shadow: 0rpx -2rpx 2rpx 4rpx rgba(255, 255, 255, 0.5000), 0rpx 4rpx 4rpx 0rpx rgba(197, 183, 211, 0.5000), inset 0rpx 2rpx 6rpx 0rpx rgba(255, 255, 255, 0.5000);

					>image {
						width: 32rpx;
						height: 32rpx;
					}
				}
			}
		}

		.people {
			padding: 0 42rpx 28rpx 32rpx;
			display: flex;
			align-items: center;

			.headImg {
				margin: 50rpx 20rpx 10rpx 20rpx;

				>image {
					width: 166rpx;
					height: 166rpx;
					border-radius: 83rpx;
				}
			}

			.info {
				flex: 1;
				margin: 50rpx 20rpx 10rpx 20rpx;

				.nick {
					display: flex;

					>text {
						font-size: 80rpx;
						font-weight: 600;
						color: #fff;
							
						line-height: 60rpx;
						text-shadow: 0rpx 2rpx 10rpx rgba(0, 0, 0, 0.5000);
					}
					
					.sex-logo-female{
						background-color: #ff66ff;
						border-radius: 50%;
						width:32px;
						height:32px;
						margin:0 15rpx;
					}
					.sex-logo-male{
						background-color: #4d4dff;
						border-radius: 50%;
						width:32px;
						height:32px;
						margin:0 15rpx;
					}

				}
				
				
				.grade {
					display: flex;
					align-items: center;
					padding: 0 20rpx;

					>view {
						display: flex;
						margin-bottom: 12rpx;

						& text {
							font-size: 35rpx;
							font-weight: 400;
							color: #f000000;
							line-height: 60rpx;
						}

						& image {
							width: 28rpx;
							height: 30rpx;
						}

						&:last-child {
							>image {
								width: 40rpx;
								height: 40rpx;
							}

							>text {
								margin-left: -6rpx;
							}
						}
					}
				}

				.userId {
					width: 220rpx;
					display: flex;
					background: #F5F5FF;
					border-radius: 8rpx;
					box-shadow: 0rpx 2rpx 6rpx 0rpx rgba(0, 0, 0, 0.1400), 0rpx -4rpx 6rpx 0rpx #FFFFFF;

					>image {
						width: 36rpx;
						height: 40rpx;
					}

					.number {
						flex: 1;
						display: flex;
						justify-content: center;

						>text {
							font-size: 24rpx;
							font-weight: 600;
							line-height: 40rpx;

							&:last-child {
								font-weight: 500;
								font-size: 22rpx;
								margin-left: 8rpx;
							}
						}
					}
				}
			}

			.space {
				display: flex;
				align-items: center;

				>text {
					font-size: 28rpx;
					line-height: 40rpx;
				}
			}
		}

		.list {
			width: 100%;
			display: flex;
			padding: 0 44rpx;
			box-sizing: border-box;

			.item {
				width: 25%;
				display: flex;
				justify-content: space-evenly;
				align-items: center;

				.text {
					display: flex;
					flex-direction: column;
					align-items: center;

					>text:first-child {
						font-size: 36rpx;
						font-family: CloudHeiChaoGBK;
						line-height: 48rpx;
						font-weight: 600;
					}

					>text:last-child {
						font-size: 24rpx;
						color: #999999;
						line-height: 34rpx;
					}
				}
			}
		}

		.infos {
			padding: 0 40rpx;

			.open-vip {
				width: 100%;
				height: 72rpx;
				background: linear-gradient(180deg, #F7E5B4 0%, #FFE6AF 2%, #EBC075 100%);
				border-radius: 49rpx;
				display: flex;
				align-items: center;
				margin-top: 36rpx;
				padding: 0 24rpx 0 34rpx;
				box-sizing: border-box;

				>image {
					width: 48rpx;
					height: 48rpx;
				}

				.text {
					flex: 1;
					font-size: 24rpx;
					line-height: 34rpx;
					margin-left: 14rpx;
				}

				.button {
					width: 128rpx;
					height: 42rpx;
					background: linear-gradient(90deg, #4D4D4D 0%, #151515 100%);
					border-radius: 22rpx;
					font-size: 22rpx;
					color: #FFDFA9;
					line-height: 42rpx;
					text-align: center;
				}
			}

			.tool {
				display: flex;
				width: 100%;
				height: 180rpx;
				background: #FFFFFF;
				box-shadow: 0rpx 2rpx 22rpx 0rpx rgba(114, 118, 206, 0.2700);
				border-radius: 16rpx;
				justify-content: space-evenly;
				margin: 36rpx 0;
				padding-top: 16rpx;

				>view {
					display: flex;
					flex-direction: column;
					justify-content: center;
					& text {
						font-size: 25rpx;
						font-weight: 600;
						color: #666666;
						line-height: 32rpx;
						text-shadow: 0rpx 4rpx 14rpx rgba(222, 148, 247, 0.6000);
						text-align: center;
						margin: 10rpx 0;
					}

					& image {
						width: 98rpx;
						height: 96rpx;
						margin-top: 10rpx;
					}
				}
			}

			.set {
				width: 100%;
				padding: 34rpx 24rpx 24rpx 34rpx;
				background: #FFFFFF;
				box-shadow: 0rpx 2rpx 28rpx 0rpx rgba(142, 146, 230, 0.2700);
				border-radius: 16rpx;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				box-sizing: border-box;

				>view {
					display: flex;
					align-items: center;
					margin-bottom: 25rpx;
					width: 95%;

					& text {
						flex: 1;
						font-size: 36rpx;
						line-height: 40rpx;
						margin-left: 30rpx;
						margin-top: 5rpx;
					}

					.icon {
						width: 36rpx;
						height: 36rpx;
					}

					.right {
						width: 40rpx;
						height: 40rpx;
					}
				}
			}

			.service {
				background: #FFFFFF;
				box-shadow: 0rpx 2rpx 28rpx 0rpx rgba(142, 146, 230, 0.2700);
				border-radius: 28rpx;
				margin-top: 26rpx;
				padding: 34rpx 24rpx 44rpx 34rpx;
				display: flex;
				flex-direction: column;
				justify-content: space-between;

				>view {
					display: flex;
					align-items: center;
					margin-bottom: 40rpx;

					& text {
						flex: 1;
						font-size: 28rpx;
						line-height: 40rpx;
						margin-left: 30rpx;
					}

					.icon {
						width: 36rpx;
						height: 36rpx;
					}

					.right {
						width: 40rpx;
						height: 40rpx;
					}

				}
			}
		}

	}

	.user_border {
		border: 2px solid #9494b8;
	}
</style>