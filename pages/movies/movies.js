var util = require("../../utils/utils.js")
var app = getApp()

Page({
  data: {
    inTheaters: {},  // 正在热映的数据
    comingSoon: {},  // 即将上映的数据
    top250: {},  // 豆瓣Top250的数据
    searchResult: {},  // 搜索的数据
    containerShow: true, // 控制电影页面显示状态
    searchPanelShow: false // 控制搜索页面显示状态
  },
  // RESTFul API JSON
  // SOAP XML
  
  onLoad: function (event) {
    var doubanBase = app.globalData.doubanBase
    var dataCount = "?start=0&count=3"
    var inTheatersURL = doubanBase + "/v2/movie/in_theaters" + dataCount // 正在热映
    var comingSoonURL = doubanBase + "/v2/movie/coming_soon" + dataCount // 即将上映
    var top250URL = doubanBase + "/v2/movie/top250" + dataCount // 豆瓣Top250
    this.getMovieListData(inTheatersURL, "inTheaters", "正在热映")
    this.getMovieListData(comingSoonURL, "comingSoon", "即将上映")
    this.getMovieListData(top250URL, "top250", "豆瓣Top250")
  },
  
  onMoreTap: function(event){
    var catetory = event.currentTarget.dataset.catetory
    wx.navigateTo({
      url: 'more-movie/more-movie?catetory=' + catetory,
    })
  },
  // 关闭搜索页面回到电影页面
  onCancelImgTap: function (event){
    this.setData({
      containerShow: true,
      searchPanelShow: false,
      searchResult: {}
    })
  },

  // 输入框聚焦时触发
  onBindFocus: function(event){
    this.setData({
      containerShow: false,
      searchPanelShow: true
    })
  },
  // 输入框失去焦点时触发,显示搜索页面
  onBindChange: function(event){
    var text = event.detail.value
    var searchUrl = app.globalData.doubanBase + "/v2/movie/search?q=" + text
    this.getMovieListData(searchUrl, "searchResult", "")
  },
  // 获取电影数据列表
  getMovieListData: function (url, settedKey, catetoryTitle) {
    var that = this
    wx.request({
      url: url,
      method: "GET", // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // 设置请求的header
      header: {
        "Content-Type": ""
      },
      success: function (res) {
        // success
        that.processDoubanData(res.data.subjects, settedKey, catetoryTitle)
      },
      fail: function (res) {
        // fail
        console.log('failed')
      }
    })
  },
  // 处理电影数据函数
  processDoubanData: function (moviesDouban, settedKey, catetoryTitle) {
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
    var readyData = {}
    readyData[settedKey] = {
      catetoryTitle: catetoryTitle,
      movies: movies
    }
    // console.log(readyData)
    this.setData(readyData)
  }
})