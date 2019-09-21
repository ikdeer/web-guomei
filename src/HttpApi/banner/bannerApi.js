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
* banner列表页
**/
export const getBannerShow = (params) => {
  return new Promise(resolve => {
    AxIos.get('/banner/show', {params}).then(response => {
      resolve(response)
    })
  })
};

/**
 * banner列表页详情
 **/
export const getBannerDetail = (params) => {
  return new Promise(resolve => {
    AxIos.get('/banner/detail', {params}).then(response => {
      resolve(response)
    })
  })
};

/**
* banner列表页新增
**/
export const getBannerCreate = (params) => {
  return new Promise(resolve => {
    AxIos.post('/banner/create', params).then(response => {
      resolve(response)
    })
  })
};

/**
* banner列表页删除
**/
export const getBannerDelete = (params) => {
  return new Promise(resolve => {
    AxIos.post('/banner/del', params).then(response => {
      resolve(response)
    })
  })
};

/**
* banner列表页批量删除
**/
export const getBannerDelBatch = (params) => {
  return new Promise(resolve => {
    AxIos.post('/banner/delBatch', params).then(response => {
      resolve(response)
    })
  })
};

/**
* banner列表页修改
**/
export const getBannerModify = (params) => {
  return new Promise(resolve => {
    AxIos.post('/banner/modify', params).then(response => {
      resolve(response)
    })
  })
};
