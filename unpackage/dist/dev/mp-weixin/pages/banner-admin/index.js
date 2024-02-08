"use strict";
const common_vendor = require("../../common/vendor.js");
const Acc_config_media = require("../../Acc.config/media.js");
const Acc_config_init = require("../../Acc.config/init.js");
const Acc_config_answer = require("../../Acc.config/answer.js");
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
    const jumpPage = () => {
      common_vendor.wx$1.navigateTo({ url: "/pages/goods-list/index" });
    };
    const submit = () => {
      if (!banner_cover.value) {
        new Acc_config_media.Feedback("请上传banner").toast();
        return;
      }
      if (!Acc_config_answer.relative_good.value._id) {
        new Acc_config_media.Feedback("请关联商品").toast();
        return;
      }
      database();
    };
    const initData = () => {
      banner_cover.value = "";
      Acc_config_answer.relative_good.value = {};
    };
    const database = async () => {
      try {
        let params = {
          banner_cover: banner_cover.value,
          goods_id: Acc_config_answer.relative_good.value._id,
          video_url: Acc_config_answer.relative_good.video_url
        };
        common_vendor.wx$1.showLoading({ title: "提交中" });
        const DB = await Acc_config_init.init();
        const { data } = await DB.database().collection("banner").add({ data: params });
        common_vendor.wx$1.hideLoading();
        show.value = false;
        initData();
        getBannerData();
      } catch (e) {
        console.log(e);
      }
    };
    const deleteBanner = async (id, index) => {
      const DB = await Acc_config_init.init();
      await DB.database().collection("banner").doc(id).remove();
      bannerData.value.splice(index, 1);
      new Acc_config_media.Feedback("删除成功", "success").toast();
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: bannerData.value.length
      }, bannerData.value.length ? {
        b: common_vendor.f(bannerData.value, (item, index, i0) => {
          return {
            a: item.banner_cover,
            b: common_vendor.o(($event) => deleteBanner(item._id, index), index),
            c: index
          };
        })
      } : {}, {
        c: common_vendor.o(($event) => show.value = true),
        d: common_vendor.o(($event) => show.value = false),
        e: common_vendor.o(submit),
        f: !banner_cover.value
      }, !banner_cover.value ? {
        g: common_vendor.o(uploadImage)
      } : {
        h: banner_cover.value,
        i: common_vendor.o(($event) => banner_cover.value = "")
      }, {
        j: common_vendor.t(common_vendor.unref(Acc_config_answer.relative_good).goods_title ? common_vendor.unref(Acc_config_answer.relative_good).goods_title : "添加"),
        k: common_vendor.o(jumpPage),
        l: show.value
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/zhangshuangli/前端与开发/uniappProjects/lingshi-admin/pages/banner-admin/index.vue"]]);
wx.createPage(MiniProgramPage);
