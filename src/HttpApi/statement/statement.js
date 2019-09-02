import AxIos from "../HttpApi";

//获取设备列表
export const getStatement = ({ apiIds,appIds,createName,monitorItems,statisItems,timeEnd,timeStart,timeType,top,page,pageSize }) => AxIos({
    url: '/monitor/report/form',
    method: 'get',
    params: { apiIds,appIds,createName,monitorItems,statisItems,timeEnd,timeStart,timeType,top,page,pageSize }
});


