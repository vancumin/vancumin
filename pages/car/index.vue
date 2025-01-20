<template>
	<view>
		<shopCart ref="shopCartRef" :selectKey="selectKey" :cartList="cartList" :selectCartList="selectCartList"
			@triggerSelect="triggerSelect" @triggerSelectAll="triggerSelectAll" @toDetail="toDetail" @submit="submit"
			@cartDelete="cartDelete"></shopCart>
	</view>
</template>
<script setup>
	import {
		ref,
		reactive,
		onMounted,
		onBeforeUnmount
	} from 'vue';
	import shopCart from '/component/car/shopCart.vue'
	import {
		showCar,
		deleteInCar
	} from '/api/buy.js'
	import {
		payOrder,
		createOrder
	} from '/api/order.js'
	import {
		useUserInfo
	} from '../../store/user.js'
	const store = useUserInfo();
	const shopCartRef = ref(null)
	const selectKey = ref("product_id");
	const selectCartList = ref([]);
	const cartList = ref([{
			product_id: '1',
			product_name: '新款高端复古长袖国风棉麻衣裙',
			product_cate: '种类',
			price: 380,
			image_url: "https://mp-26700ea2-c458-4911-a841-ced4a32d3d98.cdn.bspapp.com/component/WechatIMG8.png"
		},	
	]);

	async function submit(price) {
		//前往结算
		const selectList = cartList.value.filter((item) => selectCartList.value.includes(item[selectKey.value]));
		console.log('-submit-', selectList);
		if (price <= 0) {
			uni.showToast({
				title: '请选择至少一件商品',
				icon: 'none'
			});
		} else {
			uni.showToast({
				title: '订单创建中...',
				icon: 'none'
			});
			for (let i = 0; i < selectList.length; i++) {				
			  const pid=selectList[i].product_id; // 同样假设每个元素都有product_id属性
			  const price=selectList[i].price;
			  const res = await createOrder({user_id: store.user_id,product_id: pid,price:price})
			  console.log(res.data)
			  if(res.data.message=='创建成功'){
				  const delete_res=await deleteInCar({user_id: store.user_id,product_id: pid,price:price})
			  }
			}
			getCar()
			//刷新购物车，把车中商品改为准备被支付的商品
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
							url:'/pages/order/order'
						})
					} else if (res.cancel) {
						uni.showToast({
							title: '等待支付中，取消请前往订单界面',
							icon: 'none'
						});
					}
				}
			});
		}
	}

	function toDetail(item) {
		//点击商品前往界面
		console.log('-toDetail-', item.product_id);
		const id = item.product_id;
		uni.navigateTo({
			url: '/pages/shopping/store?product_id=' + id
		})
	}

	const cartDelete = async (index) => {
		//从购物车拿走
		console.log(cartList.value[index])
		const pid = cartList.value[index].product_id
		const res = await deleteInCar({
			user_id: store.user_id,
			product_id: pid
		})
		console.log(res.data)
		if (res.data.message == '删除成功') {
			uni.showToast({
				title: '删除成功',
				icon: 'none'
			});
			cartList.value.splice(index, 1);
			shopCartRef.value.calculatePrice();
		} else {
			uni.showToast({
				title: '删除失败',
				icon: 'none'
			});
		}
	}

	function triggerSelect(item) {
		//点击修改选中状态
		const findIndex = selectCartList.value.findIndex(t => t === item[selectKey.value]);
		if (findIndex === -1) {
			selectCartList.value.push(item[selectKey.value]);
		} else {
			selectCartList.value.splice(findIndex, 1);
		}
	}

	function triggerSelectAll(selectAll) {
		//点击修改是否全选
		if (selectAll) {
			selectCartList.value = [];
		} else {
			selectCartList.value = cartList.value.map(item => item[selectKey.value]);
		}
	}
	const getCar = async () => {
		const res = await showCar({
			user_id: store.user_id
		})
		console.log(res.data)
		if(res.data.length>0){			
			cartList.value = res.data.map(item => {
				return {
					...item,
					price: Number(item.price) // 将price属性转换为数字
				};
			});
		}else{
			cartList.value=[]
		}
	}
	onMounted(()=>{
		getCar()
		uni.$on('updateCar',()=>{
			getCar()
		})
	})
	onBeforeUnmount(()=>{
	   // 在 unMounted 时使用 uni.$off 解除监听
	     uni.$off('updateCar', () => {
	          getCar()
	         });
	 }) 
</script>
<style lang="scss" scoped>
	page {
		background: rgb(246, 246, 246);
		padding-bottom: 150rpx;
	}
</style>