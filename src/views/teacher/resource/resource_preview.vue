<template>
  <div class="rescoure-preview" >
    <div class="bread-div">
      <span style=""><i class="iconfont iconshouye iconclass"></i>当前位置：首页 > {{resourceInfo.resourceName}}详情</span>
      <span><el-button type="text" @click="$router.go(-1)">返回</el-button></span>
    </div>

    <div class="rescoure-preview-wrap" :class="{fixclass:isfixTab}">
      <div class="rescoure-preview-wrap-left">
        <div class="rescoure-preview-wrap-left-top">
          <div style="display: flex;">
            <div style="width: 60px;height: 60px;"><i class="iconfont" :class="setClass(resourceInfo.fileType)" style="font-size: 4rem;"></i></div>
            <div style="margin-left: 10px;">
              <p class="title">
                <span>{{resourceInfo.name}}</span>
                <el-rate
                  v-model="resourceInfo.score"
                  disabled
                  show-score
                  text-color="#ff9900"
                  disabled-void-color="#C0C4CC"
                  score-template="{value}">
                </el-rate>
              </p>
              <p  style="margin-top: 10px;">
                {{resourceInfo.subjectName}} > {{resourceInfo.oeseTypeName}} > {{resourceInfo.gradeName}}
              </p>
            </div>
          </div>
          <div class="active-div">
            <p>
              <span>阅读（{{resourceInfo.preview}}）</span>
              <span>下载（{{resourceInfo.download}}）</span>
              <span>评论（{{resourceInfo.commentNum}}）</span>
            </p>
            <p style="margin-top: 10px;">
              <span class="cursor" @click="changeContent('comment')"><i class="iconfont iconpinglun1 icon-color"></i> 评论</span>
              <span class="cursor" v-if="!resourceInfo.isCollect" @click="addCollect"><i class="iconfont iconshoucang2 icon-color"></i> 收藏</span>
              <span class="cursor" v-if="resourceInfo.isCollect" @click="deleteCollect"><i class="iconfont iconshoucang1 icon-color"></i> 已收藏</span>
              <span class="cursor" @click="dialogShareVisible = true"><i class="iconfont iconfenxiang icon-color"></i> 分享</span>
              <span class="cursor" @click="downloadFile"><i class="iconfont iconxiazai2 icon-color"></i> 下载</span>
            </p>
          </div>
        </div>
        <p class="title-p">{{resourceInfo.name}}</p>
        <div class="rescoure-preview-wrap-left-content">
          <div class="content-wrap"> 
            <div class="paper-content">

              <div class="container" v-if="previewTab && showPreview === 'picture'">
                <div class="topFilter">
                  <!-- <span class="theme-dark-text">{{resourceInfo.name}}</span>  
                  <Button type="text" @click="toPageBack" style="color: #3399ff">返回</Button> -->
                </div>
                <div class="bottomContent" v-if="showPreview === 'picture'" >
                   <img :src="picturePreviewUrl" style="max-width: 100%;max-height: 100%;">
                </div>    
              </div>

              <div class="container" v-if="previewTab && showPreview === 'pdf'">
                <div class="topFilter">
                  <!-- <span class="theme-dark-text">{{resourceInfo.name}}</span>  
                  <Button type="text" @click="toPageBack" style="color: #3399ff">返回</Button> -->
                </div>
                <div class="bottomContent" v-if="showPreview === 'pdf' && pdfPreviewUrl">
                  <div class="bottomLeft">
                        <pdf-preview 
                          :pdf-url='pdfPreviewUrl'
                          :pdf-pagenum='totalPages'>
                        </pdf-preview >      
                  </div>
                </div>    
              </div>


            </div>
            <div class="commit-wrap" v-show="showComment">
              <div class="bottomContent">
                <el-form :model="commentForm" size="small">
                    <el-form-item label="我的评论">
                      <el-input
                        type="textarea"
                        class="input-class"
                        :autosize="{ minRows: 3, maxRows: 5}"
                        maxlength="300"
                        show-word-limit
                        placeholder="请输入评论"
                        v-model="commentForm.content">
                      </el-input>
                    </el-form-item>

                    <el-form-item label="评分">
                      <el-rate
                        v-model="commentForm.score"
                        show-score
                        text-color="#ff9900"
                        disabled-void-color="#C0C4CC"
                        score-template="{value}">
                      </el-rate>
                    </el-form-item>

                </el-form>
                <div style="text-align: right;">
                  <el-button @click="changeContent('preview')" size="mini">返 回</el-button>
                  <el-button type="primary" size="mini" @click="addComment()" >发布评论</el-button>
                </div>
              </div> 
              <div >
                <p style="height: 36px;line-height: 36px;">读者评论（{{totalCommit}}人参与）</p>  
                <div class="one-commit" v-for="list in commentList">
                  <div class="one-commit-left"></div>
                  <div class="one-commit-right">
                    <p style="">{{list.content}}</p>
                    <p style="display: flex;align-items: center;color: #808182;font-size: 0.9rem;">
                      <span style="margin-right: 10px;">{{list.userName}} </span> 
                      <span style="margin-right: 10px;">{{list.createdDate}}</span>
                    
                      <el-rate
                        v-model="list.score"
                        disabled
                        show-score
                        text-color="#ff9900"
                        disabled-void-color="#C0C4CC"
                        score-template="{value}">
                      </el-rate>
                    </p>
                  </div>
                 
                  
                </div>
              </div>   
            </div>
          </div>
        </div>


      </div>
      <div class="rescoure-preview-wrap-right">
        <el-button type="danger" @click="uploadResource" size="large" style="width: 100%"><i class="iconfont iconshangchuan"></i> 上传我的资源</el-button>
        <div class="person-div">
          <p style=" height: 40px;line-height: 40px;">资源贡献者</p>

          <div class="personinfo">
            <div style="width: 60px;height: 60px;background-color: #ebeef6;text-align: center;padding-top: 10px;">
              <i class="iconfont icontouxiang2" style="font-size: 36px;color: #b5b5ae;"></i>
            </div>
            <div style="margin-left: 10px;">
              <p>{{resourceInfo.userName}}</p>
              <p>贡献于{{resourceInfo.createTime}}</p>
            </div>
          </div>  
        </div>
  
        <div style="margin-top: 10px;">
          <div style="display: flex;justify-content: space-between;align-items: center;"> 
            <span style="font-size: 1.2rem;">同类精品资源</span>
            <el-button type="text" @click="getBoutiqueList" >换一批</el-button>
          </div>

          <div v-for="item in boutiqueList">
            <span class="cursor" @click="resource_preview(item.resourceId)"><i class="iconfont iconppt ppticon"></i> {{item.name}}</span>

          </div>
        </div>
      </div>
    </div> 


    <el-dialog :title="dialogTitle" :visible.sync="dialogShareVisible" width="600px" :close-on-click-modal='false'>
      <el-form :model="shareForm" label-width="120px" size="small">
        
          <p class="top-p">选择班级</p>
          <el-form-item label="名称" prop="clazz">
            <el-checkbox-group v-model="shareForm.classIds">
                <el-checkbox-button v-for="clazz in clazzList" :label="clazz.classId.id" :key="clazz.classId.id">{{clazz.className}}</el-checkbox-button>
            </el-checkbox-group>
          </el-form-item>

          <p class="top-p">选择用户</p>
          <el-form-item label="名称" prop="user">
            <div style="display: flex;">
              <el-cascader-panel
                  v-model="shareForm.includeUsers"
                  :options="studentList"
                  :props="studentProps">
                    
              </el-cascader-panel>
            </div>
          </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogShareVisible = false" size="mini">取 消</el-button>
        <el-button type="primary" size="mini" @click="addShare" >确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

