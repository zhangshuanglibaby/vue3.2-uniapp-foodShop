"use strict";
const common_vendor = require("../../common/vendor.js");
const Acc_config_init = require("../../Acc.config/init.js");
const Acc_config_media = require("../../Acc.config/media.js");
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const popupShow = common_vendor.ref(false);
    const data = common_vendor.reactive({
      sort: [],
      // 分类数据
      sort_name: ""
      // 分类名称
    });
    const { sort, sort_name } = common_vendor.toRefs(data);
    const getsort = async () => {
      const DB = await Acc_config_init.init();
      const res = await DB.database().collection("good_sort").limit(10).get();
      data.sort = res.data;
    };
    common_vendor.onMounted(() => {
      getsort();
    });
    const submit = () => {
      if (!data.sort_name) {
        new Acc_config_media.Feedback("请输入分类", "none").toast();
        return;
      }
      console.log(data.sort_name);
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(sort).length
      }, common_vendor.unref(sort).length ? {} : {}, {
        b: common_vendor.f(common_vendor.unref(sort), (item, index, i0) => {
          return {
            a: common_vendor.t(item.sort_name),
            b: index
          };
        }),
        c: !common_vendor.unref(sort).length
      }, !common_vendor.unref(sort).length ? {} : {}, {
        d: common_vendor.o(($event) => popupShow.value = false),
        e: common_vendor.unref(sort_name),
        f: common_vendor.o(($event) => common_vendor.isRef(sort_name) ? sort_name.value = $event.detail.value : null),
        g: common_vendor.o(submit),
        h: popupShow.value,
        i: common_vendor.o(($event) => popupShow.value = true)
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-0a7dcaf5"], ["__file", "/Users/zhangshuangli/前端与开发/uniappProjects/lingshi-admin/pages/sort-admin/index.vue"]]);
wx.createPage(MiniProgramPage);
