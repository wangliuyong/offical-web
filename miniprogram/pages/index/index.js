//index.js

import dealData from '../../untils/data'

let {onAdd}=dealData;


const app = getApp()

console.log('onAdd', onAdd)

Page({
  data: {
    avatarUrl: './user-unlogin.png',
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: '',
    introduction:''
  },

  onLoad: function() {
    if (!wx.cloud) {
      wx.redirectTo({
        url: '../chooseLib/chooseLib',
      })
      return
    }

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.setData({
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo
              })
            }
          })
        }
      }
    })
  },
  onInput(e){
    console.log('input', e.detail.value)
  this.setData({
    introduction: e.detail.value
  })
  },
  onGetUserInfo: function(e) {
    if (!this.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo
      })
    }
  },

  onGetOpenid: function() {
    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        app.globalData.openid = res.result.openid
        wx.navigateTo({
          url: '../userConsole/userConsole',
        })
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
        wx.navigateTo({
          url: '../deployFunctions/deployFunctions',
        })
      }
    })
  },

  // 上传图片
  doUpload: function (e) {
    console.log(e.currentTarget.dataset.img)
    let collection = e.currentTarget.dataset.img

    let instruct = this.data.introduction
    // 选择图片
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {

        wx.showLoading({
          title: '上传中',
        })

        const filePath = res.tempFilePaths[0]
        console.log('filePath', filePath)
        let pathRandom=new Date().getTime();
        console.log('res',res)
        //console.log('path------------', pathRandom, filePath)
        
      
        // 上传图片
        const cloudPath = pathRandom + filePath.match(/\.[^.]+?$/)[0]

        console.log('cloudPath', cloudPath)
        let data={};
        wx.cloud.uploadFile({
          cloudPath,
          filePath,
          success: res => {
            console.log('[上传文件] 成功：', res)
            console.log('5555555')
            console.log('collection', collection)

            if (collection ==='slide'){
              data = {
                fileID: res.fileID
              }
              onAdd(collection, data);
              
            }else{
              
              if (instruct.length===0){
                wx.showToast({
                  title: '输入公司的简介',
                  icon: 'success',
                  duration: 2000
                })

              }else{
                console.log('11111111111111111111111')
                data = {
                  fileID: res.fileID,
                  introduction: instruct
                }
                onAdd(collection, data);
                
              }
              
            }


            // let data = collection == 'slide' ? {
            //   fileID: res.fileID
            // }: {
            //   introduction : this.data.introduction,
            //   fileID: res.fileID
            // }
            // console.log('data------',data)

            

            

            app.globalData.fileID = res.fileID
            app.globalData.cloudPath = cloudPath
            app.globalData.imagePath = filePath
            
            // wx.navigateTo({
            //   url: '../storageConsole/storageConsole'
            // })
          },
          fail: e => {
            console.error('[上传文件] 失败：', e)
            wx.showToast({
              icon: 'none',
              title: '上传失败',
            })
          },
          complete: () => {
            wx.hideLoading()
          }
        })

      },
      fail: e => {
        console.error(e)
      }
    })
  },

})
