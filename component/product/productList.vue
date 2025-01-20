<template>
	<div v-if="props.productTable.length>0">
		<div class="recommend-view">
			<uni-card v-for="(item,index) in currentProductTable" :is-shadow="false" class="recommend-card"
				style="margin: 10rpx;" @click="todetail(item.product_id)">
				<image :src="item.image_url" mode="scaleFill" class="card-pic"></image>
				<p class="font_28 product_name">{{item.product_name}}</p>
				<view class="card_detail">
					<text class="font_40 m_r_12">￥{{item.price}}</text>
					<uni-tag :text="item.product_cate" :custom-style="tagColor(item.product_cate)"></uni-tag>
				</view>
			</uni-card>
		</div>
		<div class="flex_center_center" style="height:50px">
			<uni-pagination style="width:70%" :total="props.productTable.length" :page-size="PageSize" title="标题文字" class="vanpage" 
			@change="getCurrentproduct" prev-text="上一页" next-text="下一页"/>
		</div>
	</div>

	<div v-if="props.productTable.length==0" class="empty-view">
		<image src="/static/assets/png/no_product.png"></image>
		<text class="empty-text font_40">没有找到...</text>
	</div>
</template>

<script lang="ts" setup>
	//
	import { ref, onMounted,nextTick,watch } from 'vue'
	const empty = ref(false)//记录初始化的分页列表是否放入
	const current=ref(1)
	const PageSize=ref(16)
	let props = defineProps({
		productTable: {
			type: Array,
		}
	})
	const currentProductTable=ref([])
	const tagColor=(cate)=>{
		 if (cate === '教辅资料') {
		        return 'background-color: #66a3ff; border-color:#66a3ff; color: #fff;';
		      } else if (cate === '运动资料') {
		        return 'background-color: #4335d6; border-color: #4335d6; color: #fff;';
		      } 
			  else if (cate === '电子设备') {
			    return 'background-color:  #00ffff; border-color:  #00ffff; color: #fff;';
			  }
			  else if (cate === '生活用品') {
			    return 'background-color: #ff3333; border-color: #ff3333; color: #fff;';
			  }
			  else if (cate === '衣物饰品') {
			    return 'background-color: #ff66d9; border-color: #ff66d9; color: #fff;';
			  }
			  else if (cate === '代步工具') {
			    return 'background-color: #ffd633; border-color: #ffd633; color: #fff;';
			  }
			  else if (cate === '运动器材') {
			    return 'background-color:  #00ff00; border-color:  #00ff00; color: #fff;';
			  }
			  else {
		        return 'background-color:  #808080; border-color: #808080; color: #fff;';
		      }
	}
	const todetail = (id) => {
		//console.log(id)
		uni.navigateTo({
			url: '/pages/shopping/store?product_id=' + id
		})
	}
	const getCurrentproduct=(e)=>{
		console.log(e)
		current.value=e.current;
		const start=(e.current-1)*PageSize.value;
		const end=e.current*PageSize.value;
		currentProductTable.value=props.productTable.slice(start,end);
	}
	watch(
	  () => props.productTable,
	  (newProductTable, oldProductTable) => {
	    if (newProductTable) {
	      // 这里是原本在 onMounted 中执行的逻辑
	      // 例如：对 productTable 进行一些操作
		  const start=(current.value-1)*PageSize.value;
		  const end=current.value*PageSize.value;
		  currentProductTable.value=props.productTable.slice(start,end);
	      // 假设你有一个变量 dependentVariable 依赖于 productTable
	    }
	  },
	  { immediate: true }
	);
	onMounted(()=>{
		setTimeout(()=>{
			currentProductTable.value=props.productTable.slice(0,PageSize.value);
		},500)
	})
</script>

<style scoped>
	.empty-text {
		color: #00cc44;
		font-weight: 800;
	}
	
	.recommend-view {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		background-color: #f2f2f2;
	}

	.recommend-card {
		width: 42%;
		height: 28vh;
		min-width: 40%;
		max-width: 45%;
		padding: 1rpx 1rpx !important;
	}
	.product_name{
		white-space: nowrap;
		 overflow: hidden; 
		 text-overflow: ellipsis;
	}
	.card-pic {
		width: 95%;
		height: 18vh;
	}

	.card_detail {
		color: #ff3333;
		display: flex;
		padding: 0 !important;
		justify-content: space-between;
	}
	.vanpage{
		
		width:40%;
	}
</style>