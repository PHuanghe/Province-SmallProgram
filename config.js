/**
 * 小程序配置文件
 */

// 此处主机域名修改成腾讯云解决方案分配的域名
var host = 'https://pzwft8mz.qcloud.la';
var link = 'http://www.sydltds.com';//api分发
var config = {

    // 下面的地址配合云端 Demo 工作
    service: {
        host,
        link,

        appid: 'wx478ba3c7380d0d51',//小程序唯一标识
        secret: '736a368d8ab05424bb13f74b2a07c8ed',//小程序的 app secret
        

        // 登录地址，用于建立会话
        loginUrl: `${host}/weapp/login`,

        // 测试的请求地址，用于测试会话
        requestUrl: `${host}/weapp/user`,

        // 测试的信道服务地址
        tunnelUrl: `${host}/weapp/tunnel`,

        // 上传图片接口
        uploadUrl: `${host}/weapp/upload`
    }
};

module.exports = config;
