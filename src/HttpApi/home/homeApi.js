import AxIos from "../HttpApi";

/**
* 产品服务列表
**/
export const getProductServiceShow = (params) => {
  return new Promise(resolve => {
    AxIos.get('/productService/show', {params}).then(response => {
      resolve(response)
    })
  })
};

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
