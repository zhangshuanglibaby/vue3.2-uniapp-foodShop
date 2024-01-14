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

export { Feedback }