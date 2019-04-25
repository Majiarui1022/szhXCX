var app=getApp();
Page({
  data: {
  },
  getUserInfo: function () {
    let that = this;
    wx.login({
      success: resp => {
        let code = resp.code
        code = resp.code;
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
                'content-type': 'application/json', // 默认值
              },
              success(res) {
                  app.globalData.token = res.data.token
                  console.log(app.globalData.token)
                  wx.switchTab({
                    url: '/pages/index/index'
                  })
              },
            })
          }
        })
      }
    })  
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    // 查看是否授权
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function (res) {
              //从数据库获取用户信息
              //that.queryUsreInfo();
              //用户已经授权过
              wx.switchTab({
                url: '/pages/index/index'
              })
            }
          });
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})
