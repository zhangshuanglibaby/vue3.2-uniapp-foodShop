<template>
	<!-- 顶部 -->
	<view class="attribute">
		<view class="edit">
			<text>请给商品规格设置合适的属性</text>
			<text @click="popupShow = true">编辑</text>
		</view>
		<view class="checkbox">
			<checkbox-group style="display: flex;" @change="onChangeSku" >
				<label v-for="(item, index) in skuCheckboxList" :key="index">
					<checkbox :checked="item.checked" :value="item.value" color="#e96c56" />{{ item.value }}
				</label>
			</checkbox-group>
		</view>
	</view>
	<!-- 规格生成 -->
	<view v-for="(item, index) in sku_data" :key="index" class="attribute gener">
		<view class="edit specs-delete">
			<text>规格{{ index + 1 }}</text>
			<text v-if="sku_data.length > 1" @click="deleteSpecs(index)">删除</text>
		</view>
		<view v-for="(item_add, item_index) in item.att_data" :key="item_index" class="edit entry">
			<text>{{ item_add.att_name }}</text>
			<input v-model="item_add.att_value" type="text" :placeholder="`请输入${item_add.att_name}`" placeholder-class="I-style"  :cursor-spacing="50"/>
		</view>
		<view class="edit entry">
			<text>价格</text>
			<input v-model="item.price" type="number" placeholder="请输入价格" placeholder-class="I-style"  :cursor-spacing="50"/>
			<text>元</text>
		</view>
		<view class="edit entry">
			<text>库存</text>
			<input v-model="item.stock" type="number" placeholder="请输入库存" placeholder-class="I-style"  :cursor-spacing="50"/>
			<text>件</text>
		</view>
		<!-- 上传图片 -->
		<view class="specs-image">
			<image v-if="!item.image" src="/static/detail/shuxing-img.png" mode="aspectFill"  @click="upload(index)"></image>
			<image :src="item.image" mode="aspectFill" @click="previewImage(item.image)"></image>
			<image v-if="item.image" src="/static/detail/shanchu.svg" class="delete-img" mode="widthFix" @click="deleteImage(index)"></image>
		</view>
	</view>
	<!-- 添加规格 -->
	<view class="attribute new-specs" @click="newSpecs">
		<image src="/static/detail/jiahao.svg" mode="widthFix"></image>
		<text>规格</text>
	</view>
	<!-- 弹窗弹出设置属性 -->
	<page-container :show="popupShow">
		<view class="space-view">
			<view class="modify-sub">
				<image src="/static/detail/guanbi.svg" mode="widthFix" @click="popupShow = false"></image>
				<text>修改属性</text>
				<text @click="submitSkuAttr">提交</text>
			</view>
			<view  v-for="(item, index) in  sto_att" :key="index" class="att-input">
				<text>属性{{ index + 1}}</text>
				<input v-model="item.attr" placeholder="输入属性" placeholder-class="I-style" :cursor-spacing="50" />
			</view>
		</view>
	</page-container>
	<!-- 底部按钮 -->
	<div style="height:300rpx"></div>
	<view class="newly-added-view">
		<view class="Submit">
			<text @click="back">取消</text>
			<text @click="submit">提交</text>
		</view>
	</view>
</template>

