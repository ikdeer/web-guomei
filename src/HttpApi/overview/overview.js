import AxIos from "../HttpApi";

/**
 * 应用审核数据总量
**/
export const getAppAudit = ({}) => AxIos({
  url:'/app/audit',
  method:'get',
  params:{}
});

/**
 * 应用App用量列表
**/
export const getApisConSumpTion = ({timeEnd,timeStart,top}) => AxIos({
  url:'/app/apis/consumption',
  method:'get',
  params:{timeEnd,timeStart,top}
});

