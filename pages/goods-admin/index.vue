<template>
	<!-- 上传图片	 -->
	<view class="goods-top">
		<view>
			<input v-model="goods_title" type="text" placeholder="请输入商品标题" placeholder-class="pl-text" />
		</view>
		<view class="goods-image">
			<template v-if="banner_imgs.length">
				<view class="upload-Image" v-for="(url, index) in banner_imgs" :key="index">
					<image :src="url" mode="aspectFill" @click="previewBanner(url)"></image>
					<image src="/static/detail/shanchu-goods.svg" mode="widthFix" @click="deleteBanner(index)"></image>
				</view>
			</template>
			<view @click="uploadBanner">
				<image src="/static/detail/shuxing-img.png" mode="aspectFill"></image>
			</view>
		</view>
	</view>
	<!-- 上传短视频 -->
	<view class="goods-top goods-video">
		<view class="video-title">
			<text>上传短视频(可选)</text>
			<image src="/static/detail/shanchu.svg" mode="" @click="deleteVideo"></image>
		</view>
		<view v-if="!video_url" class="goods-image" @click="uploadVideo">
			<view>
				<image src="/static/detail/shuxing-img.png" mode="aspectFill"></image>
			</view>
		</view>
		<video v-else :src="video_url"></video>
	</view>
	<!-- 所属分类-->
	<view class="specs-view">
		<picker mode="selector" :range="sortData.sort_options" range-key="sort_name" @change="changeSort">
			<view class="sort-title specs-title">
				<text>所属分类</text>
				<text>{{ sortData.sort_name }}</text>
				<image src="/static/detail/xiangyou-jiantou.svg" mode="widthFix"></image>
			</view>
		</picker>
	</view>
	<!-- 价格库存 -->
	<view class="specs-view price-stock">
		<view class="">
			<text>价格</text>
			<input v-model="miniPrice" :disabled="specs_data.length" type="number" placeholder="请输入价格" placeholder-class="I-style" cursor-spacing="50" />
			<text>元</text>
		</view>
		<view class="">
			<text>库存</text>
			<input v-model="totalStock" type="number" :disabled="specs_data.length" placeholder="请输入库存" placeholder-class="I-style" cursor-spacing="50" />
			<text>件</text>
		</view>
	</view>
	<!-- 创建规格 -->
	<view class="specs-view">
		<view class="specs-title" @click="jumpToSpecs">
			<text>创建规格(可选)</text>
			<image src="/static/detail/xiangyou-jiantou.svg" mode="widthFix"></image>
		</view>
		<view v-if="!specs_data.length" class="specs-image">
			<image src="/static/detail/guige-img.jpg" mode="widthFix"></image>
		</view>
		<!-- 已有规格展示 -->
		<template v-else>
			<view v-for="(item, index) in specs_data" :key="index" class="Se-specs S-flex">
				<view>
					<image :src="item.image" mode="aspectFill"></image>
				</view>
				<view class="S-top">
					<view class="S-flex S-right">
						<text v-for="(attr,attr_index) in item.att_data" :key="attr_index">{{ attr.att_value }}</text>
					</view>
					<view class="S-flex S-right S-stock">
						<text>库存</text>
						<text>{{ item.stock }}件</text>
					</view>
				</view>
				<view class="S-price">{{ item.price }}</view>
			</view>
		</template>
		
	</view>
	<!-- 详情图 -->
	<view class="specs-view">
		<view class="specs-title">
			<text>商品详情</text>
		</view>
		<view v-for="(url, index) in detail_imgs" :key="index" class="detail-image">
			<image :src="url" mode="widthFix" @click="previewDetail(url)"></image>
			<image src="/static/detail/shanchu.svg" mode="widthFix" @click="deleteDetail(index)"></image>
		</view>
		<view class="specs-image" @click="uploadDetail">
			<image src="/static/detail/shpin-img.jpg" mode="widthFix"></image>
		</view>
	</view>
	
	<!-- 底部的新增分类按钮 -->
	<view style="height: 300rpx;"></view>
	<view class="newly-added-view back" @click="submit">
		<view class="newly-added">上架售卖</view>
	</view>
</template>

