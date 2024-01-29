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
    const miniPrice = common_vendor.ref(0);
    const totalStock = common_vendor.ref(0);
    common_vendor.watch(() => Acc_config_answer.sku_val.value, (newVal, oldVal) => {
      console.log(newVal, "====>specs_data");
      specs_data.value = newVal.sort((a, b) => a.price - b.price);
      miniPrice.value = specs_data.value[0].price;
      totalStock.value = specs_data.value.reduce((cur, next) => cur + next.stock, 0);
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
    const valid_message = {
      goods_title: "请输入商品标题",
      goods_banner: "请上传商品图片",
      category: "请选择商品分类",
      goods_price: "请输入价格",
      stock: "请输入库存",
      goods_details: "请上传商品详情"
    };
    const submit = async () => {
      const require_field = {
        goods_title: goods_title.value,
        // 商品标题
        goods_banner: banner_imgs.value,
        // 横幅banner
        category: sortData.sort_name,
        // 商品分类
        goods_price: miniPrice.value,
        // 价格
        stock: totalStock.value,
        // 库存
        goods_details: detail_imgs.value
        // 商品详情
      };
      const require_keys = Object.keys(require_field);
      for (const key of require_keys) {
        if (Array.isArray(require_field[key]) && !require_field[key].length) {
          new Acc_config_media.Feedback(valid_message[key]).toast();
          return;
        }
        if (!require_field[key]) {
          new Acc_config_media.Feedback(valid_message[key]).toast();
          return;
        }
      }
      console.log("通过校验");
      database();
    };
    const database = async () => {
      common_vendor.wx$1.showLoading({ title: "上传中", mask: true });
      const goods_banner = await new Acc_config_media.Upload().multipleCloud(banner_imgs.value);
      const goods_details = await new Acc_config_media.Upload().multipleCloud(detail_imgs.value);
      const video_url2 = "";
      if (video_url2.value) {
        video_url2 = await new Acc_config_media.Upload().cloud(video_url2.value);
      }
      const params = {
        goods_title: goods_title.value,
        // 商品标题
        goods_price: Number(miniPrice.value),
        // 价格
        stock: Number(totalStock.value),
        // 库存
        category: sortData.sort_name,
        // 商品分类
        goods_banner,
        goods_cover: goods_banner[0],
        // 默认取第一张商品横幅图作为封面图
        goods_details,
        video_url: video_url2,
        sku: !!specs_data.value.length,
        sold: 0,
        shelves: true,
        // 默认产品上架
        seckill: false
        // 默认商品不参与秒杀
      };
      try {
        const DB = await Acc_config_init.init();
        const good_res = await DB.database().collection("goods").add({ data: params });
        if (params.sku) {
          await DB.database().collection("goods_sku").add({ data: { _id: good_res._id, sku: specs_data.value } });
        }
        if (params.category) {
          const _ = DB.database().command;
          await DB.database().collection("good_sort").doc(sortData.sort_id).update({ data: { quantity: _.inc(1) } });
        }
        new Acc_config_media.Feedback("上传成功", "success").toast();
      } catch (e) {
        console.log(e, "====>error");
        new Acc_config_media.Feedback("提交失败").toast();
      }
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
        m: specs_data.value.length,
        n: miniPrice.value,
        o: common_vendor.o(($event) => miniPrice.value = $event.detail.value),
        p: specs_data.value.length,
        q: totalStock.value,
        r: common_vendor.o(($event) => totalStock.value = $event.detail.value),
        s: common_vendor.o(jumpToSpecs),
        t: !specs_data.value.length
      }, !specs_data.value.length ? {} : {
        v: common_vendor.f(specs_data.value, (item, index, i0) => {
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
        w: common_vendor.f(detail_imgs.value, (url, index, i0) => {
          return {
            a: url,
            b: common_vendor.o(($event) => previewDetail(url), index),
            c: common_vendor.o(($event) => deleteDetail(index), index),
            d: index
          };
        }),
        x: common_vendor.o(uploadDetail),
        y: common_vendor.o(submit)
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/zhangshuangli/前端与开发/uniappProjects/lingshi-admin/pages/goods-admin/index.vue"]]);
wx.createPage(MiniProgramPage);
