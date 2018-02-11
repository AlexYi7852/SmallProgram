var app = getApp()
var util = require('../../../utils/utils.js')
// pages/movies/more-movie/more-movie.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movies: {},   
    totalCount: 0,
    requestUrl: '',
    isEmpty: true
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
    this.setData({ requestUrl: dataUrl })
    util.getMovieListData(dataUrl, this.processDoubanData)
  },

  // 跳转电影详情页面
  onMovieTap: function (event) {
    var movieId = event.currentTarget.dataset.movieid
    wx.navigateTo({
      url: '../movie-detail/movie-detail?id=' + movieId
    })
  },

  processDoubanData: function (moviesDouban) {
    var movies = []
    for (var index in moviesDouban.subjects) {
      var subject = moviesDouban.subjects[index]
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
    var totalMovies = {}
    // 如果要绑定新加载的数据，那么需要同之前的数据合并在一起
    if (!this.data.isEmpty) {
      totalMovies = this.data.movies.concat(movies)
    }
    else {
      totalMovies = movies
      this.setData({
        isEmpty: false
      })
    }
    this.setData({
      movies: totalMovies,
      totalCount: this.data.totalCount += 20
    })
    wx.hideNavigationBarLoading()
    wx.stopPullDownRefresh()
  },
  // 下拉刷新
  onPullDownRefresh: function(event){
    var refreshUrl = this.data.requestUrl + "?start=0&count=20"
    this.setData({
      movies: {},
      isEmpty: true,
      totalCount: 0
    })
    util.getMovieListData(refreshUrl, this.processDoubanData)
    wx.showNavigationBarLoading()
  },
  //上拉加载更多数据
  // 使用bindscrolltolower，必须搭配使用的scroll - view会导致小程序"enablePullDownRefresh": true下拉不能使用
  // 解决方法，就是当两者同时存在时，改scroll - view为view，改bindscrolltolower绑定的函数为onReachBottom函数。
  onReachBottom: function(event){
    var nextUrl = this.data.requestUrl + "?start=" + this.data.totalCount + "&count=20"
    util.getMovieListData(nextUrl, this.processDoubanData)
    wx.showNavigationBarLoading()
  }
})