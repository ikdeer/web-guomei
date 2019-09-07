import AxIos from "../HttpApi";

/**
 * 接入须知列表
 **/
export const getAccessNoteShow = (params) => {
  return new Promise(resolve => {
    AxIos.get('/accessNote/show', {params}).then(response => {
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
 * 创建接入须知
 **/
export const getAccessNoteCreate = (params) => {
  return new Promise(resolve => {
    AxIos.post('/accessNote/create', params).then(response => {
      resolve(response)
    })
  })
}

/**
 * 一级目录列表
 **/
export const getAccessNoteTitleShow = (params) => {
  return new Promise(resolve => {
    AxIos.get('/accessNote/title1Show', {params}).then(response => {
      resolve(response)
    })
  })
}

/**
 * 接入须知删除
 **/
export const getAccessNoteDel = (params) => {
  return new Promise(resolve => {
    AxIos.post('/accessNote/del', params).then(response => {
      resolve(response)
    })
  })
}

/**
 * 接入须知详情
 **/
export const getAccessNoteDetails = (params) => {
  return new Promise(resolve => {
    AxIos.get('/accessNote/details', {params}).then(response => {
      resolve(response)
    })
  })
}

/**
 * 接入须知详情
 **/
export const getAccessNoteModify = (params) => {
  return new Promise(resolve => {
    AxIos.post('/accessNote/modify',params).then(response => {
      resolve(response)
    })
  })
}

/**
 * 接入须知目录列表
 **/
export const getAccessNoteContentShow = (params) => {
  return new Promise(resolve => {
    AxIos.get('/accessNote/contentShow',{params}).then(response => {
      resolve(response)
    })
  })
}