import { mapGetters } from 'vuex'
import moment from 'moment'
import pdfPreview from '@/components/PdfPreview/pdfPreview'
export default {
  props:['isfixTab'],
  inject: ['reload'],
  components:{
    pdfPreview
  },
  data() {
    return {
      score: 3,
      resourceInfo:{},
      previewTab: true,
      //预览
      totalPages:1,
      pdfPreviewUrl:'',
      picturePreviewUrl:'',
      showPreview :'pdf',
      //分享
      dialogTitle:'资源分享',
      dialogShareVisible:false,
      clazzList:[],
      studentList:[],
      studentProps:{multiple: true, emitPath:false},
      shareForm:{
        classIds:[],
        includeUsers:[],
        notIncludeUsers:[]
      },
      //评论
      showComment:false,
      commentForm:{
        content:'',
        score:0
      },
      commentList:[],
      totalCommit:0,
      boutiqueList:[],

    };
  },
  computed: {

    ...mapGetters([
      'gradeList',
      'getuserInfo',

    ]),

    resourceId() {
      return this.$route.query.id
    }

 
  },
  watch: {
    resourceId(val) {
      if(val) {
        this.$router.push({path: '/teacher/resourceRreview', query: {id:val}})
        this.reload()
      }
    }

  },

  mounted() {
    this.getResourceInfo()
    this.findClazzByTeacher()
    this.getBoutiqueList()
  },

  methods: {
    uploadResource() {
      this.$router.push('/teacher/uploadResource')
    },
    toPageBack() {
      this.$router.go(-1);
    },

    changeContent(tab){
      if (tab === 'preview'){
        this.previewTab = true;
        this.showComment = false;
      } else {
        this.previewTab = false;
        this.showComment = true;
        this.getCommentList();
      }
    },

    uploadResource() {
      this.$router.push('/teacher/uploadResource')
    },
    
    getResourceInfo() {
      this.$http.get(`/api/open/resources/${this.resourceId}`,{})
      .then((data)=>{
        if(data.status == '200') {
          this.resourceInfo = data.data
          this.totalPages = data.data.filePage ? data.data.filePage : 1

          switch(data.data.fileType) {
            case 'PDF':
              this.showPreview = 'pdf';
              this.previewFile(this.resourceInfo.resourceSite.id)
              break;
            case 'PPT':
            case 'WORD':
            case 'EXCEL':
              if (this.resourceInfo.previewFile){
                this.showPreview = 'pdf';
                this.previewFile(this.resourceInfo.previewFile.id)
              } else {
                this.previewTab = false;
              }
              break;
            case 'Picture':
              this.showPreview = 'picture';
              this.previewFile(this.resourceInfo.resourceSite.id)
              break;
            default:
              this.previewTab = false;
          }   
        }
      })
    },

    previewFile(fileId){
      this.$http.get(`/api/open/common/${fileId}/preview`)
        .then((res)=>{
            if(res.status == '200') {
              if (this.showPreview == 'pdf'){
                this.pdfPreviewUrl = res.data
              } else if (this.showPreview == 'picture'){
                this.picturePreviewUrl = res.data
              }   
            }
        })
    },

    downloadFile() {
      this.$http.get(`/api/open/resourceDownload/${this.resourceInfo.resourceId}`,{})
        .then((res)=>{
          if(res.status == '200') {
            window.open(res.data)
          }
        })
    },

    //获取老师的授课班级
    findClazzByTeacher() {
      this.$http.get(`/api/open/teacher/clazzNStudent`)
        .then((res)=>{
          if(res.status == '200') {
            this.clazzList = res.data
            this.studentList = res.data.map((item)=>{
                let tmp = {}
                tmp.value = 0
                tmp.label = item.className
                tmp.children = item.students.map((m)=>{
                      let tmpChildren = {}
                      tmpChildren.value = m.userNumber
                      tmpChildren.label = m.name
                      return tmpChildren;
                });
                return tmp;
            });
          }
        })
    },

    //发布评论
    addComment() {
      if(!this.commentForm.content) {
        return this.$message({
          message:'请输入评论',
          type:'warning'
        })
      } else {
        this.$http.post(`/api/open/comment/addComment`,{
            resourceId:{
              id:this.resourceInfo.resourceId
            },
            content:this.commentForm.content,
            score: this.commentForm.score
          })
          .then((res)=>{
            if(res.status == '200') {
              this.commentForm.content = ''
              this.commentForm.score = 0
   
              this.getCommentList();

            }
          })
      }  
    },

    //获取评论列表，接口是分页的，页面没有弄分页
    getCommentList() {
      this.$http.get(`/api/open/comment/list`,{
          resourceId:this.resourceInfo.resourceId
        })
        .then((res)=>{
          if(res.status == '200') {
            this.commentList = res.data.content.map((item)=>{
              item.createdDate = moment(item.createdDate).format('YYYY-MM-DD HH:mm:ss')
              return item
            });

            this.totalCommit = res.data.totalElements

          }
        })
    },

    //收藏资源
    addCollect(){
      this.$confirm('确定收藏?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.post(`/api/open/collect/addCollect/${this.resourceInfo.resourceId}`,{})
          .then(res => {
            this.resourceInfo.isCollect = true;
          })
      })
    },

    //取消收藏
    deleteCollect(){
      this.$confirm('确定取消收藏?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.delete(`/api/open/collect/resource/${this.resourceInfo.resourceId}`,{})
          .then(res => {
            this.resourceInfo.isCollect = false;
          })
      })
    },

    //获取n条精品资源
    getBoutiqueList(){
      this.$http.get(`/api/open/resources/list/number`,{
          grade:this.resourceInfo.grade,
          subject:this.resourceInfo.subjectCode,
          type:'boutique',
          number:6})
        .then((result)=>{
          if(result.status == '200') {
            this.boutiqueList = result.data
          }
        })
    },

    //分享
    addShare(){
      console.log(this.shareForm)
      if(this.shareForm.classIds.length == 0 && this.shareForm.includeUsers.length == 0) {
        return this.$message({
          message:'请选择班级或用户',
          type:'warning'
        });
      } else {
        this.$http.post(`/api/open/shares/add/${this.resourceInfo.resourceId}`,{
          classIds:this.shareForm.classIds,
          includeUsers:this.shareForm.includeUsers,
          notIncludeUsers: this.shareForm.notIncludeUsers
        })
        .then((res)=>{
          if(res.status == '200') {
          }
        })
      }   
    },


    setClass(fileType) {
      let obj = {};
      switch(fileType) {
        case 'PDF':
          obj = {
            iconPDF:true,
            pdficon: true
          }
          break;
        case 'PPT':
          obj = {
            iconppt:true,
            // ppticon: true
          }
          break;
        case 'WORD':
          obj = {
            iconword:true,
            // wordicon: true
          }
          break;
        default:
          obj = {
            iconword:true,
            // wordicon: true
          }
      } 
      return obj;
    },

    resource_preview(resourceId) {
      this.$router.push({path: '/teacher/resourceRreview', query: {id:resourceId}})
      this.reload()
    }
    
  }
};
</script>
<style lang="less">
.rescoure-preview {
  .commit-wrap {
    .el-rate {
      height: 32px;
      line-height: 32px;
      vertical-align: text-top;
    }

    .el-rate__item, .el-rate__text {
      vertical-align: baseline;
    }
  }
}

