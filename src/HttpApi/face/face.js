import AxIos from "../HttpApi";

//获取人脸分组列表
export const getFaceList = ({ page,pageCount,name,id,createBy,creatTimeStart,creatTimeEnd }) => AxIos({
    url: '/faceGroup/list',
    method: 'post',
    data: { page,pageCount,name,id,createBy,creatTimeStart,creatTimeEnd }
});

