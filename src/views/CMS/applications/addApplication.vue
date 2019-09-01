<template>
    <div class="add_application">
        <nav class="overIew-nav">
            <layout-breadcrumb></layout-breadcrumb>
        </nav>
        <h3>创建应用</h3>
        <div class="add_application_content">
            <el-form :model="dataForm" ref="dataForm" :rules="dataFormRules" label-width="80px">
                <el-form-item label="应用名称" prop="name" required >
                    <el-input type="text" v-model="dataForm.name" :maxlength="20" placeholder="请输入应用名(20汉字以内)"
                              :disabled="type"   autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="应用类型" prop="typeID" required>
                    <el-select v-model="dataForm.typeID" @change="getInterface" placeholder="请选择应用类型">
                        <el-option
                            v-for="item in applicationTypes"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="接口选择" prop="api" required>
                    <span style="font-size: 11px;color: #FE023F;">注意：所选应用类型包含基本接口已默认勾选并不可取消，您可勾选新增修改其他接口服务</span><br/>
                    <template v-for="item in InterfaceApi">
                        <div class="left">
                            <el-checkbox :indeterminate="item.isIndeterminate" @change="outerCheck(item)" v-model="item.checkd" :label="item.name"></el-checkbox>
                        </div>
                        <div class="right">
                            <el-checkbox v-for="api in item.apisList" v-model="api.checkd" @change="innerCheck(api)" :label="api.name" :key="api.id"></el-checkbox>
                        </div>
                    </template>
                </el-form-item>
                <el-form-item label="应用描述" prop="introduction" required>
                    <el-input type="textarea" rows="5" show-word-limit :maxlength="100"
                              v-model="dataForm.introduction" placeholder="请输入应用描述"
                              autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="调用量" prop="amountLimit" required>
                    <el-select v-model="dataForm.amountLimit" placeholder="请选择调用量">
                        <el-option label="100" value="100"></el-option>
                        <el-option label="500" value="500"></el-option>
                        <el-option label="1000" value="1000"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="QPS限制" prop="qpsLimit" required>
                    <el-select v-model="dataForm.qpsLimit" placeholder="请选择QPS限制">
                        <el-option label="10" value="10"></el-option>
                        <el-option label="50" value="50"></el-option>
                        <el-option label="100" value="100"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="create">立即创建</el-button>
                    <el-button @click="$router.back()">&emsp;取消&emsp;</el-button>
                </el-form-item>
            </el-form>

        </div>

    </div>
</template>

<script>
    import { getApplicationTypes,getApplicationTypesInterface,createApplication } from '@/HttpApi/application/application';
    export default {
        name: "addApplication",
        data() {
            let name = (rule, value, callback) => {
                if(value){
                    if(/[^\u4e00-\u9fa5]/.test(value)){
                        return callback(new Error('请输入20位以内的汉字'));
                    }else{
                        return callback()
                    }
                }else{
                    return callback(new Error('请输入应用名称'))
                }
            };
            let introduction = (rule, value, callback) => {
                if(value){
                    return callback()
                }else{
                    return callback(new Error('请输入应用描述'))
                }
            };
            let amountLimit = (rule, value, callback) => {
                if(value){
                    return callback()
                }else{
                    return callback(new Error('请选择调用量'))
                }
            };
            let qpsLimit = (rule, value, callback) => {
                if(value){
                   return callback()
                }else{
                    return callback(new Error('请选择QPS限制'))
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
                    amountLimit:'',//调用量 , 用量限制
                    introduction:'',//应用描述
                    name:'',//应用名称
                    qpsLimit:'',//qps限制
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
                    amountLimit:[
                        {validator:amountLimit,trigger:['blur','change']}
                    ],
                    qpsLimit:[
                        {validator:qpsLimit,trigger:['blur','change']}
                    ],
                    typeID:[
                        {validator:typeID,trigger:['blur','change']}
                    ],
                    api:[
                        {validator:api,trigger:['blur','change']}
                    ]
                }
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
                        createApplication(params).then(({data})=>{
                            if(data.success){
                                this.$message.success('创建成功');
                                this.$router.back()
                            }else{
                                this.$message.warning(data.errorInfo)
                            }
                        })
                    } else {
                        return false;
                    }
                });
            },
            outerCheck(item){
                this.InterfaceApi[item.index].isIndeterminate = false;
                if(this.InterfaceApi[item.index].apisList){
                    this.InterfaceApi[item.index].apisList.forEach((ins)=>{
                        ins.checkd = item.checkd;
                    })
                }
            },
            innerCheck(ins){
                if(this.InterfaceApi[ins.index].apisList){
                    let count = 0;
                    this.InterfaceApi[ins.index].apisList.forEach((item)=>{
                        if(item.checkd){
                            count++
                        }
                    });
                    if(this.InterfaceApi[ins.index].apisList.length === count){
                        this.InterfaceApi[ins.index].isIndeterminate = false;
                        this.InterfaceApi[ins.index].checkd = true;
                    }else{
                        if(count===0){
                            this.InterfaceApi[ins.index].checkd = false;
                            this.InterfaceApi[ins.index].isIndeterminate = false;
                        }else{
                            this.InterfaceApi[ins.index].isIndeterminate = true;
                        }
                    }
                }
            },


            getApplicationTypes(){
                getApplicationTypes().then(({data})=>{
                    this.applicationTypes = data.data.list;
                })
            },
            getInterface(id){
                getApplicationTypesInterface({baseApiGroupID:id}).then(({data})=>{
                    if(data.data){
                        /*给外层一个默认值 内层一个外层index备用*/
                        data.data.list.forEach((item,index)=>{
                            item.isIndeterminate = false;
                            item.checkd = false;
                            item.index = index;
                            if(item.apisList){
                                item.apisList.forEach((ins,ind)=>{
                                    ins.checkd = false;
                                    ins.index = index;
                                })
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
            // console.log(this.info)
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
                width: 520px;
                .el-form-item__content{
                    .right{
                        margin-left: 24px;
                    }
                }
            }
        }
    }
</style>