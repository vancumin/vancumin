<template>
	<view v-if="!type ||type== '' " class="flexr-jsa flex-aic font_28 color_333">
		<view v-for="(item,index) in columns" @click="tapBtn(item,index)">
			<text :class="modelValue == index ? 'font_bold color_ff7000' : ''">{{item.title || item[rangeKey]}}</text>
			<view v-show="tabLine" class="line_box" :class="modelValue == index ? 'line_active' : ''"></view>
		</view>
	</view>
	<template v-else>
		<scroll-view class="font_28 color_333" style="white-space: nowrap;width: 100%;height: 56rpx;" scroll-x>
			<template v-for="(item,index) in columns">
				<view @click="tapBtn(item,index)" style="height: 56rpx;display: inline-block;padding:0 32rpx;">
					<view>
						<text :class="modelValue == index ? 'font_bold color_ff7000' : ''">{{item.title || item[rangeKey]}}</text>
						<view v-show="tabLine" class="line_box" :class="modelValue == index ? 'line_active' : ''"></view>
					</view>
				</view>
			</template>
		</scroll-view>
	</template>
</template>

<script setup>
	import {
		ref,
		watch,
		watchEffect
	} from 'vue'
	let props = defineProps({
		columns: {
			type: Array,
			default: []
		},
		modelValue: {
			type: Number,
			default: 0
		},
		index: {
			type: Number,
			default: 0
		},
		type: {
			type: String,
			default: ''
		},
		rangeKey: {
			type: String,
			default: 'title'
		},
		tabLine: {
			type: Boolean,
			default: true
		}
	})
	const activeIndex = ref(props.index)
	const emit = defineEmits(['change','update:modelValue'])
	watch(props, (newProps, oldProps) => {
		   //activeIndex.value = newProps.index
		   //emit('change', props.columns[newProps.index])
	    });
	watchEffect(() => {
		 //activeIndex.value = props.index
		// emit('change', props.columns[props.index])
	})
	const tapBtn = (value, index) => {
		if(activeIndex.value == index) return
		activeIndex.value = index
		//emit('change', value)
		emit('update:modelValue', index)
	}
</script>

<style lang="scss">
	.line_box {
		width: 0rpx;
		height: 8rpx;
		margin: 6rpx auto 0;
		background-color: #fe5572;
		border-radius: 5rpx;
		transition: all 0.2s;
	}

	.line_active {
		width: 100%;
	}
</style>
