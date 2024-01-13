"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const search_data = common_vendor.reactive({
      s_height: 0,
      // 胶囊按钮的高度
      s_top: 0,
      // 胶囊按钮距离顶部的距离
      profit_height: 0,
      // 收益板块的高度
      plate: [
        // 九宫格desc
        { image: "/static/detail/hengfu.svg", name: "横幅管理" },
        { image: "/static/detail/miaosha.svg", name: "秒杀管理" },
        { image: "/static/detail/shangpin.svg", name: "商品管理" },
        { image: "/static/detail/dingdan.svg", name: "订单管理" },
        { image: "/static/detail/fenlei.svg", name: "分类管理" }
      ]
    });
    const { s_height, s_top, plate } = common_vendor.toRefs(search_data);
    const getMenuButtonBoundingClientRect = () => {
      const { height, top } = common_vendor.index.getMenuButtonBoundingClientRect();
      Object.assign(search_data, { s_height: height, s_top: top });
    };
    const profitViewTop = common_vendor.computed(() => {
      return search_data.s_height + search_data.s_top + 20;
    });
    const getProfitViewHeight = () => {
      const query = common_vendor.index.createSelectorQuery();
      query.select(".profit-view").boundingClientRect();
      query.exec((res) => {
        search_data.profit_height = res[0].height;
        console.log(search_data.profit_height, "===>search_data.profit_height");
      });
    };
    const gonggeTop = common_vendor.computed(() => {
      console.log(profitViewTop.value, "===>profitViewTop");
      return profitViewTop.value + search_data.profit_height + 10;
    });
    common_vendor.onMounted(() => {
      getMenuButtonBoundingClientRect();
      getProfitViewHeight();
    });
    return (_ctx, _cache) => {
      return {
        a: `${common_vendor.unref(s_top)}px`,
        b: `${common_vendor.unref(s_height)}px`,
        c: `${common_vendor.unref(s_height)}px`,
        d: `${common_vendor.unref(profitViewTop)}px`,
        e: common_vendor.f(common_vendor.unref(plate), (item, index, i0) => {
          return {
            a: item.image,
            b: common_vendor.t(item.name)
          };
        }),
        f: `${common_vendor.unref(gonggeTop)}px`
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/zhangshuangli/前端与开发/uniappProjects/lingshi-admin/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
