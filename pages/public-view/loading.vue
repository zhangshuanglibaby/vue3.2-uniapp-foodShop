<template>
	<view class="loading"></view>
</template>

<script>
</script>

<style scoped>
	.loading {
		width: 40rpx;
		height: 40rpx;
		margin: 0 auto;
		border: 5rpx solid #cecccc;
		border-radius: 50%;
		border-top-color: transparent;
		animation: name 1s linear infinite;
	}

	@keyframes name {
		from {
			transform: rotate(0);
		}

		to {
			transform: rotate(360deg);
		}
	}
</style>