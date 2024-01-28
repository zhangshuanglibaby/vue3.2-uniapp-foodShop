"use strict";
const common_vendor = require("../../common/vendor.js");
const Acc_config_media = require("../../Acc.config/media.js");
const Acc_config_answer = require("../../Acc.config/answer.js");
require("../../Acc.config/init.js");
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const popupShow = common_vendor.ref(false);
    const sku_data = common_vendor.ref([
      // 规格生成数据
      {
        att_data: [],
        // 属性 att_name  att_value
        price: "",
        // 价钱
        stock: "",
        // 库存
        image: ""
        // 规格图
      }
    ]);
    const sto_att = common_vendor.ref([
      // 创建的属性
      { attr: "", title: 1 },
      { attr: "", title: 2 },
      { attr: "", title: 3 }
    ]);
    const skuCheckboxList = common_vendor.ref([]);
    const submitSkuAttr = () => {
      skuCheckboxList.value = sto_att.value.filter((item) => item.attr).map((item) => {
        return {
          value: item.attr,
          checked: true
        };
      });
      popupShow.value = false;
      calSku();
    };
    const checkedSkuValue = common_vendor.computed(() => {
      return skuCheckboxList.value.filter((item) => item.checked).map((item) => item.value);
    });
    const calSku = () => {
      for (const item of sku_data.value) {
        const att_data = checkedSkuValue.value.map((att_name) => {
          const target = item.att_data.find((att) => att.att_name === att_name);
          return { att_name, att_value: target && target.att_value || "" };
        });
        item.att_data = att_data;
      }
    };
    const onChangeSku = (e) => {
      const valueArr = e.detail.value;
      for (const item of skuCheckboxList.value) {
        item.checked = valueArr.includes(item.value);
      }
      calSku();
    };
    const newSpecs = () => {
      const att_data = skuCheckboxList.value.filter((item) => item.checked).map((item) => {
        return { att_name: item.value, att_value: "" };
      });
      const newAttData = {
        att_data,
        price: "",
        stock: "",
        image: ""
      };
      sku_data.value.push(newAttData);
    };
    const deleteSpecs = (index) => {
      sku_data.value.splice(index, 1);
    };
    const upload = async (index) => {
      try {
        const local = await new Acc_config_media.Upload().image();
        common_vendor.wx$1.showLoading({ title: "上传中", mask: true });
        const imageUrl = await new Acc_config_media.Upload().cloud(local[0].tempFilePath);
        sku_data.value[index].image = imageUrl;
        common_vendor.wx$1.hideLoading();
      } catch (e) {
        common_vendor.wx$1.hideLoading();
        new Acc_config_media.Feedback("上传失败").toast();
      }
    };
    const deleteImage = (index) => {
      sku_data.value[index].image = "";
    };
    const previewImage = (image) => {
      new Acc_config_media.Upload().preview(image, [image]);
    };
    const back = () => {
      common_vendor.wx$1.navigateBack({ delta: 1 });
    };
    const validate = () => {
      if (!checkedSkuValue.value.length) {
        new Acc_config_media.Feedback("请完善规格设置").toast();
        return false;
      }
      const priceFlag = sku_data.value.every((item) => item.price);
      const stockFlag = sku_data.value.every((item) => item.stock);
      const imageFlag = sku_data.value.every((item) => item.image);
      let attDataArr = [];
      sku_data.value.map((item) => {
        attDataArr = attDataArr.concat([...item.att_data]);
      });
      console.log(attDataArr, "===>attDataArr");
      const attValueFlag = attDataArr.every((item) => item.att_value);
      console.log(attValueFlag, "====》attValueFlag");
      if (!priceFlag || !stockFlag || !imageFlag || !attValueFlag) {
        new Acc_config_media.Feedback("请完善规格设置").toast();
        return false;
      }
      return true;
    };
    const submit = () => {
      const valid = validate();
      if (!valid)
        return;
      for (const item of sku_data.value) {
        item.price = Number(item.price);
        item.stock = Number(item.stock);
      }
      Acc_config_answer.sku_val.value = sku_data.value;
      back();
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(($event) => popupShow.value = true),
        b: common_vendor.f(skuCheckboxList.value, (item, index, i0) => {
          return {
            a: item.checked,
            b: item.value,
            c: common_vendor.t(item.value),
            d: index
          };
        }),
        c: common_vendor.o(onChangeSku),
        d: common_vendor.f(sku_data.value, (item, index, i0) => {
          return common_vendor.e({
            a: common_vendor.t(index + 1)
          }, sku_data.value.length > 1 ? {
            b: common_vendor.o(($event) => deleteSpecs(index), index)
          } : {}, {
            c: common_vendor.f(item.att_data, (item_add, item_index, i1) => {
              return {
                a: common_vendor.t(item_add.att_name),
                b: `请输入${item_add.att_name}`,
                c: item_add.att_value,
                d: common_vendor.o(($event) => item_add.att_value = $event.detail.value, item_index),
                e: item_index
              };
            }),
            d: item.price,
            e: common_vendor.o(($event) => item.price = $event.detail.value, index),
            f: item.stock,
            g: common_vendor.o(($event) => item.stock = $event.detail.value, index),
            h: !item.image
          }, !item.image ? {
            i: common_vendor.o(($event) => upload(index), index)
          } : {}, {
            j: item.image,
            k: common_vendor.o(($event) => previewImage(item.image), index),
            l: item.image
          }, item.image ? {
            m: common_vendor.o(($event) => deleteImage(index), index)
          } : {}, {
            n: index
          });
        }),
        e: sku_data.value.length > 1,
        f: common_vendor.o(newSpecs),
        g: common_vendor.o(($event) => popupShow.value = false),
        h: common_vendor.o(submitSkuAttr),
        i: common_vendor.f(sto_att.value, (item, index, i0) => {
          return {
            a: common_vendor.t(index + 1),
            b: item.attr,
            c: common_vendor.o(($event) => item.attr = $event.detail.value, index),
            d: index
          };
        }),
        j: popupShow.value,
        k: common_vendor.o(back),
        l: common_vendor.o(submit)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/zhangshuangli/前端与开发/uniappProjects/lingshi-admin/pages/specs/index.vue"]]);
wx.createPage(MiniProgramPage);
