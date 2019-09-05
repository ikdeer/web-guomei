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
export const getTechDoc = (params) => {
  return new Promise(resolve => {
    AxIos.get('/techDoc/show', params).then(response => {
      resolve(response)
    })
  })
}
/**
 * 技术文档列表删除
 * id
 **/
export const getTechDocDel = (params) => {
  return new Promise(resolve => {
    AxIos.post('/techDoc/del', params).then(response => {
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
/**
 * 一级目录列表
 * token
 **/
export const getTechDocTitleShow = (params) => {
  return new Promise(resolve => {
    AxIos.get('/techDoc/title1Show',params).then(response => {
      resolve(response)
    })
  })
}
/**
 * 二级目录列表
 * id
 * token
 **/
export const getTechDocTitle2Show = (params) => {
  return new Promise(resolve => {
    AxIos.get('/techDoc/title2Show',params).then(response => {
      resolve(response)
    })
  })
}
