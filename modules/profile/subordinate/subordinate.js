import Proxy from '../../../model/proxy'


Page({

  /**
   * 页面的初始数据
   */
  data: {
    num: 0,//下级总数
    one_num: 0,//一级代理数量
    isTow: false,
    two_num: 0,//二级代理数量
    twoContent: [],
    isThree: false,
    three_num: 0,//三级代理数量
    threeContent: [],

    data: [],//区块切换数据
    Type: 1,//切换类型默认一级
    OneTid: '',
    oneid: '',
    key: '',//一级代理key值
    Towkey: '',//二级代理key值

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 滚动区域大小
    // wx.getSystemInfo({
    //   success: (res) => {
    //     this.setData({
    //       height: res.windowHeight - 100
    //     })
    //   }
    // })

    //下级
    //---------- 获取我的下级列表 ----------
    (new Proxy()).subordinate(wx.getStorageSync('key'), (data) => {
      if (data.code == 200) {
        this.setData({
          content: data.result.child,
        });
      }else{
        wx.showToast({
          title: '暂无公益站点！',
          icon: 'none',
          duration: 2500
        })
      }
    });
    //---------- 获取我的下级各个类型数量 ----------
    (new Proxy()).separateSalesInfo(wx.getStorageSync('key'), (data) => {
      if (data.code == 200) {
        this.setData({
          num: data.result.totalNum,
          one_num: data.result.oneNum,
          two_num: data.result.twoNum,
          three_num: data.result.threeNum,
        });
      }
    });
  },
  // 点击切换
  spot: function (e) {
    var typekey = e.currentTarget.dataset.type;//切换状态
    var typename = null;
    if (typekey == 1) {
      typename = 'A站点'
    } else if (typekey == 2) {
      typename = 'B站点'
    } else if (typekey == 3) {
      typename = 'C站点'
    }
    if (typekey == 1) {
      this.setData({
        Type: typekey
      })
    } else {
      //---------- 获取我的下级各个类型列表 ----------
      (new Proxy()).alone(wx.getStorageSync('key'), typekey, (data) => {

        if (data.code == 200) {
          this.setData({
            data: data.result,
            Type: typekey
          });
        } 
        // else {
        //   wx.showToast({
        //     title: '暂无' + typename+'代理哟！',
        //     icon: 'none',
        //     duration: 2500
        //   })
        // }
      });

    }

  },

  // 点击一级代理
  spotOne: function (options) {
    var Towid = options.currentTarget.dataset.tid;//一级id
    this.data.oneid = Towid;//一级id
    var key = options.currentTarget.dataset.id;//一级key值
    //-----------分销商下级--------------
    (new Proxy()).separateSales(Towid, (data) => {
      this.data.OneTid = data.result.uid;//拿数据uid
      if (data.code == 200) {
        this.setData({
          Towid: Towid,
          key: key,
          twoContent: data.result.child
        });
      }
      if (this.data.twoContent == null) {
        wx.showToast({
          title: '该站点还未发展站点哟！',
          icon: 'none',
          duration: 2500
        })
      }
    });
    //多条件判断
    if (this.data.isTow && this.data.oneid == Towid && this.data.key == key) {
      this.setData({
        isTow: false,
        isThree: false
      });
    } else {
      this.setData({
        isTow: true,
        isThree: false
      });
    }

  },
  //点击二级代理
  spotTow: function (options) {

    var Towid = options.currentTarget.dataset.tid;//二级id
    this.data.oneid = Towid;//二级id
    var Towkey = options.currentTarget.dataset.id;//二级key值
    //-----------分销商下级--------------
    (new Proxy()).separateSales(Towid, (data) => {
      this.data.OneTid = data.result.uid;//拿数据uid
      if (data.code == 200) {
        this.setData({
          Towid: Towid,
          Towkey: Towkey,
          threeContent: data.result.child
        });
      }
      // if (this.data.threeContent == null) {
      //   wx.showToast({
      //     title: '该代理还未发展下级代理哟！',
      //     icon: 'none',
      //     duration: 2500
      //   })
      // }
    });
    //多条件判断
    // if (this.data.isThree && this.data.OneTid == Towid && this.data.Towkey == Towkey) {
    //   this.setData({
    //     isThree: false
    //   });
    // } else {
    //   this.setData({
    //     isThree: true
    //   });
    // }
  },


})