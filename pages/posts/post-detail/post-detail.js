var postsData = require("../../../data/posts-data.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  onShareTap: function (event) {
    // wx.removeStorageSync("key")
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var postId = options.id
    this.setData({ data: postsData.postList[postId] })
    
    var postsCollected = wx.getStorageSync("posts_collected")
    if (postsCollected) {
      var collected = postsCollected[postId]
      this.setData(
        { collected: collected }
      )
    }
    else {
      var postsCollected = {}
      postsCollected[postId] = false
      wx.setStorageSync("posts_collected", postsCollected)
    }
  },

  onCollectionTap: function (event) {
    var postsCollected = wx.getStorageSync("posts_collected")
    var collected = postsCollected[this.data]
    // 收藏变成未收藏， 未收藏变成收藏
    collected = !collected
    postsCollected[this.data] = collected
    // 更新文章是否收藏的缓存值
    wx.setStorageSync("posts_collected", postsCollected)
    // 更新数据绑定变量，从而实现切换图片
    this.setData(
      { collected: collected }
    )
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