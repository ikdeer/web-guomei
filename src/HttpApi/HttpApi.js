import axios from 'axios'

//全局接口
const HttpApi = 'http://139.196.161.174:0890';
//请求头部
axios.defaults.headers['Content-Type'] = 'application/json';
axios.defaults.withCredentials = true; // 允许携带cookie

/**
 *  post 请求方法
 *  @param url
 *  @param data
 *  @returns { Promise}
 * */
export const apiPost = function(url, data) {
  return new Promise(function(resolve) {
    axios.post(url, JSON.stringify(data)).then((response) => {
      resolve(response.data)
    }).catch((response) => {
      resolve(response.data)
    })
  })
}


/**
 *  get 请求方法
 *  @param url
 *  @param data
 *  @returns { Promise}
 * */
export const apiGet = function(url, data) {
  return new Promise(function(resolve) {
    let params = Object.assign(data);
    axios.get(url, { params }).then((response) => {
      resolve(response.data)
    }).catch((response) => {
      resolve(response.data)
    })
  })
}
