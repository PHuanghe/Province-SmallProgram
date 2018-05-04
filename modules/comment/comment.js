import Team from '../../model/team'
import Order from '../../model/order'

Page({
  data: {
    tempFilePaths: [],
    datalils: [],
    evaContent: '',//评论
    content: [],
    oid: '',//订单id
  },
  onLoad: function (options) {
    this.data.oid = options.id;
    //------------获取订单详情----------
    (new Order()).details(this.data.oid, (data) => {
      this.data.content = data.result;
      if (data.code == 200) {
        this.setData({
          content: data.result
        })
      }
    });

  },
  upload: function (e) {
    var that = this;

    wx.chooseImage({
      count: 9, // 默认9
      success: function (res) {
        console.log(res)
        // var tempFilePaths = res.tempFilePaths[0];
        // wx.uploadFile({
        //   url: 'https://www.syd666.com/Service/Terminal/uploadThumb', //仅为示例，非真实的接口地址  
        //   filePath: tempFilePaths,
        //   name: 'file',
        //   formData: {
        //     uid:'MDAwMDAwMDAwMK6JrGU',
        //   },
        //   success: function (res) {
        //     var data = res.data
        //     //do something  
        //     console.log(res.result)
        //   },
        //   complete: function (res){
            
        //   }
        // })


        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        var data = that.data.datalils;
        for (var i = 0; i < tempFilePaths.length; i++) {
          if (data.length >= 9) {
            that.setData({
              datalils: data
            });
            return false;
          } else {
            data.push(tempFilePaths[i]);
          }
        }
        if (data.length >= 9) {
          wx.showToast({
            title: '最多只能上传9张图片哟！',
            icon: "none",
            duration: 2500
          })
        }
        that.setData({
          datalils: data
        });

      }
    })

  },
  // 获取textarea值
  bindText: function (e) {
    this.setData({
      evaContent: e.detail.value
    })

  },
  // 按照index删除本地上传图片
  del: function (e) {
    var data = this.data.datalils;
    var key = e.currentTarget.dataset.key;
    data.splice(key, 1);
    this.setData({
      datalils: data
    });
  },


  // 提交评论
  formSubmit: function (e) {
    var content = e.detail.value.evaContent;//评论文本
    var gid = this.data.content.gid;//商品id
    var specid = this.data.content.specid;//规格id
    // var thumb = JSON.stringify(this.data.datalils);//图片
    var thumb='';
    if (content == '') {
      wx.showToast({
        title: '您还未填写评论语哦！',
        icon: "none",
        duration: 1500
      })
      return false;
    }

    (new Team()).setGoodsComment('MDAwMDAwMDAwMK6JrGU', this.data.oid, gid, specid, content, thumb, (data) => {
      if (data.code == 200) {
        wx.showToast({
          title: '评论成功！',
          icon: 'success',
          duration: 1000
        })
        // 定时跳转
        var timer = setTimeout(function () {
          wx.navigateBack({
            delta: 1
          })
        }, 1500);
      }

    });
  },


})
