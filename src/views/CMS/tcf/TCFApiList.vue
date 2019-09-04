<template>
  <div class="api-list">
    <!-- 面包屑导航栏 -->
    <nav class="nav-Type">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>技术文档</el-breadcrumb-item>
      </el-breadcrumb>
    </nav>
    <h3>技术文档</h3>
    <div class="api-content">
      <div class="api-form">
        <el-form :inline="true">
          <el-form-item label="api公告ID">
            <el-input :maxlength="20" v-model="formData.user" placeholder="请输入api公告ID"></el-input>
          </el-form-item>
          <el-form-item label="api公告标题">
            <el-input :maxlength="20" v-model="formData.ip" placeholder="请输入api公告标题"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="search">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="api-table">
        <div class="api-addButton">
          <router-link :to="{path:'/Index/TCFApiAdd'}">
            <el-button type="primary">新增API</el-button>
          </router-link>
        </div>
        <div class="api-tableColumn">
          <el-table ref="multipleTable" :data="tableData" border tooltip-effect="dark">
            <el-table-column prop="userName" align="center" label="apiID"></el-table-column>
            <el-table-column prop="logDesc" align="center" label="api标题"></el-table-column>
            <el-table-column prop="createDate" align="center" label="创建时间"></el-table-column>
            <el-table-column prop="createDate" align="center" label="操作">
              <el-button type="text">编辑</el-button>
              <el-button type="text">查看</el-button>
              <el-button type="text">删除</el-button>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div class="api-footer">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page.currentPage"
          :page-sizes="[10, 20, 30, 50, 100]"
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
  import {getTechDocContentShow} from "../../../HttpApi/TCFApi/TCFApi";
  export default {
    name: "TCFApiList",
    data(){
      return {
        formData:{
          user:'',
          ip:'',
          dataTime:'',
        },
        tableData:[],
        page:{
          currentPage:1,
          pageSize:10,
          total:500
        }
      }
    },
    methods:{
      getTechDocContentShow(){
        getTechDocContentShow({
          page:this.page.currentPage,
          pageSize:this.page.pageSize,
        }).then(response => {
          console.log(response);
        })
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
      this.getTechDocContentShow();
    }
  }
</script>

<style lang="scss" scoped>
  .api-list{
    font-size: 0.16rem;
    .api-content{
      background:rgba(255,255,255,1);
      box-shadow:0px 2px 4px 1px rgba(0,0,0,0.1);
      border-radius:10px;
      padding: 30px;
      box-sizing: border-box;
      .api-form{
        border-bottom: 1px solid #cccccc;
        margin-bottom: 0.1rem;
      }
      .api-table{
        width: 100%;
        .api-addButton{
          button{
            padding: 0.08rem 0.25rem;
          }
        }
        .api-tableColumn{
          padding-top: 0.2rem;
        }
      }
      .api-footer{
        margin-top: 10px;
        text-align: right;
      }

    }
  }
</style>
