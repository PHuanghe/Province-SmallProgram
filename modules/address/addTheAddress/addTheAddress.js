import Goods from '../../../model/goods'
//获取应用实例
var tcity = require("../../../utils/citys.js");
var app = getApp()
Page({
  data: {
    provinces: [],
    province: "",
    citys: [],
    city: "",
    countys: [],
    county: '',
    value: [0, 0, 0],
    values: [0, 0, 0],
    condition: false,
    name:'',
    phone:'',
    address:'',
    defaultl:0,
    setdefault:false,
    addressid:'',
    colour:'#999',
    nametest:true,
    phonetest:true
  },
  // 城市选择
  bindChange: function (e) {
    var val = e.detail.value
    var t = this.data.values;
    var cityData = this.data.cityData;

    if (val[0] != t[0]) {
      console.log('province no ');
      const citys = [];
      const countys = [];

      for (let i = 0; i < cityData[val[0]].sub.length; i++) {
        citys.push(cityData[val[0]].sub[i].name)
      }
      for (let i = 0; i < cityData[val[0]].sub[0].sub.length; i++) {
        countys.push(cityData[val[0]].sub[0].sub[i].name)
      }
      this.data.province = this.data.provinces[val[0]]
      this.setData({
        province: this.data.provinces[val[0]],
        city: cityData[val[0]].sub[0].name,
        citys: citys,
        county: cityData[val[0]].sub[0].sub[0].name,
        countys: countys,
        values: val,
        value: [val[0], 0, 0]
      })

      return;
    }
    if (val[1] != t[1]) {
      console.log('city no');
      const countys = [];

      for (let i = 0; i < cityData[val[0]].sub[val[1]].sub.length; i++) {
        countys.push(cityData[val[0]].sub[val[1]].sub[i].name)
      }
      this.data.city = this.data.citys[val[1]]
      this.setData({
        city: this.data.citys[val[1]],
        county: cityData[val[0]].sub[val[1]].sub[0].name,
        countys: countys,
        values: val,
        value: [val[0], val[1], 0]
      })
      return;
    }
    if (val[2] != t[2]) {
      console.log('county no');
      this.data.county = this.data.countys[val[2]]
      this.setData({
        county: this.data.countys[val[2]],
        values: val
      })
      return;
    }


  },
  open: function () {
    this.setData({
      condition: !this.data.condition
    })
  },
  onLoad: function (options) {
   
    // 获取编辑数据
    if (options.id != undefined){
      this.data.addressid = options.id,
        this.setData({
          addressid: options.id
        });
      var parameter = {
        uid: wx.getStorageSync('key'),
        id: this.data.addressid
      };
      (new Goods()).singleeditor(parameter, (data) => {
        if (data.code == 200) {
          var setdefault
          if (data.result.default == 0) {
            setdefault = false
          } else {
            setdefault = true
            this.data.colour = '#f27c27';
          }
          // 待编辑数据
          this.data.name = data.result.name;
          this.data.phone = data.result.phone;
          this.data.address = data.result.address;
          this.data.defaultl = data.result.default;
          this.setData({
            commodity: data.result,
            province: data.result.province,
            city: data.result.city,
            county: data.result.county,
            setdefault: setdefault,
            colour: this.data.colour,
          });
        }
      });
    }

    var that = this;
    tcity.init(that);
    var cityData = that.data.cityData;
    const provinces = [];
    const citys = [];
    const countys = [];
    for (let i = 0; i < cityData.length; i++) {
      provinces.push(cityData[i].name);
    }
    console.log('省份完成');
    for (let i = 0; i < cityData[0].sub.length; i++) {
      citys.push(cityData[0].sub[i].name)
    }
    console.log('city完成');
    for (let i = 0; i < cityData[0].sub[0].sub.length; i++) {
      countys.push(cityData[0].sub[0].sub[i].name)
    }
    that.setData({
      'provinces': provinces,
      'citys': citys,
      'countys': countys
    })
    console.log('初始化完成');
  },
  // 收货信息判断
  username: function (e){
    var regall = /^[\u4e00-\u9fa5_a-zA-Z]{2,9}$/;
    this.data.nametest = regall.test(e.detail.value);
    this.setData({
      nametest: this.data.nametest
    });
    this.data.name = e.detail.value;
  },
  telephone: function (e) {
    var patrn = /^1(3|4|5|7|8)\d{9}$/;
    this.data.phonetest = patrn.test(e.detail.value);
    this.setData({
      phonetest: this.data.phonetest
    });
    this.data.phone = e.detail.value
  },
  textbox: function (e){
    this.data.address = e.detail.value
  },
  showdefault: function (){
    this.data.setdefault = !this.data.setdefault;
    if (this.data.setdefault){
      this.data.colour = '#f27c27';
    }else{
      this.data.colour = '#999';
    };
    this.setData({
      colour: this.data.colour,
      setdefault: this.data.setdefault,
    });
    if (this.data.setdefault){
      this.data.defaultl = 1
    }else{
      this.data.defaultl = 0
    }
  },
  preservationl: function(){
    if (!this.data.name){
      wx.showToast({
        title: '请填写姓名',
        image: "../../../asset/img/qx_1.png",
        duration: 1000,
        mask: true
      });
      return
    }
    if (!this.data.nametest) {
      wx.showToast({
        title: '请填写正确格式',
        image: "../../../asset/img/qx_1.png",
        duration: 1000,
        mask: true
      });
      return
    }
    if (!this.data.phone) {
      wx.showToast({
        title: '请填写电话',
        image: "../../../asset/img/qx_1.png",
        duration: 1000,
        mask: true
      });
      return
    }
    if (!this.data.phonetest) {
      wx.showToast({
        title: '请填写正确格式电话',
        image: "../../../asset/img/qx_1.png",
        duration: 1000,
        mask: true
      });
      return
    }
    if (!this.data.province) {
      wx.showToast({
        title: '请填写地区',
        image: "../../../asset/img/qx_1.png",
        duration: 1000,
        mask: true
      });
      return
    }
    if (!this.data.address) {
      wx.showToast({
        title: '请填写详细地址',
        image: "../../../asset/img/qx_1.png",
        duration: 1000,
        mask: true
      });
      return
    }
      var dataall = {
        id: this.data.addressid,
        uid: wx.getStorageSync('key'),
        name: this.data.name,
        phone: this.data.phone,
        address: this.data.address,
        defaultl: this.data.defaultl,
        province: this.data.province,
        city: this.data.city,
        county: this.data.county,
      };
        //---------- 获取商品列表 ----------    
        (new Goods()).xintian(dataall, (data) => {
          if (data.code == 200) {
            this.refresh();
            wx.showToast({
              title: '保存成功',
              icon: 'succes',
              duration: 1000,
              mask: true,
              success: () => {
                setTimeout(function () {
                  wx.navigateBack({
                    delta: 1
                  });
                }, 1000);
              }
            });
          }else{
            wx.showToast({
              title: '保存失败',
              image: "../../../asset/img/qx_1.png",
              duration: 1000,
              mask: true
            })
          }
        })
        
  },
  refresh:function(){
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
