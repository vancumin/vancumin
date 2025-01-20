<template>
    <div :style="{ width: size + 'px', height: size + 'px' }">
		<image :src="url" :style="{ width: size + 'px', height: size + 'px' }"></image>
    </div>
	

</template>
<script setup lang="ts">
import { computed,onMounted,ref } from 'vue';
const props = defineProps({
    iconName: {
        type: String,
        required: true
    },
    color: {
        type: String,
        default: ''
    },
    size: {
        type: [Number, String],
        default: 18
    }
})
const url = computed(() => `/static/assets/svg/${props.iconName}.svg`);
</script>


<style scoped>

</style>
