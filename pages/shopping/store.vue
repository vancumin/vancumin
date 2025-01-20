<template>
	<view>
		<goodsDetails :product_id="props.product_id"></goodsDetails>
	</view>
</template>

<script lang="ts" setup>
	import goodsDetails from '/component/goodsDetails/goodsDetails.vue'
	const props=defineProps({
		product_id:String
	})
</script>

<style>

</style>