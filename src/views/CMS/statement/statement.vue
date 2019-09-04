<template>
    <div class="statement">
      <!-- 面包屑导航栏从概览过来  -->
      <template v-if="Breadcrumb == 'overview'">
        <nav class="nav-Type">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{path:'/Index/overview'}">概览</el-breadcrumb-item>
            <el-breadcrumb-item>监控报表</el-breadcrumb-item>
          </el-breadcrumb>
        </nav>
      </template>
      <!-- 面包屑导航栏从应用列表过来  -->
      <template v-if="Breadcrumb == 'applicationList'">
        <nav class="nav-Type">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{path:'/Index/applicationList'}">应用列表</el-breadcrumb-item>
            <el-breadcrumb-item>监控报表</el-breadcrumb-item>
          </el-breadcrumb>
        </nav>
      </template>
      <!-- 本级过来 -->
      <template v-if="Breadcrumb == null">
        <nav class="nav-Type">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item>监控报表</el-breadcrumb-item>
          </el-breadcrumb>
        </nav>
      </template>
        <h3>监控报表</h3>
        <div class="statement_content">
            <div class="statement_form">
                <el-form label-width="80px">
                    <el-form-item label="创建人">
                        <el-input :maxlength="20" style="width: 200px" v-model="formData.createName" placeholder="请输入创建人"></el-input>
                    </el-form-item>
                    <el-form-item label="选择应用">
                        <el-select v-model="formData.appIds" multiple placeholder="请选择">
                            <el-option
                                v-for="item in formData.categoryList"
                                :key="item.id"
                                :label="item.name+' '+item.id"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="选择API">
                        <el-select v-model="formData.apiIds"  class="user_list_form_status" placeholder="请选择状态">
                            <el-option
                                v-for="item in formData.categoryList"
                                :key="item.id"
                                :label="item.name+' '+item.id"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="统计项">
                        <el-radio-group v-model="formData.radio">
                            <el-radio :label="1">调用量</el-radio>
                            <el-radio :label="2">QPS</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="监控项">
                        <el-checkbox-group v-model="formData.checkList">
                            <el-checkbox label="1">调用成功</el-checkbox>
                            <el-checkbox label="2">调用失败</el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                    <el-form-item label="时间段">
                        <el-date-picker
                            class="user_list_form_time"
                            v-model="formData.dataTime"
                            type="daterange"
                            range-separator="-"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="search">查询</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div class="statement_echarts">
                <div class="info">
                    <div>
                        <span>调用总量：<span style="color:#409EFF;">{{callData.callDataCount}}</span></span>
                        <span>调用成功：<span style="color:#409EFF;">{{callData.callSucessCount}}</span></span>
                        <span>调用失败：<span style="color:#409EFF;">{{callData.callFailCount}}</span></span>
                    </div>
                    <div>
                        <el-radio v-model="radio" label="1">按日</el-radio>
                        <el-radio v-model="radio" label="2">按时</el-radio>
                    </div>
                </div>
                <div id="MyEcharts" class="echartsbox"></div>
            </div>
            <div class="statement_table">
                <el-table
                    :data="tableData"
                    style="width: 100%">
                    <el-table-column
                        align="center"
                        prop="appName"
                        label="应用名称">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="appType"
                        label="应用类型">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="appID"
                        label="AppID">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="callCount"
                        label="调用量">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="callSucessCount"
                        label="调用成功">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="callFailCount"
                        label="调用失败">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="failureRate"
                        label="失败率">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="lastCallTime"
                        label="最后调用时间">
                    </el-table-column>
                </el-table>
            </div>

        </div>
    </div>
</template>

