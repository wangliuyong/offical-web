//index.js
const app = getApp()


Page({
  data: {
    
  },

  onLoad: function () {
    this.getSlides(app.globalData.slide)
  }
})
