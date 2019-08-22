<template>
    <div class="statement">
        <nav class="overIew-nav">
            <layout-breadcrumb></layout-breadcrumb>
        </nav>
        <h3>监控报表</h3>
        <div class="statement_content">
            <el-form :inline="true">
                <el-form-item label="创建人">
                    <el-input :maxlength="11" v-model="formData.tel" placeholder="请输入创建人"></el-input>
                </el-form-item>
                <el-form-item label="选择应用">

                </el-form-item>
                <el-form-item label="选择API">
                    <el-select v-model="formData.status"  class="user_list_form_status" placeholder="请选择状态">
                        <el-option label="全部" value=""></el-option>
                        <el-option label="未开始" value="1"></el-option>
                        <el-option label="进行中" value="2"></el-option>
                        <el-option label="已结束" value="3"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="统计项">
                    <el-input :maxlength="20" v-model="formData.email" placeholder="请输入邮箱"></el-input>
                </el-form-item>
                <el-form-item label="监控项">
                    <el-input :maxlength="20" v-model="formData.email" placeholder="请输入邮箱"></el-input>
                </el-form-item>

                <el-form-item label="时间段">
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
        </div>
    </div>
</template>

<script>
    export default {
        name: "statement",
        data(){
            return{

            }
        },
        methods:{

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