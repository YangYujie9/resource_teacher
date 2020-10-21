<template>
  <div class="rescoure-center">
    <div class="rescoure-center-top">
      <div class="bread-div" style="margin-top: -20px">
        <span style=""><i class="iconfont iconshouye iconclass"></i>当前位置：首页 > {{resourceInfo.resourceName}} > 详情</span>
      </div>
    </div> 

    <div class="home-part-warp"> 
      <div class="part-one home-content">
        <div class="top-left">
            <div class="one-part-left">
              <p class="left-title">
                <i class="iconfont" :class="setClass(resourceInfo.fileType)"></i>
                <span class="text">{{resourceInfo.name}}</span>
                 <span style="padding-left: 5px;">
                  {{resourceInfo.subjectName}} > {{resourceInfo.oeseTypeName}} > {{resourceInfo.gradeName}} 
                </span>
              </p>

              <div class="one-part-left">
                <p>
                  <el-rate
                    v-model="resourceInfo.score"
                    disabled
                    show-score
                    text-color="#ff9900"
                    disabled-void-color="#C0C4CC"
                    score-template="{value}">
                  </el-rate>
                </p>
              </div>
               
              <p>
                <p>{{resourceInfo.preview}}人已读</p>
                <span class="left-tag">下载量：{{resourceInfo.download}}</span>
                <p>{{resourceInfo.commentNum}}人评论</p>
              </p>
              <p>
                <el-button class="dot-button" size="small" icon="el-icon-chat-dot-round" @click="changeContent('comment')" type="primary">评论</el-button>

                <el-button class="shoucang-button" size="small" v-if="!resourceInfo.isCollect" icon="el-icon-star-off" type="primary" @click="addCollect()" >收藏</el-button>
                <el-button class="shoucang-button" size="small" v-if="resourceInfo.isCollect" icon="el-icon-star-on" type="primary" @click="deleteCollect" >已收藏</el-button>

                <el-button class="share-button" size="small" icon="el-icon-share" @click="dialogShareVisible = true" type="primary">分享</el-button>
                <el-button class="download-button" size="small" icon="el-icon-download" @click="downloadFile()" type="primary">下载</el-button>
              </p>
              
            </div>

            <div class="container" v-show="previewTab && showPreview === 'picture'">
              <div class="topFilter">
                <span class="theme-dark-text">{{resourceInfo.name}}</span>  
                <Button type="text" @click="toPageBack" style="color: #3399ff">返回</Button>
              </div>
              <div class="bottomContent" v-if="showPreview === 'picture'" >
                 <img :src="picturePreviewUrl">
              </div>    
            </div>

            <div class="container" v-show="previewTab && showPreview === 'pdf'">
              <div class="topFilter">
                <span class="theme-dark-text">{{resourceInfo.name}}</span>  
                <Button type="text" @click="toPageBack" style="color: #3399ff">返回</Button>
              </div>
              <div class="bottomContent" v-if="showPreview === 'pdf'">
                <div class="bottomLeft">
                      <pdf-preview 
                        :pdf-url='pdfPreviewUrl'
                        :pdf-pagenum='totalPages'>
                      </pdf-preview >      
                </div>
              </div>    
            </div>

            <div class="container" v-show="showComment">
              <div class="topFilter">
                <span class="theme-dark-text">{{resourceInfo.name}}</span>  
              </div>
              <div class="bottomContent">
                <el-form :model="commentForm" label-width="100px" size="small">
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
                <div slot="footer" class="dialog-footer">
                  <el-button @click="changeContent('preview')" size="mini">返 回</el-button>
                  <el-button type="primary" size="mini" @click="addComment()" >发布评论</el-button>
                </div>
              </div> 
              <div class="bottomContent">
                <span class="theme-dark-text">读者评论</span>  
                <div class="one-resource" v-for="list in commentList">
                  <p style="margin-top: 10px;line-height: 2;">{{list.userName}} : {{list.content}}</p>
                  <p style="margin-top: 10px;line-height: 2;">{{list.createdDate}}</p>
                  <p><el-rate
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

        <div class="top-right ">
          <div style="border-bottom: 1px dashed #c8cacf;">
            <el-button type="danger" @click="uploadResource" size="large" style="width: 100%"><i class="iconfont iconshangchuan"></i> 上传我的资源</el-button>
          </div>

          <div style="border-bottom: 1px dashed #c8cacf;">
            <p style="font-size: 16px;margin: 10px 0px;">资源贡献者</p>
            <span>{{resourceInfo.userName}}</span>
            <span>-贡献于与 {{resourceInfo.createTime}}</span>
          </div>
          <div style="border-bottom: 1px dashed #c8cacf;">
             <span>同类精品资源</span>
              <el-button type="text" style="color: #ffffff;">换一批</el-button>

              <div class="one-resource" v-for="i in 6">
                <p style="text-align: center;margin-top: 10px;line-height: 2;">小石潭记</p>
              </div>
          </div>
        </div>

      </div>
    </div>

    <el-dialog :title="dialogTitle" :visible.sync="dialogShareVisible" width="500px" :close-on-click-modal='false'>
      <el-form :model="shareForm" label-width="120px" size="small">
        
          <p class="top-p">选择班级</p>
          <el-form-item label="名称" prop="serverName">
            <el-checkbox-group v-model="shareForm.clazz">
                <el-checkbox-button v-for="clazz in clazzList" :label="clazz.className" :key="clazz.classId.id">{{clazz.className}}</el-checkbox-button>
            </el-checkbox-group>
          </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogShareVisible = false" size="mini">取 消</el-button>
        <el-button type="primary" size="mini" >确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>

