import AxIos from "../HttpApi";

/**
* 用户登录接口
* @username 用户名
* @password 密码MD5
**/
export const getUserLogin = (params) => {
  return new Promise(resolve => {
    AxIos.post('/user/login', params).then(response => {
      resolve(response)
    })
  })
}
/**
* 注册用户接口
* @username 用户名
* @phoneNum 手机号码
* @mail 邮箱
* @password 密码, 非MD5
* @msgCode 短信验证码
**/
export const getUserRegister = (params) => {
  return new Promise(resolve => {
    AxIos.post('/user/register', params).then(response => {
      resolve(response)
    })
  })
}
/**
* 请求短信验证码
* @clientCode 客户端code，用来防止重复请求用的
**/
export const getUserMsgCode = (params) => {
  return new Promise(resolve => {
    AxIos.post('/user/msgCode', params).then(response => {
      resolve(response)
    })
  })
}
/**
 * 用户登出接口
 * @token 请求头部添加
 **/
export const getUserLogout = (params) => {
  return new Promise(resolve => {
    AxIos.post('/user/logout', params).then(response => {
      resolve(response)
    })
  })
}

/**
 * 重置密码
 * @token 请求头部添加
 **/
export const geUserResetPassWord = (params) => {
  return new Promise(resolve => {
    AxIos.post('/user/resetPassword', params).then(response => {
      resolve(response)
    })
  })
}

/**
 * 重置密码短信验证码
 * @token 请求头部添加
 **/
export const geUserResetPasswordPhoneMsg = (params) => {
  return new Promise(resolve => {
    AxIos.post('/user/resetPasswordPhoneMsg', params).then(response => {
      resolve(response)
    })
  })
}

