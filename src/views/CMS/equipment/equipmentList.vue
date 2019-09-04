<template>
    <div class="equipment_list">
        <h3>设备管理</h3>
        <div class="equipment_content">
            <div class="equipment_form">
                <el-form :inline="true">
                    <el-form-item label="设备位置">
                        <el-select v-model="formData.company"
                                    @change="choosedCompany(1)"
                                    placeholder="请选择所属公司">
                            <el-option v-for="item in companyList"
                                       :label="item.name"
                                       :value="item.index"
                                       :key="item.index">
                            </el-option>
                        </el-select>
                        <el-select v-model="formData.department"
                                    @change="choosedCompany(2)"
                                    placeholder="请选择所属部门">
                            <el-option v-for="item in departmentList"
                                       :label="item.name"
                                       :value="item.index"
                                       :key="item.index">
                            </el-option>
                        </el-select>
                        <el-select v-model="formData.floor"
                                    placeholder="请选择所属楼层">
                            <el-option v-for="item in floorList"
                                       :label="item.name"
                                       :value="item.id"
                                       :key="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="设备类型">
                        <el-select v-model="formData.type"  class="user_list_form_status" placeholder="请选择设备类型">
                            <el-option v-for="item in EquipmentType"
                                       :label="item.name"
                                       :value="item.id"
                                       :key="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="设备状态">
                        <el-select v-model="formData.online"  class="user_list_form_status" placeholder="请选择设备状态">
                            <el-option v-for="item in EquipmentState"
                                       :label="item.common"
                                       :value="item.id"
                                       :key="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="设备编号">
                        <el-input :maxlength="30" v-model="formData.no" placeholder="请输入设备编号"></el-input>
                    </el-form-item>
                    </el-form-item>
                    <el-form-item label="设备名称">
                        <el-input :maxlength="30" v-model="formData.name" placeholder="请输入设备名称"></el-input>
                    </el-form-item>
                </el-form>
                <div class="equipment_form_btn">
                    <div>
                        <el-button type="primary" @click="addEquiment">添加设备</el-button>
                        <span class="equipment_form_btn_span">在线：<span style="color: #67C23A;">{{totalList.onLineCount}}</span></span>
                        <span class="equipment_form_btn_span">离线：<span style="color: #E56565;">{{totalList.offLineCount}}</span></span>
                    </div>
                    <div>
                        <el-button type="primary" @click="search">查询</el-button>
                        <el-button @click="reset">清空</el-button>
                    </div>
                </div>
            </div>
            <div class="equipment_table">
                <el-table
                    :data="tableData"
                    style="width: 100%">
                    <el-table-column
                        align="center"
                        label="设备名称">
                        <template slot-scope="scope">
                            {{textLen(scope.row.name,10)}}
                        </template>
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="no"
                        label="设备编号">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="deviceLocation"
                        label="设备位置">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="deviceTypeName"
                        label="设备类型">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="showFaceBingingState"
                        label="绑定人脸状态">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="showOnline"
                        label="设备状态">
                    </el-table-column>
                    <el-table-column
                        label="操作" align="center">
                        <template slot-scope="scope">
                            <el-button type="text" @click="see(scope.row)">查看</el-button>
                            <el-button type="text" style="color: #E56565;" @click="edit(scope.row)">修改</el-button>
                            <el-button type="text" v-if="scope.row.online === 0" style="color: #67C23A;" @click="on(scope.row)">上线</el-button>
                            <el-button type="text" v-if="scope.row.online === 1" style="color: #67C23A;" @click="down(scope.row)">下线</el-button>
                            <el-button type="text" style="color: #E56565;" @click="binding(scope.row)">绑定人脸</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="equipment_footer">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="page.page"
                    :page-sizes="[10, 20, 30, 50, 100]"
                    :page-size="page.pageSize"
                    background
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="page.total">
                </el-pagination>
            </div>

        </div>

        <el-dialog
            :title="equipmentDialogInfo.title"
            class="equipment_list_dialog"
            :visible.sync="equipmentDialogInfo.dialog"
            width="500px">
            <div class="equipment_list_steps">
                <span :class="equipmentDialogInfo.type===1?'active':''">第一步 填写设备信息</span>
                <span :class="equipmentDialogInfo.type===2?'active':''">第二步 绑定人脸分组</span>
            </div>
            <div v-show="equipmentDialogInfo.type===1">
                <el-form label-width="80px" :rules="dialogOne" :model="dialogInfo" ref="dialogOne" :disabled="this.equipmentDialogInfo.isSee">
                    <el-form-item label="设备编号" prop="no" required>
                        <el-input :maxlength="30" v-model="dialogInfo.no" placeholder="请输入设备编号"></el-input>
                    </el-form-item>
                    <el-form-item label="设备类型" prop="type" required>
                        <el-select v-model="dialogInfo.type" class="user_list_form_status" placeholder="请选择设备类型">
                            <el-option v-for="item in dialogType"
                                       :label="item.name"
                                       :value="item.id"
                                       :key="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    </el-form-item>
                    <el-form-item label="设备名称" prop="name" required>
                        <el-input :maxlength="25" v-model="dialogInfo.name" placeholder="请输入设备名称"></el-input>
                    </el-form-item>
                    <el-form-item label="设备位置" prop="siteThree" required>
                        <el-select v-model="dialogInfo.siteOne" @change="Clicksite(1)" placeholder="请选择所属公司">
                            <el-option v-for="item in siteOne"
                                       :label="item.name"
                                       :value="item.index"
                                       :key="item.index">
                            </el-option>
                        </el-select>
                        <el-select v-model="dialogInfo.siteTwo" @change="Clicksite(2)" class="marginTop" placeholder="请选择所属部门">
                            <el-option v-for="item in siteTwo"
                                       :label="item.name"
                                       :value="item.index"
                                       :key="item.index">
                            </el-option>
                        </el-select>
                        <el-select v-model="dialogInfo.siteThree" class="marginTop" placeholder="请选择所属楼层">
                            <el-option v-for="item in siteThree"
                                       :label="item.floorName"
                                       :value="item.id"
                                       :key="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="选择门店" prop="shopFour" required>
                        <el-select v-model="dialogInfo.shopOne" @change="ClickShop(1)" placeholder="请选择所属大区">
                            <el-option v-for="item in shopOne"
                                       :label="item.name"
                                       :value="item.index"
                                       :key="item.index">
                            </el-option>
                        </el-select>
                        <el-select v-model="dialogInfo.shopTwo" @change="ClickShop(2)" class="marginTop" placeholder="请选择所属分部">
                            <el-option v-for="item in shopTwo"
                                       :label="item.name"
                                       :value="item.index"
                                       :key="item.index">
                            </el-option>
                        </el-select>
                        <el-select v-model="dialogInfo.shopThree" @change="ClickShop(3)" class="marginTop" placeholder="请选择所属二级分部">
                            <el-option v-for="item in shopThree"
                                       :label="item.name"
                                       :value="item.index"
                                       :key="item.index">
                            </el-option>
                        </el-select>
                        <el-select v-model="dialogInfo.shopFour"  class="marginTop" placeholder="请选择所属门店">
                            <el-option v-for="item in shopFour"
                                       :label="item.storeName"
                                       :value="item.id"
                                       :key="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </div>

            <div v-show="equipmentDialogInfo.type===2">
                <el-form label-width="80px" :rules="dialogTwo" :model="dialogFace" ref="dialogTwo" :disabled="this.equipmentDialogInfo.isSee">
                    <el-form-item label="人脸分组"  prop="faceChildTwo" required>
                        <el-select v-model="dialogFace.faceGroup" @change="getFaceGroupChildOne" placeholder="请选择人脸分组">
                            <el-option v-for="item in faceGroup"
                                       :label="item.name"
                                       :value="item.id"
                                       :key="item.id">
                            </el-option>
                        </el-select>
                        <el-select v-model="dialogFace.faceChildOne" @change="getFaceGroupChildTwo" class="marginTop" placeholder="请选择一级子分组">
                            <el-option v-for="item in faceChildOne"
                                       :label="item.name"
                                       :value="item.id"
                                       :key="item.id">
                            </el-option>
                        </el-select>
                        <el-select v-model="dialogFace.faceChildTwo" class="marginTop" placeholder="请选择二级子分组">
                            <el-option v-for="item in faceChildTwo"
                                       :label="item.name"
                                       :value="item.id"
                                       :key="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <span>还未设置人脸分组？</span>
                        <el-button size="mini" @click="goGroup" type="success">去设置人脸分组</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <span slot="footer">
                <el-button v-if="equipmentDialogInfo.type===2" @click="goStepsOne">上一步</el-button>
                <el-button type="primary" @click="submitTableDialog">{{equipmentDialogInfo.btnInfo}}</el-button>
                <el-button v-if="equipmentDialogInfo.btnShow" @click="equipmentDialogInfo.dialog = false"> 取 消 </el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import { textLen } from '@/lib/utils'
    import { getEquipmentList,getLineTotal,getEquipmentLocation,getEquipmentType,getEquipmentState,lineEquipment,getEquipmentArea,getEquipmentDetail,getFaceGroupOne,getFaceGroupTwo,getFaceList,addEquipment,editEquipment } from '@/HttpApi/equipment/equipment'
    export default {
        name: "equipmentList",
        data(){

            let no = (rule, value, callback) => {
                if(value){
                    return callback()
                }else{
                    return callback(new Error('请输入设备编号'))
                }
            };
            let name = (rule, value, callback) => {
                if(value){
                    return callback()
                }else{
                    return callback(new Error('请输入设备名称'))
                }
            };
            let type = (rule, value, callback) => {
                if(this.dialogInfo.type == ''){
                    return callback(new Error('请选择设备类型'))
                }else{
                    return callback()
                }
            };
            let siteThree = (rule, value, callback) => {
                if(this.dialogInfo.siteThree == ''){
                    return callback(new Error('请选择设备位置'))
                }else{
                    return callback()
                }
            };

            let shopFour = (rule, value, callback) => {
                if(this.dialogInfo.shopFour == ''){
                    return callback(new Error('请选择设备位置'))
                }else{
                    return callback()
                }
            };
            let faceChildTwo = (rule, value, callback) => {
                if(this.dialogFace.faceChildTwo == ''){
                    return callback(new Error('请选择人脸分组'))
                }else{
                    return callback()
                }
            };
            return{
                textLen:textLen,
                formData:{
                    company:'',//公司
                    department:'',//部门
                    floor:'',//楼层
                    type:'',//设备类型
                    online:'',//设备状态
                    no:'',//设备编号
                    name:''//设备名称
                },
                companyList:[],//公司列表
                departmentList:[],//部门列表
                floorList:[],//楼层列表

                EquipmentType:[],//设备类型
                EquipmentState:[],//设备状态

                tableData:[],
                totalList:{ //在线量
                    offLineCount:0,
                    onLineCount:0
                },
                page:{
                    page:1,
                    pageSize:10,
                    total:0
                },
                equipmentDialogInfo:{
                    title:'新建设备',
                    dialog:false,
                    type:1,
                    isSee:false,
                    isEdit:false,
                    btnShow:true,//取消按钮显示隐藏
                    btnInfo:'保存并下一步'
                },
                dialogInfo:{
                    no:'',//设备编号
                    name:'',//设备名称
                    type:'',//设备类型
                    siteOne:'',//设备位置123
                    siteTwo:'',
                    siteThree:'',
                    shopOne:'',//门店1234
                    shopTwo:'',
                    shopThree:'',
                    shopFour:'',
                    faceGroup:'',//人脸分组123
                    faceChildOne:'',
                    faceChildTwo:''
                },
                dialogFace:{
                    faceGroup:'',//人脸分组123
                    faceChildOne:'',
                    faceChildTwo:''
                },

                dialogType:[],//弹窗设备类型

                siteOne:[],// 弹窗设备位置一级
                siteTwo:[],// 弹窗设备位置二级
                siteThree:[],// 弹窗设备位置三级

                shopOne:[],//弹窗门店大区
                shopTwo:[],//弹窗门店分部
                shopThree:[],//弹窗门店二级分部
                shopFour:[],//弹窗所属门店

                faceGroup:[],//人脸分组
                faceChildOne:[],//人脸一级分组
                faceChildTwo:[],//人脸二级分组
                dialogOne:{
                    no:[
                        {validator:no,trigger:['blur','change']}
                    ],
                    name:[
                        {validator:name,trigger:['blur','change']}
                    ],
                    type:[
                        {validator:type,trigger:['blur','change']}
                    ],
                    siteThree:[
                        {validator:siteThree,trigger:['blur','change']}
                    ],
                    shopFour:[
                        {validator:shopFour,trigger:['blur','change']}
                    ],
                },
                dialogTwo:{
                    faceChildTwo:[
                        {validator:faceChildTwo,trigger:['blur','change']}
                    ]
                }
            }
        },
        methods:{
            choosedCompany(index){
                // 选中公司 部门
                if(index == 1){
                    this.departmentList = this.companyList[this.formData.company].list;
                    this.formData.floor = '';
                    this.formData.department = '';
                    this.floorList = [];
                }
                if(index == 2){
                    this.formData.floor = '';
                    this.floorList = this.departmentList[this.formData.department].list;
                }
            },
            addEquiment(){//添加设备
                this.dialogInfo = {
                    no:'',//设备编号
                    name:'',//设备名称
                    type:'',//设备类型
                    siteOne:'',//设备位置123
                    siteTwo:'',
                    siteThree:'',
                    shopOne:'',//门店1234
                    shopTwo:'',
                    shopThree:'',
                    shopFour:'',
                };
                this.dialogFace = {
                    faceGroup:'',//人脸分组123
                    faceChildOne:'',
                    faceChildTwo:''
                };
                this.equipmentDialogInfo={
                    title:'新建设备',
                    dialog:false,
                    type:1,
                    isSee:false,
                    isEdit:false,
                    btnShow:true,//取消按钮显示隐藏
                    btnInfo:'保存并下一步'
                };
                this.equipmentDialogInfo.dialog = true;
            },
            search(){
                let params = {
                    ...this.formData,...this.page,
                    belongComID:this.formData.floor,
                };
                getEquipmentList(params).then(({data})=>{
                    if(data.success){
                        this.tableData = data.data.list || [];
                        this.page.total = data.pagerManager.totalResults || 0;
                    }else{
                        this.tableData = [];
                        // this.$message.warning(data.errorInfo)
                    }
                });
                getLineTotal().then(({data})=>{
                    if(data.success){
                        this.totalList.offLineCount = data.data.data.offLineCount;
                        this.totalList.onLineCount = data.data.data.onLineCount
                    }else{
                        this.$message.warning(data.errorInfo)
                    }
                })
            },
            reset(){
                this.formData={
                    belongComID:'',//公司
                    department:'',//部门
                    floor:'',//楼层
                    type:'',//设备类型
                    online:'',//设备状态
                    no:'',//设备编号
                    name:''//设备名称
                };
                this.search()
            },
            see(row) {
                //查看操作
                this.dialogInfo = {
                    no:'',//设备编号
                    name:'',//设备名称
                    type:'',//设备类型
                    siteOne:'',//设备位置123
                    siteTwo:'',
                    siteThree:'',
                    shopOne:'',//门店1234
                    shopTwo:'',
                    shopThree:'',
                    shopFour:'',
                };
                this.dialogFace = {
                    faceGroup:'',//人脸分组123
                    faceChildOne:'',
                    faceChildTwo:''
                };
                this.equipmentDialogInfo = {
                    title:'查看设备',
                    dialog:true,
                    type:1,
                    isSee:true,
                    isEdit:false,
                    id:row.id,
                    btnShow:true,//取消按钮显示隐藏
                    btnInfo:' 下一步 '
                };
                this.getDetail(row.id)
            },
            edit(row){
                //修改操作
                this.dialogInfo = {
                    no:'',//设备编号
                    name:'',//设备名称
                    type:'',//设备类型
                    siteOne:'',//设备位置123
                    siteTwo:'',
                    siteThree:'',
                    shopOne:'',//门店1234
                    shopTwo:'',
                    shopThree:'',
                    shopFour:'',
                };
                this.dialogFace = {
                    faceGroup:'',//人脸分组123
                    faceChildOne:'',
                    faceChildTwo:''
                };
                this.equipmentDialogInfo = {
                    title:'编辑设备',
                    dialog:true,
                    type:1,
                    isSee:false,
                    isEdit:true,
                    id:row.id,
                    btnShow:true,//取消按钮显示隐藏
                    btnInfo:'保存并下一步'
                };
                this.getDetail(row.id);
            },
            on(row){
                //上线操作
                this.$confirm('设备数据传输开启，设备状态更改为在线，如设备前端网络等原因不在线，设备状态仍为离线；', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(() => {
                    lineEquipment({
                        deviceID:row.id,
                        onOffLine:1
                    }).then(({data})=>{
                        if(data.success){
                            this.$message.success('上线成功');
                            this.search()
                        }else{
                            this.$message.warning(data.errorInfo)
                        }
                    })
                }).catch(() => {});
            },
            down(row){
                //下线操作
                this.$confirm('设备数据传输断开，非物理下线，设备状态更改为离线', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消'
                }).then(() => {
                    lineEquipment({
                        deviceID:row.id,
                        onOffLine:0
                    }).then(({data})=>{
                        if(data.success){
                            this.$message.success('下线成功');
                            this.search()
                        }else{
                            this.$message.warning(data.errorInfo)
                        }
                    })
                }).catch(() => {});
            },
            binding(row){
              //绑定人脸操作
                this.equipmentDialogInfo = {
                    title:'编辑设备',
                    dialog:true,
                    type:2,
                    isSee:false,
                    isEdit:false,
                    btnShow:true,//取消按钮显示隐藏
                    btnInfo:' 确 定 '
                }
            },
            handleSizeChange(val){
                this.page.pageSize = val;
                this.search()
            },
            handleCurrentChange(val){
                this.page.page = val;
                this.search()
            },
            getDetail(id){
                getEquipmentDetail({id:id}).then(({data})=>{
                    if(data.success){
                        this.dialogInfo = {
                            no:data.data.device.no,//设备编号
                            name:data.data.device.name,//设备名称
                            type:data.data.device.type,//设备类型
                            siteOne:'',//设备位置123
                            siteTwo:'',
                            siteThree: data.data.device.gmAreaID,
                            shopOne:'',//门店1234
                            shopTwo:'',
                            shopThree:'',
                            shopFour:data.data.device.belongComID,
                        };
                        //处理设备位置反显
                        /*
                        * 返回值问题
                        * 只能做这样的处理 包括此页面所有的多级下拉框都有这个问题
                        * fuck
                        * 要问为什么 我tm也不知道
                        * */
                        this.siteOne.forEach((item)=>{
                            item.list.forEach((ins)=>{
                                ins.list.forEach((i)=>{
                                    if(i.id == data.data.device.gmAreaID){

                                        this.dialogInfo.siteOne = item.index;
                                        this.siteTwo = item.list;

                                        this.dialogInfo.siteTwo = ins.index;
                                        this.siteThree = ins.list;
                                    }
                                })
                            })
                        });

                        //处理门店反显
                        this.shopOne.forEach((item)=>{
                            item.list.forEach((ins)=>{
                                ins.list.forEach((i)=>{
                                    i.list.forEach((j)=>{
                                        if(j.id == data.data.device.belongComID){

                                            this.dialogInfo.shopOne = item.index;
                                            this.shopTwo = item.list;

                                            this.dialogInfo.shopTwo = ins.index;
                                            this.shopThree = ins.list;

                                            this.dialogInfo.shopThree = i.index;
                                            this.shopFour = i.list;
                                        }

                                    })
                                })
                            })
                        })
                    }else{
                        this.$message.warning(data.errorInfo)
                    }
                })
            },
            goStepsOne(){
                this.equipmentDialogInfo.type=1;
                if(this.equipmentDialogInfo.isSee){
                    this.equipmentDialogInfo.btnInfo =' 下一步 ';
                    this.equipmentDialogInfo.btnShow = true;
                }else{
                    this.equipmentDialogInfo.btnInfo='保存并下一步';
                }

            },
            submitTableDialog(){
                if(this.equipmentDialogInfo.type === 1){
                    this.$refs['dialogOne'].validate((valid) => {
                        if (valid) {
                            this.equipmentDialogInfo.type=2;
                            this.equipmentDialogInfo.btnInfo=' 确 定 ';
                            if(this.equipmentDialogInfo.isSee){
                                this.equipmentDialogInfo.btnShow = false;
                            }
                        } else {
                            return false;
                        }
                    });
                }else{
                    //请求保存接口，发送ajax
                    if(this.equipmentDialogInfo.isSee){//查看不发送
                        this.equipmentDialogInfo.dialog = false;
                        return ;
                    }
                    if (this.equipmentDialogInfo.isEdit) {
                        /*编辑接口调用*/
                        this.$refs['dialogTwo'].validate((valid) => {
                            if (valid) {
                                let pams = {
                                    ...this.dialogInfo,
                                    id:this.equipmentDialogInfo.id,
                                    belongComID:this.dialogInfo.shopFour,
                                    gmAreaID:this.dialogInfo.siteThree,
                                    faceGroupID:this.dialogFace.faceChildTwo,
                                };
                                editEquipment(pams).then(({data}) => {
                                    if(data.success){
                                        this.$message.success('修改成功');
                                        this.search();
                                        this.equipmentDialogInfo.dialog = false;
                                    }else{
                                        this.$message.warning(data.errorInfo)
                                    }
                                })

                            } else {
                                return false;
                            }
                        });
                    }else{
                        /*新增接口调用*/

                        this.$refs['dialogTwo'].validate((valid) => {
                            if (valid) {
                                let params = {
                                    ...this.dialogInfo,
                                    belongComID:this.dialogInfo.shopFour,
                                    gmAreaID:this.dialogInfo.siteThree,
                                    faceGroupID:this.dialogFace.faceChildTwo,
                                };
                                addEquipment(params).then(({data})=>{
                                    if(data.success){
                                        this.$message.success('添加成功');
                                        this.search();
                                        this.equipmentDialogInfo.dialog = false;
                                    }else{
                                        this.$message.warning(data.errorInfo)
                                    }
                                })
                            } else {
                                return false;
                            }
                        });
                    }
                }
            },
            getFaceGroupChildOne(){
                let params = {
                    faceGroupID:this.dialogFace.faceGroup
                };
                this.dialogFace.faceChildOne = '';
                this.dialogFace.faceChildTwo = '';
                this.faceChildOne = [];
                this.faceChildTwo = [];
                getFaceGroupOne(params).then(({data})=>{
                    this.faceChildOne = data.data.list;
                })
            },
            getFaceGroupChildTwo(){
                let params = {
                    faceGroupID:this.dialogFace.faceGroup,
                    sub1:this.dialogFace.faceChildOne
                };
                this.dialogFace.faceChildTwo = '';
                getFaceGroupTwo(params).then(({data})=>{
                    this.faceChildTwo = data.data.list;
                })
            },
            goGroup(){
                this.$router.push({path: '/Index/faceList'})
            },
            Clicksite(index){
               //点击选择设备位置dialogInfo.siteOne
                if(index == 1){
                    this.siteTwo = this.siteOne[this.dialogInfo.siteOne].list;
                    this.dialogInfo.siteTwo = '';
                    this.dialogInfo.siteThree = '';
                    this.siteThree = [];
                }
                if(index == 2){
                    this.dialogInfo.siteThree = '';
                    this.siteThree = this.siteTwo[this.dialogInfo.siteTwo].list;
                }
            },
            ClickShop(index){
                //点击选择门店大区
                if(index===1){
                    this.shopTwo = this.shopOne[this.dialogInfo.shopOne].list;
                    this.shopThree = [];
                    this.shopFour = [];
                    this.dialogInfo.shopTwo = '';
                    this.dialogInfo.shopThree = '';
                    this.dialogInfo.shopFour = '';
                }
                if(index===2){
                    this.shopThree = this.shopTwo[this.dialogInfo.shopTwo].list;
                    this.shopFour = [];
                    this.dialogInfo.shopThree = '';
                    this.dialogInfo.shopFour = '';
                }
                if(index===3){
                    this.shopFour = this.shopThree[this.dialogInfo.shopThree].list;
                    this.dialogInfo.shopFour = '';
                }

            },

            getEquipment(){
                //获取设别位置列表
                getEquipmentLocation({}).then(({data})=>{
                    if(data.data){
                        data.data.forEach((item,index)=>{
                            item.index = index;
                            item.list.forEach((ins,idx)=>{
                                ins.index = idx;
                            })
                        });
                        this.companyList = data.data;
                        this.siteOne = data.data;
                    }else{
                        this.companyList = [];
                        this.siteOne = []
                    }
                });
                //获取设备类型
                getEquipmentType().then(({data})=>{
                    /*data.data.list.unshift({
                        id: '',
                        name: "全部"
                    });*/
                    this.EquipmentType = data.data ? data.data.list:[];
                    this.dialogType = data.data ? data.data.list:[];
                });
                //获取设备状态
                getEquipmentState().then(({data})=>{
                    /*data.data.list.unshift({
                        id: '',
                        common: "全部"
                    });*/
                    this.EquipmentState = data.data ? data.data.list:[];
                });
                // 获取门店
                getEquipmentArea({}).then(({data})=>{
                    if(data.data){
                        data.data.forEach((item,index)=>{
                            item.index = index;
                            item.list.forEach((ins,ind)=>{
                                ins.index = ind;
                                ins.list.forEach((i,idx)=>{
                                    i.index = idx;
                                })
                            })
                        });
                        this.shopOne = data.data;
                    }else{
                    }
                });
                //获取人脸分组下拉框
                getFaceList({page:1, pageSize:100}).then(({data})=>{
                    this.faceGroup = data.data.list;
                })
            },
        },
        mounted(){
            this.search();
            this.getEquipment();
            this.getFaceGroup();
            // this.getEquipmentState()
        }
    }