import { mapGetters } from 'vuex'
import moment from 'moment'
import topPopover from "@/components/Popover/topPopover";
import pdfPreview from '@/components/PdfPreview/pdfPreview'

export default {

  components: {
    topPopover,
    pdfPreview
  },
  data() {
    return {
      resourceId: this.$route.query.id,
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
      shareForm:{
        clazz:''
      },
      //评论
      showComment:false,
      commentForm:{
        content:'',
        score:0
      },
      commentList:[]

    };
  },
  watch: {

  },
  computed: {

    ...mapGetters([
      'getuserInfo',

    ]),
 
  },
  mounted() {
    this.getResourceInfo()
    this.findClazzByTeacher()
  },

  methods: {

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
              this.previewFile()
              break;
            case 'Picture':
              this.showPreview = 'picture';
              this.previewFile()
              break;
            default:
              previewTab = false;
          }   
    		}
    	})
    },

    previewFile(){
      this.$http.get(`/api/open/common/${this.resourceInfo.resourceSite.id}/preview`)
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
      this.$http.get(`/api/open/common/file/${this.resourceInfo.resourceSite.id}/download`,{fileName:this.resourceInfo.name})
        .then((res)=>{
          if(res.status == '200') {
            window.open(res.data)
          }
        })
    },

    //获取老师的授课班级
    findClazzByTeacher() {
      this.$http.get(`/api/open/teacher/clazzNStudent`,{})
        .then((res)=>{
          if(res.status == '200') {
            this.clazzList = res.data
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
      }
      this.$http.post(`/api/open/comment/addComment`,{
          resourceId:{
            id:this.resourceInfo.resourceId
          },
          content:this.commentForm.content,
          score: this.commentForm.score
        })
        .then((res)=>{
          if(res.status == '200') {
            this.getCommentList();
          }
        })
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
        default:
          obj = {
            iconword2:true,
            wordicon: true
          }
      } 
      return obj;
    }
    
  }
};
</script>

<style lang="less">
.rescoure-center{
  .container {
    min-height: 200px
  }
  .topFilter {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 54px;
    padding: 13px 16px;
    border-bottom: solid 1px #E3E5E7;
    >span {
      font-size: 16px;
    }
  } 
  .bottomContent {
    padding: 10px;
    position: relative;
    .bottomLeft{
      display: inline-block;
      width: 98%;
    } 
  }
  .subTool {
    .btn {
      margin-top: 8px;
      width: 100px;
    }
  }
  .toolHeader {
    padding-bottom: 5px;
    border-bottom: 1px solid #EAECF2;
  }

  img {
      max-width: 100%;
      max-height: 100%;
      vertical-align: middle;
  }

  .home-part-warp {
    
    .home-content {
      width: 75%;
      margin: 0 auto;

      .resource-wrap {
        margin-right: -4%;
        display: flex;
        flex-wrap: wrap;

        .one-resource {
          width: 16%;
          margin-bottom: 20px;
          margin-right: 1%;
          cursor: pointer;
        }
      }

    }

    
    .part-one {
      height: calc(40vh);
      position: relative;

      display: flex;

      .top-left {
        height: 100%;
        width: 78%;
        min-width: 200px;
        padding: 20px 5px;
        border: 1px solid #e2e2e2;
        margin-right: 1%;

      }

      .top-right {
        padding: 20px;
        width: 20%;
        height: 100%;
        background-color:#ebeff3;
        border: 1px solid #e2e2e2;
      }
    }
  }
}

</style>