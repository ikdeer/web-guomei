<template>
    <div class="statement">
        <nav class="overIew-nav">
            <layout-breadcrumb></layout-breadcrumb>
        </nav>
        <h3>监控报表</h3>
        <div class="statement_content">
            <div class="statement_form">
                <el-form label-width="80px">
                    <el-form-item label="创建人">
                        <el-input :maxlength="20" style="width: 200px" v-model="formData.user" placeholder="请输入创建人"></el-input>
                    </el-form-item>
                    <el-form-item label="选择应用">
                        <el-select v-model="formData.category" multiple placeholder="请选择">
                            <el-option
                                v-for="item in formData.categoryList"
                                :key="item.id"
                                :label="item.name+' '+item.id"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="选择API">
                        <el-select v-model="formData.status"  class="user_list_form_status" placeholder="请选择状态">
                            <el-option
                                v-for="item in formData.categoryList"
                                :key="item.id"
                                :label="item.name+' '+item.id"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="统计项">
                        <el-radio-group v-model="formData.radio">
                            <el-radio :label="3">调用量</el-radio>
                            <el-radio :label="6">QPS</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="监控项">
                        <el-checkbox-group v-model="formData.checkList">
                            <el-checkbox label="调用成功"></el-checkbox>
                            <el-checkbox label="调用失败"></el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                    <el-form-item label="时间段">
                        <el-date-picker
                            class="user_list_form_time"
                            v-model="formData.dataTime"
                            type="daterange"
                            range-separator="-"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="search">查询</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div class="statement_echarts">

            </div>
            <div class="statement_table">
                <el-table
                    :data="tableData"
                    style="width: 100%">
                    <el-table-column
                        align="center"
                        prop="username"
                        label="应用名称">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="telphone"
                        label="应用类型">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="email"
                        label="AppID">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="createTime"
                        label="调用量">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="updateTime"
                        label="调用成功">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="updateTime"
                        label="调用失败">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="updateTime"
                        label="失败率">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="status"
                        label="最后调用时间">
                    </el-table-column>
                </el-table>
            </div>

        </div>
    </div>
</template>

<script>
    export default {
        name: "statement",
        data(){
            return{
                formData:{
                    checkList:[]
                },
                tableData:[],

            }
        },
        methods:{
            search(){

            }
        },
        mounted(){

        }
    }
</script>

<style lang="scss" scoped>
.statement{
    font-size: .16rem;
    .statement_content{
        background:rgba(255,255,255,1);
        box-shadow:0 2px 4px 1px rgba(0,0,0,0.1);
        border-radius:10px;
        padding: 30px;
        box-sizing: border-box;


    }
}
</style>