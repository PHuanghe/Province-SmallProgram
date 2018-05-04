import Model from '../common/model'
export default class News extends Model {

  // 获取列表
  list(page,callback){
    this.request({
      url: 'Service/Terminal/articleInformation',
      params: {
        page: page
      },
      callback: callback
    });
  }
  // 获取详情
  details(id, callback) {
    this.request({
      url: 'Service/Terminal/articleDetails',
      params: {
        id: id
      },
      callback: callback
    });
  }
  // 添加浏览数量
  browsingvolume(id, callback) {
    this.request({
      url: 'Service/Terminal/addTheNumOfBrows',
      params: {
        id: id
      },
      callback: callback
    });
  }
}
