var config = require('../../utils/config.js')
const app = getApp()
Page({

  data: {
    imgUrls: [
      '../assets/icons/1.png',
      '../assets/icons/1.png',
      '../assets/icons/1.png',
      '../assets/icons/1.png'
    ],
    items: [{
        name: 'USA',
        value: '9.9',
        checked: true
      },
      {
        name: 'CHN',
        value: '99',
        checked: false
      },
      {
        name: 'BRA',
        value: '999',
        checked: false
      }
    ],
    indicatorDots: false, //是否显示面板指示点
    autoplay: true, //是否自动切换
    interval: 3000, //自动切换时间间隔
    duration: 500, //滑动动画时长
    inputShowed: false,
    currentSwiper: 0,
    autoplay: true,
    yuanshi: "#a6a7a9",
    zhihou: "#fff",
    clsa: true,
    peojectxiang: [],
    selsctmoney: "",

    indicatordos: false,
    autop: true,
    interv: 2000,
    durat: 1000,
    circu: true,
    vert: true,
    displaymu: 3,
    start: false,
    words: '展示全文',
    pricelist: [],
    proid: "",
    url: "",
    urlt: "",
    voidUrl:"",


    controls:true,
    autoplays:true,
    danmuBtn:false,    //是否显示弹幕按钮
    showCenter:true,     //是否显示中间的播放按钮
    objectFit:'fill',
    autoPause:true,
    cea:false
  },
  radioChange: function(e) {
    this.data.selsctmoney = e.detail.value;

  },
  swiperChange: function(e) {
    this.setData({
      currentSwiper: e.detail.current
    })
  },
  consad: function() {
    var isflag = !this.data.start;
    this.setData({
      start: isflag
    })
    if (this.data.start == false) {
      this.setData({
        words: '展示全文'
      })
    } else if (this.data.start == true) {

      this.setData({
        words: '收起全文'
      })
    }
  },

  getUserInfo: function () {
    let that = this;
    wx.login({
      success: resp => {
        let code = resp.code
        code = resp.code;
        app.globalData.code = resp.code
        wx.getUserInfo({
          success: res => {
            let url = res.userInfo.avatarUrl;
            let name = res.userInfo.nickName;
            let iv = res.iv;
            let encryptedData = res.encryptedData;
            app.globalData.encryptedData = res.encryptedData;
            app.globalData.iv = res.iv;
            wx.request({
              url: 'https://kungfunion.club/wx/login/3/', // 仅为示例，并非真实的接口地址
              method: 'post',
              data: {
                code: app.globalData.code,
                encryptedData: app.globalData.encryptedData,
                iv: app.globalData.iv
              },
              header: {
                'content-type': 'application/x-www-form-urlencoded', // 默认值
              },
              success(res) {
                app.globalData.token = res.data.token
                console.log(app.globalData.token)
              },
            })
          }
        })
      }
    })
  },
  onLoad: function(options) {
    if (options.id) {
      this.data.proid = options.id;

    }

    this.videoContext = wx.createVideoContext('myNewVideo')
   
    


    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function (res) {
              //从数据库获取用户信息
              //that.queryUsreInfo();
              //用户已经授权过
              // wx.switchTab({
              //   url: '/pages/index/index'
              // })
            }
          });
        }
      },
    })

    this.data.url = config.wxproject + '/' + options.id + '/';
    this.data.urlt = config.wxallshi + '=' + options.id;

    wx.showShareMenu({
      withShareTicket: true
    })

    this.getdata()

  },

    audioPlay: function () {
      this.videoContext.play()
    },
    
  zhifu() {
    if (!this.data.peojectxiang.status) {
      wx.showToast({
        title: '该项目已结束或者未开始',
        icon: 'none'
      })
    } else {
      wx.login({
        success: res => {


          wx.request({
            url: config.wxzhifu, // 仅为示例，并非真实的接口地址
            header: {
              'content-type': 'application/x-www-form-urlencoded', // 默认值
              'Authorization': 'JWT ' + app.globalData.token
            },
            data: {
              project: this.data.peojectxiang.id,
              code: res.code,
              price: this.data.selsctmoney
            },
            method: 'post',
            success: (res) => {
              if (res.data.appId) {
                wx.requestPayment({
                  "timeStamp": res.data.timeStamp,
                  "nonceStr": res.data.nonceStr,
                  "package": res.data.package,
                  "signType": res.data.signType,
                  "paySign": res.data.paySign,
                  success(res) {
                    wx.showToast({
                      title: '支付成功',
                      icon: 'none'
                    })

                  }
                })
              }
            },
            fail: rej => {
              wx.showToast({
                title: '请求失败，稍后再试',
                icon: 'none'
              })

            }
          })





        }
      })
    }
  },
  onShareAppMessage(ops) {
    wx.request({
      url: config.wxfenxiang + this.data.proid + '/', // 仅为示例，并非真实的接口地址
      method: 'put',
      data: {
        "turn_num": 4
      },
      header: {
        'content-type': 'application/json', // 默认值
        'Authorization': 'JWT ' + app.globalData.token
      },
      success(res) {
        console.log("转发成功:" + JSON.stringify(res));
      },
      fail: function(res) {
        console.log("转发失败:" + JSON.stringify(res));
      }
    })

    let id = this.data.proid;
    var that = this;
    return {
      title: that.data.peojectxiang.name,
      path: '/pages/colmny/colmny?id=' + id,
      imageUrl: that.data.peojectxiang.proimages[0].name,
      success: function(res) {
        // 转发成功
        console.log("转发成功:" + JSON.stringify(res));
      },
    }
  },

  getdata() {
    var that = this;




    //弹幕
    wx.request({
      url: this.data.urlt, // 仅为示例，并非真实的接口地址
      method: 'get',
      header: {
        'content-type': 'application/json', // 默认值
        'Authorization': 'JWT ' + app.globalData.token
      },
      success(res) {
        that.setData({
          pricelist: res.data.results
        })
      },

    })

    wx.request({
      url: this.data.url, // 仅为示例，并非真实的接口地址
      method: 'get',
      header: {
        'Authorization': 'JWT ' + app.globalData.token
      },
      success(res) {
        // console.log(res.data)
        that.setData({
          peojectxiang: res.data
        })
        that.setData({
          voidUrl: res.data.provideos[0].vedio
        })
        that.data.voidUrl = res.data.provideos[0].vedio;
        console.log(that.data.voidUrl)
        // console.log(that.data.peojectxiang)
        wx.hideNavigationBarLoading() //完成停止加载
        wx.stopPullDownRefresh() //停止下拉刷新
      },

    })






  },


  onPullDownRefresh() {
    this.getdata()
    console.log('--------下拉刷新-------')

  },
  /**
   * 页面的初始数据
   */

  /**
   * 生命周期函数--监听页面加载
   */

})