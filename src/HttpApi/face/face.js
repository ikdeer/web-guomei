import AxIos from "../HttpApi";

//获取人脸分组列表
export const getFaceList = ({ page,pageSize,faceGroupCreators,faceGroupIds,faceGroupNames,creatTimeStart,creatTimeEnd }) => AxIos({
    url: '/faceGroup/show',
    method: 'get',
    params: { page,pageSize,faceGroupCreators,faceGroupIds,faceGroupNames,creatTimeStart,creatTimeEnd }
});


//创建第一子分组
export const createGroupOne = ({ name }) => AxIos({
    url: '/faceGroup/createSubFaceGroup1',
    method: 'post',
    data: { name }
});

//创建第二子分组
export const createGroupTwo = ({ name }) => AxIos({
    url: '/faceGroup/createSubFaceGroup2',
    method: 'post',
    data: { name }
});

//删除第一子分组
export const deleteGroupOne = ({ name }) => AxIos({
    url: '/faceGroup/delSubFaceGroup1',
    method: 'post',
    data: { name }
});

//删除第二子分组
export const deleteGroupTwo = ({ name }) => AxIos({
    url: '/faceGroup/delSubFaceGroup2',
    method: 'post',
    data: { name }
});

//获取第一子分组
export const getGroupOne = () => AxIos({
    url: '/faceGroup/getSubFaceGroup1',
    method: 'get',
});

//获取第二子分组
export const getGroupTwo = () => AxIos({
    url: '/faceGroup/getSubFaceGroup2',
    method: 'get',
});
