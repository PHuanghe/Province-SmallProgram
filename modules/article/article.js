import News from '../../model/news'
//获取应用实例
const app = getApp()

Page({
  data: {
},

 onLoad: function(dataid) {
   (new News()).details(dataid.id, (data) => {
     if (data.code == 200) {
       var datalist = JSON.parse(data.result.content)
       this.setData({
         commodity: datalist
       });
       
       (new News()).browsingvolume(data.result.id, (data) => {
           if (data.code == 200) {
           }
         });
     }
   });
 }
 })
