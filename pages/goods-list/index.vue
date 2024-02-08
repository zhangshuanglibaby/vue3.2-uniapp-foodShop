<template>
	<template>
		<view v-for="(item, index) in goodsList" :key="index" class="select-goods" @click="selectGood(item)">
			<view>
				<image :src="item.goods_cover" mode="aspectFill"></image>
			</view>
			<view>
				<text class="over-text line-clamp">{{ item.goods_title }}</text>
				<text>¥ {{ item.goods_price }}</text>
			</view>
		</view>
		<!-- 没有数据的提示 -->
		<view v-if="!goodsList.length" class="Tips">你还没有商品数据</view>
		<!-- 加载loading -->
		<view class="loading-hei">
			<Loading v-if="loading" />
		</view>
	</template>
</template>

<script setup>
	import { ref, onMounted } from "vue";
	import { onReachBottom } from "@dcloudio/uni-app";
	import { init } from "@/Acc.config/init.js";
	import { relative_good } from "@/Acc.config/answer.js"
	
	import Loading from "@/pages/public-view/loading.vue";
	
	// ======【 获取商品数据 】======
	let fieldOb = {
		goods_cover: true,
		goods_price: true,
		goods_title: true,
		seckill: true,
		video_url: true
	}
	const goodsList = ref([]);
	const getGoods = async () => {
		const DB = await init();
		const { data } = await DB.database().collection("goods").where({ shelves: true }).field(fieldOb).limit(10).get();
		console.log(data, "====>Data")
		goodsList.value = data;
	}
	onMounted(() => {
		getGoods();
	})
	
	// ======【 页面上拉触底事件 】======
	const current_page = ref(0); // 记录当前页
	const loading = ref(false); // loading 状态
	onReachBottom(async () => {
		const DB = await init();
		const { total } = await DB.database().collection("goods").where({ shelves: true }).count(); // 获取分类数据的总条数
		if(goodsList.value.length === total) return; // 表示加载完毕了 就不执行后面了
		current_page.value++;
		loading.value = true;
		const skip = current_page.value * 10;
		const res = await DB.database().collection("goods").where({ shelves: true }).limit(10).skip(skip).get();
		goodsList.value = [...goodsList.value, ...res.data];
		loading.value = false;
	})
	
	// ======【 选择商品 】======
	const selectGood = (item) => {
		// 存储关联商品的数据
		relative_good.value = item;
		wx.navigateBack({ delta: 1 });
	}
</script>


<style scoped>
.select-goods{
	display: flex;
	height: 200rpx;
	margin: 20rpx;
}
.select-goods image{
	width: 200rpx;
	height: 200rpx;
	display: block;
	border-radius: 10rpx;
}
.select-goods view:nth-child(2){
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	font-weight: bold;
	padding: 10rpx 0 10rpx 15rpx;
}
.select-goods view text:nth-child(2){
	color: #1AAD19;
	font-size: 35rpx;
}
.line-clamp{
	-webkit-line-clamp: 2 !important;
}
</style>