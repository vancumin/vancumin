<template>
	<swiper class="swiper" >
		<swiper-item class='flex_center_center flex-fww cate_bg'>
			<view  v-for="item in cateTable" class=" flexc-aic cate-card" @click="toCate(item.title)" >
				<SvgIcon :icon-name="item.name" size="32"> </SvgIcon>
				<text>{{item.title}}</text>
			</view>
			
		</swiper-item>
	</swiper>
	
</template>

<script setup>
//<SvgIcon iconName="buxihuan"></SvgIcon>
	import vanGrid from '/component/sp/vanGrid.vue'
	import SvgIcon from '/component/sp/SvgIcon'
	import {
		ref
	} from 'vue'
	const cateTable = ref([
	  { title: "教辅资料",name:'shuben' },
	  { title: "运动器材",name:'yaling' },
	  { title: "电子设备",name:'diannao' },
	  { title: "生活用品",name:'shenghuo' },
	  { title: "衣物饰品",name:'yifu' },
	  { title: "代步工具",name:'zixingche' },
	  { title: "其他",name:'zawu' }
	])
	const toCate=(cate)=>{
		console.log(cate)
		uni.reLaunch({
			url:'/pages/cate/index?cate='+cate
		})
	}
	const onSearch = () => {
		//console.log(input.value)
		uni.reLaunch({
			url:'/pages/cate/index?tag='+input.value
		})
	}
</script>

<style lang="scss" scoped>
	.cate-card{
		width:150rpx;
		height:80rpx;
		margin:15rpx 10rpx;
	}
	.cate_bg{
		
	}
</style>