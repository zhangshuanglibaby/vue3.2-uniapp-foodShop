<template>
	<template>
		<view class="select-goods">
			<view>
				<image src="/static/goods/01.jpeg" mode="aspectFill"></image>
			</view>
			<view>
				<text class="over-text line-clamp">这是标题这是标题这是标题这是标题这是标题这是标题这是标题这是标题这是标题</text>
				<text>¥100</text>
			</view>
		</view>
		<!-- 没有数据的提示 -->
		<view class="Tips">你还没有商品数据</view>
	</template>
</template>

<script setup>
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