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
 * 产品服务创建
 **/
export const productServiceCreate = (params) => {
  return new Promise(resolve => {
    AxIos.post('/productService/create', params).then(response => {
      resolve(response)
    })
  })
};

