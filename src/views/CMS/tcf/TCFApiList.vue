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
            <el-button type="primary">查询</el-button>
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
            <el-table-column align="center" label="apiID">
              <template slot-scope="scope">
                <span>{{ scope.row.id}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="api标题">
              <template slot-scope="scope">
                <span>{{ scope.row.name}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="创建时间">
              <template slot-scope="scope">
                <span>{{ scope.row.createTime}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="最后修改时间">
              <template slot-scope="scope">
                <span>{{ scope.row.lastModifyTime}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="操作">
              <template slot-scope="scope">
                <router-link :to="{path:'/Index/TCFApiDetails',query:{id:scope.row.id}}">
                  <el-button type="text">查看</el-button>
                </router-link>
                <router-link :to="{path:'/Index/TCFApiEdit',query:{id:scope.row.id}}">
                  <el-button type="text" style="color:#e6a23c">编辑</el-button>
                </router-link>
                <el-button type="text" style="color:#f56c6c" @click="ClickDelete(scope.row.id)">删除</el-button>
              </template>
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
  import {getTechDoc,getTechDocDel} from "../../../HttpApi/TCFApi/TCFApi";
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
      //技术文档列表
      getTechDoc(){
        getTechDoc({page:this.page.currentPage,pageSize:this.page.pageSize}).then(response => {
          if(response.data.errorCode == 200){
            this.tableData = response.data.data.list;
            this.page.total = response.data.pagerManager.totalResults;//总条数
          }else{
            this.$message.warning(response.data.errorInfo);
          }
        })
      },
      //删除
      ClickDelete(typeId){
        this.$confirm('此操作将永久删除这条数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          customClass:'gm-configItem',
          type: 'warning'
        }).then(() => {
          getTechDocDel({id:typeId}).then(response => {
            if(response.data.errorCode == 200){
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              this.getTechDoc();
            }else{
              this.$message.warning(response.data.errorInfo);
            }
          })
        }).catch(() => {});
      },
      handleSizeChange(val){
        this.page.pageSize = val;
        this.getTechDoc();
      },
      handleCurrentChange(val){
        this.page.currentPage = val;
        this.getTechDoc();
      },
    },
    mounted(){
      this.getTechDoc();
    }
  }
</script>

<style lang="scss">
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
  .gm-configItem{
    .el-message-box__content{
      padding: 0.3rem 0.3rem;
      color: #333333;
      font-weight: 600;
      text-align: left;
    }
    .el-message-box__btns{
      button{
        padding: 0.09rem 0.25rem;
      }
    }
  }
</style>
