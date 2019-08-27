import AxIos from "../HttpApi";

//获取用户列表
export const getUserList = ({ page,pageCount,phoneNumList,mailList,accountState,creatTimeStart,creatTimeEnd }) => AxIos({
    url: '/user/list',
    method: 'post',
    data: { page,pageCount,phoneNumList,mailList,accountState,creatTimeStart,creatTimeEnd }
});

//创建新用户
export const createUser = ({ username,phoneNum,mail,password}) => AxIos({
    url: '/user/add',
    method: 'post',
    data: {username,phoneNum,mail,password }
});

//删除用户
export const removeUser = ({ uid }) => AxIos({
    url: '/user/del',
    method: 'post',
    data: {uid}
});

//启用禁用用户 enable 0：停用，1：启用
export const enableUser = ({ uid,enable }) => AxIos({
    url: '/user/enable',
    method: 'post',
    data: { uid,enable }
});