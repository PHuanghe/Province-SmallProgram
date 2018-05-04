import config from '../config/config'

export default class Model {

  constructor() {
    this.baseApi = config.debug
      ? config.debugApi
      : config.baseApi;
  }

  request(opt) {
    const _this = this;
    if (typeof(opt.beforeSend) == 'function') {
      opt.beforeSend();
    }
    wx.request({
      url: this.baseApi + opt.url,
      data: opt.params,
      method: opt.method,
      header: opt.header,
      complete(result) {
        if (config.debug) {
          console.log('\n');
          console.log('###', '发起请求', '-------');
          console.log('模型名称', _this.__proto__.constructor.name);
          console.log('请求接口', _this.baseApi + opt.url);
          console.log('请求状态', result.statusCode);
          console.log('返回数据', result.data);
          console.log('###', '请求结束', '-------');
        }
        if (typeof(opt.callback) == 'function') {
          opt.callback(result.data, result);
        }
        if (typeof(opt.afterSend) == 'function') {
          opt.afterSend();
        }
      }
    })
  }
}
