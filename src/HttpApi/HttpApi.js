import Vue from 'vue'
import axios from 'axios'
import router from '@/router'
import Cookie from 'js-cookie'

//全局接口http://10.128.18.12:8091
const HttpApi = '.';

//创建axios实例
const AxIos = axios.create({
  baseURL:HttpApi,
  timeout: 1000 * 30,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json; charset=utf-8'
  }
})

AxIos.interceptors.request.use(
  function (config) {
    config.headers['token'] = Cookie.get('token');
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
)

AxIos.interceptors.response.use(response => {
    if (response.data && response.data.code === 401) {
      Cookie.delete('token');
      router.push({name: 'login'});
    }
    return response;
  }, error => {
    return Promise.reject(error);
  }
)

export default AxIos;
