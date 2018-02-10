Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  onTap: function (event) {
    // wx.navigateTo({
    //   url: '../posts/posts',
    // });
    // wx.switchTap只能跳转带有tabBar选项的页面，不带有tabBar只能选择wx.redirectTo和wx.navigateTo
    wx.switchTab({
      url: '../posts/posts'
    })
  }
})