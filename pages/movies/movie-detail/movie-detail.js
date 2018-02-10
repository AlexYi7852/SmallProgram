var app = getApp()
var util = require('../../../utils/utils.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movie: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var movieId = options.id
    var url = app.globalData.doubanBase + "/v2/movie/subject/" + movieId
    util.getMovieListData(url, this.processDoubanData)
  },

  processDoubanData: function(data){
    // 导演
    console.log(data)
    var director = {
      avatar: "",
      name: "",
      id: ""
    }
    if(data.directors[0] != null){
      if (data.directors[0].avatars != null){
        director.avatar = data.directors[0].avatars.large
      }
      director.name = data.directors[0].name
      director.id = data.directors[0].id
    }
    var movie = {
      movieImg: data.images ? data.images.large : "",  // 电影海报
      country: data.countries[0],  // 国家
      title: data.title, // 片名
      originalTitle: data.original_title, // 原名
      wishCount: data.wish_count, // 点击数
      commentCount: data.comments_count, // 评论数
      year: data.year,
      genres: data.genres.join("、"),  // 题材
      stars: util.convertToStarsArray(data.rating.stars),  // 评分
      score: data.rating.average,  // 评分
      director: director, // 导演
      casts: util.convertToCastString(data.casts),  // 演员表
      castsInfo: util.convertToCastInfos(data.casts), // 演员表信息
      summary: data.summary // 剧情简介
    }
    this.setData({ movie: movie })
    console.log(this.data.movie)
  }
})