<template>
    <div class="overIew">
      <!-- 面包屑导航栏 -->
      <nav class="nav-Type">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{path:'/Company/CompanyHome'}">人脸识别服务</el-breadcrumb-item>
          <el-breadcrumb-item>概览</el-breadcrumb-item>
        </el-breadcrumb>
      </nav>
      <div class="overIew-content">
        <div class="overIew-use">
          <p class="overIew-userTitle">概览</p>
          <div class="overIew-userCenter">
            <div class="overIew-use_left">
              <p class="overIew-use_text">应用</p>
              <div class="use-content">
                <div class="use-contentPad">
                  <div class="user-TextNum">
                    <p class="user-contentNum">
                      &emsp;已建应用：
                      <span>{{newAppsCount}}</span>
                      个
                    </p>
                    <p class="user-contentNum">
                      待审核应用：
                      <span>{{toBeAuditedAppsCount}}</span>
                      个
                    </p>
                  </div>
                  <div class="use-contentButton">
                    <router-link :to="{path:'/Index/applicationList',query:{NavType:'overview'}}">
                      <el-button class="button-bluer" type="primary">管理应用</el-button>
                    </router-link>
                    <router-link v-if="groupID == '20'" :to="{path:'/Index/addApplication',query:{type:'add',NavType:'overview'}}">
                      <el-button class="button-red">创建应用</el-button>
                    </router-link>
                  </div>
                </div>
              </div>
            </div>
            <div class="overIew-use_right">
              <div class="overIew-dosage">
                <span>用量</span>
                <div class="block">
                  <span class="demonstration">请选择时间</span>
                  <el-date-picker
                    v-model="TimeData.TimeDate"
                    type="daterange"
                    :picker-options="pickerOptions"
                    @change="TimeBluer"
                    range-separator="至"
                    clearable
                    value-format="yyyy-MM-dd HH:mm:ss"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    :default-time="['00:00:00', '23:59:59']">
                  </el-date-picker>
                </div>
              </div>
              <div class="overIew-right_pad">
                <el-table :data="tableData" header-row-class-name="tableHead" style="width: 100%">
                  <el-table-column label="API"  align="center">
                    <template slot-scope="scope">
                      <span>{{scope.row.name}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="调用量" align="center" width="110">
                    <template slot-scope="scope">
                      <span>{{scope.row.apiCallCount}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column align="center" label="调用失败">
                    <template slot-scope="scope">
                      <span>{{scope.row.apiCallFailCount}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column align="center" label="失败率">
                    <template slot-scope="scope">
                      <span>{{scope.row.failureRate}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column align="center" label="详细统计">
                    <template slot-scope="scope">
                      <el-button type="text" @click.stop="clickStatement(scope)">查看</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </div>
          </div>
        </div>
        <div class="overIew-basics">
          <p class="basics-topText">基础应用</p>
          <div class="basics-ListPad">
            <div class="basics-ListPad_face">
              <img src="/static/images/face_icon@2x.png" alt="">
              <div class="face-Text">
                <h4>人脸识别</h4>
                <p>包括人脸检测、人脸比对、人脸属性分析、1：n人脸 检索、1：1人脸检索及人脸库管理</p>
              </div>
            </div>
            <div class="basics-ListPad_face">
              <img src="/static/images/head_icon@2x.png" alt="">
              <div class="face-Text">
                <h4>活体检测</h4>
                <p>支持应用终端、服务端的人脸动作活体检测</p>
              </div>
            </div>
            <div class="basics-ListPad_face">
              <img src="/static/images/certificate_icon@2x.png" alt="">
              <div class="face-Text">
                <h4>文字识别</h4>
                <p>支持身份证、银行卡文字 识别</p>
              </div>
            </div>
          </div>
        </div>
        <div class="overIew-scene">
          <div class="scene-top">
            <p class="scene-topText">常用应用场景</p>
            <router-link class="overIew-fixed" tag="div" :to="{path:'/Company/solution'}">
              <span>更多</span>
              <i class="el-icon-arrow-right"></i>
            </router-link>
          </div>
          <div class="scene-ListPad">
            <div class="ListPad-scene">
              <div class="ListPad-scene_center">
                <img src="/static/images/attendance_icon@2x.png" alt="">
                <p class="scene-Title">刷脸考勤</p>
                <p class="scene-Text">包括人脸检测、人脸比对、人脸属性分析、1：n人脸检索、1：1人脸检索及人脸库管理</p>
                <div class="scene-Text_span">
                  <span>主要服务：</span>
                  <span>人脸检测</span>
                </div>
              </div>
            </div>
            <div class="ListPad-scene ListPad-RKE">
              <div class="ListPad-scene_center">
                <img src="/static/images/guard_icon@2x.png" alt="">
                <p class="scene-Title">刷脸门禁考勤</p>
                <p class="scene-Text">支持应用终端、服务端的人脸动作活体检测</p>
                <div class="scene-Text_span">
                  <span>主要服务：</span>
                  <span class="ListPad-Text_RKE">人脸检索</span>
                </div>
              </div>
            </div>
            <div class="ListPad-scene ListPad-bgRed">
              <div class="ListPad-scene_center">
                <img src="/static/images/security_icon@2x.png" alt="">
                <p class="scene-Title">安防监控</p>
                <p class="scene-Text">支持身份证、银行卡文字识别</p>
                <div class="scene-Text_span">
                  <span>主要服务：</span>
                  <span class="ListPad-TextRed">人脸检索</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import { formatTimes } from '@/lib/utils'
import {getAppAudit,getApisConSumpTion} from "../../../HttpApi/overview/overview";
export default {
    name: "overview",
    data(){
      return {
        formatTimes:formatTimes,
        newAppsCount:0,//应用总数
        toBeAuditedAppsCount:0,//待审核应用
          pickerOptions: {
              shortcuts: [
                  {
                      text: '今天',
                      onClick(picker) {
                          let start = formatTimes(new Date(), true) + ' 00:00:00';
                          let end = formatTimes(new Date(), true) + ' 23:59:59';
                          picker.$emit('pick', [start, end]);
                      }
                  }, {
                      text: '昨天',
                      onClick(picker) {
                          let start = formatTimes(new Date(), true) + ' 00:00:00';
                          let end = formatTimes(new Date(), true) + ' 23:59:59';
                          start = new Date(new Date(start).getTime() - 3600 * 1000 * 24 * 1);
                          end = new Date(new Date(end).getTime() - 3600 * 1000 * 24 * 1);
                          picker.$emit('pick', [start, end]);
                      }
                  }, {
                      text: '近7天',
                      onClick(picker) {
                          let start = formatTimes(new Date(), true) + ' 00:00:00';
                          let end = formatTimes(new Date(), true) + ' 23:59:59';
                          start = new Date(new Date(start).getTime() - 3600 * 1000 * 24 * 7);
                          end = new Date(new Date(end));
                          picker.$emit('pick', [start, end]);
                      }
                  },
                  {
                      text: '近30天',
                      onClick(picker) {
                          let start = formatTimes(new Date(), true) + ' 00:00:00';
                          let end = formatTimes(new Date(), true) + ' 23:59:59';
                          start = new Date(new Date(start).getTime() - 3600 * 1000 * 24 * 30);
                          end = new Date(new Date(end));
                          picker.$emit('pick', [start, end]);
                      }
                  }
              ]
          },
        TimeData:{
          TimeDate:[formatTimes(new Date(),true)+' 00:00:00',formatTimes(new Date(),true)+' 23:59:59'],//时间获取
          timeStart:'',//创建开始时间
          timeEnd:'',//创建结束时间
          top:5,//用量数量条数
        },
        tableData: [],//列表数据
        groupID:'',//登录人员身份
      }
    },
    methods:{
      //应用审核数据总量
      getAppAudit(){
        getAppAudit({}).then(response => {
          if(response.data.errorCode == 200){
            this.newAppsCount = response.data.data.data.newAppsCount;
            this.toBeAuditedAppsCount =response.data.data.data.toBeAuditedAppsCount;
          }else{
            this.$message.warning(response.data.errorInfo);
          }
        })
      },
      //选择时间
      TimeBluer(){
          console.log(this.TimeData.TimeDate);
          getApisConSumpTion({
          'timeStart':this.TimeData.TimeDate != null ? this.TimeCycle(this.TimeData.TimeDate[0]) : '',//开始时间
          'timeEnd':this.TimeData.TimeDate != null ? this.TimeCycle(this.TimeData.TimeDate[1]) : '',//结束时间
          'top':this.TimeData.top,
        }).then(response => {
          if(response.data.errorCode == 200){
            if(response.data.data){
              this.tableData = response.data.data.list;
            }else{
              this.tableData = [];
            }
          }else{
            this.$message.warning(response.data.errorInfo);
          }
        })
      },
      //应用App用量列表
      getApisConSumpTion(){
        getApisConSumpTion(this.TimeData).then(response => {
          if(response.data.errorCode == 200){
            if(response.data.data){
              this.tableData = response.data.data.list;
            }else{
              this.tableData = [];
            }
          }else{
            this.$message.warning(response.data.errorInfo);
          }
        })
      },
      //跳转监控报表
      clickStatement(scope){
        this.$router.push({path:'/Index/statement',query:{id:scope.row.id,NavType:'overview'}});
      },
      //时间转换格式2019-01-01 00:00:00
      TimeCycle(Time){
        let myDate = new Date(Time);
        let F = myDate.getFullYear();//年
        let M = myDate.getMonth()+1;//月
        let D = myDate.getDate();//日
        let H = myDate.getHours();//时
        let Mis = myDate.getMinutes();//分
        let S = myDate.getSeconds();//秒
        return `${F}-${M > 10 ? M : '0'+M}-${D > 10 ? D : '0'+D} ${H > 10 ? H : '0'+H}:${Mis > 10 ? Mis : '0'+Mis}:${S > 10 ? S : '0'+S}`;
      }
    },
    mounted(){
      this.groupID = JSON.parse(this.Cookies.get('userInfo')).groupID;
      this.TimeBluer();
      this.getAppAudit();
      this.getApisConSumpTion();
    }
}
</script>

<style scoped lang="scss">
.overIew{
  width: 100%;
  padding-bottom: 0.3rem;
  .overIew-nav{
    width: 100%;
    height: 0.55rem;
    display: flex;
    display: -webkit-flex;
    align-items: center;
    border-bottom: 1px dashed #979797;
  }
  .overIew-content{
    width:auto;
    .overIew-use{
      .overIew-userTitle{
        font-size: 0.16rem;
        color: #333333;
        line-height: 0.5rem;
        font-weight: 600;
      }
      .overIew-userCenter{
        height: 4.13rem;
        background: #ffffff;
        box-shadow:0 0.02rem 0.04rem 0.01rem rgba(0,0,0,0.1);
        border-radius:0.1rem;
        overflow: hidden;
        display: flex;
        display: -webkit-flex;
        justify-content: space-between;
        padding-left: 0.3rem;
        padding-right: 0.25rem;
        padding-top: 0.2rem;
        .overIew-use_left{
          width:7.14rem;
          position: relative;
          .overIew-use_text{
            font-size: 0.16rem;
            color: #333333;
            font-weight: 600;
            margin: 0;
            line-height: 0.4rem;
            padding-top: 0.05rem;
            padding-bottom: 0.05rem;
          }
          .use-content{
            width: 6.6rem;
            height: 3.6rem;
            display: flex;
            display: -webkit-flex;
            align-items: center;
            justify-content: center;
            .use-contentPad{
              width: 6rem;
              height: 3.65rem;
              box-shadow:0 0.02rem 0.3rem 0 rgba(255,255,255,0.33);
              border-radius:0.2rem;
              overflow: hidden;
              background: url('/static/images/audit_bg_image@2x.png')center center no-repeat;
              -webkit-background-size: cover;
              background-size: cover;
              .user-TextNum{
                margin-top: 0.8rem;
                .user-contentNum{
                  font-size: 0.24rem;
                  color: #666666;
                  text-align: center;
                  padding-bottom: 0.1rem;
                  span{
                    font-size:0.3rem;
                    color: #F20A59;
                  }
                }
              }
              .use-contentButton{
                padding-top: 0.15rem;
                display: flex;
                display: -webkit-flex;
                align-items: center;
                justify-content: space-between;
                flex-direction: column;
                button{
                  font-size: 0.16rem;
                  width: 1.3rem;
                  height: 0.4rem;
                  background:#FE023F;
                  color: #ffffff;
                  border-color:#FE023F;
                  margin-left:0;
                  margin-bottom: 0.1rem;
                }
              }
            }
          }
          .overIew-el_button{
            display: flex;
            display: -webkit-flex;
            position: absolute;
            left: 0;
            bottom: 0.7rem;
            .button-bluer{
              background:rgba(64,158,255,1);
            }
            .button-red{
              background:rgba(242,10,89,1);
              border-color:#F20A59;
              color: #ffffff;
            }
          }
        }
        .overIew-use_right{
          width: 9rem;
          .overIew-dosage{
            display: flex;
            display: -webkit-flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;
            height: 0.4rem;
            padding-top: 0.05rem;
            padding-bottom: 0.3rem;
            span{
              font-size: 0.16rem;
              color: #333333;
              font-weight: 600;
            }
            .block{
              display: flex;
              display: -webkit-flex;
              align-items: center;
              >span{
                font-size: 0.14rem;
                color: #333333;
                font-weight: 500;
                padding-right: 0.2rem;
              }
              .el-range-separator{
                font-size: 0.14rem;
                color: #666666;
              }
            }
          }
          .overIew-right_pad{
            width: 9rem;
            height: 3.35rem;
            .tableHead{
              color: #333333;
              font-weight: 600;
              th{
                background: #F1F1F1;
              }
            }
          }
        }
      }
    }
    .overIew-basics{
      width: auto;
      .basics-topText{
        font-size: 0.16rem;
        color: #333333;
        line-height: 0.6rem;
        margin: 0;
        font-weight: 600;
      }
      .basics-ListPad{
        height: 2.72rem;
        display: flex;
        display: -webkit-flex;
        background: #ffffff;
        box-shadow:0 0.02rem 0.04rem 1px rgba(0,0,0,0.1);
        border-radius:0.1rem;
        align-items: center;
        padding-left:0.3rem;
        padding-right: 0.3rem;
        justify-content: space-between;
        .basics-ListPad_face{
          width: 32%;
          height: 2.12rem;
          display: flex;
          display: -webkit-flex;
          align-items: center;
          border: 1px solid #409EFF;
          img{
            width: 1.5rem;
            height: 1.32rem;
            display: block;
            margin-left: 0.24rem;
          }
          .face-Text{
            width: 1.94rem;
            height: 1.32rem;
            margin-left: 0.2rem;
            h4{
              margin: 0;
              font-size:0.16rem;
              font-weight: 600;
              color: #333333;
            }
            p{
              font-size:0.14rem;
              color:#666666;
              margin-top: 0.3rem;
            }
          }
        }
      }
    }
    .overIew-scene{
      width: auto;
      .scene-top{
        display: flex;
        display: -webkit-flex;
        align-items: center;
        justify-content: space-between;
        height: 0.6rem;
        .scene-topText{
          font-size: 0.16rem;
          color:#333333;
          font-weight: 600;
          margin: 0;
        }
        .overIew-fixed{
          display: flex;
          display: -webkit-flex;
          align-items: center;
          justify-content: center;
          margin-right:0.1rem;
          span{
            font-size:0.16rem;
            font-weight: 500;
          }
          .el-icon-arrow-right{
            font-size:0.18rem;
            margin-top: 0.02rem;
          }
        }
      }
      .scene-ListPad{
        display: flex;
        display: -webkit-flex;
        background:#ffffff;
        box-shadow:0 0.02rem 0.04rem 0.01rem rgba(0,0,0,0.1);
        border-radius:0.1rem;
        padding: 0.3rem;
        justify-content: space-between;
        .ListPad-scene{
          width: 32%;
          height:2.86rem;
          border: 1px solid #409EFF;
          background:rgba(241,249,255,1);
          display: flex;
          display: -webkit-flex;
          align-items: center;
          justify-content: center;
          .ListPad-scene_center{
            width: 3.23rem;
            >img{
              width: 0.8rem;
              height: 0.96rem;
              margin-left: auto;
              margin-right: auto;
              display: block;
            }
            .scene-Title{
              font-size:0.16rem;
              font-weight: 600;
              color:#333333;
              margin:0;
              padding:0.2rem 0;
              text-align: center;
            }
            .scene-Text{
              font-size:0.14rem;
              color:#666666;
              margin: 0;
              height: 0.45rem;
              text-align: center;
            }
            .scene-Text_span{
              display: flex;
              display: -webkit-flex;
              align-items: center;
              justify-content: center;
              padding-top: 0.11rem;
              span:first-child{
                font-size:0.16rem;
                color: #333333;
              }
              span:last-child{
                font-size:0.16rem;
                color: #409EFF;
              }
              .ListPad-Text_RKE{
                color:#F79648 !important;
              }
              .ListPad-TextRed{
                color:#ED6A65 !important;
              }
            }
          }
        }
        .ListPad-RKE{
          border: 1px solid #F79648;
          background:rgba(255,244,236,1);
        }
        .ListPad-bgRed{
          border: 1px solid #ED6A65;
          background:rgba(255,235,234,1);
        }
      }
    }
  }
}
</style>
