"use strict";
const common_vendor = require("../../common/vendor.js");
const Acc_config_init = require("../../Acc.config/init.js");
const Acc_config_media = require("../../Acc.config/media.js");
if (!Math) {
  Loading();
}
const Loading = () => "../public-view/loading.js";
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const popupShow = common_vendor.ref(false);
    const sort = common_vendor.ref([]);
    const getsort = async () => {
      const DB = await Acc_config_init.init();
      const res = await DB.database().collection("good_sort").limit(10).get();
      console.log(res, "====>getsort");
      sort.value = res.data;
    };
    common_vendor.onMounted(() => {
      getsort();
    });
    const submitParams = common_vendor.reactive({
      sort_name: "",
      // 分类名称
      quantity: 0
      // 数量
    });
    const submit = async () => {
      if (!submitParams.sort_name) {
        new Acc_config_media.Feedback("请输入分类", "none").toast();
        return;
      }
      const DB = await Acc_config_init.init();
      const query_data = await DB.database().collection("good_sort").where({ sort_name: submitParams.sort_name }).get();
      if (query_data.data.length > 0) {
        new Acc_config_media.Feedback("已经存在该分类").toast();
        return;
      }
      const res = await DB.database().collection("good_sort").add({ data: submitParams });
      sort.value.push({ _id: res._id, ...submitParams });
      submitParams.sort_name = "";
      popupShow.value = false;
    };
    const current_page = common_vendor.ref(0);
    const loading = common_vendor.ref(false);
    common_vendor.onReachBottom(async () => {
      const DB = await Acc_config_init.init();
      const { total } = await DB.database().collection("good_sort").count();
      if (sort.value.length === total)
        return;
      current_page.value++;
      loading.value = true;
      const skip = current_page.value * 10;
      const res = await DB.database().collection("good_sort").limit(10).skip(skip).get();
      sort.value = [...sort.value, ...res.data];
      loading.value = false;
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: sort.value.length
      }, sort.value.length ? {} : {}, {
        b: common_vendor.f(sort.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item.sort_name),
            b: index
          };
        }),
        c: !sort.value.length
      }, !sort.value.length ? {} : {}, {
        d: common_vendor.o(($event) => popupShow.value = false),
        e: submitParams.sort_name,
        f: common_vendor.o(($event) => submitParams.sort_name = $event.detail.value),
        g: common_vendor.o(submit),
        h: popupShow.value,
        i: loading.value
      }, loading.value ? {} : {}, {
        j: common_vendor.o(($event) => popupShow.value = true)
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-0a7dcaf5"], ["__file", "/Users/zhangshuangli/前端与开发/uniappProjects/lingshi-admin/pages/sort-admin/index.vue"]]);
wx.createPage(MiniProgramPage);
