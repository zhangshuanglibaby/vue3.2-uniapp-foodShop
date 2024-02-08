<template>
	<template v-if="bannerData.length">
		<view class="sort-Header sort-position">
			<text>横幅图片</text>
			<text>操作</text>
		</view>
		<view style="height: 90rpx;"></view>
		<view v-for="(item, index) in bannerData" :key="index" class="sort-Header sort-table">
			<image :src="item.banner_cover" mode="aspectFill"></image>
			<text class="sort-but" @click="deleteBanner(item._id, index)">删除</text>
		</view>
	</template>
	<!-- 没有数据的提示 -->
	<view v-else class="Tips">你还没有横幅数据</view>
	<!-- 底部 -->
	<view style="300rpx"></view>
	<view class="newly-added-view">
		<view class="newly-added" @click="show = true">新增横幅</view>
	</view>
	<!-- 弹窗 -->
	<page-container :show="show" position="bottom" bindenter="onEnter">
		<view class="space-view">
			<view class="modify-sub modify-padding">
				<image src="/static/detail/guanbi.svg" mode="widthFix" @click="show = false"></image>
				<text>新增横幅</text>
				<text @click="submit">提交</text>
			</view>
			<view class="upload-cover">
				<image v-if="!banner_cover" src="/static/detail/miaosha-img.jpg" mode="aspectFill" @click="uploadImage"></image>
				<template v-else>
					<image :src="banner_cover" mode="aspectFill"></image>
					<image src="/static/detail/shanchu-goods.svg" mode="widthFix" @click="banner_cover = ''"></image>
				</template>
			</view>
			<view class="relation relation-back" @click="jumpPage">
				<text>关联商品</text>
				<text class="over-text">{{ relative_good.goods_title ? relative_good.goods_title : '添加' }}</text>
			</view>
		</view>
	</page-container>
</template>

<script setup>
	import { ref, onMounted, reactive } from "vue";
  import { Upload, Feedback } from "@/Acc.config/media.js";
	import { init } from "@/Acc.config/init.js";
	import { relative_good } from "@/Acc.config/answer.js"
	
	const show = ref(false);
	
	// ======【 获取横幅数据 】======
	const bannerData = ref([]);
	const getBannerData = async () => {
		const DB = await init();
		const { data } = await DB.database().collection("banner").get();
		bannerData.value = data;
		console.log(bannerData.value, "====>bannerData.value");
	}
	onMounted(() => {
		getBannerData();
	})
	
	// ======【 图片上传 】======
	const banner_cover = ref('');
	const uploadImage = async () => {
		const res = await new Upload().image();
		wx.showLoading({ title: '正在上传' });
		const url = await new Upload().cloud(res[0].tempFilePath);
		banner_cover.value = url;
		wx.hideLoading();
	}
	
	// ======【 跳转关联商品 】======
	const jumpPage = () => {
		wx.navigateTo({ url: "/pages/goods-list/index" })
	}
	// 监听关联商品数据
	// watch(relative_good, (newVal) => {
	// 	console.log(newVal, "====>newVal");
	// })
	
	// ======【 提交数据 】=====
	const submit = () => {
		if(!banner_cover.value) {
			new Feedback("请上传banner").toast();
			return;
		}
		if(!relative_good.value._id) {
			new Feedback("请关联商品").toast();
			return;
		}
		// 提交数据
		database();
	}
	// 初始化数据
	const initData = () => {
		banner_cover.value = "";
		relative_good.value = {};
	}
	const database = async () => {
		try{
			let params = {
				banner_cover: banner_cover.value,
				goods_id: relative_good.value._id,
				video_url: relative_good.video_url
			}
			wx.showLoading({ title: "提交中" });
			const DB = await init();
			const { data } = await DB.database().collection("banner").add({ data: params });
			wx.hideLoading();
			show.value = false;
			initData();
			getBannerData();
		}catch(e){
			//TODO handle the exception
			console.log(e);
		}
	}
	
	// ======【 删除banner 】=======
	const deleteBanner = async (id, index) => {
		const DB = await init();
		await DB.database().collection("banner").doc(id).remove();
		bannerData.value.splice(index, 1);
		new Feedback("删除成功", "success").toast();
	}
</script>

<style>
	.modify-padding{
		padding-bottom: 60rpx !important;
	}
	.upload-cover{
		position: relative;
	}
	.upload-cover image:nth-child(1){
		width: 100%;
		height: 380rpx;
		display: block;
	}
	.upload-cover image:nth-child(2){
		width: 40rpx;
		height: 40rpx;
		position: absolute;
		top: 6rpx;
		right: 6rpx;
	}
	.relation-back{
		background-color: #f7f7f7 !important;
		color: #000000 !important;
	}
	.over-text{
		color: #ed6b51 !important;
	}
</style>