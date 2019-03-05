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
    current_tabbar: 'homepage',
    visible: false,
    actions: [
        {
            name: '18355093647',
        },
        {
            name: '呼叫'
        }
    ]
  },

  onLoad: function () {
    this.getSlides(app.globalData.slide)
  },
  handleChange({detail}) {
    this.setData({
      current: detail.key
    });

    console.log(detail)

    if (detail.key === 'mobilephone_fill'){
      this.setData({
        visible:true
      })
    }
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
  },
  handleClickItem1(e){
    let that=this;
    wx.makePhoneCall({
      phoneNumber: that.data.actions[0].name // 仅为示例，并非真实的电话号码
    })
  },
  handleCancel1(){
    this.setData({visible:false})
  }
})
