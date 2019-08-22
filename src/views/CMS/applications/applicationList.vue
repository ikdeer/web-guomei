<template>
    <div class="application_list">
      <nav class="overIew-nav">
        <layout-breadcrumb></layout-breadcrumb>
      </nav>
      <h3>应用列表</h3>

      <div class="application_list_content">
        <div class="application_list_form">
          <el-form :inline="true" label-width="80px">
            <el-form-item label="应用名称">
              <el-input :maxlength="20" v-model="formData.name" placeholder="请输入应用名称"></el-input>
            </el-form-item>
            <el-form-item label="APPID">
              <el-input :maxlength="20" v-model="formData.id" placeholder="请输入APPID"></el-input>
            </el-form-item>
            <el-form-item label="应用状态">
              <el-select v-model="formData.status" placeholder="请选择状态">
                <el-option label="全部" value=""></el-option>
                <el-option label="未开始" value="1"></el-option>
                <el-option label="进行中" value="2"></el-option>
                <el-option label="已结束" value="3"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="审核状态">
              <el-select v-model="formData.status"  placeholder="请选择状态">
                <el-option label="全部" value=""></el-option>
                <el-option label="未开始" value="1"></el-option>
                <el-option label="进行中" value="2"></el-option>
                <el-option label="已结束" value="3"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="创建人">
              <el-input :maxlength="20" v-model="formData.user" placeholder="请输入创建人"></el-input>
            </el-form-item>
            <el-form-item label="创建时间">
              <el-date-picker
                class="application_list_form_time"
                v-model="formData.dataTime"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>
          </el-form>
          <div class="application_list_btn">
            <div>
              <el-button type="primary" @click="adduser">创建应用</el-button>
            </div>
            <div>
              <el-button type="primary" @click="search">查询</el-button>
              <el-button @click="reset">清空</el-button>
            </div>
          </div>
        </div>
        <div class="application_list_table">
          <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column
              align="center"
              prop="username"
              label="用户名">
            </el-table-column>
            <el-table-column
              align="center"
              prop="telphone"
              label="手机号">
            </el-table-column>
            <el-table-column
              align="center"
              prop="email"
              label="邮箱">
            </el-table-column>
            <el-table-column
              align="center"
              prop="createTime"
              label="创建时间">
            </el-table-column>
            <el-table-column
              align="center"
              prop="updateTime"
              label="最近一次登录">
            </el-table-column>
            <el-table-column
              align="center"
              prop="status"
              label="账号状态">
            </el-table-column>
            <el-table-column
              label="操作" align="center">
              <template slot-scope="scope">
                <el-button type="text" @click="see(scope.row)">查看</el-button>
                <el-button type="text" style="color: #E56565;" @click="down(scope.row)">停用</el-button>
                <el-button type="text" style="color: #67C23A;" @click="on(scope.row)">启用</el-button>
                <el-button type="text" style="color: #E56565;" @click="remove(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="application_list_footer">
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

    </div>
</template>

<script>
    export default {
        name: "applicationList",
      data() {
        return {
          formData: {},
          tableData:[],
          page:{
            currentPage:1,
            pageSize:10,
            total:500
          }
        }
      },
      methods:{
        search(){

        },
        reset(){

        },
        handleSizeChange(val){
          this.page.pageSize = val;
          this.search()
        },
        handleCurrentChange(val){
          this.page.currentPage = val;
          this.search()
        },
      },
      mounted(){

      }
    }
</script>

<style lang="scss" scoped>
.application_list{
  font-size: .16rem;
  .application_list_content{
    background:rgba(255,255,255,1);
    box-shadow:0px 2px 4px 1px rgba(0,0,0,0.1);
    border-radius:10px;
    padding: 30px;
    box-sizing: border-box;

    .application_list_form{
      .el-form{
        order-bottom: 1px solid #eeeeee;
      }
      .application_list_btn{
        height: 50px;
        line-height: 50px;
        display: flex;
        display: -webkit-flex;
        justify-content: space-between;
      }

    }
    .application_list_table{
      width: 100%;
    }
    .application_list_footer{
      margin-top: 10px;
      text-align: right;
    }
  }
}
</style>
