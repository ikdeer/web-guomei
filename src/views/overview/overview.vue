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
          </div>
        </div>
        <div class="overIew-basics"></div>
        <div class="overIew-scene"></div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "overview",
        data(){
          return {
            value6:''
          }
        }
    }
</script>

<style lang="scss">
.overIew{
  width: 100%;
  .overIew-nav{
    width: 100%;
    height: 70px;
    display: flex;
    display: -webkit-flex;
    align-items: center;
    border-bottom: 1px dashed #979797;
    .el-breadcrumb{
      font-size: 20px;
    }
    .el-breadcrumb__inner{
      color: #333333;
    }
  }
  .overIew-content{
    display: flex;
    display: -webkit-flex;
    align-items: center;
    justify-content: space-between;
    .overIew-use{
      width: 100%;
      height: 418px;
      overflow: hidden;
      display: flex;
      display: -webkit-flex;
      justify-content: space-between;
      .overIew-use_left{
        width:780px;
        height: 418px;
        .overIew-use_text{
          font-size: 20px;
          color: #333333;
          font-weight: 600;
          margin: 0;
          line-height: 60px;
        }
        .use-content{
          height: 325px;
          background: #ffffff;
          box-shadow:0px 2px 4px 1px rgba(0,0,0,0.1);
          border-radius:10px;
          display: flex;
          display: -webkit-flex;
          justify-content: space-between;
          padding-left: 30px;
          padding-right: 30px;
          padding-top: 28px;
          .use-content_left{
            .use-content_left_pad{
              width:350px;
              height:228px;
              background:linear-gradient(133deg,rgba(255,191,151,1) 0%,rgba(250,118,135,1) 100%);
              box-shadow:0px 2px 30px 0px rgba(255,255,255,0.33);
              border-radius:20px;
              >span{
                font-size: 24px;
                color: #ffffff;
                font-weight: 600;
                display: block;
                padding-top: 39px;
                margin-left: 30px;
              }
              .use-content_num{
                display: flex;
                display: -webkit-flex;
                align-items:baseline;
                padding-top: 46px;
                padding-left: 30px;
                span:first-child{
                  font-size: 80px;
                  font-weight: bold;
                  display: block;
                  color: #ffffff;
                }
                span:last-child{
                  font-size:20px;
                  color: #ffffff;
                }
              }
            }
            .use-content_button{
              padding-top: 30px;
              .el-button{
                padding: 10px 20px;
              }
            }
          }
          .use-content_right{
            width:350px;
            height:228px;
            background:linear-gradient(133deg,rgba(142,201,248,1) 0%,rgba(53,148,231,1) 100%);
            box-shadow:0px 2px 30px 0px rgba(255,255,255,0.33);
            border-radius:20px;
            >span{
              font-size: 24px;
              color: #ffffff;
              font-weight: 600;
              display: block;
              padding-top: 39px;
              margin-left: 30px;
            }
            .use-content_num{
              display: flex;
              display: -webkit-flex;
              align-items:baseline;
              padding-top: 46px;
              padding-left: 30px;
              span:first-child{
                font-size: 80px;
                font-weight: bold;
                display: block;
                color: #ffffff;
              }
              span:last-child{
                font-size:20px;
                color: #ffffff;
              }
            }
          }
        }
      }
      .overIew-use_right{
        width: 780px;
        .overIew-dosage{
          display: flex;
          display: -webkit-flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          height: 60px;
        }
      }
    }
  }
}
</style>
