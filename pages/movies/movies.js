var app = getApp()

Page({
  // RESTFul API JSON
  // SOAP XML

  onLoad: function(event){
    var doubanBase = app.globalData.doubanBase
    var dataCount = "?start=0&count=3"
    var inTheatersURL = doubanBase + "/v2/movie/in_theaters" + dataCount // 正在热映
    var comingSoonURL = doubanBase + "/v2/movie/coming_soon" + dataCount // 即将上映
    var top250URL = doubanBase + "/v2/movie/top250" + dataCount
    this.getMovieListData(inTheatersURL)
    // this.getMovieListData(comingSoonURL)
    // this.getMovieListData(top250URL)
  },

  getMovieListData: function(url){
    var that = this
    wx.request({
      url: url,
      method: "GET", // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // 设置请求的header
      header: {
        "Content-Type": "application/json"
      },
      success: function (res) {
        // success
        that.processDoubanData(res.data.subjects)
      },
      fail: function (res) {
        // fail
        console.log('failed')
      }
    })
  },

  processDoubanData: function(moviesDouban){
    var movies = []
    for (var index in moviesDouban){
      var subject = moviesDouban[index]
      var title = subject.title
      if (title.length >= 6){
        title = title.substring(0, 6) + "..."
      }
      var temp = {
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