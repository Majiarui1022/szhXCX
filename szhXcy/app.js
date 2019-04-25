//app.js
var config = require('./utils/config.js')
var util = require('./utils/util.js')
App({
  onLaunch: function () {
    this.getuser();
    const that = this
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    console.log("onlaunch")
    // 登录uuuuuuuuuuuuuuuuuuuuuuuu
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        this.globalData.code = res.code
        console.log(res.code)
      }
    })
    // 获取用户信息
    
    //
  },
  getuser(){
    wx.getSetting({
      success: res => {
        // console.log(res.authSetting['scope.userInfo'])
        if (res.authSetting['scope.userInfo']) {
          // console.log('已经授权')
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              console.log(res)
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.encryptedData = res.encryptedData;
              this.globalData.iv = res.iv;
              wx.request({
                url: config.wxlogin,
                data: {
                  code: this.globalData.code,
                  encryptedData: this.globalData.encryptedData,
                  iv: this.globalData.iv
                },
                method: 'post',
                header: {
                  "Content-Type": "application/x-www-form-urlencoded"
                },
                success: (res) => {
                  console.log(res)
                  this.globalData.token = res.data.token;
                  this.globalData.id = res.data.id;
                  console.log(this.globalData.token)
                }, fail: rej => {
                  console.log('请求失败')
                }


              })

            }
          })
        }
      }
    })
  },


  onLoad: function () {
  },
  globalData: {
    userInfo: null,
    encryptedData: '',
    iv: '',
    config,
    util,
    id: '',
    code: '',
    latitude: '',
    longitude: '',
    unionId: '',
    token: '',
    student_id: '',
    address: {},
    flag:false,

  },
})