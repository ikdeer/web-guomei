import AxIos from "../HttpApi";

//获取设备列表
export const getEquipmentList = ({ page,pageSize,belongComID,gmAreaID,name,no,online,positionType,type,creatTimeStart,creatTimeEnd }) => AxIos({
    url: '/device/show',
    method: 'get',
    params: { page,pageSize,belongComID,gmAreaID,name,no,online,positionType,type,creatTimeStart,creatTimeEnd }
});

//设备离线总量
export const getLineTotal = () => AxIos({
    url: '/device/line/total',
    method: 'get',
});

//获取设别详情
export const getEquipmentDetail = ({id}) => AxIos({
    url: '/device/details',
    method: 'get',
    params:{id}
});


//设备位置
export const getEquipmentLocation = ({id}) => AxIos({
    url: '/options/device/equipmentLocation',
    method: 'get',
    params:{id}
});

//选择门店
export const getEquipmentArea = ({id}) => AxIos({
    url: '/options/device/equipmentArea',
    method: 'get',
    params:{id}
});


//设备类型
export const getEquipmentType = () => AxIos({
    url: '/options/device/equipmentType',
    method: 'get',
});

//设备状态
export const getEquipmentState = () => AxIos({
    url: '/options/device/equipmentState',
    method: 'get',
});

//添加设备
export const addEquipment = ({ belongComID,createrID,faceGroupID,gmAreaID,name,no,type,id,positionType }) => AxIos({
    url: '/device/add',
    method: 'post',
    data:{ belongComID,createrID,faceGroupID,gmAreaID,name,no,type,id,positionType }
});

//修改设备
export const editEquipment = ({ belongComID,createrID,faceGroupID,gmAreaID,name,no,type,id,positionType }) => AxIos({
    url: '/device/modify',
    method: 'post',
    data:{ belongComID,createrID,faceGroupID,gmAreaID,name,no,type,id,positionType }
});


//启用禁用设备  enable 0-停用，1-启用
export const disableEquipment = ({ deviceID,enable }) => AxIos({
    url: '/device/disable/dev',
    method: 'post',
    data:{ deviceID,enable }
});

//上线/下线设备
export const lineEquipment = ({ deviceID,onOffLine }) => AxIos({
    url: '/device/line/dev',
    method: 'post',
    data:{ deviceID,onOffLine }
});

//获取人脸分组列表
export const getFaceList = ({ page,pageSize,faceGroupCreators,faceGroupIds,faceGroupNames,creatTimeStart,creatTimeEnd }) => AxIos({
    url: '/faceGroup/show',
    method: 'get',
    params: { page,pageSize,faceGroupCreators,faceGroupIds,faceGroupNames,creatTimeStart,creatTimeEnd }
});

//获取第一子分组
export const getFaceGroupOne = ({faceGroupID}) => AxIos({
    url: '/faceGroup/getSubFaceGroup1',
    method: 'post',
    data:{faceGroupID}
});

//获取第二子分组
export const getFaceGroupTwo = ({faceGroupID,sub1}) => AxIos({
    url: '/faceGroup/getSubFaceGroup2',
    method: 'post',
    data:{faceGroupID,sub1}
});