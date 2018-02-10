// 处理评分函数
function convertToStarsArray(stars) { 
  var num = stars.toString().substring(0, 1)
  var array = []
  for (var i = 1; i <= 5; i++) {
    if (i <= num) {
      array.push(1)
    }
    else {
      array.push(0)
    }
  }
  return array
}

// 处理数据函数
function getMovieListData(url, callBack) {
  var that = this
  wx.request({
    url: url,
    method: "GET", 
    header: {
      "Content-Type": ""
    },
    success: function (res) {
      // console.log(res.data)
      callBack(res.data)
    },
    fail: function (res) {
      console.log('failed')
    }
  })
}

// 处理演员表函数
function convertToCastString(casts) {
  var castsjoin = "";
  for (var idx in casts) {
    castsjoin = castsjoin + casts[idx].name + " / ";
  }
  return castsjoin.substring(0, castsjoin.length - 2);
}
// 处理演员表函数
function convertToCastInfos(casts) {
  var castsArray = []
  for (var idx in casts) {
    var cast = {
      img: casts[idx].avatars ? casts[idx].avatars.large : "",
      name: casts[idx].name
    }
    castsArray.push(cast);
  }
  return castsArray;
}

module.exports = {
  convertToStarsArray: convertToStarsArray,
  getMovieListData: getMovieListData,
  convertToCastString: convertToCastString,
  convertToCastInfos: convertToCastInfos
}