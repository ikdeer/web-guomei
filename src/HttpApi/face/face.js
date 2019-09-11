import AxIos from "../HttpApi";
const HttpApi = 'http://139.196.161.174:8090/gm';
//获取人脸分组列表
export const getFaceList = ({ page,pageSize,faceGroupCreators,faceGroupIds,faceGroupNames,createTimeStart,createTimeEnd }) => AxIos({
    url: '/faceGroup/show',
    method: 'get',
    params: { page,pageSize,faceGroupCreators,faceGroupIds,faceGroupNames,createTimeStart,createTimeEnd }
});
//人脸分组详情
export const getFacedetails = ({ faceGroupID }) => AxIos({
    url: '/faceGroup/details',
    method: 'get',
    params: { faceGroupID }
});
//上传图片
export const uploadFaceImage = ({ imageBase64 }) => AxIos({
    url: '/image/uploadFaceImage',
    method: 'post',
    data: { imageBase64 }
});

//创建人脸
export const createFace = ({ gmRelated,id,name,no,noType,picFromID,sex,type,url }) => AxIos({
    url: '/face/delFaceData',
    method: 'post',
    data: { gmRelated,id,name,no,noType,picFromID,sex,type,url }
});


//获取人员编号类型
export const getFaceNoType = () => AxIos({
    url: '/dict/faceNoType',
    method: 'get',
});
//获取人员类型
export const getFaceType = () => AxIos({
    url: '/dict/faceType',
    method: 'get',
});
//获取图片来源
export const getPicList = () => AxIos({
    url: '/app/nameList',
    method: 'get',
});



//创建人脸分组
export const createFaceGroup = ({ name }) => AxIos({
    url: '/faceGroup/create',
    method: 'post',
    data: { name }
});
//修改人脸分组
export const editFaceGroup = ({ name }) => AxIos({
    url: '/faceGroup/modify',
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

//修改第一子分组
export const editeGroupOne = ({ faceGroupID,id,name }) => AxIos({
    url: '/faceGroup/modifySubFaceGroup1',
    method: 'post',
    data: { faceGroupID,id,name }
});

//修改第二子分组
export const editeGroupTwo = ({ faceGroupID,id,name,sub1 }) => AxIos({
    url: '/faceGroup/modifySubFaceGroup2',
    method: 'post',
    data: { faceGroupID,id,name,sub1 }
});


//删除第一子分组
export const deleteGroupOne = ({ faceGroupID,id,name }) => AxIos({
    url: '/faceGroup/delSubFaceGroup1',
    method: 'post',
    data: { faceGroupID,id,name }
});

//删除第二子分组
export const deleteGroupTwo = ({ faceGroupID,id,name,sub1 }) => AxIos({
    url: '/faceGroup/delSubFaceGroup2',
    method: 'post',
    data: { faceGroupID,id,name,sub1 }
});

//获取取子分组列表
export const geteGrouplist = ({ faceGroupID,page,pageSize }) => AxIos({
    url: '/faceGroup/getSubFaceGroup',
    method: 'post',
    data: { faceGroupID,page,pageSize }
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
export const getFaceShow = ({ page,pageSize,names,ids,nos,noType,picFromIDs,sex,types,sub1,sub2 }) => AxIos({
    url: '/face/show',
    method: 'get',
    params: { page,pageSize,names,ids,nos,noType,picFromIDs,sex,types,sub1,sub2 }
});

//弹层添加人脸分组
export const addFace = ({ faceGroupID,ids,id,sub1,sub2 }) => AxIos({
    url: '/face2Group/add',
    method: 'post',
    data:{ faceGroupID,ids,id,sub1,sub2 }
});

//获取当前分组绑定人脸列表
export const getFaceGroupShow = ({ page,pageCount,faceGroupID,id,sub1,sub2 }) => AxIos({
    url: '/face2Group/show',
    method: 'get',
    params: { page,pageCount,faceGroupID,id,sub1,sub2 }
});

//删除人脸绑定数据
export const deleteFaceGroup = ({ ids }) => AxIos({
    url: '/face2Group/del',
    method: 'post',
    data:{ids }
});

//获取第二子分组数量
export const getGroupChildremTwo = ({ id }) => AxIos({
    url: '/faceGroup/getSubFaceGroup2Count',
    method: 'post',
    data:{id }
});

//文件上传
export const uploadUrl = `${HttpApi}/upload`;