<template>
	<view class="sort-Header sort-position" v-if="sort.length">
		<text>分类</text>
		<text>操作</text>
	</view>
	<view style="height: 90rpx;"></view>
	<view v-for="(item, index) in sort" :key="index" class="sort-Header sort-table">
		<text class="occupy">{{ item.sort_name }}</text>
		<text class="sort-but">删除</text>
	</view>
	<view v-if="!sort.length" class="Tips">你还没有分类数据</view>
	<!-- 弹窗 -->
	<page-container :show="popupShow" bindclickoverlay="onClickoverlay">
		<view class="space-view">
			<view class="modify-sub">
				<image src="/static/detail/guanbi.svg" mode="widthFix" @click="popupShow = false"></image>
			</view>
			<view class="att-input">
				<input v-model="sort_name" type="text" placeholder="输入分类" placeholder-class="I-style" :cursor-spacing="50" />
			</view>
			<view class="newly-added classif" @click="submit">
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
	import { ref, onMounted, reactive, toRefs } from "vue";
	import { init } from "@/Acc.config/init.js";
	import { Feedback } from "@/Acc.config/media.js";
	// uniapp 还不支持该事件
	const onClickoverlay = () => {
		console.log("点击了")
	}
	
	// 控制弹窗现显
	const popupShow = ref(false);
	
	const data = reactive({
			sort: [], // 分类数据
			sort_name: "", // 分类名称
		});
	const { sort, sort_name } = toRefs((data));
	// 获取分类数据
	const getsort = async () => {
		const DB = await init();
		const res = await DB.database().collection("good_sort").limit(10).get();
		data.sort = res.data;
	}
	onMounted(() => {
		getsort();
	})
	
	// 点击提交新增分类
	const submit = () => {
		if(!data.sort_name) {
			new Feedback("请输入分类", "none").toast();
			return;
		}
		console.log(data.sort_name)
	}
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