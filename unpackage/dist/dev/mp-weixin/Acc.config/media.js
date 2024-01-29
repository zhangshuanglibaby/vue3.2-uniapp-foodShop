"use strict";
const common_vendor = require("../common/vendor.js");
const Acc_config_init = require("./init.js");
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
  // 上传图片到云存储
  async cloud(url) {
    const targetIndex = url.lastIndexOf(".");
    const eximg = url.slice(targetIndex);
    const cloudPath = `${Date.now()}-${Math.floor(Math.random(0, 1) * 1e7)}${eximg}`;
    const DB = await Acc_config_init.init();
    return new Promise((resolve, reject) => {
      DB.uploadFile({
        cloudPath: `media/${cloudPath}`,
        filePath: url,
        success: async (res) => {
          const file_url = await DB.getTempFileURL({ fileList: [res.fileID] });
          resolve(file_url.fileList[0].tempFileURL);
        },
        fail: (err) => {
          console.log(err, "====>err");
          reject(err);
        }
      });
    });
  }
  // 多图上传到云存储
  multipleCloud(list) {
    let file_url = [];
    return new Promise((resolve, reject) => {
      list.forEach(async (url) => {
        const res_url = await this.cloud(url);
        file_url.push(res_url);
        if (file_url.length === list.length) {
          resolve(file_url);
        }
      });
    });
  }
  // 预览图片
  preview(image, arr) {
    common_vendor.wx$1.previewImage({
      current: image,
      // 当前显示图片的http链接
      urls: arr
      // 需要预览的图片http链接列表
    });
  }
}
exports.Feedback = Feedback;
exports.Upload = Upload;
