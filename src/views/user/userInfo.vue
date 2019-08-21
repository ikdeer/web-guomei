<template>
    <div class="userInfo">
        <h3>用户基本信息</h3>
        <div class="info">
            <div class="info_title">
                <img src="static/images/head1.png" alt="">
                <div>你好<br/>欢迎使用</div>
            </div>
            <div class="info_list">&emsp;用户名：admin</div>
            <div class="info_list">手机绑定：
                <div class="info_list_inp">
                    <el-input v-model="input" size="small" :maxlength="11" placeholder="请输入内容"></el-input>
                </div>
                <div class="info_list_btn">
                    <el-button type="primary" size="small" @click="">确定</el-button>
                    <el-button class="" size="small" @click="">取消</el-button>
                </div>
            </div>
            <div class="info_list">邮箱绑定：ssss@email.com</div>
            <div class="info_list">账号状态：已启用</div>
        </div>
        <h3>联系人</h3>
        <div class="user_table">
            <div class="user_table_btn">
                <el-button type="primary" size="small" @click="">新增</el-button>
            </div>
            <el-table
                size="small"
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
                    align="center"
                    label="操作">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="see(scope.row)">修改</el-button>
                        <el-button type="text" size="small" style="color: #E56565;" @click="remove(scope.row)">删除</el-button>
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
        h3{
            color: #333333;
            font-weight: 600;
            font-size: 16px;
            margin: 0;
            padding: 0;
            height: 50px;
            line-height: 50px;
        }
        .info{
            background:rgba(255,255,255,1);
            box-shadow:0px 2px 4px 1px rgba(0,0,0,0.1);
            border-radius:10px;
            padding: 30px;
            box-sizing: border-box;
            .info_title{
                display: flex;
                display: -webkit-flex;
                align-items: center;
                img{
                    width: 50px;
                    height: 50px;
                    margin-right: 10px;
                    display: inline-block;
                    -webkit-border-radius: 100%;
                    -moz-border-radius: 100%;
                    border-radius: 100%;
                }
            }
            .info_list{
                color: #333333;
                height: 50px;
                line-height: 50px;
                border-bottom:1px solid rgba(238,238,238,1);
                position: relative;
                .info_list_inp{
                    display: inline-block;
                }
                .info_list_btn{
                    position: absolute;
                    right: 0;
                    display: inline-block;
                }
            }
        }

        .user_table{
            background:rgba(255,255,255,1);
            box-shadow:0px 2px 4px 1px rgba(0,0,0,0.1);
            border-radius:10px;
            padding:10px 30px 30px 30px;
            box-sizing: border-box;
            .user_table_btn{
                height: 50px;
                line-height: 50px;
                text-align: right;
            }
        }
    }
</style>