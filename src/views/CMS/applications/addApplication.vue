<template>
    <div class="add_application">
        <nav class="overIew-nav">
            <layout-breadcrumb></layout-breadcrumb>
        </nav>
        <h3>创建应用</h3>
        <div class="add_application_content">
            <el-form :model="dataDialogForm" ref="dataDialogForm" label-width="80px">
                <el-form-item label="应用名称" prop="name" required >
                    <el-input type="text" v-model="dataDialogForm.ame" :maxlength="20" placeholder="请输入应用名(20汉字以内)"
                              :disabled="type"   autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="应用类型" prop="typeID" required>
                    <el-select v-model="dataDialogForm.typeID" @change="getInterface" placeholder="请选择应用类型">
                        <el-option
                            v-for="item in applicationTypes"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="接口选择" required>
                    <span style="font-size: 11px;color: #FE023F;">注意：所选应用类型包含基本接口已默认勾选并不可取消，您可勾选新增修改其他接口服务</span><br/>
                    <template v-for="item in InterfaceApi">
                        <div class="left">
                            <el-checkbox :indeterminate="item.isIndeterminate" @chenge="outerCheck(item)" :v-model="item.checkd" :label="item.name"></el-checkbox>
                        </div>
                        <div class="right">
                            <el-checkbox v-for="api in item.apisList" :v-model="api.checkd" @cheng="innerCheck(api)" :label="api.name" :key="api.id"></el-checkbox>
                        </div>
                    </template>


                </el-form-item>
                <el-form-item label="应用描述" required>
                    <el-input type="textarea" rows="5" show-word-limit :maxlength="100"
                              v-model="dataDialogForm.introduction" placeholder="请输入应用描述"
                              autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="调用量" required>
                    <el-select v-model="dataDialogForm.amountLimit" placeholder="请选择调用量">
                        <el-option label="100" value="1"></el-option>
                        <el-option label="500" value="2"></el-option>
                        <el-option label="1000" value="3"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="QPS限制" required>
                    <el-select v-model="dataDialogForm.qpsLimit" placeholder="请选择QPS限制">
                        <el-option label="10" value="1"></el-option>
                        <el-option label="50" value="2"></el-option>
                        <el-option label="100" value="3"></el-option>
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
            return {
                dataDialogForm: {},

                applicationTypes:[],//应用类型
                InterfaceApi:[],//接口选择



            }
        },
        computed:{
            type(){
                return this.$route.query.type == 'edit' ? true : false;
            }
        },
        methods: {
            create() {
                createApplication().then(({data})=>{
                    if(data.success){

                    }else{

                    }
                })
            },

            outerCheck(item){
                console.log(item);
            },
            innerCheck(ins){
                console.log(ins);
            },




            getApplicationTypes(){
                getApplicationTypes().then(({data})=>{
                    this.applicationTypes = data.data.list;
                })
            },
            getInterface(id){
                getApplicationTypesInterface({baseApiGroupID:id}).then(({data})=>{
                    if(data.data.list){
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