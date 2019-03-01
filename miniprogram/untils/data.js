
function getCollection(collection){
  const db = wx.cloud.database()
  // 2. 构造查询语句
  // collection 方法获取一个集合的引用
  // where 方法传入一个对象，数据库返回集合中字段等于指定值的 JSON 文档。API 也支持高级的查询条件（比如大于、小于、in 等），具体见文档查看支持列表
  // get 方法会触发网络请求，往数据库取数据
  return db.collection(collection).where({
    
  }).get({
    success(res) {
      // 输出 [{ "title": "The Catcher in the Rye", ... }]
      console.log('db---------------', res)
      return res
    }
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