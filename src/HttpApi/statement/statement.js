import AxIos from "../HttpApi";

//获取设备列表
export const getStatement = ({ apiIds,appIds,createrName,monitorItems,statisItems,timeEnd,timeStart,timeType,top,page,pageSize }) => AxIos({
    url: '/monitor/report/form',
    method: 'get',
    params: { apiIds,appIds,createrName,monitorItems,statisItems,timeEnd,timeStart,timeType,top,page,pageSize }
});

//获取应用列表
export const getAppList = () => AxIos({
    url: '/app/nameList',
    method: 'get',
});

//获取api列表

export const getApiList = ({ appID }) => AxIos({
    url: '/app/details',
    method: 'get',
    params: { appID }
});