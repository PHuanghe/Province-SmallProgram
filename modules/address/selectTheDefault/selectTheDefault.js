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
  dataupdate: function(){
    (new Goods()).receivingaddress(wx.getStorageSync('key'), (data) => {
      if (data.code == 200) {
        this.refresh();
        this.setData({
          commodity: data.result
        });
      }
    });
  },
  // 编辑跳转
  jump: (data)=>{
    var id = data.currentTarget.id;
    wx.navigateTo({
      url: '../addTheAddress/addTheAddress?id=' + id,
    })
  },
  // 删除
  deletes: function(datas){
    (new Goods()).deletes(datas.currentTarget.id, (data) => {
      if (data.code == 200) {
        this.refresh();
        wx.showToast({
          title: '删除成功',
          icon: 'succes',
          duration: 1000,
          mask: true,
          success: () => {
            this.dataupdate();
          }
        })
        
      }
    });
    
  },
  // 选择默认地址
  setdefault: function(datas){
    var dataall = {
      uid: wx.getStorageSync('key'),
      id: datas.currentTarget.id
    };
      (new Goods()).setdefault(dataall, (data) => {
        if (data.code == 200) {
          this.dataupdate();
          this.refresh();
        }
    });
  },
  refresh: function () {
    //获取页面栈  
    var pages = getCurrentPages();
    if (pages.length > 1) {
      //上一个页面实例对象  
      var prePage = pages[pages.length - 2];
      //关键在这里,这里面是触发上个界面  
      prePage.changeData(prePage.data.historyArr)// 不同的人里面的值是不同的，这个数据是我的，具体的你们要根据自己的来查看所要传的参数  
    }
  }
})
