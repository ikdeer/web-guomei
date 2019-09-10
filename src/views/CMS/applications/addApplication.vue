<template>
    <div class="add_application">
        <!-- 面包屑导航栏从概览过来 -->
        <template v-if="Breadcrumb == 'overview'">
          <nav class="nav-Type">
            <el-breadcrumb separator="/">
              <el-breadcrumb-item :to="{path:'/Company/CompanyHome'}">人脸识别服务</el-breadcrumb-item>
              <el-breadcrumb-item :to="{path:'/Index/overview'}">概览</el-breadcrumb-item>
              <el-breadcrumb-item>{{type?'修改应用':'创建应用'}}</el-breadcrumb-item>
            </el-breadcrumb>
          </nav>
        </template>
        <!-- 本级过来 -->
        <template v-if="Breadcrumb == 'VIS-A-VIS'">
          <nav class="nav-Type">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{path:'/Company/CompanyHome'}">人脸识别服务</el-breadcrumb-item>
              <el-breadcrumb-item :to="{path:'/Index/applicationList'}">应用列表</el-breadcrumb-item>
              <el-breadcrumb-item>{{type ?'修改应用':'创建应用'}}</el-breadcrumb-item>
            </el-breadcrumb>
          </nav>
        </template>
        <h3>{{type ?'修改应用':'创建应用'}}</h3>
        <div class="add_application_content">
            <el-form :model="dataForm" ref="dataForm" :rules="dataFormRules" label-width="80px">
                <el-form-item label="应用名称" prop="name" required >
                    <el-input type="text" v-model="dataForm.name" :maxlength="20" placeholder="请输入应用名(20汉字以内)"
                              :disabled="type"   autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="应用类型" prop="typeID" required>
                    <el-select v-model="dataForm.typeID" :disabled="type" @change="getInterface" placeholder="请选择应用类型">
                        <el-option
                            v-for="item in applicationTypes"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <div style="font-size: 11px;color: #FE023F;margin:0 0 10px 80px;">注意：所选应用类型包含基本接口已默认勾选并不可取消，您可勾选新增修改其他接口服务</div>
                <el-form-item label="接口选择" prop="api" required>
                    <template v-for="item in InterfaceApi">
                        <div class="left" @click="outerCheck(item)">
                            <i class="el-icon-plus left_icon" v-if="!item.isShow"></i>
                            <i class="el-icon-minus left_icon" v-if="item.isShow"></i>
                            {{item.name}}
                        </div>
                        <div class="right" v-show="item.isShow">
                            <el-checkbox v-for="api in item.apisList" v-model="api.checkd" @change="innerCheck(api)" :label="api.name" :key="api.id"></el-checkbox>
                        </div>
                    </template>
                </el-form-item>
                <el-form-item label="应用描述" prop="introduction" required>
                    <el-input type="textarea" rows="5" show-word-limit :maxlength="100"
                              v-model="dataForm.introduction" placeholder="请输入应用描述"
                              autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="create">{{type?'修改':'立即创建'}}</el-button>
                    <el-button @click="onback">取消</el-button>
                </el-form-item>
            </el-form>

        </div>

    </div>
</template>

