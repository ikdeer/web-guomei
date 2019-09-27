<template>
    <div class="statement">
      <!-- 面包屑导航栏从概览过来  -->
      <template v-if="Breadcrumb == 'overview'">
        <nav class="nav-Type">
          <el-breadcrumb separator="/">
              <el-breadcrumb-item :to="{path:'/Company/CompanyHome'}">人脸识别服务</el-breadcrumb-item>
            <el-breadcrumb-item :to="{path:'/Index/overview'}">概览</el-breadcrumb-item>
            <el-breadcrumb-item>监控报表</el-breadcrumb-item>
          </el-breadcrumb>
        </nav>
      </template>
      <!-- 面包屑导航栏从应用列表过来  -->
      <template v-if="Breadcrumb == 'applicationList'">
        <nav class="nav-Type">
          <el-breadcrumb separator="/">
              <el-breadcrumb-item :to="{path:'/Company/CompanyHome'}">人脸识别服务</el-breadcrumb-item>
            <el-breadcrumb-item :to="{path:'/Index/applicationList'}">应用列表</el-breadcrumb-item>
            <el-breadcrumb-item>监控报表</el-breadcrumb-item>
          </el-breadcrumb>
        </nav>
      </template>
      <!-- 本级过来 -->
      <template v-if="Breadcrumb == null">
        <nav class="nav-Type">
          <el-breadcrumb separator="/">
              <el-breadcrumb-item :to="{path:'/Company/CompanyHome'}">人脸识别服务</el-breadcrumb-item>
            <el-breadcrumb-item>监控报表</el-breadcrumb-item>
          </el-breadcrumb>
        </nav>
      </template>
        <h3>监控报表</h3>
        <div class="statement_content">
            <div class="statement_form">
                <el-form label-width="80px">
                    <el-form-item label="创建人">
                        <el-input :maxlength="20" :disabled="userInfo.groupID==20" v-model="formData.createName" placeholder="请输入创建人"></el-input>
                    </el-form-item>
                    <el-form-item label="选择应用">
                        <el-select v-model="formData.appIds" @change="getApiSelectList" placeholder="请选择">
                            <el-option
                                v-for="item in formData.appList"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="选择API">
                        <el-select v-model="formData.apiIds" @change="apiChange" class="user_list_form_status" placeholder="请选择状态">
                            <el-option
                                v-for="item in formData.apiList"
                                :key="item.id"
                                :label="item.name+' '+item.id"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <!--<el-form-item label="统计项">
                        <el-radio-group v-model="formData.radio">
                            <el-radio :label="1">调用量</el-radio>
                            <el-radio :label="2">QPS</el-radio>
                        </el-radio-group>
                    </el-form-item>-->
                    <el-form-item label="监控项">
                        <el-checkbox-group v-model="formData.monitor">
                            <el-checkbox label="1">调用成功</el-checkbox>
                            <el-checkbox label="2">调用失败</el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                    <el-form-item label="时间段">
                        <el-date-picker
                            class="user_list_form_time"
                            v-model="formData.dataTime"
                            :picker-options="pickerOptions"
                            type="daterange"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            :default-time="['00:00:00', '23:59:59']">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="search(1)">查询</el-button>
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
                        <el-radio-group @change="ClickRadio" v-model="radio">
                            <el-radio label="0">按日</el-radio>
                            <el-radio label="1">按时</el-radio>
                        </el-radio-group>
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
                        label="应用名称">
                        <template slot-scope="scope">
                            {{textLen(scope.row.appName,10)}}
                        </template>
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
                <div class="statement_list_footer">
                    <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="page.page"
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
    import {textLen,formatTimes} from '@/lib/utils'
    import { getStatement,getAppList,getApiList } from '@/HttpApi/statement/statement'
    export default {
        name: "statement",
        data(){
            return{
                textLen:textLen,
                formData:{
                    createName:'',//创建人名称
                    apiIds:'',//api ID
                    interfaceName:'',//api名字
                    appIds:'',//app ID
                    statisItems:'',//统计项 1-调用量 2-qps
                    monitor:['1'],//监控项
                    dataTime:[formatTimes(new Date(),true)+' 00:00:00',formatTimes(new Date(),true)+' 23:59:59'],
                    appList:[],
                    apiList:[]
                },
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
                tableData:[],
                radio:'0',
                callData:{
                    callDataCount: 0,
                    callFailCount: 0,
                    callSucessCount: 0
                },
                lineCharts: null,
                lineOption: {},
                Breadcrumb:null,//面包屑导航栏
                userInfo:{
                    userName:'',//用户姓名
                    userImg:'',//用户头头像
                    uid:'',//用户ID
                    groupID:'',//用户身份
                },
                page:{
                    page:1,
                    pageSize:10,
                    total:0
                },
            }
        },
        methods:{
            search(page){
                if(page==1){
                    this.page.page = 1;
                }
                let params = {
                    ...this.formData,...this.page,
                    timeStart:this.formData.dataTime?this.formData.dataTime[0]:'',
                    timeEnd:this.formData.dataTime?this.formData.dataTime[1]:'',
                    timeType:this.radio,
                    monitorItems:(this.formData.monitor.length==0||this.formData.monitor.length==2) ? 0 : this.formData.monitor.join(),
                    top:10
                };
                getStatement(params).then(({data}) => {
                    if(data.errorCode ==200){
                        this.callData = data.data.data.callData?data.data.data.callData : { callDataCount: 0, callFailCount: 0, callSucessCount: 0};
                        this.tableData = data.data.data.appStatisApiList?data.data.data.appStatisApiList:[];
                        this.page.total = data.pagerManager? data.pagerManager.totalResults:0;
                        let days=[],callFailCount=[],callSucessCount=[];
                        if(data.data.data.charStaticApiList){
                            data.data.data.charStaticApiList.forEach((item,index)=>{
                                days.push(item.days);
                                callSucessCount.push(item.callSucessCount);
                                callFailCount.push(item.callFailCount);
                            });
                        }
                        var legend = [],series = [];
                        if(this.formData.monitor.length == 2 || this.formData.monitor.length == 0){
                            legend = ['调用成功','调用失败'];
                            series = [{
                                name: '调用失败',
                                type: 'line',
                                stack: '总量',
                                data: callFailCount,
                                itemStyle : {
                                    normal : {
                                        color:'#0097E9', //改变折线点的颜色
                                        lineStyle:{
                                            color:'#0097E9' //改变折线颜色
                                        }
                                    }
                                }
                            },{
                                name: '调用成功',
                                type: 'line',
                                stack: '总量',
                                data: callSucessCount,
                                itemStyle : {
                                    normal : {
                                        color:'#FF4C68', //改变折线点的颜色
                                        lineStyle:{
                                            color:'#FF4C68' //改变折线颜色
                                        }
                                    }
                                }
                            }]
                        }else{
                            if(this.formData.monitor[0]==1){
                                legend = ['调用成功'];
                                series = [{
                                    name: '调用成功',
                                    type: 'line',
                                    stack: '总量',
                                    data: callSucessCount,
                                    itemStyle : {
                                        normal : {
                                            color:'#FF4C68', //改变折线点的颜色
                                            lineStyle:{
                                                color:'#FF4C68' //改变折线颜色
                                            }
                                        }
                                    }
                                }]
                            }else{
                                legend = ['调用失败'];
                                series = [{
                                    name: '调用失败',
                                    type: 'line',
                                    stack: '总量',
                                    data: callFailCount,
                                    itemStyle : {
                                        normal : {
                                            color:'#0097E9', //改变折线点的颜色
                                            lineStyle:{
                                                color:'#0097E9' //改变折线颜色
                                            }
                                        }
                                    }
                                }]
                            }
                        }
                        let option = {
                            tooltip: {
                                trigger: 'axis'
                            },
                            legend: {
                                data: legend
                            },
                            grid: {
                                left: '3%',
                                right: '4%',
                                bottom: '3%',
                                containLabel: true
                            },
                            toolbox: {
                                x:'94%',
                                feature: {
                                    saveAsImage: {
                                        show: true
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
                            series: series
                        };
                        this.lineCharts.clear();
                        this.lineCharts.setOption(option);
                    }else{
                        this.$message.warning(data.errorInfo)
                    }
                })
            },
            ClickRadio(){
                this.search(1)
            },
            handleSizeChange(val){
                this.page.pageSize = val;
                this.page.page = 1;
                this.search()
            },
            handleCurrentChange(val){
                this.page.page = val;
                this.search()
            },
            handleResize() {
                this.lineCharts.resize()
            },
            getStateList(){
                //获取应用下拉
                getAppList().then(({data})=>{
                    if(data.errorCode ==200){
                        if(data.data){
                            data.data.list.unshift({
                                id: '',
                                name: "全部"
                            });
                            this.formData.appList = data.data.list;
                        }else{
                            this.formData.appList = [];
                        }
                    }else{
                        this.$message.warning(data.errorInfo)
                    }
                });
            },
            getApiSelectList(){
                if(this.formData.appIds == ''){
                    this.formData.apiIds = '';
                    this.formData.apiList = [];
                    return;
                }
                getApiList({
                    appID:this.formData.appIds
                }).then(({data})=>{
                    if(data.errorCode ==200){
                        if(data.data){
                            data.data.data.apisList.unshift({
                                id: '',
                                name: "全部"
                            });
                            this.formData.apiList = data.data.data.apisList;
                        }
                        this.formData.apiIds = '';
                        this.formData.interfaceName = '';
                    }else{
                        this.$message.warning(data.errorInfo)
                    }
                })
            },
            apiChange(row){
                this.formData.apiList.forEach((item)=>{
                    if(row == item.id){
                        this.formData.interfaceName = item.name;
                    }
                })
            }
        },
        watch:{
            $route(to){
                this.formData.appIds = to.query.id ? to.query.id : '';
            }
        },
        mounted(){
            this.Breadcrumb = this.$route.query.NavType;//面包屑导航栏
            this.formData.appIds = this.$route.query.id ? this.$route.query.id : '';
            this.userInfo = JSON.parse(this.Cookies.get('userInfo'));
            if(this.userInfo.groupID==20){
                this.formData.createName = this.userInfo.userName;
            }
            this.$nextTick(() => {
                this.lineCharts = this.$echarts.init(document.getElementById('MyEcharts'))
                this.lineCharts.setOption(this.lineOption);
                window.addEventListener('resize', this.handleResize)
            });
            this.getStateList();
            if(this.formData.appIds !=''){
                this.getApiSelectList();
            }
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

        .statement_form{
            .el-form{
                .el-input{
                    width: 250px;
                }
                .el-select{
                    width: 250px;
                }
            }
        }

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

        .statement_table{
            .statement_list_footer{
                margin-top: 10px;
                text-align: right;
            }
        }

    }
}
</style>
