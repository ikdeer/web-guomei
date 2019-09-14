<template>
    <div class="SDK-Download">
      <!-- 面包屑导航栏 -->
      <nav class="nav-Type">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{path:'/Company/CompanyHome'}">人脸识别服务</el-breadcrumb-item>
          <el-breadcrumb-item>SDK下载</el-breadcrumb-item>
        </el-breadcrumb>
      </nav>
      <h3>SDK下载</h3>
      <div class="SDK-Content">
        <div class="SDK-table">
          <el-table :data="tableData" style="width: 100%" border size="small">
            <el-table-column label="ID" align="center">
              <template slot-scope="scope">
                <span>{{scope.row.id}}</span>
              </template>
            </el-table-column>
            <el-table-column label="标题" align="center">
              <template slot-scope="scope">
                <span>{{scope.row.name}}</span>
              </template>
            </el-table-column>
            <el-table-column label="创建时间" align="center">
              <template slot-scope="scope">
                <span>{{scope.row.createTime}}</span>
              </template>
            </el-table-column>
            <el-table-column label="下载说明" align="center">
              <template slot-scope="scope">
                <span>介绍：云从商用SDK，采用云从科技先进人脸识别算法，拥有多项独家专利技术，
        为客户提供易集成，高性能的人脸识别相关接口。商用SDK包括人脸检测模块，特征识别模块，
        提供人脸检测，跟踪，对齐，质量分，特征提取，特征比对，属性识别等接口。</span>
              </template>
            </el-table-column>
            <el-table-column label="下载地址" align="center">
              <template slot-scope="scope">
                <span>{{scope.row.url}}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <a class="download" :href="scope.row.url" download="" title="下载">
                  <el-button type="primary" size="small">
                    下载
                    <i class="el-icon-download"></i>
                  </el-button>
                </a>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="SDK_footer">
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
</template>

<script>
  import {getDownloadList} from "../../../HttpApi/SDKDownload/SDKDownload";
  export default {
    name: "SDKDownload",
    data(){
      return {
        tableData:[],
        page:{
          pageNum:1,
          pageSize:10,
          total:0,
        }
      }
    },
    methods:{
      //SDK下载
      getDownloadList(){
        getDownloadList({page:this.page.pageNum,pageSize:this.page.pageSize})
          .then(response => {
            if(response.data.errorCode == 200){
              this.tableData = response.data.data.list;
            }else{
              this.$message.warning(response.data.errorInfo);
            }
        })
      },
      handleSizeChange(val){
        this.page.pageSize = val;
        this.getDownloadList()
      },
      handleCurrentChange(val){
        this.page.pageNum = val;
        this.getDownloadList()
      },
    },
    mounted(){
      this.getDownloadList();
    }
  }
</script>

<style scoped lang="scss">
.SDK-Download{
  width: 100%;
  .SDK-Content{
    background: #fff;
    -webkit-box-shadow: 0px 2px 4px 1px rgba(0,0,0,0.1);
    box-shadow: 0px 2px 4px 1px rgba(0,0,0,0.1);
    border-radius: 10px;
    padding: 30px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    .SDK-table{
      width: 100%;
      background: #ffffff;
    }
    .SDK_footer{
      margin-top: 10px;
      text-align: right;
    }
  }
}
</style>