<script>
    import {formatTimes} from '@/lib/utils'
    import { getStatement } from '@/HttpApi/statement/statement'
    export default {
        name: "statement",
        data(){
            return{
                formatTimes:formatTimes,
                formData:{
                    createName:'',//创建人名称
                    apiIds:'',//api ID
                    appIds:'',//app ID
                    statisItems:'',//统计项 1-调用量 2-qps
                    dataTime:null,
                    checkList:[]
                },
                tableData:[],
                radio:'1',
                callData:{
                    callDataCount: 0,
                    callFailCount: 0,
                    callSucessCount: 0
                },
                lineCharts: null,
                lineOption: {},
                Breadcrumb:null,//面包屑导航栏
            }
        },
        methods:{
            search(){
                let params = {
                    ...this.formData,
                    monitorItems:this.formData.checkList.length?this.formData.checkList.join():'',
                    timeStart:this.formData.dataTime?this.formatTimes(this.formData.dataTime[0]):'',
                    timeEnd:this.formData.dataTime?this.formatTimes(this.formData.dataTime[1]):'',
                    timeType:this.radio,
                };
                getStatement(params).then(({data}) => {
                    if(data.success){
                        this.callData = data.data.data.callData;
                        this.tableData = data.data.data.appStatisApiList;

                        let days=[],callFailCount=[],callSucessCount=[];
                        data.data.data.charStaticApiList.forEach((item,index)=>{
                            days.push(item.days);
                            callSucessCount.push(item.callSucessCount);
                            callFailCount.push(item.callFailCount);
                        });
                        let option = {
                            tooltip: {
                                trigger: 'axis'
                            },
                            legend: {

                                data: ['调用成功', '调用失败']
                            },
                            grid: {
                                left: '3%',
                                right: '4%',
                                bottom: '3%',
                                containLabel: true
                            },
                            toolbox: {
                                feature: {
                                    saveAsImage: {
                                        show: false
                                    }
                                }
                            },
                            xAxis: {
                                type: 'category',
                                boundaryGap: false,
                                data: days
                            },
                            yAxis: {
                                type: 'value',
                                name: '(次)',
                                nameLocation: 'start',
                                nameTextStyle: {
                                    fontSize: 14,
                                    padding: [6, 50, 0, 0],
                                }
                            },
                            series: [
                                {
                                    name: '调用成功',
                                    type: 'line',
                                    stack: '总量',
                                    data: callSucessCount
                                },
                                {
                                    name: '调用失败',
                                    type: 'line',
                                    stack: '总量',
                                    data: callFailCount
                                }
                            ]
                        };
                        this.lineCharts.clear();
                        this.lineCharts.setOption(option);
                    }else{
                        this.$message.warning(data.errorInfo)
                    }
                })
            },
            handleResize() {
                this.lineCharts.resize()
            },
        },
        mounted(){
            this.Breadcrumb = this.$route.query.NavType;//面包屑导航栏
            this.$nextTick(() => {
                this.lineCharts = this.$echarts.init(document.getElementById('MyEcharts'))
                this.lineCharts.setOption(this.lineOption);
                window.addEventListener('resize', this.handleResize)
            });
            this.search();
        },
        beforeDestroy() {
            window.removeEventListener('resize', this.handleResize)
            this.lineCharts.dispose()
        }
    }
</script>

<style lang="scss" scoped>
.statement{
    font-size: .16rem;
    .statement_content{
        background:rgba(255,255,255,1);
        box-shadow:0 2px 4px 1px rgba(0,0,0,0.1);
        border-radius:10px;
        padding: 30px;
        box-sizing: border-box;


        .statement_echarts{
            height: 470px;
            .info{
                width: 100%;
                height: 50px;
                display: flex;
                display: -webkit-flex;
                justify-content: space-between;
                align-items: center;
                padding: 0 30px;
                -webkit-box-sizing: border-box;
                -moz-box-sizing: border-box;
                box-sizing: border-box;
                font-size: 14px;
                color: #666666;
                span{
                    margin-right: 15px;
                }
            }
            .echartsbox{
                width: 100%;
                height: 400px;
                padding: 0 30px;
                -webkit-box-sizing: border-box;
                -moz-box-sizing: border-box;
                box-sizing: border-box;
            }

        }

    }
}
</style>
