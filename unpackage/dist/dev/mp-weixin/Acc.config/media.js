"use strict";
const common_vendor = require("../common/vendor.js");
class Feedback {
  constructor(title, icon = "error") {
    this.title = title;
    this.icon = icon;
  }
  toast() {
    common_vendor.wx$1.showToast({
      title: this.title,
      icon: this.icon,
      duration: 800,
      mask: true
    });
  }
}
class Upload {
  // 上传本地图片
  image(count = 1, type = "image") {
    return new Promise((resolve, reject) => {
      common_vendor.wx$1.chooseMedia({
        count,
        mediaType: [type],
        sourceType: ["album"],
        success(res) {
          resolve(res.tempFiles);
        },
        fail(err) {
          reject(err);
        }
      });
    });
  }
}
exports.Feedback = Feedback;
exports.Upload = Upload;
