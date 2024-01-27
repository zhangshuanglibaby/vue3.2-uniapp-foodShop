import { init } from "./init.js"

// 及时反馈
class Feedback {
	constructor (title, icon = "error") {
		this.title = title;
		this.icon = icon;
	}
	
	toast () {
		wx.showToast({
		  title: this.title,
		  icon: this.icon,
		  duration: 800,
			mask: true
		})
	}
}

// 上传
class Upload {
	// 上传本地图片
	image(count = 1, type='image') {
		return new Promise((resolve, reject) => {
			wx.chooseMedia({
			  count,
			  mediaType: [type],
			  sourceType: ['album'],
			  success(res) {
					resolve(res.tempFiles);
			  },
				fail(err) {
					reject(err);
				}
			})
		})
	}

	// 上传图片到云存储
	async cloud(url) {
		// 将获取的路径，重新命名 时间戳+随机数字
		const targetIndex = url.lastIndexOf(".");
		const eximg = url.slice(targetIndex); // 获取后缀
		const cloudPath = `${Date.now()}-${Math.floor(Math.random(0,1)*10000000)}${eximg}`; // 构造地址
		const DB = await init();
		return new Promise((resolve, reject) => {
			// 先在微信开着工具 -> 云开发 -> 存储 -> 新建文件夹 -> media
			// 将本地资源上传至云存储空间
			DB.uploadFile({
				cloudPath: `media/${cloudPath}`,
				filePath: url,
				success: async (res) => {
					// 用云文件 ID 换取真实链接
					const file_url = await DB.getTempFileURL({ fileList: [res.fileID] });
					resolve(file_url.fileList[0].tempFileURL);
				},
				fail: err => {
					reject(err);
				}
			})
		})
	}
}
export { Feedback, Upload }