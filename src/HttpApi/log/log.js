import AxIos from "../HttpApi";

//操作日志列表 /operateLog/show
export const getLogList = ({ page,pageSize,createTimeStart,createTimeEnd }) => AxIos({
    url: '/operateLog/show',
    method: 'get',
    params: { page,pageSize,createTimeStart,createTimeEnd }
});
