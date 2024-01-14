<template>
	<view class="sort-Header sort-position">
		<text>分类</text>
		<text>操作</text>
	</view>
	<view style="height: 90rpx;"></view>
	<view class="sort-Header sort-table">
		<text class="occupy">休闲零食</text>
		<text class="sort-but">删除</text>
	</view>
	<!-- 弹窗 -->
	<page-container :show="popupShow" bindclickoverlay="onClickoverlay">
		<view class="space-view">
			<view class="modify-sub">
				<image src="/static/detail/guanbi.svg" mode="widthFix" @click="popupShow = false"></image>
			</view>
			<view class="att-input">
				<input type="text" placeholder="输入分类" placeholder-class="I-style" :cursor-spacing="50" />
			</view>
			<view class="newly-added classif">
				<text>新增分类</text>
			</view>
		</view>
	</page-container>
	<!-- 底部的新增分类按钮 -->
	<view style="height: 300rpx;"></view>
	<view class="newly-added-view"  @click="popupShow = true">
		<view class="newly-added">新增分类</view>
	</view>
</template>

<script setup>
	import { ref, onMounted } from "vue";
	import { init } from "@/Acc.config/init.js"
	// uniapp 还不支持该事件
	const onClickoverlay = () => {
		console.log("点击了")
	}
	
	// 控制弹窗现显
	const popupShow = ref(false);
	
	const addSort = async () => {
		const DB = await init();
		console.log(DB, "====>db");
		const res = await DB.database().collection("men").add({
			data: {
				m: 1
			}
		})
		console.log(res," ===>res");
	}
	onMounted(() => {
		// addSort();
	}) 
</script>

<style scoped>
.I-style{
	color: #cccccc;
}
.att-input{
	background-color: #f7f7f7;
	padding: 20rpx;
	border-radius: 7rpx;
}
.classif{
	margin: 60rpx 0 !important;
}
.modify-sub{
	padding-bottom: 60rpx !important;
}

</style>