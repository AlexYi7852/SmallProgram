var util = require('../../../../utils/utils.js')

class Movie {
  constructor(url) {
    this.url = url
  }

  getMovieData(callBack) {
    this.callBack = callBack
    util.getMovieListData(this.url, this.processDoubanData.bind(this))
  }

  processDoubanData(data) {
    // 导演
    if (!data) { return }
    var director = {
      avatar: "",
      name: "",
      id: ""
    }
    if (data.directors[0] != null) {
      if (data.directors[0].avatars != null) {
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
      wishCount: data.wish_count, // 多少人想看
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
    this.callBack(movie)
  }
}

export { Movie }