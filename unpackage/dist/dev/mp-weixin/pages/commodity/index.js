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
    const currentSortIndex = common_vendor.ref(0);
    const goodSortData = common_vendor.ref([]);
    const getGoodSort = async () => {
      const DB = await Acc_config_init.init();
      const { data } = await DB.database().collection("good_sort").field({ _openid: false }).get();
      goodSortData.value = data;
    };
    const currentSortName = common_vendor.computed(() => {
      var _a;
      return ((_a = goodSortData.value[currentSortIndex.value]) == null ? void 0 : _a.sort_name) || "";
    });
    const goodsFields = {
      category: true,
      goods_cover: true,
      goods_price: true,
      goods_title: true,
      shelves: true,
      stock: true,
      _id: true
    };
    const goodsList = common_vendor.ref([]);
    const getGoodsList = async (category) => {
      const DB = await Acc_config_init.init();
      const { data } = await DB.database().collection("goods").where({ category }).field(goodsFields).limit(10).get();
      console.log(data, "=====>goodsList");
      goodsList.value = data;
    };
    common_vendor.onMounted(async () => {
      await getGoodSort();
      getGoodsList(currentSortName.value);
    });
    let pageNum = common_vendor.ref(0);
    const loading = common_vendor.ref(false);
    common_vendor.onReachBottom(async () => {
      const DB = await Acc_config_init.init();
      const { total } = await DB.database().collection("goods").where({ category: currentSortName.value }).count();
      if (goodsList.value.length === total)
        return;
      pageNum.value++;
      loading.value = true;
      const skip = pageNum.value * 10;
      const { data } = await DB.database().collection("goods").where({ category: currentSortName.value }).field(goodsFields).limit(10).skip(skip).get();
      goodsList.value = [...goodsList.value, ...data];
      loading.value = false;
    });
    const changeGoodSort = (index) => {
      currentSortIndex.value = index;
      pageNum.value = 0;
      getGoodsList(currentSortName.value);
    };
    const changeShelves = async (item, index) => {
      try {
        if (!item.shelves)
          return;
        const DB = await Acc_config_init.init();
        const _ = DB.database().command;
        await DB.database().collection("goods").doc(item._id).update({ data: { shelves: false } });
        await DB.database().collection("good_sort").where({ sort_name: currentSortName.value }).update({ data: { quantity: _.inc(-1) } });
        goodsList.value[index].shelves = false;
        new Acc_config_media.Feedback("下架成功", "success").toast();
      } catch (e) {
        new Acc_config_media.Feedback("下架失败", "error").toast();
      }
    };
    const jumpPage = (type) => {
      const callback = {
        "sort": () => {
          common_vendor.wx$1.navigateTo({ url: "/pages/sort-admin/index" });
        },
        "add-good": () => {
          common_vendor.wx$1.navigateTo({ url: "/pages/goods-admin/index" });
        }
      };
      callback[type]();
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.f(goodSortData.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item.sort_name),
            b: index,
            c: currentSortIndex.value === index ? 1 : "",
            d: common_vendor.o(($event) => changeGoodSort(index), index)
          };
        }),
        b: common_vendor.f(goodsList.value, (item, index, i0) => {
          return {
            a: item.goods_cover,
            b: common_vendor.t(item.goods_title),
            c: common_vendor.t(item.stock),
            d: common_vendor.t(item.goods_price),
            e: common_vendor.t(item.shelves ? "下架" : "已下架"),
            f: common_vendor.n(item.shelves ? "shelf-true" : "shelf-false"),
            g: common_vendor.o(($event) => changeShelves(item, index), index),
            h: index
          };
        }),
        c: loading.value
      }, loading.value ? {} : {}, {
        d: common_vendor.o(($event) => jumpPage("sort")),
        e: common_vendor.o(($event) => jumpPage("add-good"))
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-0cc0db6b"], ["__file", "/Users/zhangshuangli/前端与开发/uniappProjects/lingshi-admin/pages/commodity/index.vue"]]);
wx.createPage(MiniProgramPage);
