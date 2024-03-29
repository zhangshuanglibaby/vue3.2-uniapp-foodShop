"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
if (!Math) {
  "./pages/banner-admin/index.js";
  "./pages/goods-list/index.js";
  "./pages/commodity/index.js";
  "./pages/goods-admin/index.js";
  "./pages/specs/index.js";
  "./pages/sort-admin/index.js";
  "./pages/index/index.js";
  "./pages/order/index.js";
}
const _sfc_main = {
  onLaunch: function() {
    console.log("App Launch");
  },
  onShow: function() {
    console.log("App Show");
  },
  onHide: function() {
    console.log("App Hide");
  }
};
const App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/zhangshuangli/前端与开发/uniappProjects/lingshi-admin/App.vue"]]);
function createApp() {
  const app = common_vendor.createSSRApp(App);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
