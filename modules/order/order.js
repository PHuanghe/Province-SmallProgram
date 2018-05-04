
import Goods from '../../model/goods'
import Order from '../../model/order'

Page({
  data: {
    objectall:{},
    num: 1,
    minusStatus: 'disable',
    whole:'',
    dataall:{},
    spec:'',
    distinguish:'',
  },
  onLoad: function (address) {
    if (address.oid){
      // 本地储存数据
      this.spec(address.oid);
      wx.setStorage({
        key: "localstorage",
        data: address.oid
      })
    }else{
      wx.getStorage({
        key: 'localstorage',
        success: (res)=>{
          this.spec(res.data);
        }
      })
    }

      //---------- 获取收货地址 ---------
      if (address.id != undefined) {
        var parameter = {
          uid: wx.getStorageSync('key'),
          id: address.id
        }; 
        (new Goods()).singleeditor(parameter, (data) => {
          if (data.code == 200) {
            this.data.dataall = data.result;
            this.setData({
              addressdetails: data.result
            });
          }
        });
      }else{
        (new Goods()).defaultselection(wx.getStorageSync('key'), (data) => {
          if (data.code == 200) {
            this.data.dataall = data.result;
            this.setData({
              addressdetails: data.result
            });
          }
        });
      }
  },
  spec:function (spec){
    //---------- 获取商品详情 ---------- 
    (new Goods()).details(spec, (data) => {
      if (data.code == 200) {
        this.data.whole = data.result;
        this.setData({
          commodity: data.result
        });

      }
    });
    // 获取上一页规格信息
    wx.getStorage({
      key: 'selection',
      success: (res) => {
        this.data.distinguish = res.data;
        var minusStatus = res.data.number > 1 ? 'normal' : 'disable';
        this.data.num = res.data.number;
        this.setData({
          num: this.data.num,
          pricenum: parseInt(res.data.model_price * this.data.num),
          commoditydistinguish: res.data,
          minusStatus: minusStatus,
        });
      }
    })
  },
  // 提交下单
  placeorderl: function () {
    this.data.objectall = {
      // 用户uid
      uid: wx.getStorageSync('key'),
      // 商品title
      title: this.data.whole.subtitle,
      // 价格
      price: this.data.distinguish.model_price,
      // 商品id
      gid: this.data.whole.goods_id,
      // 规格id
      specid: this.data.whole.id,
      // 规格产品图
      path: this.data.distinguish.path,
      //属性id
      attribute_id: this.data.distinguish.id,
      // 商品数量
      numberl: this.data.num,
      // 购买人
      buy_name: this.data.dataall.name,
      // 电话
      buy_phone: this.data.dataall.phone,
      // 地址
      address: this.data.dataall.province + this.data.dataall.city + this.data.dataall.county + this.data.dataall.address,
      // 备注
      remark: "",
    },
      (new Order()).submit(this.data.objectall, (data) => {
      if (data.code == 200) {
        wx.showToast({
          title: '下单成功',
          icon: 'succes',
          duration: 1000,
          mask: true,
          success: () => {
            setTimeout(function () {
              wx.navigateTo({
                url: '../profile/order/order?id=' + -1,
              })
            }, 1000);
          }
        })
      }
    });
    // 支付接口
    // (new Order()).payment(this.data.whole.goods_id, (res) => {
    //   if (res.code == 200) {
    //     wx.requestPayment({
    //       'timeStamp': res.data.result.timeStamp,
    //       'nonceStr': res.data.result.nonceStr,
    //       'package': res.data.result.package,
    //       'signType': 'MD5',
    //       'paySign': res.data.result.paySign,
    //       'success': function (res) {
    //         wx.showToast({
    //           title: '支付成功',
    //           icon: 'success',
    //           duration: 3000
    //         });
    //       },
    //       'fail': function (res) {
    //         console.log('fail');
    //       },
    //       'complete': function (res) {
    //         console.log('complete');
    //       }
    //     });
    //   }
     
    // });
    // wx.request({
    //   url: 'http://www.sydltds.com/Service/Terminal/topay',//改成你自己的链接 
    //   header: "Content-Type': 'application/x-www-form-urlencoded",
    //   method: 'POST',
    //   success: function (res) {
    //     wx.requestPayment({
    //       'timeStamp': res.data.result.timeStamp,
    //       'nonceStr': res.data.result.nonceStr,
    //       'package': res.data.result.package,
    //       'signType': 'MD5',
    //       'paySign': res.data.result.paySign,
    //       'success': function (res) {
    //         wx.showToast({
    //           title: '支付成功',
    //           icon: 'success',
    //           duration: 3000
    //         });
    //       },
    //       'fail': function (res) {
    //         console.log('fail');
    //       },
    //       'complete': function (res) {
    //         console.log('complete');
    //       }
    //     });
    //   },
    //   fail: function (res) {
    //   }
    // });

  },
  // 数量失去焦点执行
  telephone: function (e) {
    if (e.detail.value > this.data.whole.number) {
      this.data.num = this.data.whole.number;
      wx.showToast({
        title: '库存不足啦！',
        image: "../../asset/img/qx_1.png",
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
    var pricenum = this.data.distinguish.model_price;
    if (num > 1) {
      num--;
    }
    var minusStatus = num > 1 ? 'normal' : 'disable';
    this.setData({
      pricenum: parseInt(pricenum * num),
      num: num,
      minusStatus: minusStatus
    })
  },
  /*点击加号*/
  bindPlus: function () {
    if (this.data.num < this.data.whole.number){
      var pricenum = this.data.distinguish.model_price;
      var num = this.data.num;
      num++;
      var minusStatus = num > 1 ? 'normal' : 'disable';
      this.setData({
        pricenum: parseInt(pricenum * num),
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
