import AxIos from "../HttpApi";

//获取应用列表接口 缺少审核状态
export const getAppList = ({ page,pageSize,name,id,state,createName,creatTimeStart,creatTimeEnd }) => AxIos({
    url: '/app/show',
    method: 'get',
    params: { page,pageSize,name,id,state,createName,creatTimeStart,creatTimeEnd }
});

//启用/禁用应用 enable 0-禁用 1-启用

export const disableApplication = ({ appID,enable }) => AxIos({
    url: '/app/disable/application',
    method: 'post',
    data: { appID,enable }
});

//删除应用
export const delApplication = ({ appID }) => AxIos({
    url: '/app/del',
    method: 'post',
    data: { appID }
});

//应用审核 reviewState 20-审核未通过， 21-审核通过  rejectReason
export const auditApplication = ({ appID,reviewState,rejectReason }) => AxIos({
    url: '/app/toexamine/application',
    method: 'post',
    data: { appID,reviewState,rejectReason }
});




//应用详情
export const getApplicationDetail = ({ appID }) => AxIos({
    url: '/app/details',
    method: 'get',
    params: { appID }
});