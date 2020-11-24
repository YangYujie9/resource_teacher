<template>
  <div class="rescoure-preview" >
    <el-backtop target=".ques-home .el-scrollbar__wrap" :bottom="80"></el-backtop>
    <div class="bread-div" style="width: 80%;padding-right: 20px;">
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
                  style="flex-shrink: 0;margin-left: 10px;"
                  disabled-void-color="#C0C4CC"
                  score-template="{value}">
                </el-rate>
              </p>
              <p  style="margin-top: 10px;">
                {{resourceInfo.subjectName}} > {{resourceInfo.openStateName}} > {{resourceInfo.gradeName}}
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
              <!-- <span class="cursor" @click="dialogShareVisible = true"><i class="iconfont iconfenxiang icon-color"></i> 分享</span> -->
              <span class="cursor" @click="downloadFile"><i class="iconfont iconxiazai2 icon-color"></i> 下载</span>
            </p>
          </div>
        </div>
        <p class="title-p">{{resourceInfo.name}}</p>
        <div class="rescoure-preview-wrap-left-content">
          <div class="content-wrap"> 
            <div class="paper-content"  v-show="previewTab">

              <!-- 图片预览 -->
              <div class="container" v-if="showPreview === 'picture'">

                <div class="bottomContent" v-if="previewUrl" >
                   <img :src="previewUrl" style="max-width: 100%;max-height: 100%;">
                </div>    
              </div>

              <!-- PDF预览 -->
              <div class="container" v-if="showPreview === 'pdf'">

                <div class="bottomContent" v-if="previewUrl">
                  <div class="bottomLeft">
                        <pdf-preview 
                          v-if="totalPages"
                          :pdf-url='previewUrl'
                          :pdf-pagenum='totalPages'
                          :currentPageNum="currentPageNum">
                        </pdf-preview >      
                  </div>
                </div>    
              </div>

              <!-- MP4预览 -->
              <div class="container" v-if="showPreview === 'video'">
 
                <div class="bottomContent" v-if="previewUrl">
                  <div class="bottomLeft">
                    <video-player :videoUrl="previewUrl"></video-player> 
                  </div>
                </div>    
              </div>

              <!-- 音频预览 -->
              <div class="container" v-if="showPreview === 'frequency'">

                <div class="bottomContent" v-if="previewUrl">
                  <div class="bottomLeft">
                      <audio-player :audioUrl="previewUrl" :title="resourceInfo.name" :artist="resourceInfo.userName"></audio-player>
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
                        maxlength="255"
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
                  <!-- <div class="one-commit-left"></div> -->
                  <div class="one-commit-right">
                    <p style="display: flex;align-items: center;justify-content: space-between;word-break: break-all;">
                      <span style="margin-right: 10px;">{{list.content}}</span>
                      <el-button type="text" @click="deleteComment(list.commentId)" v-if="getuserInfo.userId == list.userId">删除</el-button>
                    </p>
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
            <span style="font-size: 1.2rem;">同类资源</span>
            <el-button type="text" @click="getSimilarList" >换一批</el-button>
          </div>

          <div v-for="item in similarList">
            <span class="cursor" @click="resource_preview(item.resourceId)"><i class="iconfont" :class="setClass(item.fileType)"></i> {{item.resourceName}}</span>

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
import pdfPreview from '@/components/FilePreview/pdfPreview'

import videoPlayer from '@/components/FilePreview/videoPlayer'
import audioPlayer from '@/components/FilePreview/audioPlayer'

