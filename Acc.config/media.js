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
}
export { Feedback, Upload }