<script setup>
	import { computed, reactive, ref, watch, onMounted } from "vue";
	import { sku_val } from "@/Acc.config/answer.js";
	import { Feedback, Upload } from "@/Acc.config/media.js";
	import { init } from "@/Acc.config/init.js";
	
	const goods_title = ref(''); // 商品标题
	
	// ======【 上传图片 】======
	const banner_imgs = ref([]); // 横幅banner
	// 上传横幅banner
	const uploadBanner = async () => {
		const local = await new Upload().image(9);
		const url_arr = local.map(item => item.tempFilePath);
		banner_imgs.value = [...banner_imgs.value, ...url_arr];
	}
	// 删除横幅banner
	const deleteBanner = (index) => {
		banner_imgs.value.splice(index, 1);
	}
	// 预览横幅banner
	const previewBanner = (url) => {
		new Upload().preview(url, banner_imgs.value);
	}
	
	// =======【 上传视频 】=======
	const video_url = ref('');
	const uploadVideo = async () => {
		const local = await new Upload().image(1, 'video');
		console.log(local, "===>local")
		video_url.value = local[0].tempFilePath;
	}
	// 删除视频
	const deleteVideo = () => {
		video_url.value = '';
	}
	
	// ====== 【 所属分类 】======
	const sortData = reactive({
		sort_options: [], // 分类选项数据
		sort_name: '', // 当前选中的分类名称
		sort_id: '' // 当前选中的分类id
	})
	// 获取所属分类数据
	const getSortOptions = async () => {
		const DB = await init();
		const { data } = await DB.database().collection('good_sort').field({ _openid: false }).get();
		sortData.sort_options = data;
		console.log(sortData.sort_options, "===>sortData.sort_options");
	}
	onMounted(() => {
		getSortOptions();
	})
	// 选择分类
	const changeSort = (event) => {
		const index = event.detail.value;
		// 当前选中的分类
		const currentSort = sortData.sort_options[index];
		Object.assign(sortData, { sort_name: currentSort.sort_name, sort_id: currentSort._id });
	}
	
	// ======【 跳转到添加规格页 】======
	const jumpToSpecs = () => {
		wx.navigateTo({ url: "/pages/specs/index" });
	}
	
	// ======【 监听添加规格页的数据 】======
	const specs_data = ref([]); // 存储从添加规格页面创建的数据
	const miniPrice = ref(0); // 最小价格
	const totalStock = ref(0); // 总库存
	watch(() => sku_val.value, (newVal,oldVal) => {
		console.log(newVal, "====>specs_data");
		// 数据按价格小到大排序
		specs_data.value = newVal.sort((a, b) => a.price - b.price);
		// 计算最小的价格和总库存
		miniPrice.value = specs_data.value[0].price;
		totalStock.value = specs_data.value.reduce((cur, next) => cur + next.stock, 0);
	})
	
	// ======【 上传详情图 】======
	const detail_imgs = ref([]);
	const uploadDetail = async () => {
		const local = await new Upload().image(9);
		const url_arr = local.map(item => item.tempFilePath);
		detail_imgs.value = [...detail_imgs.value, ...url_arr];
	}
	// 删除商品详情图
	const deleteDetail = (index) => {
		detail_imgs.value.splice(index, 1);
	}
	// 预览商品详情图
	const previewDetail = (url) => {
		new Upload().preview(url, detail_imgs.value);
	}
	
	// ======【 提交】======
	const valid_message = {
		goods_title: '请输入商品标题',
		goods_banner: '请上传商品图片',
		category: '请选择商品分类',
		goods_price: '请输入价格',
		stock: '请输入库存',
		goods_details: '请上传商品详情'
	}
	const submit = async () => {
		// 需要校验的字段
		const require_field = {
			goods_title: goods_title.value, // 商品标题
			goods_banner: banner_imgs.value, // 横幅banner
			category: sortData.sort_name, // 商品分类
			goods_price: miniPrice.value, // 价格
			stock: totalStock.value, // 库存
			goods_details: detail_imgs.value // 商品详情
		}
		const require_keys = Object.keys(require_field);
		for(const key of require_keys) {
			if(Array.isArray(require_field[key]) && !require_field[key].length) {
				new Feedback(valid_message[key]).toast();
				return;
			}
			if(!require_field[key]) {
				new Feedback(valid_message[key]).toast();
				return;
			}
		}
		console.log("通过校验")
		database();
	}
	// 提交到数据库
	const database = async () => {
		wx.showLoading({ title: "上传中", mask: true });
		const goods_banner = await new Upload().multipleCloud(banner_imgs.value); // 横幅banner上传到云存储返回的路径
		const goods_details = await new Upload().multipleCloud(detail_imgs.value); // 商品详情图上传到云存储返回的路径
		const video_url = '';
		if(video_url.value) {
			video_url = await new Upload().cloud(video_url.value);
		}
		const params = {
			goods_title: goods_title.value, // 商品标题
			goods_price: Number(miniPrice.value), // 价格
			stock: Number(totalStock.value), // 库存
			category: sortData.sort_name, // 商品分类
			goods_banner,
			goods_cover: goods_banner[0], // 默认取第一张商品横幅图作为封面图
			goods_details,
			video_url,
			sku: !!specs_data.value.length,
			sold: 0,
			shelves: true, // 默认产品上架
			seckill: false // 默认商品不参与秒杀
		}
		try{
			const DB = await init();
			// 上传到商品集合
			const good_res = await DB.database().collection('goods').add({ data: params });
			// 如果有规格属性，上传到商品规格集合
			if(params.sku) {
				await DB.database().collection('goods_sku').add({ data: { _id: good_res._id, sku: specs_data.value } });
			}
			// 如果有分类 要给对应的分类数量增加1
			if(params.category) {
				const _ = DB.database().command;
				await DB.database().collection('good_sort').doc(sortData.sort_id).update({ data: { quantity: _.inc(1) } });
			}
			// 上传
			new Feedback("上传成功", "success").toast();
		}catch(e){
			//TODO handle the exception
			console.log(e, "====>error");
			new Feedback("提交失败").toast();
		}
	}
