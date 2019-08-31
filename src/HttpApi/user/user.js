import AxIos from "../HttpApi";

//获取用户列表
export const getUserList = ({ page,pageSize,phoneNums,mails,enable,createTimeStart,createTimeEnd }) => AxIos({
    url: '/user/list',
    method: 'get',
    params: { page,pageSize,phoneNums,mails,enable,createTimeStart,createTimeEnd }
});

//创建新用户
export const createUser = ({ username,phoneNum,mail,password}) => AxIos({
    url: '/user/add',
    method: 'post',
    data: {username,phoneNum,mail,password }
});

//删除用户
export const removeUser = ({ id }) => AxIos({
    url: '/user/del',
    method: 'post',
    data: {id}
});

//启用禁用用户 enable 0：停用，1：启用
export const enableUser = ({ id,enable }) => AxIos({
    url: '/user/enable',
    method: 'post',
    data: { id,enable }
});


//获取用户信息
export const userDetail = ({ id }) => AxIos({
    url: '/user/detail',
    method: 'post',
    data: { id }
});
//修改用户信息 /user/modify

export const editUserInfo = ({ id,mail,phoneNum }) => AxIos({
    url: '/user/modify',
    method: 'post',
    data: { id,mail,phoneNum }
});



//获取联系人列表
export const userContactList = ({ id }) => AxIos({
    url: '/user/contact/list',
    method: 'post',
    data: { id }
});

//新增联系人
export const addUserContact = ({ id,mail,name,phoneNum }) => AxIos({
    url: '/user/contact/add',
    method: 'post',
    data: { id,mail,name,phoneNum }
});

//修改联系人
export const editUserContact = ({ id,mail,name,phoneNum }) => AxIos({
    url: '/user/contact/modify',
    method: 'post',
    data: { id,mail,name,phoneNum }
});

//删除联系人
export const delContactInfo = ({ id }) => AxIos({
    url: '/user/contact/del',
    method: 'post',
    data: { id }
});

