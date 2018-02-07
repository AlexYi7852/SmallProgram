var postsData = require("../../../data/posts-data.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isPlayingMusic : false
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
    // 监听音乐总控开关，改变头部图片
    var that = this
    wx.onBackgroundAudioPlay(function () {
      that.setData({
        isPlayingMusic: true
      })
    })
    wx.onBackgroundAudioPause(function () {
      that.setData({
        isPlayingMusic: false
      })
    })
  },

  onCollectionTap: function (event) {
    this.getPostCollectedSyc()
    // this.getPostCollectedAsy()
  },
  getPostCollectedAsy: function () {
    var that = this
    wx.getStorage({
      key: "posts_collected",
      success: function (res) {
        var postsCollected = res.data;
        var collected = postsCollected[that.data.data.postId];
        // 收藏变成未收藏， 未收藏变成收藏
        collected = !collected;
        postsCollected[that.data.data.postId] = collected
        that.showToast(postsCollected, collected)
      }
    })
  },
  getPostCollectedSyc: function () {
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
      title: collected ? '收藏成功' : "取消成功",
      duration: 1000,
    })
  },

  onShareTap: function (event) {
    var itemList = [
      "分享给微信好友",
      "分享到朋友圈",
      "分享到QQ",
      "分享到微博"
    ]
    wx.showActionSheet({
      itemList: itemList,
      itemColor: "#405f80",
      success: function (res) {
        // res.cancel 用户是否点击了取消按钮
        // res.tapIndex 数字元素的序号，从0开始
        wx.showModal({
          title: '用户' + itemList[res.tapIndex],
          content: "用户是否取消" + res.cancel + '现在无法实现分享功能，什么时候能支持呢',
        })
      }
    })
  },

  onMusicTap: function (event) {
    var postId = this.data.data.postId
    var data = postsData.postList[postId]
    var isPlayingMusic = this.data.isPlayingMusic
    if (isPlayingMusic) {
      wx.pauseBackgroundAudio()
      this.setData({
        isPlayingMusic: false
      })
    }
    else {
      wx.playBackgroundAudio({
        dataUrl: data.music.url,
        title: data.music.title,
        coverImgUrl: data.music.coverImgUrl
      })
      this.setData({
        isPlayingMusic: true
      })
    }
  }
})