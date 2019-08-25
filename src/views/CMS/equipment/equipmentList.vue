<template>
    <div class="equipment_list">
        <nav class="overIew-nav">
            <layout-breadcrumb></layout-breadcrumb>
        </nav>
        <h3>设备管理</h3>
        <div class="equipment_content">
            <div class="equipment_form">
                <el-form :inline="true">
                    <el-form-item label="设备位置">
                        <el-select  clearable
                                    v-model="formData.company"
                                    @clear="clearCompany"
                                    @change="choosedCompany"
                                    placeholder="请选择所属公司">
                            <el-option v-for="item in companyList"
                                       :label="item.companyName"
                                       :value="item.id"
                                       :key="item.id">
                            </el-option>
                        </el-select>
                        <el-select  clearable
                                    v-model="formData.department"
                                    @change="choosedCity"
                                    @clear="clearDepartment"
                                    placeholder="请选择所属部门">
                            <el-option v-for="item in departmentList"
                                       :label="item.departmentName"
                                       :value="item.id"
                                       :key="item.id">
                            </el-option>
                        </el-select>
                        <el-select  clearable
                                    v-model="formData.floor"
                                    placeholder="请选择所属楼层">
                            <el-option v-for="item in floorList"
                                       :label="item.floorName"
                                       :value="item.id"
                                       :key="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="设备类型">
                        <el-select v-model="formData.type"  class="user_list_form_status" placeholder="请选择设备类型">
                            <el-option label="全部" value=""></el-option>
                            <el-option label="未开始" value="1"></el-option>
                            <el-option label="进行中" value="2"></el-option>
                            <el-option label="已结束" value="3"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="设备状态">
                        <el-select v-model="formData.status"  class="user_list_form_status" placeholder="请选择设备状态">
                            <el-option label="全部" value=""></el-option>
                            <el-option label="未开始" value="1"></el-option>
                            <el-option label="进行中" value="2"></el-option>
                            <el-option label="已结束" value="3"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="设备编号">
                        <el-input :maxlength="30" v-model="formData.number" placeholder="请输入设备编号"></el-input>
                    </el-form-item>
                    </el-form-item>
                    <el-form-item label="设备名称">
                        <el-input :maxlength="30" v-model="formData.name" placeholder="请输入设备名称"></el-input>
                    </el-form-item>
                </el-form>
                <div class="equipment_form_btn">
                    <div>
                        <el-button type="primary" @click="addEquiment">添加设备</el-button>
                        <span class="equipment_form_btn_span">在线：<span style="color: #67C23A;">5</span></span>
                        <span class="equipment_form_btn_span">离线：<span style="color: #E56565;">12</span></span>
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
                        prop="telphone"
                        label="设备编号">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="email"
                        label="设备位置">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="createTime"
                        label="设备类型">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="updateTime"
                        label="绑定人脸状态">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="status"
                        label="设备状态">
                    </el-table-column>
                    <el-table-column
                        label="操作" align="center">
                        <template slot-scope="scope">
                            <el-button type="text" @click="see(scope.row)">查看</el-button>
                            <el-button type="text" style="color: #E56565;" @click="edit(scope.row)">修改</el-button>
                            <el-button type="text" style="color: #67C23A;" @click="on(scope.row)">上线</el-button>
                            <el-button type="text" style="color: #67C23A;" @click="down(scope.row)">下线</el-button>
                            <el-button type="text" style="color: #E56565;" @click="binding(scope.row)">绑定人脸</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="equipment_footer">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="page.currentPage"
                    :page-sizes="[10, 20, 30, 40]"
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
            width="6rem">
            <div class="equipment_list_steps">
                <span :class="equipmentDialogInfo.type===1?'active':''">第一步 填写设备信息</span>
                <span :class="equipmentDialogInfo.type===2?'active':''">第二步 绑定人脸分组</span>
            </div>
            <div v-if="equipmentDialogInfo.type===1">
                <el-form label-width="1.5rem">
                    <el-form-item label="设备编号" required>
                        <el-input :maxlength="30" v-model="dialogInfo.number" placeholder="请输入设备编号"></el-input>
                    </el-form-item>
                    <el-form-item label="设备类型" required>
                        <el-select v-model="dialogInfo.status"  class="user_list_form_status" placeholder="请选择设备状态">
                            <el-option label="国美金融" value=""></el-option>
                            <el-option label="国美零售" value="1"></el-option>
                            <el-option label="国美控股" value="2"></el-option>
                        </el-select>
                    </el-form-item>
                    </el-form-item>
                    <el-form-item label="设备名称" required>
                        <el-input :maxlength="25" v-model="dialogInfo.name" placeholder="请输入设备名称"></el-input>
                    </el-form-item>
                    <el-form-item label="设备位置" required>
                        <el-select v-model="dialogInfo.status" placeholder="请选择所属公司">
                            <el-option label="国美金融" value=""></el-option>
                            <el-option label="国美零售" value="1"></el-option>
                            <el-option label="国美控股" value="2"></el-option>
                        </el-select>
                        <el-select v-model="dialogInfo.status" class="marginTop" placeholder="请选择所属部门">
                            <el-option label="国美金融" value=""></el-option>
                            <el-option label="国美零售" value="1"></el-option>
                            <el-option label="国美控股" value="2"></el-option>
                        </el-select>
                        <el-select v-model="dialogInfo.status" class="marginTop" placeholder="请选择所属楼层">
                            <el-option label="国美金融" value=""></el-option>
                            <el-option label="国美零售" value="1"></el-option>
                            <el-option label="国美控股" value="2"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="选择门店" required>
                        <el-select v-model="dialogInfo.status" placeholder="请选择所属大区">
                            <el-option label="国美金融" value=""></el-option>
                            <el-option label="国美零售" value="1"></el-option>
                            <el-option label="国美控股" value="2"></el-option>
                        </el-select>
                        <el-select v-model="dialogInfo.status" class="marginTop" placeholder="请选择所属分部">
                            <el-option label="国美金融" value=""></el-option>
                            <el-option label="国美零售" value="1"></el-option>
                            <el-option label="国美控股" value="2"></el-option>
                        </el-select>
                        <el-select v-model="dialogInfo.status" class="marginTop" placeholder="请选择所属二级分部">
                            <el-option label="国美金融" value=""></el-option>
                            <el-option label="国美零售" value="1"></el-option>
                            <el-option label="国美控股" value="2"></el-option>
                        </el-select>
                        <el-select v-model="dialogInfo.status" class="marginTop" placeholder="请选择所属门店">
                            <el-option label="国美金融" value=""></el-option>
                            <el-option label="国美零售" value="1"></el-option>
                            <el-option label="国美控股" value="2"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </div>

            <div v-if="equipmentDialogInfo.type===2">
                <el-form label-width="1.5rem">
                    <el-form-item label="人脸分组" required>
                        <el-select v-model="dialogInfo.status" placeholder="请选择所属公司">
                            <el-option label="国美金融" value=""></el-option>
                            <el-option label="国美零售" value="1"></el-option>
                            <el-option label="国美控股" value="2"></el-option>
                        </el-select>
                        <el-select v-model="dialogInfo.status" class="marginTop" placeholder="请选择所属部门">
                            <el-option label="国美金融" value=""></el-option>
                            <el-option label="国美零售" value="1"></el-option>
                            <el-option label="国美控股" value="2"></el-option>
                        </el-select>
                        <el-select v-model="dialogInfo.status" class="marginTop" placeholder="请选择所属楼层">
                            <el-option label="国美金融" value=""></el-option>
                            <el-option label="国美零售" value="1"></el-option>
                            <el-option label="国美控股" value="2"></el-option>
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
    export default {
        name: "equipmentList",
        data(){
            return{
                formData:{
                    company:'',//公司
                    department:'',//部门
                    floor:'',//楼层
                    type:'',//设备类型
                    status:'',//设备状态
                    number:'',//设备编号
                    name:''//设备名称
                },
                companyList:[],//公司列表
                departmentList:[],//部门列表
                floorList:[],//楼层列表


                tableData:[],
                page:{
                    currentPage:1,
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

                },
                dialogFace:{

                }
            }
        },
        methods:{
            clearCompany(){
                //清除公司
            },
            choosedCompany(){
                // 选中公司
            },
            choosedCity(){

            },
            clearDepartment(){

            },
            addEquiment(){//添加设备
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


            },
            reset(){
                this.formData={
                    company:'',//公司
                    department:'',//部门
                    floor:'',//楼层
                    type:'',//设备类型
                    status:'',//设备状态
                    number:'',//设备编号
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
            },
            down(row){
                //下线操作
            },
            binding(row){
              //绑定人脸操作
            },
            handleSizeChange(val){
                this.page.pageSize = val;
                this.search()
            },
            handleCurrentChange(val){
                this.page.currentPage = val;
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
            height: 0.5rem;
            margin-bottom: 10px;
            span{
                width: 40%;
                background: #EFEDED;
                position: relative;
                display: inline-block;
                height: .5rem;
                line-height: 0.5rem;
                color: #666666;
                text-align: center;
                padding-left: 0.3rem;
                &:after{
                    content: '';
                    display: block;
                    border-top: 0.25rem solid transparent;
                    border-bottom: 0.25rem solid transparent;
                    border-left: 0.4rem solid #EFEDED;
                    position: absolute;
                    right: -0.4rem;
                    top: 0;
                    z-index: 10;
                }
                &:before{
                    content: '';
                    display: block;
                    border-top: 0.25rem solid #EFEDED;
                    border-bottom: 0.25rem solid #EFEDED;
                    border-left: 0.4rem solid white;
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
                    border-left: 0.4rem solid #409EFF;
                }
                &:before{
                    border-top: 0.25rem solid #409EFF;
                    border-bottom: 0.25rem solid #409EFF;
                }
            }
        }
        .el-form{
            padding: 0 30px;
            .el-input{
                width: 200px;
            }
            .marginTop{
                margin-top: 10px;
            }
        }
    }
</style>