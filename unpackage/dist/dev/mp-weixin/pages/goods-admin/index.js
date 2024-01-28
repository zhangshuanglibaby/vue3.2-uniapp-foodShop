"use strict";
const common_vendor = require("../../common/vendor.js");
const Acc_config_answer = require("../../Acc.config/answer.js");
const Acc_config_media = require("../../Acc.config/media.js");
const Acc_config_init = require("../../Acc.config/init.js");
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const goods_title = common_vendor.ref("");
    const banner_imgs = common_vendor.ref([]);
    const uploadBanner = async () => {
      const local = await new Acc_config_media.Upload().image(9);
      const url_arr = local.map((item) => item.tempFilePath);
      banner_imgs.value = [...banner_imgs.value, ...url_arr];
    };
    const deleteBanner = (index) => {
      banner_imgs.value.splice(index, 1);
    };
    const previewBanner = (url) => {
      new Acc_config_media.Upload().preview(url, banner_imgs.value);
    };
    const video_url = common_vendor.ref("");
    const uploadVideo = async () => {
      const local = await new Acc_config_media.Upload().image(1, "video");
      console.log(local, "===>local");
      video_url.value = local[0].tempFilePath;
    };
    const deleteVideo = () => {
      video_url.value = "";
    };
    const sortData = common_vendor.reactive({
      sort_options: [],
      // 分类选项数据
      sort_name: "",
      // 当前选中的分类名称
      sort_id: ""
      // 当前选中的分类id
    });
    const getSortOptions = async () => {
      const DB = await Acc_config_init.init();
      const { data } = await DB.database().collection("good_sort").field({ _openid: false }).get();
      sortData.sort_options = data;
      console.log(sortData.sort_options, "===>sortData.sort_options");
    };
    common_vendor.onMounted(() => {
      getSortOptions();
    });
    const changeSort = (event) => {
      const index = event.detail.value;
      const currentSort = sortData.sort_options[index];
      Object.assign(sortData, { sort_name: currentSort.sort_name, sort_id: currentSort._id });
    };
    const jumpToSpecs = () => {
      common_vendor.wx$1.navigateTo({ url: "/pages/specs/index" });
    };
    const specs_data = common_vendor.ref([]);
    common_vendor.watch(() => Acc_config_answer.sku_val.value, (newVal, oldVal) => {
      console.log(newVal, "====>specs_data");
      specs_data.value = newVal.sort((a, b) => a.price - b.price);
    });
    const miniPrice = common_vendor.computed(() => {
      if (specs_data.value.length) {
        return specs_data.value[0].price;
      }
      return 0;
    });
    const totalStock = common_vendor.computed(() => {
      return specs_data.value.reduce((cur, next) => cur + next.stock, 0);
    });
    const detail_imgs = common_vendor.ref([]);
    const uploadDetail = async () => {
      const local = await new Acc_config_media.Upload().image(9);
      const url_arr = local.map((item) => item.tempFilePath);
      detail_imgs.value = [...detail_imgs.value, ...url_arr];
    };
    const deleteDetail = (index) => {
      detail_imgs.value.splice(index, 1);
    };
    const previewDetail = (url) => {
      new Acc_config_media.Upload().preview(url, detail_imgs.value);
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: goods_title.value,
        b: common_vendor.o(($event) => goods_title.value = $event.detail.value),
        c: banner_imgs.value.length
      }, banner_imgs.value.length ? {
        d: common_vendor.f(banner_imgs.value, (url, index, i0) => {
          return {
            a: url,
            b: common_vendor.o(($event) => previewBanner(url), index),
            c: common_vendor.o(($event) => deleteBanner(index), index),
            d: index
          };
        })
      } : {}, {
        e: common_vendor.o(uploadBanner),
        f: common_vendor.o(deleteVideo),
        g: !video_url.value
      }, !video_url.value ? {
        h: common_vendor.o(uploadVideo)
      } : {
        i: video_url.value
      }, {
        j: common_vendor.t(sortData.sort_name),
        k: sortData.sort_options,
        l: common_vendor.o(changeSort),
        m: common_vendor.unref(miniPrice),
        n: common_vendor.unref(totalStock),
        o: common_vendor.o(jumpToSpecs),
        p: !specs_data.value.length
      }, !specs_data.value.length ? {} : {
        q: common_vendor.f(specs_data.value, (item, index, i0) => {
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
      }, {
        r: common_vendor.f(detail_imgs.value, (url, index, i0) => {
          return {
            a: common_vendor.o(($event) => previewDetail(url), index),
            b: common_vendor.o(($event) => deleteDetail(index), index),
            c: index
          };
        }),
        s: common_vendor.o(uploadDetail)
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/zhangshuangli/前端与开发/uniappProjects/lingshi-admin/pages/goods-admin/index.vue"]]);
wx.createPage(MiniProgramPage);
