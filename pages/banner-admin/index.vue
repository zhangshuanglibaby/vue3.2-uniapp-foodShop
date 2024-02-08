<template>
	<view class="sort-Header sort-position">
		<text>横幅图片</text>
		<text>操作</text>
	</view>
	<view style="height: 90rpx;"></view>
	<view class="sort-Header sort-table">
		<image src="/static/goods/01.jpeg" mode="aspectFill"></image>
		<text class="sort-but">删除</text>
	</view>
	<!-- 没有数据的提示 -->
	<view class="Tips">你还没有横幅数据</view>
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
				<text>提交</text>
			</view>
			<view class="upload-cover">
				<image src="/static/detail/miaosha-img.jpg" mode="aspectFill"></image>
				<!-- <image src="/static/goods/02.jpeg" mode="aspectFill"></image> -->
				<image src="/static/detail/shanchu-goods.svg" mode="widthFix"></image>
			</view>
			<view class="relation relation-back">
				<text>关联商品</text>
				<text class="over-text">添加</text>
			</view>
		</view>
	</page-container>
</template>

<script setup>
	import { ref } from "vue";
	const show = ref(false);
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