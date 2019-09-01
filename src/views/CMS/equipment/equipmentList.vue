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
                                       :value="item.id"
                                       :key="item.id">
                            </el-option>
                        </el-select>
                        <el-select v-model="formData.department"
                                    @change="choosedCompany(2)"
                                    placeholder="请选择所属部门">
                            <el-option v-for="item in departmentList"
                                       :label="item.name"
                                       :value="item.id"
                                       :key="item.id">
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
                        prop="name"
                        label="设备名称">
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
            <div v-if="equipmentDialogInfo.type===1">
                <el-form label-width="80px">
                    <el-form-item label="设备编号" required>
                        <el-input :maxlength="30" v-model="dialogInfo.no" placeholder="请输入设备编号"></el-input>
                    </el-form-item>
                    <el-form-item label="设备类型" required>
                        <el-select v-model="dialogInfo.type"  class="user_list_form_status" placeholder="请选择设备类型">
                            <el-option v-for="item in dialogType"
                                       :label="item.name"
                                       :value="item.id"
                                       :key="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    </el-form-item>
                    <el-form-item label="设备名称" required>
                        <el-input :maxlength="25" v-model="dialogInfo.name" placeholder="请输入设备名称"></el-input>
                    </el-form-item>
                    <el-form-item label="设备位置" required>
                        <el-select v-model="dialogInfo.siteOne" @change="Clicksite(1)" placeholder="请选择所属公司">
                            <el-option v-for="item in siteOne"
                                       :label="item.name"
                                       :value="item.id"
                                       :key="item.id">
                            </el-option>
                        </el-select>
                        <el-select v-model="dialogInfo.siteTwo" @change="Clicksite(2)" class="marginTop" placeholder="请选择所属部门">
                            <el-option v-for="item in siteTwo"
                                       :label="item.name"
                                       :value="item.id"
                                       :key="item.id">
                            </el-option>
                        </el-select>
                        <el-select v-model="dialogInfo.siteThree" class="marginTop" placeholder="请选择所属楼层">
                            <el-option v-for="item in siteThree"
                                       :label="item.name"
                                       :value="item.id"
                                       :key="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="选择门店" required>
                        <el-select v-model="dialogInfo.shopOne" @change="ClickShop(1)" placeholder="请选择所属大区">
                            <el-option v-for="item in shopOne"
                                       :label="item.name"
                                       :value="item.id"
                                       :key="item.id">
                            </el-option>
                        </el-select>
                        <el-select v-model="dialogInfo.shopTwo" @change="ClickShop(2)" class="marginTop" placeholder="请选择所属分部">
                            <el-option v-for="item in shopTwo"
                                       :label="item.name"
                                       :value="item.id"
                                       :key="item.id">
                            </el-option>
                        </el-select>
                        <el-select v-model="dialogInfo.shopThree" @change="ClickShop(3)" class="marginTop" placeholder="请选择所属二级分部">
                            <el-option v-for="item in shopThree"
                                       :label="item.name"
                                       :value="item.id"
                                       :key="item.id">
                            </el-option>
                        </el-select>
                        <el-select v-model="dialogInfo.shopFour"  class="marginTop" placeholder="请选择所属门店">
                            <el-option v-for="item in shopFour"
                                       :label="item.name"
                                       :value="item.id"
                                       :key="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </div>

            <div v-if="equipmentDialogInfo.type===2">
                <el-form label-width="80px">
                    <el-form-item label="人脸分组" required>
                        <el-select v-model="dialogInfo.status" placeholder="请选择人脸分组">

                        </el-select>
                        <el-select v-model="dialogInfo.status" class="marginTop" placeholder="请选择一级子分组">

                        </el-select>
                        <el-select v-model="dialogInfo.status" class="marginTop" placeholder="请选择二级子分组">

                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <span>还未设置人脸分组？</span>
                        <el-button size="mini" type="success">去设置人脸分组</el-button>
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
    import { getEquipmentList,getLineTotal,getEquipmentLocation,getEquipmentType,getEquipmentState,lineEquipment,getEquipmentArea } from '@/HttpApi/equipment/equipment'
    export default {
        name: "equipmentList",
        data(){
            return{
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

                },
                dialogFace:{

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
            }
        },
        methods:{
            choosedCompany(index){
                // 选中公司 部门
                let params = {};
                if(index===1){
                    params.id = this.formData.company
                }else{
                    params.id = this.formData.department
                }
                getEquipmentLocation(params).then(({data})=>{
                    if(index===1){
                        this.departmentList = data.data ? data.data.list:[];
                        this.floorList = [];
                    }
                    if(index===2){
                        this.floorList = data.data? data.data.list:[];
                    }
                })
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
                this.equipmentDialogInfo={
                    title:'新建设备',
                    dialog:false,
                    type:1,
                    btnShow:true,//取消按钮显示隐藏
                    btnInfo:'保存并下一步'
                };
                this.equipmentDialogInfo.dialog = true;
            },
            search(){
                let params = {
                    ...this.formData,...this.page,
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
            },
            edit(row){
                //修改操作
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
            goStepsOne(){
                this.equipmentDialogInfo.type=1;
                this.equipmentDialogInfo.btnInfo='保存并下一步';

            },
            submitTableDialog(){
                if(this.equipmentDialogInfo.type === 1){
                    this.equipmentDialogInfo.type=2;
                    this.equipmentDialogInfo.btnInfo=' 确 定 ';
                }else{
                    //请求保存接口，发送ajax

                }
            },
            Clicksite(index){
               //点击选择设备位置
                let params = {};
                if(index===1){
                    params.id = this.dialogInfo.siteOne;
                }
                if(index===2){
                    params.id = this.dialogInfo.siteTwo;
                }
                getEquipmentLocation(params).then(({data})=>{
                    if(index===1){
                        this.siteTwo = data.data ? data.data.list:[];
                        this.siteThree = [];
                    }
                    if(index===2){
                        this.siteThree = data.data? data.data.list:[];
                    }
                })
            },
            ClickShop(index){
                //点击选择门店大区
                let params = {};
                if(index===1){
                    params.id = this.dialogInfo.shopOne;
                }
                if(index===2){
                    params.id = this.dialogInfo.shopTwo;
                }
                if(index===3){
                    params.id = this.dialogInfo.shopThree;
                }
                getEquipmentArea(params).then(({data})=>{
                    if(index===1){
                        this.shopTwo = data.data ? data.data.list:[];
                        this.shopThree = [];
                        this.shopFour = [];
                    }
                    if(index===2){
                        this.shopThree = data.data ? data.data.list:[];
                        this.shopFour = [];
                    }
                    if(index===3){
                        this.shopFour = data.data ? data.data.list:[];
                    }
                })
            },

            getEquipment(){
                //获取设别位置列表
                getEquipmentLocation({}).then(({data})=>{
                    this.companyList = data.data.list;
                    this.siteOne = data.data ? data.data.list:[];
                });
                //获取设备类型
                getEquipmentType().then(({data})=>{
                    /*data.data.list.unshift({
                        id: '',
                        name: "全部"
                    });*/
                    this.EquipmentType =data.data ? data.data.list:[];
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
                    this.shopOne = data.data ? data.data.list:[];
                })
            },
        },
        mounted(){
            this.search();
            this.getEquipment();
            // this.getEquipmentType();
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
