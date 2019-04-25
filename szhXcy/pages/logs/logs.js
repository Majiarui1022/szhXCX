//logs.js
const util = require('../../utils/util.js')
var config = require('../../utils/config.js')
const app = getApp();
Page({
  data: {
    logs: [],
    aixinlist:"",
    userinfo:"",
    inputValue:""      //用户修改的name名
  },
  onLoad: function () {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log))
      })
    })
    this.getserver()
  },

  

  bindKeyInput(e) {
    this.setData({
      inputValue: e.detail.value
    })
      //修改用户名
    if (this.data.inputValue != this.data.userinfo.name){

        let that = this
      wx.request({
        url: config.wxusername, // 仅为示例，并非真实的接口地址
        method: 'put',
        data:{
          name: that.data.inputValue
        },
        header: {
          'content-type': 'application/json', // 默认值
          'Authorization': 'JWT ' + app.globalData.token
        },
        success(res) {
          that.data.userinfo.name = res.data.name;
        },
      })


    }
  },
  getserver() {
    console.log(app.globalData.token)
    var that = this;
    wx.request({
      url: config.wxindex, // 仅为示例，并非真实的接口地址
      method: 'get',
      header: {
        'content-type': 'application/json', // 默认值
        'Authorization': 'JWT ' + app.globalData.token
      },
      success(res) {
        that.setData({
          userinfo: res.data   //错误  同样方法 目前原因不清楚
        })
        console.log(that.data.userinfo)
      },
    })


    wx.request({
      url: config.wxjilu, // 仅为示例，并非真实的接口地址
      method: 'get',
      header: {
        'content-type': 'application/json', // 默认值
        'Authorization': 'JWT ' + app.globalData.token
      },
      success(res) {
        that.setData({
          aixinlist: res.data.results   //错误  同样方法 目前原因不清楚
        })
        wx.hideNavigationBarLoading() //完成停止加载
        wx.stopPullDownRefresh() //停止下拉刷新
      },
    })


  },

  onPullDownRefresh() {
    this.getserver()


    console.log('--------下拉刷新-------')
  }
})
// success: (res) => {
//   console.log(res.data.results)
//   // axinlist = res.data.results

//   that.setData({
//     axinlist: res.data.results   //错误  同样方法 目前原因不清楚
//   })