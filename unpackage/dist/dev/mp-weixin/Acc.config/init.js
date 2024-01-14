"use strict";
const common_vendor = require("../common/vendor.js");
const init = () => {
  return new Promise(async (resolve, reject) => {
    var res = new common_vendor.wx$1.cloud.Cloud({
      // 用户端 AppID
      resourceAppid: "wxb291709066ce50a8",
      // 用户端环境 ID
      resourceEnv: "lingshi-user-9glok7ugaf1b08c2"
    });
    await res.init();
    await res.callFunction({
      name: "cloudbase_auth",
      data: {}
    });
    resolve(res);
  });
};
exports.init = init;
