<template>
	<view>
		<orderDetails :order_id="props.order_id" :status="props.status"></orderDetails>
	</view>
</template>

<script lang="ts" setup>
	import orderDetails from "/component/order/orderDetails.vue"
	const props=defineProps({
		order_id:String,
		status:String
	})
</script>

<style>

</style>
