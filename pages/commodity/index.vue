<template>
	<view class="sort-view">
		<!-- 左边 -->
		<view class="sort-left">
			<text>膨化食品</text>
		</view>
		<!-- 右边 -->
		<view class="sort-right">
			<view class="Commodity">
				<view class="Com-image">
					<image src="../../static/detail/026.jpg" mode="aspectFit"></image>
				</view>
				<view class="Com-price">
					<text class="Com-title over-text">这是标题</text>
					<text class="stock-view">库存100</text>
					<text class="Real-price">100</text>
					<view class="Button-rig">
						<text class="shelf-true">下架</text>
					</view>
				</view>
			</view>
		</view>
	</view>
	<!-- 底部 -->
	<view class="manage">
		<text>管理分类</text>
		<text>添加商品</text>
	</view>
</template>

<script>
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