<script>
    import { getApplicationDetail,getApplicationTypes,getApplicationTypesInterface,createApplication,editApplication } from '@/HttpApi/application/application';
    export default {
        name: "addApplication",
        data() {
            let name = (rule, value, callback) => {
                if(value){
                    if(/[^\u4e00-\u9fa5]/.test(value)){
                        return callback(new Error('请填写20位以内的汉字'));
                    }else{
                        return callback()
                    }
                }else{
                    return callback(new Error('请填写应用名称'))
                }
            };
            let introduction = (rule, value, callback) => {
                if(value){
                    return callback()
                }else{
                    return callback(new Error('请填写应用描述'))
                }
            };
            let typeID = (rule, value, callback) => {
                if(value){
                    return callback()
                }else{
                    return callback(new Error('请选择应用类型'))
                }
            };
            let api = (rule, value, callback) => {
                let ids = [];
                this.InterfaceApi.forEach((item)=>{
                    item.apisList.forEach((ins)=>{
                        if(ins.checkd){
                            ids.push(ins.id);
                        }
                    })
                });
                if(ids.length === 0){
                    return callback(new Error('请选择接口'))
                }else{
                    return callback()
                }
            };




            return {
                dataForm: {
                    //amountLimit:'',//调用量 , 用量限制
                    introduction:'',//应用描述
                    name:'',//应用名称
                    //qpsLimit:'',//qps限制
                    typeID:'',//APP类型ID
                    id:'',//APP的ID
                    api:'1'
                },

                applicationTypes:[],//应用类型
                InterfaceApi:[],//接口选择
                info:{},//登录用户信息

                dataFormRules:{
                    name:[
                        {validator:name,trigger:['blur','change']}
                    ],
                    introduction:[
                        {validator:introduction,trigger:['blur','change']}
                    ],
                    typeID:[
                        {validator:typeID,trigger:['blur','change']}
                    ],
                    api:[
                        {validator:api,trigger:['blur','change']}
                    ]
                },
                Breadcrumb:'',//面包屑导航栏
            }
        },
        computed:{
            type(){
                return this.$route.query.type == 'edit' ? true : false;
            }
        },
        methods: {
            create() {
                this.$refs['dataForm'].validate((valid) => {
                    if (valid) {
                        let ids = [];
                        this.InterfaceApi.forEach((item)=>{
                            item.apisList.forEach((ins)=>{
                                if(ins.checkd){
                                    ids.push(ins.id);
                                }
                            })
                        });
                        let params = {
                            ...this.dataForm,
                            createrID:this.info.uid,
                            apiIds:ids.join()
                        };
                        if(this.type){
                            //编辑
                            params.id = this.$route.query.id;
                            editApplication(params).then(({data})=>{
                                if(data.success){
                                    this.$message.success('编辑成功');
                                    this.onback()
                                }else{
                                    this.$message.warning(data.errorInfo)
                                }
                            })
                        }else{
                            createApplication(params).then(({data})=>{
                                if(data.success){
                                    this.$message.success('创建成功');
                                    this.onback()
                                }else{
                                    this.$message.warning(data.errorInfo)
                                }
                            })
                        }
                    } else {
                        return false;
                    }
                });
            },
            onback(){
                this.$router.push({path:'/Index/applicationList'})
            },
            outerCheck(item){
                if(item.isShow){
                    item.isShow = false;
                }else{
                    item.isShow = true;
                }
            },
            innerCheck(ins){
                console.log(this.InterfaceApi[ins.index].apisList)
            },
            getDetail(){
                getApplicationDetail({appID:this.$route.query.id}).then(({data})=>{
                    if(data.success){
                        this.dataForm.name = data.data.data.name;
                        this.dataForm.introduction = data.data.data.introduction;
                        this.dataForm.typeID = String(data.data.data.typeID);

                        let apiArray = [];
                        if(data.data.data.apisList.length){
                            data.data.data.apisList.forEach((item)=>{
                                apiArray.push(item.id)
                            })
                        }
                        this.getInterface(data.data.data.typeID,apiArray)
                    }else{
                        this.$message.warning(data.errorInfo)
                    }
                })
            },

            getApplicationTypes(){
                getApplicationTypes().then(({data})=>{
                    this.applicationTypes = data.data.list;
                })
            },
            getInterface(id,ArrayId){
                getApplicationTypesInterface({baseApiGroupID:id}).then(({data})=>{
                    if(data.data){
                        /*给外层一个默认值 内层一个外层index备用*/
                        data.data.list.forEach((item,index)=>{
                            item.isShow = true;
                            item.index = index;
                            if(item.apisList){
                                item.apisList.forEach((ins,ind)=>{
                                    if(ArrayId){
                                        if(ArrayId.indexOf(ins.id) < 0 ){
                                            ins.checkd = false;
                                        }else {
                                            ins.checkd = true;
                                        }
                                    }else{
                                        ins.checkd = false;
                                    }
                                    ins.index = index;
                                });
                            }
                        });
                        this.InterfaceApi = data.data.list;
                    }else{
                        this.InterfaceApi = [];
                    }
                })
            }
        },
        mounted() {
            this.getApplicationTypes();
            this.info = JSON.parse(this.Cookies.get('userInfo'));
            this.Breadcrumb = this.$route.query.NavType;//面包屑导航栏
            if(this.$route.query.type === 'edit'){
                this.getDetail();
            }
        }
    }
</script>

<style lang="scss" scoped>
    .add_application {
        font-size: .16rem;
        .add_application_content {
            background: rgba(255, 255, 255, 1);
            box-shadow: 0 2px 4px 1px rgba(0, 0, 0, 0.1);
            border-radius: 10px;
            padding: 30px;
            box-sizing: border-box;
            .el-form {
                width: 560px;
                .el-form-item__content{
                    .left{
                        cursor: pointer;
                        width: 90px;
                        color: #666666;
                        float: left;
                        .left_icon{
                            display: inline-block;
                            width: 14px;
                            height: 14px;
                            font-size: 12px;
                            text-align: center;
                            line-height: 14px;
                            margin-right: 5px;
                            color: #409EFF;
                            border:1px solid #409EFF;
                        }
                    }
                    .right{
                        float: left;
                        width: calc(100% - 120px);
                        margin-left: 20px;
                        .el-checkbox{
                            width: 82px;
                        }
                    }
                }
            }
        }
    }
</style>
