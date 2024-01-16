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
				<input v-model="submitParams.sort_name" type="text" placeholder="输入分类" placeholder-class="I-style" :cursor-spacing="50" />
			</view>
			<view class="newly-added classif" @click="submit">
				<text>新增分类</text>
			</view>
		</view>
	</page-container>
	<!-- 加载loading -->
	<view class="loading-hei">
		<Loading v-if="loading" />
	</view>
	<!-- 底部的新增分类按钮 -->
	<view style="height: 300rpx;"></view>
	<view class="newly-added-view"  @click="popupShow = true">
		<view class="newly-added">新增分类</view>
	</view>
</template>

<script setup>
	import {  onReachBottom } from "@dcloudio/uni-app"
	import { ref, onMounted, reactive, toRefs } from "vue";
	import { init } from "@/Acc.config/init.js";
	import { Feedback } from "@/Acc.config/media.js";
	
	import Loading from "@/pages/public-view/loading.vue"
	// uniapp 还不支持该事件
	const onClickoverlay = () => {
		console.log("点击了")
	}
	
	// 控制弹窗现显
	const popupShow = ref(false);
	
	const sort = ref([]); // 分类数据
	// 获取分类数据
	const getsort = async () => {
		const DB = await init();
		const res = await DB.database().collection("good_sort").limit(10).get();
		console.log(res, "====>getsort")
		sort.value = res.data;
	}
	onMounted(() => {
		getsort();
	})
	
	// 点击提交新增分类
	const submitParams = reactive({
		sort_name: "", // 分类名称
		quantity: 0 // 数量
	})
	const submit = async () => {
		if(!submitParams.sort_name) {
			new Feedback("请输入分类", "none").toast();
			return;
		}
		// 查询数据库是否存在相同的分类
		const DB = await init();
		const query_data = await DB.database().collection("good_sort").where({ sort_name: submitParams.sort_name }).get();
		if(query_data.data.length > 0) {
			new Feedback("已经存在该分类").toast();
			return;
		}
		const res = await DB.database().collection("good_sort").add({ data: submitParams  });
		sort.value.push({ _id: res._id , ...submitParams  });
		submitParams.sort_name = ""; // 清空数据
		popupShow.value = false; // 关闭弹窗
	}
	
	// 页面上拉触底事件
	const current_page = ref(0); // 记录当前页
	const loading = ref(false); // loading 状态
	onReachBottom(async () => {
		const DB = await init();
		const { total } = await DB.database().collection("good_sort").count(); // 获取分类数据的总条数
		if(sort.value.length === total) return; // 表示加载完毕了 就不执行后面了
		current_page.value++;
		loading.value = true;
		const skip = current_page.value * 10;
		const res = await DB.database().collection("good_sort").limit(10).skip(skip).get();
		sort.value = [...sort.value, ...res.data];
		loading.value = false;
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