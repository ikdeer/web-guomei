<template>
    <div class="overIew">
      <nav class="overIew-nav">
        <layout-breadcrumb></layout-breadcrumb>
      </nav>
      <div class="overIew-content">
        <div class="overIew-use">
          <div class="overIew-use_left">
            <p class="overIew-use_text">应用</p>
            <div class="use-content">
              <div class="use-content_left">
                <div class="use-content_left_pad">
                  <span>已建应用</span>
                  <div class="use-content_num">
                    <span>101</span>
                    <span>个</span>
                  </div>
                </div>
                <div class="use-content_button">
                  <el-button type="primary">管理应用</el-button>
                  <el-button>创建应用</el-button>
                </div>
              </div>
              <div class="use-content_right">
                <span>待审核应用</span>
                <div class="use-content_num">
                  <span>101</span>
                  <span>个</span>
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
                  v-model="value6"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期">
                </el-date-picker>
              </div>
            </div>
            <div class="overIew-right_pad">
              <div class="overIew-right_table">
                <el-table :data="tableData" :cell-style="{padding:'10px'}" header-row-class-name="tableHead" style="width: 100%">
                  <el-table-column label="API" width="140" align="center">
                    <template slot-scope="scope">
                      <span>{{scope.row.date}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="调用量" align="center" width="140">
                    <template slot-scope="scope">
                      <span>{{scope.row.name}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column align="center" width="140" label="调用失败">
                    <template slot-scope="scope">
                      <span>{{scope.row.province}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column align="center" width="140" label="失败率">
                    <template slot-scope="scope">
                      <span>{{scope.row.city}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column align="center" label="详细统计">
                    <template slot-scope="scope">
                      <el-button type="text">查看</el-button>
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
          <p class="scene-topText">常用应用场景</p>
          <div class="scene-ListPad">
            <div class="ListPad-scene">
              <div class="ListPad-scene_center">
                <img src="/static/images/attendance_icon@2x.png" alt="">
                <p class="scene-Title">涮脸考勤</p>
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
                <p class="scene-Title">涮脸门禁考勤</p>
                <p class="scene-Text">支持应用终端、服务端的人脸动作活体检测</p>
                <div class="scene-Text_span">
                  <span>主要服务：</span>
                  <span class="ListPad-Text_RKE">人脸检索</span>
                </div>
              </div>
            </div>
            <div class="ListPad-scene ListPad-bgRed">
              <div class="ListPad-scene_center">
                <img src="/static/images/guard_icon@2x.png" alt="">
                <p class="scene-Title">安防监控</p>
                <p class="scene-Text">支持身份证、银行卡文字识别、服务端的人脸动作活体检测</p>
                <div class="scene-Text_span">
                  <span>主要服务：</span>
                  <span class="ListPad-TextRed">人脸检索</span>
                </div>
              </div>
            </div>
            <div class="overIew-fixed">
              <span>更多</span>
              <i class="el-icon-arrow-right"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "overview",
        data(){
          return {
            value6:'',
            tableData: [{
              date: '2016-05-03',
              name: '王小虎',
              province: '上海',
              city: '普陀区',
            }, {
                date: '2016-05-03',
                name: '王小虎',
                province: '上海',
                city: '普陀区',
            }, {
                date: '2016-05-03',
                name: '王小虎',
                province: '上海',
                city: '普陀区',
            }, {
                date: '2016-05-03',
                name: '王小虎',
                province: '上海',
                city: '普陀区',
            }]
          }
        },
        methods:{

        }
    }
</script>

<style lang="scss">
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
    .el-breadcrumb{
      font-size: 0.16rem;
    }
    .el-breadcrumb__inner{
      color: #333333;
    }
  }
  .overIew-content{
    width: 100%;
    .overIew-use{
      width: auto;
      height: 4.18rem;
      overflow: hidden;
      display: flex;
      display: -webkit-flex;
      justify-content: space-between;
      .overIew-use_left{
        width:7.8rem;
        height: 4.18rem;
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
          height: 3.25rem;
          background: #ffffff;
          box-shadow:0px 2px 4px 1px rgba(0,0,0,0.1);
          border-radius:0.1rem;
          display: flex;
          display: -webkit-flex;
          justify-content: space-between;
          padding-left: 0.3rem;
          padding-right: 0.3rem;
          padding-top: 0.28rem;
          .use-content_left{
            .use-content_left_pad{
              width:3.5rem;
              height:2.28rem;
              background:linear-gradient(133deg,rgba(255,191,151,1) 0%,rgba(250,118,135,1) 100%);
              box-shadow:0 0.02rem 0.3rem 0 rgba(255,255,255,0.33);
              border-radius:0.2rem;
              >span{
                font-size: 0.24rem;
                color: #ffffff;
                font-weight: 600;
                display: block;
                padding-top: 0.39rem;
                margin-left: 0.30rem;
              }
              .use-content_num{
                display: flex;
                display: -webkit-flex;
                align-items:baseline;
                padding-top: 0.46rem;
                padding-left: 0.30rem;
                span:first-child{
                  font-size: 0.8rem;
                  font-weight: bold;
                  display: block;
                  color: #ffffff;
                }
                span:last-child{
                  font-size:0.2rem;
                  color: #ffffff;
                }
              }
            }
            .use-content_button{
              padding-top: 0.3rem;
              .el-button{
                padding: 0.1rem 0.2rem;
              }
            }
          }
          .use-content_right{
            width:3.5rem;
            height:2.28rem;
            background:linear-gradient(133deg,rgba(142,201,248,1) 0%,rgba(53,148,231,1) 100%);
            box-shadow:0 0.02rem 0.3rem 0 rgba(255,255,255,0.33);
            border-radius:0.2rem;
            >span{
              font-size: 0.24rem;
              color: #ffffff;
              font-weight: 600;
              display: block;
              padding-top: 0.39rem;
              margin-left: 0.3rem;
            }
            .use-content_num{
              display: flex;
              display: -webkit-flex;
              align-items:baseline;
              padding-top: 0.46rem;
              padding-left: 0.3rem;
              span:first-child{
                font-size: 0.8rem;
                font-weight: bold;
                display: block;
                color: #ffffff;
              }
              span:last-child{
                font-size:0.2rem;
                color: #ffffff;
              }
            }
          }
        }
      }
      .overIew-use_right{
        width: 7.8rem;
        .overIew-dosage{
          display: flex;
          display: -webkit-flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          height: 0.4rem;
          padding-top: 0.05rem;
          padding-bottom: 0.05rem;
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
          width: 7.8rem;
          height: 3.53rem;
          background: #fff;
          box-shadow:0 0.02rem 0.04rem 1px rgba(0,0,0,0.1);
          border-radius:0.1rem;
          .overIew-right_table{
            padding:0.2rem 0.3rem;
            .tableHead{
              color: #333333;
              font-weight: 600;
              height: 0.6rem;
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
        line-height: 0.5rem;
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
        .basics-ListPad_face{
          width: 4.24rem;
          height: 2.12rem;
          display: flex;
          display: -webkit-flex;
          align-items: center;
          border: 1px solid #409EFF;
          margin-right:0.2rem;
          img{
            width: 1.5rem;
            height: 1.32rem;
            display: block;
            margin-left: 0.24rem;
          }
          .face-Text{
            width: 1.94rem;
            height: 1.32rem;
            display: flex;
            display: -webkit-flex;
            flex-direction: column;
            justify-content: space-between;
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
              margin: 0;
            }
          }
        }
      }
    }
    .overIew-scene{
      width: auto;
      .scene-topText{
        font-size: 0.16rem;
        color:#333333;
        font-weight: 600;
        line-height: 0.55rem;
        margin: 0;
      }
      .scene-ListPad{
        display: flex;
        display: -webkit-flex;
        background:#ffffff;
        box-shadow:0 0.02rem 0.04rem 0.01rem rgba(0,0,0,0.1);
        border-radius:0.1rem;
        padding-left: 0.3rem;
        padding-top: 0.6rem;
        padding-bottom: 0.3rem;
        position: relative;
        .ListPad-scene{
          width: 4.5rem;
          height:2.86rem;
          border: 1px solid #409EFF;
          background:rgba(241,249,255,1);
          display: flex;
          display: -webkit-flex;
          align-items: center;
          justify-content: center;
          margin-right:0.2rem;
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
        .overIew-fixed{
          display: flex;
          display: -webkit-flex;
          align-items: center;
          justify-content: center;
          position: absolute;
          top: 0.21rem;
          right: 0.3rem;
          span{
            font-size:0.16rem;
            font-weight: 500;
          }
          .el-icon-arrow-right{
            font-size:0.16rem;
          }
        }
      }
    }
  }
}
</style>
