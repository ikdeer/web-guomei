import AxIos from "../HttpApi";

//获取应用列表接口 缺少审核状态
export const getAppList = ({ page,pageSize,name,id,state,createName,creatTimeStart,creatTimeEnd }) => AxIos({
    url: '/app/show',
    method: 'get',
    params: { page,pageSize,name,id,state,createName,creatTimeStart,creatTimeEnd }
});