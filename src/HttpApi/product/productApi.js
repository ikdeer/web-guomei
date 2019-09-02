import AxIos from "../HttpApi";

/**
 * 解决方案列表
 **/
export const getSolutionShow = (params) => {
  return new Promise(resolve => {
    AxIos.get('/solution/show', params).then(response => {
      resolve(response)
    })
  })
}
