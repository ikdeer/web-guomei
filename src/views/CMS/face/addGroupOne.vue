<template>
    <div class="add_group_one">
        <!-- 面包屑导航栏 -->
        <nav class="nav-Type">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{path:'/Company/CompanyHome'}">人脸识别服务</el-breadcrumb-item>
                <el-breadcrumb-item :to="{path:'/Index/faceList'}">人脸分组管理</el-breadcrumb-item>
                <el-breadcrumb-item>{{isSee?'查看分组':isEdit?'修改分组':'创建分组'}}</el-breadcrumb-item>
            </el-breadcrumb>
        </nav>
        <h3>{{isSee?'查看分组':isEdit?'修改分组':'创建分组'}}</h3>
        <div class="add_group_content">
            <div class="addgroup_top">
                <div class="active"><span>1</span>第一步 设置分组</div>
                <div @click="nextStep"><span>2</span>第二步 添加人像</div>
            </div>
            <div class="stepone">
                <div class="set_group">
                    <h3>设置分组</h3>
                    <div class="set_group_inp">
                        <el-form :inline="true" :disabled="isSee" label-width="100px">
                            <el-form-item label="分组名称" required>
                                <el-input :maxlength="20" v-model="groupData.name" placeholder="20汉字以内"></el-input>
                                <el-button type="primary" :disabled="groupData.name==''" @click="createGroup">保存</el-button>
                            </el-form-item>
                            <el-form-item label="分组ID" required>
                                <el-input v-model="groupData.id" :disabled="true"></el-input>
                            </el-form-item>
                        </el-form>
                    </div>
                </div>
                <div class="set_child_group">
                    <div class="child_top">
                        <h3>设置子分组 <span>请注意一级子分组不可添加图片</span></h3>
                        <div>
                            <el-button type="primary" size="mini" :disabled="groupData.id=='' || isSee" @click="goChildren">查看子分组列表</el-button>
                        </div>
                    </div>
                    <div class="set_group_childinp">
                        <el-form :inline="true" :disabled="isSee" label-width="110px">
                            <el-form-item label="一级分组名称" required>
                                <el-input :maxlength="20" v-model="groupChildData.name1" placeholder="20汉字以内"></el-input>
                                <el-button type="primary" :disabled="groupData.name1==''" @click="addGroupOne">保存</el-button>
                                <el-button type="primary" :disabled="groupChildData.id1==''||groupChildData.name1==''" @click="deleteGroupOne">删除</el-button>
                            </el-form-item>
                            <el-form-item label="二级分组名称" required>
                                <el-input :maxlength="20" v-model="groupChildData.name2" placeholder="20汉字以内"></el-input>
                                <el-button type="primary" :disabled="groupChildData.name2==''" @click="addGroupTwo">保存</el-button>
                                <el-button type="primary" :disabled="groupChildData.id2==''||groupChildData.name2==''" @click="deleteGroupTwo">删除</el-button>
                            </el-form-item>
                        </el-form>
                        <div class="group_list">
                            <div class="group_item_list">
                                <div class="item">
                                    <p v-if="groupOneList.length" v-for="item in groupOneList" @click="ClickGroupOne(item)">
                                        <span>{{item.name}}</span>
                                    </p>
                                    <p v-if="!groupOneList.length">暂未创建一级子分组</p>
                                </div>
                            </div>
                            <div class="group_item_list">
                                <div class="item">
                                    <p v-if="groupTwoList.length" v-for="item in groupTwoList" @click="ClickGroupTwo(item)">
                                        <span>{{item.name}}</span>
                                        <span>{{item.count}}</span>
                                    </p>
                                    <p v-if="!groupTwoList.length">暂未创建二级子分组</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="add_group_footer">
                    <el-button type="primary" @click="nextStep">下一步</el-button>
                    <el-button @click="cancel()">取 消</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { createFaceGroup,editFaceGroup,createGroupOne,createGroupTwo,deleteGroupOne,deleteGroupTwo,getGroupOne,getGroupTwo,getFacedetails,editeGroupOne,editeGroupTwo,getGroupChildremTwo } from '@/HttpApi/face/face'
    export default {
        name: "addGroupOne",
        data(){
            return{
                type:'1',
                groupData:{
                    name:'',
                    id:''
                },
                groupChildData:{
                    id1:'',
                    id2:'',
                    name1:'',
                    name2:''
                },
                groupOneList:[],
                groupTwoList:[],

            }
        },
        computed:{
            isSee(){
                return this.$route.query.type == '2' ? true : false;
            },
            isEdit(){
                return this.$route.query.type == '3' ? true : false;
            }
        },
        methods:{
            createGroup(){
                //保存分组
                if(/[^\u4e00-\u9fa5]/.test(this.groupData.name)){
                    this.$message.warning('请填写20位以内的汉字');
                    return false;
                }
                if(this.groupData.id != ''){
                    //修改人脸分组
                    editFaceGroup({
                        name:this.groupData.name,
                        id:this.groupData.id
                    }).then(({data})=>{
                        if(data.success){
                            this.$message.success('修改成功');
                        }else{
                            this.$message.warning(data.errorInfo)
                        }
                    })
                }else{
                    //创建人脸分组
                    createFaceGroup({
                        name:this.groupData.name
                    }).then(({data})=>{
                        if(data.success){
                            this.$message.success('创建成功');
                            this.groupData.id = data.data.id;
                            this.$router.push({path:'/Index/addgroupone',query:{id:this.groupData.id,type:this.type}})
                        }else{
                            this.$message.warning(data.errorInfo)
                        }
                    })
                }

            },
            goChildren(){
                //去子分组列表
                this.$router.push({path:'/Index/groupList',query:{id:this.groupData.id,type:this.type}})
            },
            addGroupOne(){
                //保存一级子分组
                if(this.groupChildData.name1==''){
                    this.$message.warning('请输入分组名称')
                    return;
                }
                if(/[^\u4e00-\u9fa5]/.test(this.groupChildData.name1)){
                    this.$message.warning('请填写20位以内的汉字');
                    return false;
                }

                if(this.groupChildData.id1 != ''){
                    //修改一级子分组
                    editeGroupOne({
                        faceGroupID:this.groupData.id,
                        name:this.groupChildData.name1,
                        id:this.groupChildData.id1
                    }).then(({data})=>{
                        if(data.success){
                            this.$message.success('修改成功');
                            this.getGroupOneList();
                            this.groupChildData = {
                                id1:'',
                                id2:'',
                                name1:'',
                                name2:''
                            }
                        }else{
                            this.$message.warning(data.errorInfo)
                        }
                    })
                }else{
                    createGroupOne({
                        faceGroupID:this.groupData.id,
                        name:this.groupChildData.name1
                    }).then(({data})=>{
                        if(data.success){
                            this.$message.success('创建成功');
                            this.getGroupOneList();
                            this.groupChildData = {
                                id1:'',
                                id2:'',
                                name1:'',
                                name2:''
                            };
                            this.groupTwoList = [];
                        }else{
                            this.$message.warning(data.errorInfo)
                        }
                    })
                }
            },
            addGroupTwo(){
                //保存二级子分组
                if(this.groupChildData.name2==''){
                    this.$message.warning('请输入分组名称');
                    return;
                }
                if(/[^\u4e00-\u9fa5]/.test(this.groupChildData.name2)){
                    this.$message.warning('请填写20位以内的汉字');
                    return false;
                }
                if(this.groupChildData.id1 == ''){
                    this.$message.warning('请选择要关联的一级子分组名称');
                    return;
                }

                if(this.groupChildData.id2 != ''){
                    //修改子分组
                    editeGroupTwo({
                        faceGroupID:this.groupData.id,
                        name:this.groupChildData.name2,
                        sub1:this.groupChildData.id1,
                        id:this.groupChildData.id2
                    }).then(({data})=>{
                        if(data.success){
                            this.$message.success('修改成功');
                            this.getGroupTwoList();
                            this.groupChildData.id2 = '';
                            this.groupChildData.name2 = '';
                        }else{
                            this.$message.warning(data.errorInfo)
                        }
                    })

                }else{
                    //创建子分组
                    createGroupTwo({
                        faceGroupID:this.groupData.id,
                        name:this.groupChildData.name2,
                        sub1:this.groupChildData.id1
                    }).then(({data})=>{
                        if(data.success){
                            this.$message.success('创建成功');
                            this.getGroupTwoList();
                            this.groupChildData.id2 = '';
                            this.groupChildData.name2 = '';
                        }else{
                            this.$message.warning(data.errorInfo)
                        }
                    })
                }
            },
            deleteGroupOne(){
                //删除一级子分组
                if(!this.groupChildData.id1){
                    this.$message.warning('请选中要删除的分组');
                    return;
                }
                this.$confirm('删除一级分组，该分组下的二级分组将被一同删除', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(() => {
                    deleteGroupOne({
                        id:this.groupChildData.id1,
                    }).then(({data})=>{
                        if(data.success){
                            this.$message.success('删除成功');
                            this.getGroupOneList();
                            this.groupChildData = {
                                id1:'',
                                id2:'',
                                name1:'',
                                name2:''
                            };
                        }else{
                            this.$message.warning(data.errorInfo)
                        }
                    })
                }).catch(() => {});
            },
            deleteGroupTwo(){
                //删除二级子分组
                if (!this.groupChildData.id2) {
                    this.$message.warning('请选中要删除的分组');
                    return;
                }
                this.$confirm('删除二级分组，该分组下人像将被一同删除', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(() => {
                    deleteGroupTwo({
                        id:this.groupChildData.id2
                    }).then(({data})=>{
                        if(data.success){
                            this.$message.success('删除成功');
                            this.getGroupTwoList();
                            this.groupChildData.id2 = '';
                            this.groupChildData.name2 = '';
                        }else{
                            this.$message.warning(data.errorInfo)
                        }
                    })
                }).catch(() => {});
            },
            ClickGroupOne(item){
                //点击一级子分组
                this.groupChildData = {
                    id1:item.id,
                    id2:'',
                    name1:item.name,
                    name2:''
                };
                this.getGroupTwoList()
            },
            ClickGroupTwo(item){
                this.groupChildData.id2 = item.id;
                this.groupChildData.name2 = item.name;
            },
            getGroupOneList(){
                //获取一级子分组列表
                let params = {
                    faceGroupID:this.groupData.id
                };
                getGroupOne(params).then(({data})=>{
                    if(data.success){
                        this.groupOneList = data.data ? data.data.list:[];
                    }else{
                        this.groupOneList = []
                    }
                });
            },
            getGroupTwoList(){
                //获取二级子分组列表
                let params = {
                    faceGroupID:this.groupData.id,
                    sub1:this.groupChildData.id1
                };
                getGroupTwo(params).then(({data})=>{
                    if(data.success){
                        this.groupTwoList = data.data ? data.data.list:[];
                    }else{
                        this.groupTwoList = []
                    }
                })
            },
            nextStep(){
                //下一步
                if(this.groupData.id == ''){
                    this.$message.warning('请先创建分组')
                    return false;
                }
                getGroupChildremTwo({id:this.groupData.id}).then(({data})=>{
                    if(data.success){
                        if(data.data.count > 0){
                            this.$router.push({path:'/Index/addgrouptwo',query:{id:this.groupData.id,type:this.type}})
                        }else{
                            this.$message.warning('请先创建二级子分组')
                        }
                    }else{
                        this.$message.warning(data.errorInfo)
                    }
                });
            },
            cancel(){
                this.$router.push({path:'/Index/faceList'})
            },
            /*
           * 查看分组
           * */
            getDetails(){
                let params = {
                    faceGroupID:this.$route.query.id
                };
                getFacedetails(params).then(({data})=>{
                    if(data.success){
                        this.groupData.id = data.data.data.id;
                        this.groupData.name = data.data.data.name;
                        this.getGroupOneList();
                    }else{
                        this.$message.warning(data.errorInfo)
                    }
                })
            }
        },
        mounted(){
            this.groupData.id = this.$route.query.id || '';
            this.type = this.$route.query.type || '1';
            if(this.$route.query.type != '1' || this.groupData.id !=''){
                this.getDetails();
            }
        }
    }
</script>

<style lang="scss" scoped>
.add_group_one{
    font-size: 0.16rem;
    .add_group_content{
        background:rgba(255,255,255,1);
        box-shadow:0 2px 4px 1px rgba(0,0,0,0.1);
        border-radius:10px;
        padding: 30px;
        box-sizing: border-box;

        .addgroup_top{
            height: 50px;
            display: flex;
            display: -webkit-flex;
            div{
                position: relative;
                background: #EFEDED;
                width: 48%;
                color: #666666;
                font-size: 14px;
                display: flex;
                display: -webkit-flex;
                justify-content: center;
                align-items: center;
                cursor: pointer;
                span{
                    text-align: center;
                    line-height: 24px;
                    width: 24px;
                    height: 24px;
                    font-weight: 600;
                    margin-right: 10px;
                    -webkit-border-radius: 100%;
                    -moz-border-radius: 100%;
                    border-radius: 100%;
                    background: white;
                }
                &:after{
                    content: '';
                    display: block;
                    border-top: 25px solid transparent;
                    border-bottom: 25px solid transparent;
                    border-left: 30px solid #EFEDED;
                    position: absolute;
                    right: -30px;
                    top: 0;
                    z-index: 10;
                }
                &:before{
                    content: '';
                    display: block;
                    border-top: 25px solid #EFEDED;
                    border-bottom: 25px solid #EFEDED;
                    border-left: 30px solid white;
                    position: absolute;
                    left: 0;
                    top: 0;
                }
                &:last-child{
                    margin-left: 18px;
                }
            }
            .active{
                color: white;
                background: #409EFF;
                span{
                    color: #409EFF;
                }
                &:after{
                    border-left: 30px solid #409EFF;
                }
                &:before{
                    border-top: 25px solid #409EFF;
                    border-bottom: 25px solid #409EFF;
                }
            }
        }
        .stepone{
            .set_group{
                .el-form{
                    border-top: 1px solid #EEEEEE;
                    padding: .3rem;
                    .el-form-item{
                        width: 48%;
                    }
                    .el-input{
                        width: 300px;
                    }
                }
            }

            .set_child_group{
                .child_top{
                    height: 50px;
                    display: flex;
                    display: -webkit-flex;
                    justify-content: space-between;
                    align-items: center;
                    border-bottom: 1px solid #eeeeee;
                    h3{
                        span{
                            font-size: 12px;
                            color: #F56C6C;
                            margin-left: 10px;
                        }
                    }
                }
                .el-form{
                    padding:0.1rem .3rem;
                    .el-form-item{
                        width: 48%;
                    }
                    .el-input{
                        width: 280px;
                    }
                }
                .group_list{
                    display: flex;
                    display: -webkit-flex;

                    .group_item_list{
                        -webkit-box-sizing: border-box;
                        -moz-box-sizing: border-box;
                        box-sizing: border-box;
                        width: 50%;
                        &:first-child{
                            margin-left: 130px;
                        }
                        &:last-child{
                            margin-left: 80px;
                        }
                        margin-left: 100px;
                        .item{
                            width: 4rem;
                            height: 2rem;
                            border: 1px solid #999999;
                            overflow-y: auto;
                            -webkit-border-radius: 5px;
                            -moz-border-radius: 5px;
                            border-radius: 5px;
                            color: #999999;
                            p{
                                padding: 0 15px;
                                display: flex;
                                display: -webkit-flex;
                                justify-content: space-between;
                                line-height: 30px;
                                cursor: pointer;
                                -webkit-box-sizing: border-box;
                                -moz-box-sizing: border-box;
                                box-sizing: border-box;
                                &:hover{
                                    background: rgba(64,158,255,0.1);
                                }
                            }
                        }
                    }
                }
            }
            .add_group_footer{
                margin: 20px 0 0 30px;
            }
        }
    }
}
</style>