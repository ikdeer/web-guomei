import AxIos from "../HttpApi";

/*
* 获取用户菜单接口
* @token 当前用户token
*/
export const getMenuList = (params) => {
  return new Promise(resolve => {
    AxIos.get('/menu/list', params || {}).then(response => {
      resolve(response)
    })
  })
}

