<template>
    <div class="solutionList">
      <!-- 面包屑导航栏 -->
      <nav class="nav-Type">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{path:'/Company/CompanyHome'}">人脸识别服务</el-breadcrumb-item>
          <el-breadcrumb-item>解决方案</el-breadcrumb-item>
        </el-breadcrumb>
      </nav>
      <h3>解决方案</h3>
      <div class="solutionList-content">
        <div class="solutionList-table">
          <div class="solutionList-addButton">
            <router-link :to="{path:'/Index/solutionAdd'}">
              <el-button type="primary">新增</el-button>
            </router-link>
            <el-button type="danger" class="gm-delete" @click="ClickBatchDeLeTe">删除</el-button>
          </div>
          <div class="solutionList-tableColumn">
            <el-table ref="multipleTable"
                      :data="tableData"
                      border
                      v-loading="loading"
                      @selection-change="handleSelectionChange"
                      tooltip-effect="dark">
              <el-table-column align="center"  width="55" type="selection"></el-table-column>
              <el-table-column align="center" label="标题">
                <template slot-scope="scope">
                  <span>{{scope.row.title}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" width="150" label="缩略图">
                <template slot-scope="scope">
                  <img :src="scope.row.imgUrl" class="scope-Img" alt="">
                </template>
              </el-table-column>
              <el-table-column align="center" label="主要服务">
                <template slot-scope="scope">
                  <span>{{scope.row.primaryService}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="简介">
                <template slot-scope="scope">
                  <span>{{scope.row.intro}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="URL">
                <template slot-scope="scope">
                  <span>{{scope.row.urlAddress}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" width="55" label="排序">
                <template slot-scope="scope">
                  <span>{{scope.row.sort}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="操作">
                <template slot-scope="scope">
                  <router-link :to="{path:'/Index/solutionDetails',query:{Id:scope.row.id}}">
                    <el-button type="text" style="color:#409eff;">查看</el-button>
                  </router-link>
                  <router-link :to="{path:'/Index/solutionEdit',query:{Id:scope.row.id}}">
                    <el-button type="text" style="color:#67c23a;">编辑</el-button>
                  </router-link>
                  <el-button type="text" style="color:#f56c6c;" @click="ClickDelete(scope.row.id)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="solutionList-footer">
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
import {getSolutionShow,getSolutionDel,getSolutionDelBatch} from "@/HttpApi/solution/solutionApi";
export default {
   name: "solutionList",
   data(){
     return {
       tableData:[],
       DeleteArr:[],//批量删除
       loading:false,
       page:{
         pageSize:10,
         pageNum:1,
         total:0
       }
     }
   },
  methods:{
    //解决方案列表
    getSolutionShow(){
      this.loading = true;
      getSolutionShow({page:this.page.pageNum,pageSize:this.page.pageSize}).then(response => {
        this.loading = false;
        if(response.data.errorCode == 200){
          this.tableData = response.data.data ? response.data.data.list : [];
          this.page.total = response.data.pagerManager ? response.data.pagerManager.totalResults : 0;//总条数
        }else{
          this.$message.error(response.data.errorInfo);
        }
      })
    },
    //删除
    ClickDelete(id){
      this.$confirm('此操作将永久删除这条数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        customClass:'gm-configItem',
      }).then(() => {
        getSolutionDel({id:id}).then(response => {
          if(response.data.errorCode == 200){
            this.$message({message: '删除成功',type: 'success'});
            this.page.pageNum = 1;
            this.getSolutionShow();
          }else{
            this.$message.error(response.data.errorInfo);
          }
        })
      }).catch(() => {});
    },
    //批量删除
    ClickBatchDeLeTe(){
      if(this.DeleteArr.length != 0){
        this.$confirm('此操作将永久删除数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          customClass:'gm-configItem',
        }).then(() => {
          getSolutionDelBatch({ids:this.DeleteArr}).then(response => {
            if(response.data.errorCode == 200){
              this.$message({message: '批量删除成功',type: 'success'});
              this.page.pageNum = 1;
              this.getBannerShow();
            }else{
              this.$message.error(response.data.errorInfo);
            }
          })
        }).catch(() => {});
      }else{
        this.$message.error('请选择你要删除的数据');
      }
    },
    //全部批量选中数组ID
    handleSelectionChange(val){
      let arr = [];
      for(let i =0; i < val.length; i++){
        arr.push(val[i].id);
      }
      this.DeleteArr = arr;
    },
    //分页
    handleSizeChange(val){
      this.page.pageSize = val;
      this.page.pageNum = 1;
      this.getSolutionShow();
    },
    handleCurrentChange(val){
      this.page.pageNum = val;
      this.getSolutionShow();
    }
  },
  mounted(){
    this.getSolutionShow();
  }
}
</script>

<style scoped lang="scss">
.solutionList{
  width: 100%;
  .solutionList-content{
    background:rgba(255,255,255,1);
    box-shadow:0px 2px 4px 1px rgba(0,0,0,0.1);
    border-radius:10px;
    padding: 30px;
    box-sizing: border-box;
    .solutionList-table{
      width: 100%;
      .solutionList-addButton{
        button{
          padding: 0.08rem 0.25rem;
        }
        .gm-delete{
          margin-left: 10px;
        }
      }
      .solutionList-tableColumn{
        padding-top: 0.2rem;
      }
      .solutionList-footer{
        margin-top: 10px;
        text-align: right;
      }
      .scope-Img{
        width: 150px;
        height:100%;
        display: block;
      }
    }
  }
}
</style>
