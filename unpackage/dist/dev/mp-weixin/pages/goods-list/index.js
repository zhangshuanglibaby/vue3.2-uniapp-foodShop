"use strict";
const common_vendor = require("../../common/vendor.js");
const Acc_config_init = require("../../Acc.config/init.js");
const Acc_config_answer = require("../../Acc.config/answer.js");
if (!Math) {
  Loading();
}
const Loading = () => "../public-view/loading.js";
const _sfc_main = {
  __name: "index",
  setup(__props) {
    let fieldOb = {
      goods_cover: true,
      goods_price: true,
      goods_title: true,
      seckill: true,
      video_url: true
    };
    const goodsList = common_vendor.ref([]);
    const getGoods = async () => {
      const DB = await Acc_config_init.init();
      const { data } = await DB.database().collection("goods").where({ shelves: true }).field(fieldOb).limit(10).get();
      console.log(data, "====>Data");
      goodsList.value = data;
    };
    common_vendor.onMounted(() => {
      getGoods();
    });
    const current_page = common_vendor.ref(0);
    const loading = common_vendor.ref(false);
    common_vendor.onReachBottom(async () => {
      const DB = await Acc_config_init.init();
      const { total } = await DB.database().collection("goods").where({ shelves: true }).count();
      if (goodsList.value.length === total)
        return;
      current_page.value++;
      loading.value = true;
      const skip = current_page.value * 10;
      const res = await DB.database().collection("goods").where({ shelves: true }).limit(10).skip(skip).get();
      goodsList.value = [...goodsList.value, ...res.data];
      loading.value = false;
    });
    const selectGood = (item) => {
      Acc_config_answer.relative_good.value = item;
      common_vendor.wx$1.navigateBack({ delta: 1 });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.f(goodsList.value, (item, index, i0) => {
          return {
            a: item.goods_cover,
            b: common_vendor.t(item.goods_title),
            c: common_vendor.t(item.goods_price),
            d: index,
            e: common_vendor.o(($event) => selectGood(item), index)
          };
        }),
        b: !goodsList.value.length
      }, !goodsList.value.length ? {} : {}, {
        c: loading.value
      }, loading.value ? {} : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-73fa3078"], ["__file", "/Users/zhangshuangli/前端与开发/uniappProjects/lingshi-admin/pages/goods-list/index.vue"]]);
wx.createPage(MiniProgramPage);
