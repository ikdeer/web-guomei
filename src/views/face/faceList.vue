<template>
    <div class="facelist">
        <nav class="overIew-nav">
            <layout-breadcrumb></layout-breadcrumb>
        </nav>
        <div class="">
            <h3>人脸分组列表</h3>
            <el-button type="text" @click="see(scope.row)">查看</el-button>
        </div>
        <div class="content">
            <div class="face_list_form">
                <el-form :inline="true">
                    <el-form-item label="人脸分组名称">
                        <el-input :maxlength="11" v-model="formData.name" placeholder="请输入人脸分组名称"></el-input>
                    </el-form-item>
                    <el-form-item label="人脸分组ID">
                        <el-input :maxlength="20" v-model="formData.id" placeholder="请输入人脸分组ID"></el-input>
                    </el-form-item>
                    <el-form-item label="创建人">
                        <el-input :maxlength="20" v-model="formData.user" placeholder="请输入创建人"></el-input>
                    </el-form-item>
                    <el-form-item label="创建时间">
                        <el-date-picker
                            class="user_list_form_time"
                            v-model="formData.dataTime"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                        </el-date-picker>
                    </el-form-item>
                </el-form>
                <div class="face_list_btn">
                    <div>
                        <el-button type="primary" @click="addface">创建用户</el-button>
                    </div>
                    <div>
                        <el-button type="primary" @click="search">查询</el-button>
                        <el-button @click="reset">清空</el-button>
                    </div>
                </div>
            </div>
            <div class="face_list_table">
                <el-table
                    :data="tableData"
                    style="width: 100%">
                    <el-table-column
                        align="center"
                        prop="username"
                        label="人脸分组名称">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="telphone"
                        label="人脸分组ID">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="email"
                        label=" 创建时间">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="createTime"
                        label="修改时间">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="updateTime"
                        label="创建人">
                    </el-table-column>
                    <el-table-column
                        label="操作" align="center">
                        <template slot-scope="scope">
                            <el-button type="text" @click="see(scope.row)">查看</el-button>
                            <el-button type="text" style="color: #E56565;" @click="down(scope.row)">修改分组</el-button>
                            <el-button type="text" style="color: #67C23A;" @click="on(scope.row)">添加人像</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "userList",
        data() {
            return {
                formData:{
                    name:'',
                    id:'',
                    user:'',
                    dataTime:''
                },
                tableData:[{}],
            }
        },
        methods: {
            addface(){

            },
            search(){

            },
            reset(){
                this.formData = {
                    tel:'',
                    email:'',
                    status:'',
                    dataTime:''
                };
                this.search();
            },
        },
    }
</script>

<style lang="scss" scoped>
    .facelist{
        .content{
            background:rgba(255,255,255,1);
            box-shadow:0px 2px 4px 1px rgba(0,0,0,0.1);
            border-radius:10px;
            padding: 30px;
            box-sizing: border-box;
            .face_list_form{
                position: relative;
                .el-form{
                    border-bottom: 1px solid #eeeeee;
                    .el-form-item__label{
                        color: #666666;
                    }
                    .user_list_form_status{
                        width: 120px;
                    }
                    .user_list_form_time{
                        width: 300px;
                    }
                }
            }
            .face_list_btn{
                height: 50px;
                line-height: 50px;
                display: flex;
                display: -webkit-flex;
                justify-content: space-between;
            }
        }
    }
</style>