</script>

<style>
page{
	background-color: #f2f2f2;
}
.goods-top{
	background-color: #FFFFFF;
	padding: 20rpx;
}
.pl-text{
	font-weight: 100;
}
.goods-top input{
	padding: 30rpx 0;
	font-weight: bold;
}
.goods-image{
	display: flex;
	flex-wrap: wrap;
}
.goods-image view{
	width: calc(33.3% - 5rpx*2);
	height: 200rpx;
	margin: 5rpx;
}
.goods-image image{
	width: 100%;
	height: 100%;
	display: block;
	border-radius: 7rpx;
}
.upload-Image {
	position: relative;
}
.upload-Image image:nth-child(2){
	width: 30rpx !important;
	height: 30rpx !important;
	position: absolute;
	top: 0;
	right: 0;
}
/* 视频 */
.goods-video{
	margin-top: 40rpx;
	font-weight: bold;
}
.video-title{
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 20rpx;
}
.video-title image{
	width: 35rpx;
	height: 35rpx;
	display: block;
}
.goods-video video{
	height: 400rpx;
	width: 100%;
}
/* 所属分类 */
.sort-title text:nth-child(1){
	flex: 1;
}
.sort-title text:nth-child(2){
	padding-right: 20rpx;
}
/* 价格，库存 */
.price-stock view{
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 20rpx;
}
.price-stock view:nth-child(1){
	padding-bottom: 20rpx;
}
.price-stock text:nth-child(1){
	flex: 1;
}
.price-stock input{
	padding: 0 20rpx;
	text-align: right;
}
.I-style{
	color: #a8a8a8;
	font-size: 28rpx !important;
}
/* 规格 */
.specs-view{
	background-color: #FFFFFF;
	margin: 40rpx 20rpx;
	border-radius: 8rpx;
}
.specs-title image{
	width: 35rpx;
	height: 35rpx;
	display: block;
}
.specs-title{
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 20rpx;
	font-weight: bold;
}
.specs-image image{
	width: 100%;
	height: 100%;
	display: block;
	border-radius: 8rpx;
}
.specs-image{
	padding: 20rpx;
}
.detail-image{
	position: relative;
}
.detail-image image:nth-child(1){
	width: 100%;
	height: 100%;
	display: block;
}
.detail-image image:nth-child(2){
	width: 40rpx;
	height: 40rpx;
	position: absolute;
	top: 5rpx;
	right: 5rpx;
}
/* 已选规格 */
.S-flex{
	display: flex;
	align-items: center;
}
.S-flex image{
	width: 100rpx;
	height: 100rpx;
	display: block;
	border-radius: 8rpx;
}
.Se-specs{
	padding: 20rpx;
	border-bottom: 1rpx solid #e6e6e6;
}
.S-top{
	flex: 1;
}
.S-top view:nth-child(1){
	padding-bottom: 10rpx;
}
.S-right text{
	padding: 0 20rpx;
}
.S-stock{
	color: #c3c3c3;
}
.S-price{
	font-weight: bold;
}
/* 底部 */
.back{
	background-color: #fafafa !important;
	padding-top: 10rpx !important;
}
</style>