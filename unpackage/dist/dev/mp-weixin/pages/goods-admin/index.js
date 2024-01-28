"use strict";
const common_vendor = require("../../common/vendor.js");
const Acc_config_answer = require("../../Acc.config/answer.js");
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const jumpToSpecs = () => {
      common_vendor.wx$1.navigateTo({ url: "/pages/specs/index" });
    };
    const specs_data = common_vendor.ref([]);
    common_vendor.watch(() => Acc_config_answer.sku_val.value, (newVal, oldVal) => {
      console.log(newVal, "====>specs_data");
      specs_data.value = newVal;
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(jumpToSpecs),
        b: !specs_data.value.length
      }, !specs_data.value.length ? {} : {
        c: common_vendor.f(specs_data.value, (item, index, i0) => {
          return {
            a: item.image,
            b: common_vendor.f(item.att_data, (attr, attr_index, i1) => {
              return {
                a: common_vendor.t(attr.att_value),
                b: attr_index
              };
            }),
            c: common_vendor.t(item.stock),
            d: common_vendor.t(item.price),
            e: index
          };
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/zhangshuangli/前端与开发/uniappProjects/lingshi-admin/pages/goods-admin/index.vue"]]);
wx.createPage(MiniProgramPage);
