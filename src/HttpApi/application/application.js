import AxIos from "../HttpApi";

//获取应用列表接口 缺少审核状态
export const getAppList = ({ page,pageSize,name,id,state,reviewState,createName,creatTimeStart,creatTimeEnd }) => AxIos({
    url: '/app/show',
    method: 'get',
    params: { page,pageSize,name,id,state,createName,reviewState,creatTimeStart,creatTimeEnd }
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

//启用禁用api
export const enableApplicationApi = ({ apiID,appID,enable }) => AxIos({
    url: '/app/disable/api',
    method: 'post',
    data: { appID,enable,apiID }
});



//应用类型下拉框
export const getApplicationTypes = () => AxIos({
    url: '/options/app/applicationTypes',
    method: 'get',
});

//应用状态下拉框
export const getAapplicationState = () => AxIos({
    url: '/options/app/applicationState',
    method: 'get',
});

//应用审核状态下拉框
export const getApplicationReviewState = () => AxIos({
    url: '/options/app/applicationReviewState',
    method: 'get',
});


//应用类型接口选择项
export const getApplicationTypesInterface = ({baseApiGroupID}) => AxIos({
    url: '/options/app/applicationTypesInterface',
    method: 'get',
    params:{baseApiGroupID}
});




//新增应用
export const createApplication = ({ amountLimit,createrID, introduction, name, qpsLimit, typeID, id, apiIds }) => AxIos({
    url: '/app/create',
    method: 'post',
    data: { amountLimit,createrID, introduction, name, qpsLimit, typeID, id, apiIds }
});