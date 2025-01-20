<template>
	<view class="flex flex-fww grid_box pos_r" style="margin-right: -1rpx;" :class="[bgc]">
		<template v-for="(item , index) in columns">
			<view @click="tabItem(item , index)" class="boxs_bb grid_item pos_r" :class="border ? 'grid_item_border' : ''" :style="{
				width: `calc(100% / ${columnNum})`,
				padding:columnPadding,
				...columnStyle
			}">
				<slot name="content" :item="item || {}" :index="index">
					<view class="tac font_32 font_bold">
						<slot name="icon" :item="item || {}" :index="index">
							<image style="width: 84rpx;height: 84rpx;vertical-align: middle;" :src="item.icon" mode=""></image>
						</slot>
					</view>
					<slot name="title" :item="item || {}" :index="index">
						<view class="tac font_24 color_333 text_nowrap" style="margin-top: 8rpx;">
							{{item.title || ''}}
						</view>
					</slot>
				</slot>
			</view>
		</template>
	</view>
</template>

<script setup>
	let props = defineProps({
		bgc: {
			type: String,
			default: 'bgc_fff'
		},
		columns: {
			type: Array,
			default: () => {
				return []
			}
		},
		columnStyle: {
			type: Object,
			default: {}
		},
		border: {
			type: Boolean,
			default: true
		},
		borderColor: {
			type: String,
			default: '#B7BED0'
		},
		columnPadding: {
			type: String,
			default: '28rpx  0 0 0'
		},
		columnNum: {
			type: Number,
			default: 3
		},
	})
	const emit = defineEmits(['tapGrid'])
	const tabItem = (item,index) => {
		emit('tapGrid',item,index)
	}
</script>

<style lang="scss" scoped>
	.grid_box {
		overflow: hidden;
		width: 750rpx;
	}

	.grid_box::after {
		position: absolute;
		box-sizing: border-box;
		content: " ";
		pointer-events: none;
		height: 2rpx;
		width: 100%;
		background-color: #fff;
		bottom: 0rpx;
		z-index: 2;
	}

	.grid_item_border::after {
		position: absolute;
		box-sizing: border-box;
		content: " ";
		pointer-events: none;
		top: -50%;
		right: -50%;
		bottom: -50%;
		left: -50%;
		border: 1rpx solid v-bind(borderColor);
		transform: scale(.5);
		z-index: 1;
		border-width: 0 1rpx 1rpx 0;
	}
</style>
