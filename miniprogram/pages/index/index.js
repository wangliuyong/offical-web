//index.js

import dealData from '../../untils/data'

import getSlide from '../../untils/getSlide'



let {
  getCollection
} = dealData


const app = getApp()


Page({
  data: {
    slide: [],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    current: 'homepage'
  },

  onLoad: function () {
    this.getSlides(app.globalData.slide)
  },
  handleChange({detail}) {
    this.setData({
      current: detail.key
    });
  },
  //封装的函数
  getSlides(slide) {
    let that = this;
    getCollection('slide').then((result) => {
      //console.log('result', result)
      let arr = result.map((item) => {
        return item.fileID
      })
      getSlide(arr).then((data) => {
        that.setData({
          slide: data
        })
      })

    }).catch((err) => {

    });
  }
})
