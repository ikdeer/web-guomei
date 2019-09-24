import AxIos from "../HttpApi";

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
 * 解决方案列表
 **/
export const getSolutionShow = (params) => {
  return new Promise(resolve => {
    AxIos.get('/solution/show', {params}).then(response => {
      resolve(response)
    })
  })
}

/**
* 解决方案列表删除
**/
export const getSolutionDel = (params) => {
  return new Promise(resolve => {
    AxIos.post('/solution/del', params).then(response => {
      resolve(response)
    })
  })
}

/**
 * 解决方案列表批量删除
 **/
export const getSolutionDelBatch = (params) => {
  return new Promise(resolve => {
    AxIos.post('/solution/delBatch', params).then(response => {
      resolve(response)
    })
  })
}

/**
* 解决方案列表新增
**/
export const SolutionCreate = (params) => {
  return new Promise(resolve => {
    AxIos.post('/solution/create', params).then(response => {
      resolve(response)
    })
  })
}

/**
* 解决方案列表详情
**/
export const getSolutionDetail = (params) => {
  return new Promise(resolve => {
    AxIos.get('/solution/detail', {params}).then(response => {
      resolve(response)
    })
  })
}

/**
* 解决方案列表修改
**/
export const SolutionModify = (params) => {
  return new Promise(resolve => {
    AxIos.post('/solution/modify', params).then(response => {
      resolve(response)
    })
  })
}

/**
* banner列表页
**/
export const getBannerShow = (params) => {
  return new Promise(resolve => {
    AxIos.get('/banner/show', {params}).then(response => {
      resolve(response)
    })
  })
};