<script setup>
	import { ref, computed } from "vue";
	import { onLoad } from "@dcloudio/uni-app";
	import { Feedback, Upload } from "@/Acc.config/media.js";
	import { sku_val, sku_checkbox_list } from "@/Acc.config/answer.js";
	
	const popupShow = ref(false); // 控制弹窗
	const sku_data = ref([ // 规格生成数据
			{
				att_data: [], // 属性 att_name  att_value
				price: '', // 价钱
				stock: '', // 库存
				image: '' // 规格图
			}
		])
	const sto_att = ref([ // 创建的属性
		{ attr: ''},
		{ attr: ''},
		{ attr: ''},
	])
	
	// 提交商品属性规格
	const skuCheckboxList = ref([]); // 存储商品规格多选列表
	const submitSkuAttr = () => {
		// 过滤值不为空的数据
		skuCheckboxList.value = sto_att.value.filter(item => item.attr).map(item => {
			return {
				value: item.attr,
				checked: true
			}
		});
		// 关闭弹窗
		popupShow.value = false;
		// 给每个规格生成sku
		calSku();
	}
	
	// ======【计算规格生成】=====
	// 勾选的规格属性值
	const checkedSkuValue = computed(() => {
		return skuCheckboxList.value.filter(item => item.checked).map(item => item.value);
	})
	
	// 计算规格属性生成
	const calSku = () => {
		for(const item of sku_data.value) {
			const att_data = checkedSkuValue.value.map(att_name => {
				const target = item.att_data.find(att => att.att_name === att_name);
				return { att_name, att_value: target && target.att_value || "" };
			})
			item.att_data = att_data;
		}
	}
	// 监听勾选规格属性
	const onChangeSku = (e) => {
		const valueArr = e.detail.value;
		for(const item of skuCheckboxList.value) {
			item.checked = valueArr.includes(item.value);
		}
		calSku();
	}
	
	// ======【 新增规格 】======
	const newSpecs = () => {
		const att_data = skuCheckboxList.value.filter(item => item.checked).map(item => {
			return { att_name: item.value, att_value: ''  }
		})
		const newAttData = {
			att_data,
			price: '',
			stock: '',
			image: ''
		}
		sku_data.value.push(newAttData);
	}
	// =====【 删除规格 】=======
	const deleteSpecs = (index) => {
		sku_data.value.splice(index, 1);
	}
	
	// ======【 上传图片 】======
	// 规格-上传图片到云存储
	const upload = async (index) => {
		try{
			const local = await new Upload().image(); // 获取上传图片的临时路径
			wx.showLoading({ title: "上传中", mask: true })
			const imageUrl = await new Upload().cloud(local[0].tempFilePath); // 获取上传到云存储的实际路径
			sku_data.value[index].image = imageUrl;
			wx.hideLoading()
		}catch(e){
			wx.hideLoading();
			new Feedback("上传失败").toast();
		}
	}
	// 规格 -删除图片
	const deleteImage = (index) => {
		sku_data.value[index].image = "";
	}
	// 规格 -预览图片
	const previewImage = (image) => {
		new Upload().preview(image, [image]);
	}
	
	// ====== 【 提交 】======
	// 返回上一页
	const back = () => {
		wx.navigateBack({ delta: 1 })
	}
	// 校验
	const validate = () => {
		// 如果没有选择规格
		if(!checkedSkuValue.value.length) {
			new Feedback("请完善规格设置").toast();
			return false;
		}
		const priceFlag = sku_data.value.every(item => item.price);
		const stockFlag = sku_data.value.every(item => item.stock);
		const imageFlag = sku_data.value.every(item => item.image);
		let attDataArr = [];
		sku_data.value.map(item  => {
			attDataArr = attDataArr.concat([...item.att_data])
		});
		console.log(attDataArr, "===>attDataArr");
		const attValueFlag = attDataArr.every(item => item.att_value);
		console.log(attValueFlag, "====》attValueFlag");
		if(!priceFlag || !stockFlag || !imageFlag || !attValueFlag) {
			new Feedback("请完善规格设置").toast();
			return false;
		}
		return true;
	}
	// 提交
	const submit = () => {
		const valid = validate();
		if(!valid) return;
		// 将字符串转成数字
		for(const item of sku_data.value) {
			item.price = Number(item.price);
			item.stock = Number(item.stock);
		}
		// 存储规格数据到公用的响应式传值文件中
		sku_val.value = sku_data.value;
		sku_checkbox_list.value = skuCheckboxList.value;
		// 返回上一页
		back();
	}
	
	// ====== 【 页面数据返显 】======
	const render = () => {
		// 查看存储在公用的响应式的规格数据是否有值
		if(sku_val.value.length) {
			console.log("11")
			// 让数据返显
			sku_data.value = sku_val.value;
		}
	
		if(sku_checkbox_list.value.length) {
			// 返显规格属性多选框
			skuCheckboxList.value = sku_checkbox_list.value;
			// 返显弹窗的创建属性值
			for(const index in skuCheckboxList.value) {
				sto_att.value[index].attr = skuCheckboxList.value[index].value;
			}
			// sto_att.value = skuCheckboxList.value.map(item => {
			// 	return { attr: item.value }
			// });
		}
		console.log("没有纸")
	}
	onLoad(() => {
		console.log("添加规格耶");
		render();
	})
</script>

<style>
page{
	background-color: #ededed;
}
.attribute{
	background-color: #f7f7f7;
	margin: 20rpx;
	padding: 20rpx 20rpx 0 20rpx;
	border-radius: 8rpx;
}
.edit{
	display: flex;
	align-items: center;
	justify-content: space-between;
}
.edit text:nth-child(1){
	color: #a8a8a8;
}
.edit text:nth-child(2){
	color: #616990;
}
.checkbox{
	display: flex;
	align-items: center;
	flex-wrap: wrap;
	padding-top: 20rpx;
}
.checkbox label{
	padding: 0 40rpx 20rpx 0;
}
/* 规格生成*/
.gener{
	background-color: #FFFFFF !important;
}
.specs-delete text:nth-child(1){
	color: #333333 !important;
	font-weight: bold;
}
.specs-delete{
	padding-bottom: 20rpx;
}
.entry{
	padding: 30rpx 0;
	border-bottom: 1rpx solid #f1f1f1;
}
.entry text{
	color: #333333 !important;
}
.entry text:nth-child(1){
	flex: 1;
}
.entry input{
	padding: 0 20rpx;
	text-align: right;
}
.I-style{
	color: #a8a8a8;
}
.specs-image{
	display: flex;
	justify-content: space-between;
}
.specs-image image{
	display: block;
	width: 150rpx;
	height: 150rpx;
	border-radius: 8rpx;
	padding: 20rpx 0;
}
.delete-img{
	width: 40rpx !important;
	height: 40rpx !important;
}
/* 新增规格 */
.new-specs image{
	width: 50rpx;
	height: 50rpx;
	margin-right: 20rpx;
}
.new-specs{
	display: flex;
	align-items: center;
	color: #5f698c;
	padding: 30rpx !important;
}
/* 修改属性 */
.att-input{
	display: flex;
	align-items: center;
	padding: 40rpx 0;
	border-bottom: 1rpx solid #e7e7e7;
}
.att-input text{
	flex: 1;
}
.att-input input{
	text-align: right;
}
/* 底部提交 */
.Submit{
	display: flex;
	align-items: center;
	justify-content: flex-end;
	margin: 10rpx 20rpx 68rpx 20rpx;
}
.Submit text{
	padding: 15rpx 60rpx;
	border-radius: 10rpx;
}
.Submit text:nth-child(1){
	background-color: #f7f7f7;
	color: #ce6b4e;
	margin-right: 30rpx;
}
.Submit text:nth-child(2){
	background-color: #ed6b51;
	color: #FFFFFF;
}
</style>