</style>
<style scoped lang="less">
.rescoure-preview {
  width: 70%;
  margin: 0 auto;


  .fixclass {
    min-height: calc(100vh - 30px);
  }
  .ppticon {
    color: #d24625;
    font-size: 1.3rem;
  }

  .wordicon {
    color: #2a5698;
    font-size: 1.3rem;
  }

  .excelicon {
    color: #0f7b10;
    font-size: 1.3rem;
  }

  .pdficon {
    color: #dc2e1b;
    font-size: 1.3rem;
  }


  .bread-div {
    display: flex;
    justify-content: space-between;
    align-items:center;
  }
  &-wrap {
    display: flex;


    &-left {
      width: 80%;
      margin-right: 20px;

      &-top {
        width: 100%;
        margin-top: 10px;
        display: flex;
        justify-content: space-between;


        .title {
          font-size: 1.3rem;
          display: flex;
        }

        .active-div {
          text-align: right;

          .icon-color {
            color: #409EFF;
          }
          span {
            margin-left: 20px;
          }
        }
      }
        .title-p {
          margin-top: 20px;
          height: 50px;
          line-height: 50px;
          padding-left:20px;
          background-color:#ebeef6;
        }

      &-content {
        margin-bottom: 20px;


        .content-wrap {
          background-color:#ebeef6;
          padding:0 20px 20px 20px;
          // background-color: #fbf9f9;

          
          .paper-content {
            background-color: #fbf9f9;
          }

          .commit-wrap {
            background-color: transparent;

            .one-commit {
              padding:10px 0px;
              border-top: 1px solid #bdbbbb;
              display: flex;
              align-items: center;

              &-left {
                height: 46px;
                width: 46px;
                background-color: #e3e3e3;
                margin-right: 20px;
              }
              &-right {
                flex: 1;
              }
            }
          }
        }


      }



    }

    &-right {
      width: 20%;

      .person-div {
        margin-top: 20px;
        // padding-top:10px;
        padding-bottom:20px;
        border-top:1px dashed #ceced0;
        border-bottom:1px dashed #ceced0;

        .personinfo {
          display: flex;
          align-items:flex-end;
        }
      }


    }
  }
}
</style>