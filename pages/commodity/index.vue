<template>
	<view class="sort-view">
		<!-- 左边 -->
		<view class="sort-left">
			<text
				v-for="(item, index) in goodSortData"
				:key="index"
				:class="{addto: currentSortIndex === index}"
				@click="changeGoodSort(index)">{{ item.sort_name }}</text>
		</view>
		<!-- 右边 -->
		<view class="sort-right">
			<view v-for="(item, index) in goodsList" :key="index" class="Commodity">
				<view class="Com-image">
					<image :src="item.goods_cover" mode="aspectFit"></image>
				</view>
				<view class="Com-price">
					<text class="Com-title over-text">{{ item.goods_title }}</text>
					<text class="stock-view">库存{{ item.stock }}</text>
					<text class="Real-price">¥{{ item.goods_price }}</text>
					<view class="Button-rig">
						<text :class="item.shelves ? 'shelf-true' : 'shelf-false'" @click="changeShelves(item, index)">{{ item.shelves ? '下架' : '已下架' }}</text>
					</view>
				</view>
			</view>
			<!-- 加载loading -->
			<view class="loading-hei">
				<Loading v-if="loading" />
			</view>
		</view>
	</view>
	<view style="height:30rpx"></view>
	<!-- 底部 -->
	<view class="manage">
		<text @click="jumpPage('sort')">管理分类</text>
		<text @click="jumpPage('add-good')">添加商品</text>
	</view>
</template>

<script setup>
	import { ref, onMounted, computed } from "vue";
	import {  onReachBottom } from "@dcloudio/uni-app"
	import { init } from "@/Acc.config/init.js";
	import { Feedback } from "@/Acc.config/media.js";
	import Loading from "@/pages/public-view/loading.vue";
	
	const currentSortIndex = ref(0); // 当前选中的分类索引
	// const currentSortName = ref(''); // 当前选中的分类名称
	
	// 获取左侧分类数据
	const goodSortData = ref([]);
	const getGoodSort = async () => {
		const DB = await init();
		const { data } = await DB.database().collection('good_sort').field({ _openid: false }).get();
		goodSortData.value = data;
	}
	// 当先选中的分类名称
	const currentSortName = computed(() => {
		return goodSortData.value[currentSortIndex.value]?.sort_name || "";
	})
	// 获取右侧数据
	const goodsFields = {
		category: true,
		goods_cover: true,
		goods_price: true,
		goods_title: true,
		shelves: true,
		stock: true,
		_id: true
	}
	const goodsList = ref([]);
	const getGoodsList = async (category) => {
		const DB = await init();
		const { data } = await DB.database().collection('goods').where({ category }).field(goodsFields).limit(10).get();
		console.log(data, "=====>goodsList");
		goodsList.value = data;
	}
	onMounted(async () => {
		await getGoodSort();
		getGoodsList(currentSortName.value);
	})
	// 页面上拉触底事件
	let pageNum = ref(0); // 记录当前页
	const loading = ref(false); // loading 状态
	onReachBottom( async () => {
		const DB = await init();
		const { total } = await DB.database().collection("goods").where({ category: currentSortName.value }).count(); // 获取数据的总条数
		if(goodsList.value.length === total) return; // 表示加载完毕了 就不执行后面了
		pageNum.value++;
		loading.value = true;
		const skip = pageNum.value * 10;
		const { data } = await DB.database().collection('goods').where({ category: currentSortName.value }).field(goodsFields).limit(10).skip(skip).get();
		goodsList.value = [...goodsList.value, ...data];
		loading.value = false;
	})
	
	// ======【 切换商品分类 】======
	const changeGoodSort = (index) => {
		currentSortIndex.value = index;
		pageNum.value = 0;
		getGoodsList(currentSortName.value);
	}
	
	// ======【 商品下架】======
	const changeShelves = async (item, index) => {
		try{
			// const currentGood = goodsList.value[index];
			if(!item.shelves) return;
			const DB = await init();
			const _ = DB.database().command;
			// 修改上架状态
			 await DB.database().collection('goods').doc(item._id).update({ data: { shelves: false } });
			 // 修改数据分类的quantry数据
			 await DB.database().collection('good_sort').where({ sort_name: currentSortName.value }).update({ data: { quantity: _.inc(-1) } });
			// const { data } = await DB.database().collection('goods').doc(id).update({ data: { shelves: fa } });
			goodsList.value[index].shelves = false;
			new Feedback("下架成功", "success").toast();
		}catch(e){
			new Feedback("下架失败", "error").toast();
		}
	}
	
	// ======【 跳转页面 】======
	const jumpPage = (type) => {
		const callback = {
			'sort': () => {
				wx.navigateTo({ url: "/pages/sort-admin/index"});
			},
			'add-good': () => {
				wx.navigateTo({ url: "/pages/goods-admin/index"})
			}
 		}
		callback[type]();
	}
</script>

<style scoped>
.sort-view{
	display: flex;
}
.sort-left{
	width: 200rpx;
	text-align: center;
	background-color: #f6f6f6;
	height: 100vh;
	position: fixed;
	left: 0;
	top: 0;
	bottom: 0;
}

.sort-left text{
	display: block;
	color: #5f5f5f;
	padding: 20rpx 0;
	border-bottom: 1px solid #FFFFFF;
	font-size: 28rpx;
}
.addto{
	background-color: #FFFFFF;
	font-weight: bold;
}
/* 右边 */
.sort-right{
	margin: 0 20rpx 0 220rpx;
	flex: 1;
}
.Com-image image{
	display: block;
	width: 150rpx;
	height: 150rpx;
	border-radius: 10rpx;
}
.Commodity text{
	display: block;
}
.Commodity{
	display: flex;
	margin-bottom: 50rpx;
}
.Com-price{
	flex: 1;
	padding-left: 20rpx;
}
.Com-price view{
	display: flex;
	justify-content: flex-end;
}
.Com-price view text:nth-child(2){
	margin-left: 50rpx;
}
.Com-title{
	font-weight: bold;
}
.stock-view{
	padding: 10rpx 0;
	color: #c1c1c1;
	font-size: 26rpx;
}
.Real-price{
	color: #b1865b;
	font-weight: bold;
}
.Button-rig{
	padding-top: 20rpx;
}
.Button-rig text{
	border-radius: 7rpx;
	padding: 7rpx 20rpx;
	font-size: 26rpx;
}
.shelf-true{
	color: #FFFFFF;
	background-color: #E64340;
}
.shelf-false{
	background-color: #F8F8F8;
	color: rgba(0, 0, 0, 0.2);
}
/* 底部 */
.manage{
	position: fixed;
	bottom: 0;
	right: 0;
	left: 200rpx;
	display: flex;
	justify-content: space-between;
}
.manage text{
	width: 50%;
	text-align: center;
	padding: 20rpx 0;
}
.manage text:nth-child(1){
	background-color: antiquewhite;
}
.manage text:nth-child(2){
	background-color: aliceblue;
}
</style>