</script>

<style lang="scss" scoped>
    .equipment_list {
        font-size: .16rem;
        .equipment_content{
            background:rgba(255,255,255,1);
            box-shadow:0 2px 4px 1px rgba(0,0,0,0.1);
            border-radius:10px;
            padding: 30px;
            box-sizing: border-box;

            .equipment_form{
                .el-form{
                    border-bottom: 1px solid #eeeeee;
                }
                .equipment_form_btn{
                    height: 50px;
                    display: flex;
                    display: -webkit-flex;
                    justify-content: space-between;
                    align-items: center;
                    .equipment_form_btn_span{
                        margin-left: 20px;
                        font-size: 14px;
                        color: #666666;
                    }
                }
            }
            .equipment_table{
                width: 100%;
            }
            .equipment_footer{
                margin-top: 10px;
                text-align: right;
            }
        }
    }
    .equipment_list_dialog{
        .equipment_list_steps{
            height: 40px;
            margin-bottom: 10px;
            span{
                width: 180px;
                background: #EFEDED;
                position: relative;
                display: inline-block;
                height: 40px;
                line-height: 40px;
                color: #666666;
                text-align: center;
                padding-left: 30px;
                &:after{
                    content: '';
                    display: block;
                    border-top: 20px solid transparent;
                    border-bottom: 20px solid transparent;
                    border-left: 30px solid #EFEDED;
                    position: absolute;
                    right: -30px;
                    top: 0;
                    z-index: 10;
                }
                &:before{
                    content: '';
                    display: block;
                    border-top: 20px solid #EFEDED;
                    border-bottom: 20px solid #EFEDED;
                    border-left: 30px solid white;
                    position: absolute;
                    left: 0;
                    top: 0;
                }
                &:last-child{
                    margin-left: 8px;
                }
            }
            .active{
                color: white;
                background: #409EFF;
                &:after{
                    border-left: 30px solid #409EFF;
                }
                &:before{
                    border-top: 20px solid #409EFF;
                    border-bottom: 20px solid #409EFF;
                }
            }
        }
        .el-form{
            padding: 0 40px;
            .el-input{
                width: 280px;
            }
            .el-select{
                width: 280px;
            }
            .marginTop{
                margin-top: 10px;
            }
        }
    }
</style>
