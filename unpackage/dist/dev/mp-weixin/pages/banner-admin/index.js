"use strict";
const common_vendor = require("../../common/vendor.js");
const Acc_config_media = require("../../Acc.config/media.js");
const Acc_config_init = require("../../Acc.config/init.js");
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const show = common_vendor.ref(false);
    const bannerData = common_vendor.ref([]);
    const getBannerData = async () => {
      const DB = await Acc_config_init.init();
      const { data } = await DB.database().collection("banner").get();
      bannerData.value = data;
      console.log(bannerData.value, "====>bannerData.value");
    };
    common_vendor.onMounted(() => {
      getBannerData();
    });
    const banner_cover = common_vendor.ref("");
    const uploadImage = async () => {
      const res = await new Acc_config_media.Upload().image();
      common_vendor.wx$1.showLoading({ title: "正在上传" });
      const url = await new Acc_config_media.Upload().cloud(res[0].tempFilePath);
      banner_cover.value = url;
      common_vendor.wx$1.hideLoading();
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: bannerData.value.length
      }, bannerData.value.length ? {
        b: common_vendor.f(bannerData.value, (item, index, i0) => {
          return {
            a: item.banner_cover,
            b: index
          };
        })
      } : {}, {
        c: common_vendor.o(($event) => show.value = true),
        d: common_vendor.o(($event) => show.value = false),
        e: !banner_cover.value
      }, !banner_cover.value ? {
        f: common_vendor.o(uploadImage)
      } : {
        g: banner_cover.value,
        h: common_vendor.o(($event) => banner_cover.value = "")
      }, {
        i: show.value
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/zhangshuangli/前端与开发/uniappProjects/lingshi-admin/pages/banner-admin/index.vue"]]);
wx.createPage(MiniProgramPage);
