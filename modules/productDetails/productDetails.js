import Goods from '../../model/goods'
Page({
  data: {
    currentTab:0,
    showspecif:false,
    numstp:false,
    num: 1,
    minusStatus: 'disable',
    datun:'',
    selection:'',
    selectiondynamic:'',
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 分享
    wx.showShareMenu({
      withShareTicket: true
    });
    //---------- 获取商品详情 ----------    
    (new Goods()).details(options.id, (data) => {
      if (data.code == 200) {
        var information = {
          goods_id: data.result.goods_id,
          spec_id: data.result.id,
        };
        wx.setStorage({
          key: "comment",
          data: information
        });
        
        this.data.datun = data.result;
        var details = JSON.parse(data.result.details);
        this.data.selectiondynamic = data.result.attr[0];
        var val = data.result.notice.replace(/↵/g,"\n");
        this.setData({
          commodity: data.result,
          details: details,
          selectiontype: data.result.attr[0],
          typenum:0,
          textall: val,
        });
      }
    });
  },
  // 选择类型
  selectiontype:function(datal){
    this.data.selection = datal.currentTarget.dataset.hi;
    var tarpd = datal.currentTarget.dataset.hi;
    this.setData({
      selectiontype: tarpd,
      typenum: datal.currentTarget.id,
    });
  },
  // 分享
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: this.data.datun.subtitle,
      // path: '/page/user?id=123',
      imageUrl: this.data.datun.path[0],
      success: function (res) {
        // 转发成功
        console.log(成功)
      },
      fail: function (res) {
        // 转发失败
        console.log(失败)
      }
    }
  },
  // 拨打电话
  calling: function () {
    wx.makePhoneCall({
      phoneNumber: '18172363942', 
      success: function () {
        console.log("拨打电话成功！") 
      },
      fail: function () {
        console.log("拨打电话失败！")
      }
    })
  },
  // 规格地区显示
  showspeci: function (){
    this.setData({
      showspecif: true
    })
  },
  region: function () {
    this.setData({
      region: true
    })
  },
  toprtd: function () {
    this.setData({
      region: false
    })
  },
  close:function (){
    this.setData({
      showspecif: false
    })
  },
  // 立即购买
  purchase:function (datal){
    // 保存本地规格信息
    var address = Object.assign(this.data.selectiondynamic, this.data.selection);
    address['number'] = this.data.num;
    wx.setStorage({
      key: "selection",
      data: address
    })
    var id = datal.currentTarget.id;
    wx.navigateTo({
      url: '../order/order?oid='+id,
    })
  },
  // 规格切换
  stylecss:function (){
    this.setData({
      numstp: true,
      region:false,
    })
  },
  /** 
     * 滑动切换tab 
     */
  bindChange: function (e) {
    var that = this;
    that.setData({ currentTab: e.detail.current });

  },
  /** 
   * 点击tab切换 
   */
  swichNav: function (e) {

    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
  // 数量失去焦点执行
  telephone:function (e){
    if (e.detail.value > this.data.datun.number){
      this.data.num = this.data.datun.number;
      wx.showToast({
        title: '库存不足啦！',
        image:"../../asset/img/qx_1.png",
        duration: 1000,
        mask: true
      })
      this.setData({
        num: this.data.num,
      })
    } 
  },
  /*点击减号*/
  bindMinus: function () {
    var num = this.data.num;
    if (num > 1) {
      num--;
    }
    var minusStatus = num > 1 ? 'normal' : 'disable';
    this.setData({
      num: num,
      minusStatus: minusStatus
    })
  },
  /*点击加号*/
  bindPlus: function () {
    if (this.data.num < this.data.datun.number){
      var num = this.data.num;
      num++;
      var minusStatus = num > 1 ? 'normal' : 'disable';
      this.setData({
        num: num,
        minusStatus: minusStatus
      })
    }else{
      wx.showToast({
        title: '库存不足啦！',
        image: "../../asset/img/qx_1.png",
        duration: 1000,
        mask: true
      })
    }
  },
  /*输入框事件*/
  bindManual: function (e) {
    var num = e.detail.value;
    var minusStatus = num > 1 ? 'normal' : 'disable';
    this.setData({
      num: num,
      minusStatus: minusStatus
    })
  }      

})