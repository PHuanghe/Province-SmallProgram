import Team from '../../../model/team'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    url:'',//二维码
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var team_id = options.id;

    //---------- 获取邀请入队二维码 ----------
    (new Team()).qrCode(wx.getStorageSync('key'), 1, (data) => {
      if (data.code == 200) {
        this.setData({
          url: data.result
        });
      }
    });
 
   
  },
  // 预览图片
  previewImage: function (e) {
    wx.previewImage({
      current: e.currentTarget.dataset.img, // 当前显示图片的http链接   
      urls: [e.currentTarget.dataset.img]
    })
  },  

  
})