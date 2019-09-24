import AxIos from "../HttpApi";

/**
 * 产品服务列表
 **/
export const getProductServiceShow = (params) => AxIos({
  url: '/productService/show',
  method: 'get',
  params: params,
});

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
* 产品服务创建
**/
export const productServiceCreate = (params) => {
  return new Promise(resolve => {
    AxIos.post('/productService/create', params).then(response => {
      resolve(response)
    })
  })
};

/**
* 产品服务详情
**/
export const getDetail = (params) => {
  return new Promise(resolve => {
    AxIos.get('/productService/detail', {params}).then(response => {
      resolve(response)
    })
  })
};

/**
* 产品服务详情
**/
export const getModify = (params) => {
  return new Promise(resolve => {
    AxIos.post('/productService/modify', params).then(response => {
      resolve(response)
    })
  })
};

/**
 * 产品服务删除
 **/
export const getDelete = (params) => {
  return new Promise(resolve => {
    AxIos.post('/productService/del', params).then(response => {
      resolve(response)
    })
  })
};

/**
 * 产品服务批量删除
 **/
export const getDelBatch = (params) => {
  return new Promise(resolve => {
    AxIos.post('/productService/delBatch', params).then(response => {
      resolve(response)
    })
  })
};

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
