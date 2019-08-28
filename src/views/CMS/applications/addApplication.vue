<template>
    <div class="add_application">
        <nav class="overIew-nav">
            <layout-breadcrumb></layout-breadcrumb>
        </nav>
        <h3>创建应用</h3>
        <div class="add_application_content">
            <el-form :model="dataDialogForm" ref="dataDialogForm" label-width="80px">
                <el-form-item label="应用名称" prop="name" required >
                    <el-input type="phone" v-model="dataDialogForm.ame" :maxlength="20" placeholder="请输入应用名(20汉字以内)"
                              :disabled="type"   autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="应用类型" prop="typeID" required>
                    <el-select v-model="dataDialogForm.typeID" placeholder="请选择应用类型">
                        <el-option
                            v-for="item in dataDialogForm.categoryList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="接口选择" required>
                    <span style="font-size: 8px;color: #FE023F;">注意：所选应用类型包含基本接口已默认勾选并不可取消，您可勾选新增修改其他接口服务</span>

                </el-form-item>
                <el-form-item label="应用描述" prop="introduction" required>
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
                dataDialogForm: {}
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
            getApplicationTypes(){
                getApplicationTypes().then(({data})=>{
                    if(data.success){

                    }else{

                    }
                })
            },
            getInterface(){
                getApplicationTypesInterface({baseApiGroupID:1}).then(({data})=>{
                    if(data.success){

                    }else{

                    }
                })
            }
        },
        mounted() {
            console.log(this.type)
            this.getApplicationTypes();
            this.getInterface();
        }
    }
</script>

<style lang="scss" scoped>
    .add_application {
        font-size: .16rem;
        .add_application_content {
            background: rgba(255, 255, 255, 1);
            box-shadow: 0px 2px 4px 1px rgba(0, 0, 0, 0.1);
            border-radius: 10px;
            padding: 30px;
            box-sizing: border-box;
            .el-form {
                width: 40%;
            }
        }
    }
</style>