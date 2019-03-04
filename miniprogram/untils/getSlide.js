export default function getSlide(fileList) {
  
  return wx.cloud.getTempFileURL({
    fileList
  }).then(res => {
    // get temp file URL
    //console.log(res.fileList)
    return res.fileList
  }).catch(error => {
    // handle error
  })
  
}
