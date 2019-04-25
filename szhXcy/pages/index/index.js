var config = require('../../utils/config.js')
const app = getApp();
Page({
  data: {
    imgUrls: [
      '../assets/icons/1.png',
      '../assets/icons/1.png',
      '../assets/icons/1.png',
      '../assets/icons/1.png'
    ],
    indicatorDots: false,  //是否显示面板指示点
    autoplay: true,      //是否自动切换
    interval: 3000,       //自动切换时间间隔
    duration: 500,       //滑动动画时长
    inputShowed: false,
    currentSwiper: 0,
    autoplay: true,
    yuanshi:"#a6a7a9",
    zhihou:"#fff",
    hasList:true,
    array: [
      {
        id: 1,
        zhi: 1,
        zi: "单亲妈妈的孩子骨髓移植后并发症医药费告急",
        yichou: 28888,
        mb: 1000000,
        name: "进行中"
      },
      {
        id:2,
        zhi: 1,
        zi: "单亲妈妈的孩子骨髓移植后并发症医药费告急",
        yichou: 28888,
        mb: 1000000,
        name: "等待中"
      },
      {
        id: 3,
        zhi: 1,
        zi: "单亲妈妈的孩子骨髓移植后并发症医药费告急",
        yichou: 28888,
        mb: 1000000,
        name: "等待中"
      },
      {
        id: 4,
        zhi: 1,
        zi: "单亲妈妈的孩子骨髓移植后并发症医药费告急",
        yichou: 28888,
        mb: 1000000,
        name: "等待中"
      }
    ],
    testnum: "",//设置测试参数
    indeximage:[]
  },
  swiperChange: function (e) {
    this.setData({
      currentSwiper: e.detail.current
    })
  },
  //  catchTouchMove:function(res){
  //   return false
  // },
  onLoad: function (option) {


   
    this.xx()
      
      wx.getStorage({                 //获取本地缓存
        key: "tok",
        success: function (res) {
          // that.setData({
          //   testnum: res.data,
          // });
        },
      })
 
      // console.log(option.query)
  },


  xx() {
    var that = this;
    const url = config.wxlist;
    var token = app.globalData.token;
    wx.request({
      url: config.wxslider, // 仅为示例，并非真实的接口地址
      method: 'get',
      header: {
        'content-type': 'application/json', // 默认值
        'tok': 'JWT ' + app.globalData.token
      },
      success(res) {
        that.setData({
          indeximage: res.data
        })
      },
    })


    wx.request({
      url: url, // 仅为示例，并非真实的接口地址
      method: 'get',
      header: {
        'content-type': 'application/json', // 默认值
        'Authorization': 'JWT ' + token
      },
      success(res) {
        that.setData({
          testnum: res.data
        })
        console.log(res.data)
        if(!res.data.length){
          that.setData({
            hasList : false
          })
        }
        console.log(that.data.hasList)
        wx.hideNavigationBarLoading() //完成停止加载
        wx.stopPullDownRefresh() //停止下拉刷新
      },
    })
  },
  colmnys:function(e){
    let id = e.currentTarget.dataset.id;
    // var id = event.target.dataset.id
    wx.navigateTo({
      url: "../colmny/colmny?id="+id
    })
  },
  onPullDownRefresh(){
   this.xx()


    console.log('--------下拉刷新-------')
  }
})