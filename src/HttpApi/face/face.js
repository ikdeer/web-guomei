import AxIos from "../HttpApi";

//获取人脸分组列表
export const getFaceList = ({ page,pageSize,state,name,id,createrName,creatTimeStart,creatTimeEnd }) => AxIos({
    url: '/faceGroup/show',
    method: 'get',
    params: { page,pageSize,state,name,id,createrName,creatTimeStart,creatTimeEnd }
});

