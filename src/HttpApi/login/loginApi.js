import {apiGet,apiPost} from "../HttpApi";

export default {
  /*
  * 注册用户接口
  * @username 用户名
  * @phoneNum 手机号码
  * @mail 邮箱
  * @password 密码, 非MD5
  * @msgCode 短信验证码
 */
  getUserRegister:(params) => apiPost('/user/register',params),
  /*
  * 请求短信验证码
  * @clientCode 客户端code，用来防止重复请求用的
  */
  getUserMsgCode:(params) => apiPost('/user/msgCode',params),
}
