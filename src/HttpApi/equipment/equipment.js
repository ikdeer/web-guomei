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

//设备位置
export const getEquipmentLocation = ({id}) => AxIos({
    url: '/options/device/equipmentLocation',
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

