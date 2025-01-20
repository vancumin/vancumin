<template>
	<div class="homepage">
		<div class="main-background">
			<div class="search-bar">
				<uni-easyinput v-model="input" placeholder="请输入" suffixIcon="search" @iconClick="onSearch" />
			</div>
			<div style="height:15px"></div>
		</div>
		<cateList></cateList>
		<div style="height: 5px;background-color: #fff;margin:5px 0"></div>
		<div class="lately-swiper">
			<swiper indicator-dots="true" autoplay="true" interval="3000" duration="300" height="18vh">
				<swiper-item v-for="item in swiperTable" :key="item" class="flexr-jsc flex-aic"
					@click="toDetail(item.product_id)">
					<image :src="item.image_url" mode="scaleToFill" class="card-pic"></image>
				</swiper-item>
			</swiper>
		</div>
		<uni-section titleFontSize="18px" title="猜你喜欢" type="line" >
			<template v-slot:decoration>
				<view class="decoration"></view>
			</template>
		</uni-section>
		<productList :productTable="productTable"></productList>
	</div>


</template>

<script setup>
	import SvgIcon from '../../component/sp/SvgIcon'
	import productList from '../../component/product/productList'
	import cateList from '/component/product/cateList.vue'
	import {
		onMounted,
		ref,
		onBeforeUnmount
	} from 'vue'
	import {
		getProduct,
		getSwiper
	} from '/api/product.js'

	const input = ref('')
	const productTable = ref([])
	const swiperTable = ref([])

	const getProductList = async () => {
		const res = await getProduct()
		//console.log(res)
		productTable.value = res.data
		//console.log('商品')
		console.log(res.data)

	}
	const getSwiperList = async () => {
		const res = await getSwiper()
		swiperTable.value = res.data
	}
	const onSearch = () => {
		//console.log(input.value)
		uni.reLaunch({
			url: '/pages/cate/index?tag=' + input.value
		})
	}
	const toDetail = (id) => {
		//console.log(id)
		uni.navigateTo({
			url: '/pages/shopping/store?product_id=' + id
		})
	}
	onMounted(() => {
		getProductList()
		getSwiperList()
		uni.$on('updateProduct', () => {
			getProductList()
		})
	})
	onBeforeUnmount(() => {
		// 在 unMounted 时使用 uni.$off 解除监听
		uni.$off('updateProduct', () => {
			getProductList()
		});
	})
</script>

<style scoped>
	.decoration {
		width: 6px;
		height: 6px;
		margin-right: 4px;
		border-radius: 50%;
		background-color: $uni-success;
	}

	.search-bar {
		display: flex;
		justify-content: center;
		width: 70%;
	}

	.main-background {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		background-image: url('../../static/assets/png/main-back.png');
		background-position: center;
		background-size: 90%;
		height: 10vh
	}



	.lately-swiper {
		width: 100%;
	}
</style>