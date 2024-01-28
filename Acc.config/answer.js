// ==========【 一些公用的响应式传值 】==========

import { ref } from "vue";

// 添加规格 -> 创建规格后携带值返回上一页
let sku_val = ref([]); // 存储的规格数据
let sku_checkbox_list = ref([]); // 记录的规格属性多选框

export { sku_val, sku_checkbox_list };