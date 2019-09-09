import AxIos from "../HttpApi";

/**
 * SDK下载
 * @clientCode 客户端code，用来防止重复请求用的
**/
export const getDownloadList = (params) => {
  return new Promise(resolve => {
    AxIos.get('/download/list', {params}).then(response => {
      resolve(response)
    })
  })
}
