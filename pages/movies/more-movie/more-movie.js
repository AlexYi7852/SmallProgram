// pages/movies/more-movie/more-movie.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页 面加载
   */
  onLoad: function (options) {
    var catetory = options.catetory
    console.log(catetory)
    wx.setNavigationBarTitle({
      title: catetory,
    })
  }
})