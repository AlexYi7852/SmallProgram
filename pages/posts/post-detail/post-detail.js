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
    var collected = postsCollected[this.data.data.postId]
    // 收藏变成未收藏， 未收藏变成收藏
    collected = !collected
    postsCollected[this.data.data.postId] = collected
    this.showToast(postsCollected, collected)
    // this.showModal(postsCollected, collected)
  },
  showModal: function (postsCollected, collected) {
    var that = this
    wx.showModal({
      title: '收藏',
      content: collected ? '是否收藏？' : '是否取消收藏？',
      showCancel: "true",
      cancelText: "取消",
      cancelColor: "#333",
      confirmText: "确认",
      confirmColor: "#405f80",
      success: function (res) {
        if (res.confirm) {
          // 更新文章是否收藏的缓存值
          wx.setStorageSync("posts_collected", postsCollected)
          // 更新数据绑定变量，从而实现切换图片
          that.setData(
            { collected: collected }
          )
        }
      }
    })
  },
  showToast: function (postsCollected, collected) {
    // 更新文章是否收藏的缓存值
    wx.setStorageSync("posts_collected", postsCollected)
    // 更新数据绑定变量，从而实现切换图片
    this.setData(
      { collected: collected }
    )
    // 收藏或取消收藏提示信息
    wx.showToast({
      title: collected ?  '收藏成功' : "取消成功",
      duration: 1000,
    })
  }
})