export default {
  props:['isfixTab'],
  inject: ['reload'],
  components:{
    pdfPreview,
    videoPlayer,
    audioPlayer,
  },
  data() {
    return {
      score: 3,
      resourceInfo:{},
      previewTab: true,
      //预览
      totalPages:0,
      currentPageNum:10,
      previewUrl:'',
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
      similarList:[],



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
        if(!this.showComment) {
          this.previewTab = false;
          this.showComment = true;
          this.getCommentList();
        }

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

          this.getSimilarList();

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
                return this.$message.warning('该文件类型暂不支持预览')
              }
              break;
            case 'Picture':
              this.showPreview = 'picture';
              this.previewFile(this.resourceInfo.resourceSite.id)
              break;
            case 'Video':
              this.showPreview = 'video';
              if ( this.resourceInfo.fileSuffix === 'wmv'
                  || this.resourceInfo.fileSuffix === 'mpg'
                  || this.resourceInfo.fileSuffix === 'avi'
                  || this.resourceInfo.fileSuffix === '3gp'
                  || this.resourceInfo.fileSuffix === 'flv'
                  || this.resourceInfo.fileSuffix === 'swf'
                  || this.resourceInfo.fileSuffix === 'rmvb' ){

                this.previewTab = false;
                return this.$message.warning('该文件类型暂不支持预览')
              } else {
                this.previewFile(this.resourceInfo.resourceSite.id)
                
              }
              break;
            case 'Frequency':
              this.showPreview = 'frequency';
              // this.videoUpload.music.title = this.resourceInfo.name;
              // this.videoUpload.music.artist = this.resourceInfo.userName;
              this.previewFile(this.resourceInfo.resourceSite.id)

              
              break;
            default:
              this.previewTab = false;
              return this.$message.warning('该文件类型暂不支持预览')
          }   
        }
      })
    },

    previewFile(fileId){
      this.$http.get(`/api/open/common/${fileId}/preview`)
        .then((res)=>{
            if(res.status == '200') {
                this.previewUrl = res.data
                // if (this.showPreview === 'video'){
                //   this.playerOptions.sources[0].src = res.data;
                // } else if (this.showPreview === 'frequency'){
                //   this.videoUpload.music.src = res.data;
                // }
            }
        })
    },

    downloadFile() {
      this.$http.get(`/api/open/resourceDownload/${this.resourceInfo.resourceId}`,{})
        .then((res)=>{
          if(res.status == '200') {
            //下载数加1
            this.resourceInfo.download++;
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
              //评论数加1
              this.resourceInfo.commentNum++;
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

    //根据资源ID获取n条同类资源
    getSimilarList(){
      this.$http.get(`/api/open/resources/list/similar`,{
          resourceId:this.resourceInfo.resourceId,
          number:6})
        .then((result)=>{
          if(result.status == '200') {
            this.similarList = result.data
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
            this.dialogShareVisible = false;
            this.$message({message:'分享成功',type:'success'});
          } else {
            this.$message({message:'分享失败',type:'error'});
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
            iconppt1:true,
            ppticon: true
          }
          break;
        case 'WORD':
          obj = {
            iconword2:true,
            wordicon: true
          }
          break;
        case 'EXCEL':
          obj = {
            iconExcel:true,
            excelicon: true
          }
          break;
        case 'Picture':
          obj = {
            icontupian:true,
            wordicon: true
          }
          break;
        case 'Video':
          obj = {
            iconshipin1:true,
            wordicon: true
          }
          break;
        case 'Frequency':
          obj = {
            iconyinpin4:true,
            audioicon: true
          }
          break;
        default:
          obj = {
            iconweizhizhuangtai:true,
            inknowicon: true
          }
      } 
      return obj;
    },

    resource_preview(resourceId) {
      this.$router.push({path: '/teacher/resourceRreview', query: {id:resourceId}})
      this.reload()
    },

    deleteComment(commentId) {
      this.$confirm('确认删除该评论吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {

        this.$http.delete(`/api/open/comment/${commentId}`)
        .then(data =>{
          if(data.status == '200') {

            //评论数减1
            this.resourceInfo.commentNum--;

            this.getCommentList()
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          }
        })

      }).catch(() => {
         
      });
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
  width: 75%;
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
    color: #3C734D;
    font-size: 1.3rem;
  }

  .pdficon {
    color: #dc2e1b;
    font-size: 1.3rem;
  }

  .audioicon {
    color: #dc5e55;
    font-size: 1.3rem;
  }

  .inknowicon {
    color: red;
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
          flex-shrink: 0;

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
            background-color: transparent; //#fbf9f9;
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