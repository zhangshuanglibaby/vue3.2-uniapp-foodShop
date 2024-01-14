"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const popupShow = common_vendor.ref(false);
    common_vendor.onMounted(() => {
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(($event) => popupShow.value = false),
        b: popupShow.value,
        c: common_vendor.o(($event) => popupShow.value = true)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-0a7dcaf5"], ["__file", "/Users/zhangshuangli/前端与开发/uniappProjects/lingshi-admin/pages/sort-admin/index.vue"]]);
wx.createPage(MiniProgramPage);
