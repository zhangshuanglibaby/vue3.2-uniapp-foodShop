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
exports.Feedback = Feedback;
