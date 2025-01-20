<template>
	<view>
		<mainHome></mainHome>
		
	</view>
</template>

<script setup lang="ts">
	import mainHome from '/component/home/mainHome'
	const tologin=()=>{
		uni.navigateTo({
		  url: '/pages/user/login'
		});
	}
</script>

<style>

</style>
