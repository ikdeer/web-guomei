import AxIos from "../HttpApi";

/**
 * 技术文档列表
 **/
export const getTechDocShow = (params) => {
  return new Promise(resolve => {
    AxIos.get('/techDoc/show', params).then(response => {
      resolve(response)
    })
  })
}
/**
 * 上传图片-非人脸图片
 * imageBase64 图片BASE64
 **/
export const getImageUploadNormalImage = (params) => {
  return new Promise(resolve => {
    AxIos.post('/image/uploadNormalImage', params).then(response => {
      resolve(response)
    })
  })
}
/**
 * 技术文档列表
 * page
 * pageSize
 **/
export const getTechDocContentShow = (params) => {
  return new Promise(resolve => {
    AxIos.get('/techDoc/contentShow', params).then(response => {
      resolve(response)
    })
  })
}
/**
 * 创建技术文档
 * "name": 0,
 * "title1": 0,
 * "title2": "",
 * "title3": 0,
 * "txt": ""
 **/
export const getTechDocCreate = (params) => {
  return new Promise(resolve => {
    AxIos.post('/techDoc/create', params).then(response => {
      resolve(response)
    })
  })
}
