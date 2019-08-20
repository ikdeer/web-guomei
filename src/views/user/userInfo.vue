<template>
    <div class="userInfo">
        <nav class="overIew-nav">
            <layout-breadcrumb></layout-breadcrumb>
        </nav>
        <h3>用户基本信息</h3>
        <div class="info">
            <div class="info_title">
                <div class="info_title_l">
                    <img src="" alt="">
                    <div>你好<br/>欢迎使用</div>
                </div>
                <div class="info_title_r">

                </div>
            </div>
            <div class="info_list">用户名：admin</div>
            <div class="info_list">手机绑定：
                <el-input v-model="input" placeholder="请输入内容"></el-input>
                <div>
                    <el-button type="primary" @click="">查询</el-button>
                    <el-button class="" @click="">清空</el-button>
                </div>
            </div>
            <div class="info_list">邮箱绑定：ssss@email.com</div>
            <div class="info_list">账号状态：已启用</div>
        </div>
        <h3>联系人</h3>
        <div class="user_table">
            <el-button type="primary" @click="">新增</el-button>
            <el-table
                :data="tableData"
                style="width: 100%">
                <el-table-column
                    prop="username"
                    label="用户名">
                </el-table-column>
                <el-table-column
                    prop="telphone"
                    label="手机号">
                </el-table-column>
                <el-table-column
                    prop="email"
                    label="邮箱">
                </el-table-column>
                <el-table-column
                    label="操作">
                    <template slot-scope="scope">
                        <el-button type="text" @click="see(scope.row)">修改</el-button>
                        <el-button type="text" style="color: #E56565;" @click="remove(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
    export default {
        name: "userInfo",
        data(){
            return {
                input:'',
                tableData:[],
            }
        },
        methods:{

        },
        mounted(){

        }
    }
</script>

<style lang="scss" scoped>
    .userInfo{
        .overIew-nav{
            width: 100%;
            height: 70px;
            display: flex;
            display: -webkit-flex;
            align-items: center;
            border-bottom: 1px dashed #979797;
            .el-breadcrumb{
                font-size: 20px;
            }
            .el-breadcrumb__inner{
                color: #333333;
            }
        }
    }
</style>