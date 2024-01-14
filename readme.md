需要申请两个小程序 两个appid

一个appid只能上架一个小程序，如果某一个appid
想要使用另一个appid的云数据，可以使用微信提供的共享云环境
来达到两个霍多个appid增删改查某一个appid的数据库
但这些appid必须是在同主体下申请的

商家端appi：wxf701d985add18a2a
用户端appid：wxb291709066ce50a8

本次项目是把用户端的云开发数据共享给 商家端

切换到用户端的 appid -> 点击云开发 -> 初次进来需要设置环境名称 “lingshi-user” -> 初次使用是免费体验1个月不收钱的
-> 更多 -> 环境共享 -> 添加共享 -> 输入商家端的appid -> 扫码确认

切换到商家的 appid -> 点击云开发 -> 设置 -> 创建新环境 -> "lingshi-admin"

本次项目是把用户端的云开发数据共享给 商家端，在使用共享环境之前，需要保证资源方（也就是用户端）拥有 cloudbase_auth 云函数，用于鉴权调用方的身份并制定相关权限。
那么现在用户端的uniapp开通微信开发者工具中的云函数 
1.加在manifest.json -> 源码视图 -> 小程序特有相关“mp-weixin” -> 加上"cloudfunctionRoot": "cloudfunctions/"
2.在微信开者工具，在编辑器中 新增文件夹 "cloudfunctions" -> 右击选择"lingshi-user" 环境 -> 	
“右击选择新建nodejs云函数 cloudbase_auth” -> 在index.js中 -> 粘贴小程序文档云开发中的开发指引的微信生态的小程序环境共享的使用指南的那段代码
-> 右击选择“上传并部署：云端安装依赖”
3.参考 (https://developers.weixin.qq.com/miniprogram/dev/wxcloud/guide/resource-sharing/guidance.html)

由于商家端需要调用用户端的共享环境的资源，需要声明新的cloud实例操作
1.新建Acc.config/init.js 文件
2.粘贴小程序文档云开发中的开发指引的微信生态的小程序环境共享的调用共享环境资源那段代码，注意该片段是异步的，需要使用promise处理下
3.返回的新的cloud实例 就可以去操作数据库了
