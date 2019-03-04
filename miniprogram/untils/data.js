function getCollection(collection){

  const db = wx.cloud.database()

  return db.collection(collection).get().then(res => {
    // res.data 是一个包含集合中有权限访问的所有记录的数据，不超过 20 条
    //console.log(res.data)
    return res.data
  })
}


function onAdd(collection, data = {}) {
  const db = wx.cloud.database()
  db.collection(collection).add({
    data,
    success: res => {
      // 在返回结果中会包含新创建的记录的 _id
      this.setData({
        counterId: res._id,
        count: 1
      })
      wx.showToast({
        title: '新增记录成功',
      })
      console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id)
    },
    fail: err => {
      wx.showToast({
        icon: 'none',
        title: '新增记录失败'
      })
      console.error('[数据库] [新增记录] 失败：', err)
    }
  })
}


export default {onAdd,getCollection};