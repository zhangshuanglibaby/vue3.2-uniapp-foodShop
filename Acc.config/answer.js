// ==========【 一些公用的响应式传值 】==========

import { ref } from "vue";

// 添加规格 -> 创建规格后携带值返回上一页
let sku_val = ref([]);

export { sku_val };