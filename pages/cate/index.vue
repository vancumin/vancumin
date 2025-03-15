<template>
	<view>
		<view>
			<view
				style="top:0;left: 0;width: 750rpx;height: 88rpx;background-color: #fff;padding-top: 24rpx;margin:12rpx 0"
				class=" flexr-jsc flex-aic boxs_bb">
				<view style="width: 600rpx;
				height: 68rpx;">
					<uni-easyinput v-model="input" placeholder="请输入" suffixIcon="search" @iconClick="onSearch" />
				</view>
			</view>
		</view>
		<uni-section titleFontSize="18px" :title="subTitle" type="line" v-if='productTable.length>0'></uni-section>
		<productList :productTable="productTable" v-if="!needSp"></productList>
		<spProductList :productTable="productTable" v-if="needSp"></spProductList>
	</view>
</template>

<script lang="ts" setup>
	import {
		useRoute
	} from 'vue-router'
	import { ref, onMounted } from 'vue'
	import productList from '/component/product/productList.vue'
	import spProductList from '../../component/product/spProductList'
	import { searchProduct, cateProduct, getProduct,getSpProduct } from '../../api/product';
	import { onPullDownRefresh } from '@dcloudio/uni-app'
	const props=defineProps({
		tag:String,
		cate:String
	})
	const searchTag = ref();
	const searchCate = ref();
	const productTable = ref([])
	const input = ref('')
	const subTitle = ref('')
	const needSp=ref(false)
	const getTag = async () => {
		searchTag.value = props.tag;
		searchCate.value = props.cate;
		console.log(searchTag.value)
		console.log(searchCate.value)
		if (searchTag.value != undefined) {
			//console.log('搜索')
			needSp.value=false;
			input.value = searchTag.value
			const res = await searchProduct({ tag: searchTag.value })
			console.log(res)
			productTable.value = res.data
			subTitle.value = '找到' + productTable.value.length + '件商品'
		}
		if (searchCate.value != undefined) {
			//console.log('分类')
			needSp.value=false;
			input.value = searchCate.value
			const res = await cateProduct({ cate: searchCate.value })
			console.log(res)
			productTable.value = res.data
			subTitle.value = searchCate.value
		}
		if (searchTag.value == undefined && searchCate.value == undefined) {
			//说明是自然进入,需要推荐
			needSp.value=true;
			const res = await getSpProduct()
			console.log(res.data)
			productTable.value = res.data
			subTitle.value = '商品列表'
		}
	}
	onPullDownRefresh(() => {
	  // 模拟数据刷新
	  setTimeout(() => {
	    // 调用获取窗口数据的函数来刷新数据
	    getTag()
	    console.log('数据已刷新');
	    // 停止下拉刷新动画
	    uni.stopPullDownRefresh();
	  }, 1000);
	});
	const onSearch = () => {
		//console.log(input.value)
		if (input.value == '') {
			uni.reLaunch({
				url: '/pages/cate/index'
			})
		} else {
			uni.reLaunch({
				url: '/pages/cate/index?tag=' + input.value
			})
		}

	}
	onMounted(() => {

		getTag()
	})
</script>

<style>

</style>