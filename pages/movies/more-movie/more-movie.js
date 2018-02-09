var app = getApp()
var util = require('../../../utils/utils.js')
// pages/movies/more-movie/more-movie.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movies: {}
  },

  /**
   * 生命周期函数--监听页 面加载
   */
  onLoad: function (options) {
    var catetory = options.catetory
    wx.setNavigationBarTitle({
      title: catetory,
    })
    var doubanBase = app.globalData.doubanBase
    var dataUrl = ''
    switch (catetory) {
      case "正在热映":
        dataUrl = doubanBase + "/v2/movie/in_theaters"
        break;
      case "即将上映":
        dataUrl = doubanBase + "/v2/movie/coming_soon"
        break;
      case "豆瓣Top250":
        dataUrl = doubanBase + "/v2/movie/top250"
        break;
    }
    util.getMovieListData(dataUrl, this.processDoubanData)
  },

  processDoubanData: function (moviesDouban) {
    var movies = []
    for (var index in moviesDouban) {
      var subject = moviesDouban[index]
      var title = subject.title
      if (title.length >= 6) {
        title = title.substring(0, 6) + "..."
      }
      var temp = {
        stars: util.convertToStarsArray(subject.rating.stars),
        title: title,
        average: subject.rating.average,
        coverageUrl: subject.images.large,
        movieId: subject.id
      }
      movies.push(temp)
    }
    this.setData({
      movies: movies
    })
  }
})