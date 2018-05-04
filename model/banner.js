import Model from '../common/model'
export default class Banner extends Model {

  // 获取列表
  list(callback) {
    this.request({
      url: 'Service/Terminal/carousel',
      params: {},
      callback: callback
    });
  }

}
