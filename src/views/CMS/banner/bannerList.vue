<template>
  <div class="bannerList">
    <!-- 面包屑导航栏 -->
    <nav class="nav-Type">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{path:'/Company/CompanyHome'}">人脸识别服务</el-breadcrumb-item>
        <el-breadcrumb-item>Banner</el-breadcrumb-item>
      </el-breadcrumb>
    </nav>
    <h3>Banner</h3>
    <div class="bannerList-content">
      <div class="bannerList-table">
        <div class="bannerList-addButton">
          <router-link :to="{path:'/Index/bannerAdd'}">
            <el-button type="primary">新增</el-button>
          </router-link>
          <el-button type="danger" class="gm-delete">删除</el-button>
        </div>
        <div class="bannerList-tableColumn">
          <el-table ref="multipleTable" :data="tableData" border tooltip-effect="dark">
            <el-table-column align="center"  width="55" type="selection"></el-table-column>
            <el-table-column align="center" label="名称">
              <template slot-scope="scope">
                <span></span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="缩略图">
              <template slot-scope="scope">
                <span></span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="排序">
              <template slot-scope="scope">
                <span></span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="创建时间">
              <template slot-scope="scope">
                <span></span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="操作">
              <template slot-scope="scope">
                <router-link :to="{path:'/Index/bannerDetails',query:{Id:''}}">
                  <el-button type="text" style="color:#409eff;">查看</el-button>
                </router-link>
                <router-link :to="{path:'/Index/bannerEdit',query:{Id:''}}">
                  <el-button type="text" style="color:#67c23a;">编辑</el-button>
                </router-link>
                <el-button type="text" style="color:#f56c6c;">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="bannerList-footer">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="page.pageNum"
            :page-sizes="[10, 20, 30, 50, 100]"
            :page-size="page.pageSize"
            background
            layout="total, sizes, prev, pager, next, jumper"
            :total="page.total">
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "bannerList",
    data(){
      return {
        tableData:[],
        page:{
          pageSize:10,
          pageNum:1,
          total:0
        }
      }
    },
    methods:{
      //分页
      handleSizeChange(val){
        this.page.pageSize = val;
      },
      handleCurrentChange(val){
        this.page.pageNum = val;
      }
    }
  }
</script>

<style scoped lang="scss">
  .bannerList{
    width: 100%;
    .bannerList-content{
      background:rgba(255,255,255,1);
      box-shadow:0px 2px 4px 1px rgba(0,0,0,0.1);
      border-radius:10px;
      padding: 30px;
      box-sizing: border-box;
      .bannerList-table{
        width: 100%;
        .bannerList-addButton{
          button{
            padding: 0.08rem 0.25rem;
          }
          .gm-delete{
            margin-left: 10px;
          }
        }
        .bannerList-tableColumn{
          padding-top: 0.2rem;
        }
        .bannerList-footer{
          margin-top: 10px;
          text-align: right;
        }
      }
    }
  }
</style>
