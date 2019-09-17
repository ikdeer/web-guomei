<template>
  <div class="productList-list">
    <!-- 面包屑导航栏 -->
    <nav class="nav-Type">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{path:'/Company/CompanyHome'}">人脸识别服务</el-breadcrumb-item>
        <el-breadcrumb-item>产品服务</el-breadcrumb-item>
      </el-breadcrumb>
    </nav>
    <h3>产品服务</h3>
    <div class="productList-content">
      <div class="productList-table">
        <div class="productList-addButton">
          <router-link :to="{path:'/Index/productAdd'}">
            <el-button type="primary">新增</el-button>
          </router-link>
          <el-button type="danger" class="gm-delete">删除</el-button>
        </div>
        <div class="productList-tableColumn">
          <el-table ref="multipleTable" :data="tableData" border tooltip-effect="dark">
            <el-table-column align="center" width="55" type="selection"></el-table-column>
            <el-table-column align="center" label="服务名称">
              <template slot-scope="scope">
                <span></span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="排序">
              <template slot-scope="scope">
                <span></span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="缩略图">
              <template slot-scope="scope">
                <span></span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="URL">
              <template slot-scope="scope">
                <span></span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="操作">
              <template slot-scope="scope">
                <el-button type="text" style="color:#409eff;">查看</el-button>
                <el-button type="text" style="color:#67c23a;">编辑</el-button>
                <el-button type="text" style="color:#f56c6c;">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div class="productList-footer">
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
  export default {
    name: "productList",
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
          total:0
        }
      }
    },
    methods:{
      //删除
      ClickDelete(typeId){
        this.$confirm('此操作将永久删除这条数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          customClass:'gm-configItem',
          type: 'warning'
        }).then(() => {

        }).catch(() => {});
      },
      handleSizeChange(val){
        this.page.pageSize = val;
      },
      handleCurrentChange(val){
        this.page.currentPage = val;
      },
    },
    mounted(){

    }
  }
</script>

<style lang="scss">
  .productList-list{
    font-size: 0.16rem;
    .productList-content{
      background:rgba(255,255,255,1);
      box-shadow:0px 2px 4px 1px rgba(0,0,0,0.1);
      border-radius:10px;
      padding: 30px;
      box-sizing: border-box;
      .productList-table{
        width: 100%;
        .productList-addButton{
          button{
            padding: 0.08rem 0.25rem;
          }
          .gm-delete{
            margin-left: 10px;
          }
        }
        .productList-tableColumn{
          padding-top: 0.2rem;
        }
      }
      .productList-footer{
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
