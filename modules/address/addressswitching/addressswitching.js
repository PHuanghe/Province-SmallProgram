import Goods from '../../../model/goods'

Page({
  data: {
  },
  onLoad: function () {
    this.dataupdate();
    
  },
  // 页面同步获取数据
  changeData: function (historyArr) {
    let _this = this;
    this.dataupdate();
  },   
  // 初始化数据
  dataupdate: function () {
    (new Goods()).receivingaddress(wx.getStorageSync('key'), (data) => {
      if (data.code == 200) {
        this.setData({
          commodity: data.result
        });
      }
    });
  },
  // 选择收货人信息
  selectaddress:function(data){
    var id = data.currentTarget.id;
        wx.navigateTo({
          url: '../../order/order?id=' + id,
        })
    
  }
})
