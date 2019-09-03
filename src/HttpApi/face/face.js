import AxIos from "../HttpApi";

//获取人脸分组列表
export const getFaceList = ({ page,pageSize,faceGroupCreators,faceGroupIds,faceGroupNames,creatTimeStart,creatTimeEnd }) => AxIos({
    url: '/faceGroup/show',
    method: 'get',
    params: { page,pageSize,faceGroupCreators,faceGroupIds,faceGroupNames,creatTimeStart,creatTimeEnd }
});
//人脸分组详情
export const getFacedetails = ({ faceGroupID }) => AxIos({
    url: '/faceGroup/details',
    method: 'get',
    params: { faceGroupID }
});



//创建人脸分组
export const createFaceGroup = ({ name }) => AxIos({
    url: '/faceGroup/create',
    method: 'post',
    data: { name }
});

//创建第一子分组
export const createGroupOne = ({ faceGroupID,name }) => AxIos({
    url: '/faceGroup/createSubFaceGroup1',
    method: 'post',
    data: { faceGroupID,name }
});

//创建第二子分组
export const createGroupTwo = ({ faceGroupID,sub1,name }) => AxIos({
    url: '/faceGroup/createSubFaceGroup2',
    method: 'post',
    data: { faceGroupID,sub1,name }
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
export const getGroupOne = ({faceGroupID}) => AxIos({
    url: '/faceGroup/getSubFaceGroup1',
    method: 'post',
    data:{faceGroupID}
});

//获取第二子分组
export const getGroupTwo = ({faceGroupID,sub1}) => AxIos({
    url: '/faceGroup/getSubFaceGroup2',
    method: 'post',
    data:{faceGroupID,sub1}
});


//人脸列表
export const getFaceShow = ({ page,pageSize,no,noType,picFromID,sex,type,sub1,sub2 }) => AxIos({
    url: '/face/show',
    method: 'get',
    params: { page,pageSize,no,noType,picFromID,sex,type,sub1,sub2 }
});