<template>
	<!-- 自定义的顶部导航栏 -->
	<view class="Top-view">
		<view :style="{ height: `${s_top}px` }"></view>
		<view class="top-title" :style="{ height: `${s_height}px`,'line-height': `${s_height}px` }">大栗子零食小店</view>
		<!-- 收益板块 -->
		<view class="profit-view" :style="{ top: `${profitViewTop}px` }">
			<view class="profit-num">
				<text>累计收益(元)</text>
				<text>100.00</text>
			</view>
			<view class="profit-sale">
				<view>
					<text>今日销售额</text>
					<text>100</text>
				</view>
				<view>
					<text>今日订单数</text>
					<text>100</text>
				</view>
				<view>
					<text>累计订单数</text>
					<text>100</text>
				</view>
			</view>
		</view>
	</view>
	<!-- 九宫格 -->
	<view class="Gong-ge" :style="{ top: `${gonggeTop}px` }">
		<view v-for="(item, index) in plate" class="">
			<image :src="item.image" mode="aspectFit"></image>
			<text>{{ item.name }}</text>
		</view>
	</view>
</template>

<script setup>
import { onMounted, reactive, toRefs, computed } from "vue";

// 存储胶囊按钮的位置
const search_data = reactive({
	s_height: 0, // 胶囊按钮的高度
	s_top: 0, // 胶囊按钮距离顶部的距离
	profit_height: 0, // 收益板块的高度
	plate: [ // 九宫格desc
		{ image:'/static/detail/hengfu.svg', name: "横幅管理" },
		{ image:'/static/detail/miaosha.svg', name: "秒杀管理" },
		{ image:'/static/detail/shangpin.svg', name: "商品管理" },
		{ image:'/static/detail/dingdan.svg', name: "订单管理" },
		{ image:'/static/detail/fenlei.svg', name: "分类管理" }
	]
})
const { s_height, s_top, plate } = toRefs(search_data);

// 获取 右上角胶囊 按钮的布局位置信息
const getMenuButtonBoundingClientRect = () => {
	const { height, top } = uni.getMenuButtonBoundingClientRect(); // 注意获取的数值是 px单位的
	Object.assign(search_data, { s_height: height, s_top: top });
}

// 收益板块距离顶部的距离 
const profitViewTop = computed(() => {
	 // 胶囊按钮的高度 + 胶囊按钮距离顶部的高度 + 偏差
	 return search_data.s_height + search_data.s_top + 20;
})

// 获取收益板块的高度
const getProfitViewHeight = () => {
	const query = uni.createSelectorQuery()
	query.select('.profit-view').boundingClientRect()
	query.exec(res => {
		search_data.profit_height = res[0].height;
		console.log(search_data.profit_height, "===>search_data.profit_height")
	})
}

// 九宫格距离顶部的距离
const gonggeTop = computed(() => {
	console.log(profitViewTop.value, "===>profitViewTop")
	return profitViewTop.value + search_data.profit_height + 10;
})

onMounted(() => {
	getMenuButtonBoundingClientRect();
	getProfitViewHeight();
})
</script>

<style>
page{background-color: #f4f4f4;}
.Top-view{
	height: 330rpx;
	position: relative;
	background-image: linear-gradient(to top, #9be15d 0%, #00e3ae 100%);
}
.top-title {
	padding-left: 12px;
}
.profit-view{
	background-color: #FFFFFF;
	position: absolute;
	left: 20rpx;
	right: 20rpx;
	border-radius: 10rpx;
	padding: 20rpx;
}
.profit-num{
	display: flex;
	flex-direction: column;
	padding-bottom: 10rpx;
}
.profit-num text:nth-child(2){
	font-size: 40rpx;
	padding-top: 10rpx;
}
.profit-sale{
	display: flex;
	align-items: center;
	justify-content: space-between;
}
.profit-sale view{
	display: flex;
	flex-direction: column;
	align-items: center;
}
.profit-sale view text:nth-child(1){
	color: #a7a7a7;
	padding-bottom: 10rpx;
}
.profit-sale view text:nth-child(2){
	font-weight: bold;
}
.Gong-ge{
	background-color: #FFFFFF;
	margin: 0 20rpx 20rpx 20rpx;
	border-radius: 10rpx;
	display: flex;
	flex-wrap: wrap;
	position: absolute;
	left: 0;
	right: 0;
	color: #555555;
}
.Gong-ge image{
	width: 55rpx;
	height: 55rpx;
	display: block;
	margin-bottom: 20rpx;
}
.Gong-ge view{
	width: calc(25% - 10rpx*2);
	margin: 20rpx 10rpx;
	display: flex;
	flex-direction: column;
	align-items: center;
}

</style>
