<template>

	<order :tab="props.tabIndex"></order>

</template>

<script lang="ts" setup>
	import { ref, onMounted,watch } from 'vue'
	import { useRoute } from 'vue-router'
	import order from "/component/order/order.vue"
	const route = useRoute();
	const props =defineProps({
		tabIndex:String
	})
	const index = ref(1);
	onMounted(() => {
		console.log(props.tabIndex)
		//index.value = Number(route.query.tabIndex);
	})

</script>

<style>

</style>