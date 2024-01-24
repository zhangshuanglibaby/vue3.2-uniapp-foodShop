"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const popupShow = common_vendor.ref(false);
    const sku_data = common_vendor.ref([
      // 规格生成数据
      {
        title: 1,
        att_data: [],
        // 属性 att_name  att_value
        price: "",
        // 价钱
        stock: "",
        // 库存
        image: ""
        // 规格图
      }
    ]);
    const sto_att = common_vendor.ref([
      // 创建的属性
      { attr: "", title: 1 },
      { attr: "", title: 2 },
      { attr: "", title: 3 }
    ]);
    const skuCheckboxList = common_vendor.ref([]);
    const submitSkuAttr = () => {
      skuCheckboxList.value = sto_att.value.filter((item) => item.attr).map((item) => {
        return {
          value: item.attr,
          checked: true
        };
      });
      popupShow.value = false;
      calSku();
    };
    const skuValue = common_vendor.computed(() => {
      return skuCheckboxList.value.filter((item) => item.checked).map((item) => {
        return { att_name: item.value, att_value: "" };
      });
    });
    const calSku = () => {
      for (const item of sku_data.value) {
        item.att_data = skuValue.value;
      }
      console.log(sku_data.value, "===>sku_data.value");
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(($event) => popupShow.value = true),
        b: common_vendor.f(skuCheckboxList.value, (item, index, i0) => {
          return {
            a: item.checked,
            b: item.value,
            c: common_vendor.t(item.value),
            d: index
          };
        }),
        c: common_vendor.f(sku_data.value, (item, index, i0) => {
          return common_vendor.e(sku_data.value.length ? {} : {}, {
            a: common_vendor.f(item.att_data, (item_add, item_index, i1) => {
              return {
                a: common_vendor.t(item_add.att_name),
                b: `请输入${item_add.att_name}`,
                c: common_vendor.o(($event) => item.att_value = $event.detail.value, item_index),
                d: item_index
              };
            }),
            b: item.att_value,
            c: item.price,
            d: common_vendor.o(($event) => item.price = $event.detail.value, index),
            e: item.stock,
            f: common_vendor.o(($event) => item.stock = $event.detail.value, index),
            g: !item.image
          }, !item.image ? {} : {}, {
            h: item.image,
            i: item.image
          }, item.image ? {} : {}, {
            j: index
          });
        }),
        d: sku_data.value.length,
        e: common_vendor.o(($event) => popupShow.value = false),
        f: common_vendor.o(submitSkuAttr),
        g: common_vendor.f(sto_att.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item.title),
            b: item.attr,
            c: common_vendor.o(($event) => item.attr = $event.detail.value, index),
            d: index
          };
        }),
        h: popupShow.value
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/zhangshuangli/前端与开发/uniappProjects/lingshi-admin/pages/specs/index.vue"]]);
wx.createPage(MiniProgramPage);
