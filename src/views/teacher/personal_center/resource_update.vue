<template>
  <div class="resource-update">
    <div class="middle-tree-wrap">
      <div class="tree-wrap" :class="{fixedclass:isfixTab}">
        <top-popover v-if="isReady" :chooseType="activeType" ref="filter" @setparams="setparams">
          <div slot="reference">
            <p class="top-title">
              <span v-if="$refs.filter">{{$refs.filter.subject.subjectName}}</span>
              <span v-if="$refs.filter && activeType=='chapter'">{{$refs.filter.oese.name}}</span>
              <span v-if="$refs.filter && activeType=='chapter'" >{{$refs.filter.volume.name}}</span>
              
              <i class="iconfont iconshezhi settingicon"></i>
            </p>
          </div>
          <div slot="popover">
          </div>
        </top-popover>

        <div class="tree-content">
          <el-tabs stretch v-model="activeType" @tab-click="handleClick">
            <el-tab-pane label="按章节" name="chapter">
              <div class="tree-class" :class="{treeclassfixed:isfixTab}">
                <pointTree chooseType="chapter" :volumeId="volumeId" @selectnode="defaultCheckChapters"  @getCheckedNodes="getCheckedChapters" ref="chapterTree" ></pointTree>
              </div>
            </el-tab-pane>
            <el-tab-pane label="按考点" name="knowledge">

              <div class="tree-class">
                <pointTree chooseType="knowledge" :subjectCode="subjectCode" @selectnode="defaultCheckKnows"  @getCheckedNodes="getCheckedKnows" ref="knowledgeTree" ></pointTree>
              </div>
            </el-tab-pane>
          </el-tabs>

        </div>
      </div>
    </div>
    <div class="resource-wrap-right">
     
      <p class="title-wrap">
        <span class="title">编辑资源</span>
        <span> <el-button type="text" size="mini" @click="$router.go(-1)">返回</el-button></span>
      </p>

      <div class="content-warp el-radio-costom">
        
        <el-form :model="resourceForm" ref="resourceForm" :rules="resourceRules"  size="small" label-width="100px" class="demo-ruleForm" :show-message='false'>
          <p class="top-p">1、选择资源</p>
          <el-form-item label="资源类型" :required="true" >
            <el-radio-group v-model="resourceForm.resourceType" @change="resourceTypeChange">
              <el-radio-button :label="item.id" :value="item.id" v-for="item in resourceTypeList">{{item.name}}</el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item prop="resourceSite" :label="resourceFileName" :required="true" >
            <el-upload
              class="upload-demo"
              ref="resourceSite"
              accept="file"
              action="/api/open/common/file/initUpload"
              :before-remove="beforeRemove"
              :on-remove="removeSite"
              :before-upload="handleBeforeUploadSite"
              :http-request="defaultUpload"
              :limit="1"
              :file-list="uploadSiteList"
              :on-exceed="exceedFile">
              <el-button size="mini" type="primary">点击上传</el-button>
            </el-upload>
          </el-form-item>

          <el-form-item prop="surface" v-show="showAnswerUpload" :label="resourceFileAttach">
            <el-upload
              class="upload-demo"
              accept="file"
              ref="surface"
              action="/api/open/common/file/initUpload"
              :before-remove="beforeRemove"
              :on-remove="removeAnswer"
              :before-upload="handleBeforeUploadSurface"
              :http-request="defaultUpload"
              :limit="1"
              :file-list="uploadAnswerList"
              :on-exceed="exceedFile">
              <el-button size="mini" type="primary">点击上传</el-button>
            </el-upload>
          </el-form-item>

          <p class="top-p">2、资源信息</p>

          <el-form-item label="资源名称" prop="name" :required="true">
            <el-input v-model="resourceForm.name" placeholder="请输入名称"></el-input>
          </el-form-item>
          <el-form-item label="资源简介">
            <el-input
              type="textarea"
              class="input-class"
              :autosize="{ minRows: 2, maxRows: 4}"
              placeholder="请输入描述"
              v-model="resourceForm.synopsis">
            </el-input>
          </el-form-item>

          <el-form-item label="学段" prop="learningSection">
            <el-select v-model="resourceInfo.learningSection" placeholder="请选择" class="input-class" disabled >
              <el-option label="小学" value="PrimarySchool"></el-option>
              <el-option label="初中" value="JuniorMiddleSchool"></el-option>
              <el-option label="高中" value="HighSchool"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="科目" >
              <el-select v-model="resourceInfo.subjectName" placeholder="请选择" class="input-class" disabled >
                <el-option :label="resourceInfo.subjectName" :value="resourceInfo.subjectName"></el-option>
              </el-select>
          </el-form-item>

          <el-form-item label="年级" prop="grade" >
            <el-select v-model="resourceForm.grade" placeholder="请选择" class="input-class">
              <el-option :label="item.value" :value="item.key" v-for="item in gradeList" >{{item.value}}</el-option>
            </el-select>
          </el-form-item>

          <p class="top-p">3、权限设置</p>

          <el-form-item label="权限设置" prop="openState" :required="true">
            <el-select v-model="resourceForm.openState" placeholder="请选择" class="input-class">
              <el-option label="私有" value="Privately"></el-option>
              <el-option label="学校共享" value="SemiOvert"></el-option>
              <el-option label="完全公开" value="Open"></el-option>
            </el-select>
          </el-form-item>
          
        </el-form>

        <p class="top-p">4、筛选</p>
        <div class="tag-class">

          <el-tag v-for="(tag,index) in tagsList" :key="tag.id" effect="dark" closable size="small" @close="closeTag(index)">{{tag.name}}</el-tag>
        </div>
      </div>

      <div class="active-div">
        <el-button type="primary" @click="submitResource" size="mini">确认更改 </el-button>
        <el-button @click="toPageBack" size="mini">取 消</el-button>
        
      </div>

    </div>
  </div>

</template>

<script>
  import { mapGetters } from 'vuex'
  import leftFixedNav from "@/components/Nav/leftFixedNav";
  import topPopover from "@/components/Popover/topPopover";
  import { initFileUpload, completeFileUpload} from '@/utils/file.service.js'
  import { uploadFilesBySteaps } from '@/utils/upload.js'

export default {
  props:['isfixTab'],
  inject: ['reload'],
  data() {
    return {
      resourceId: this.$route.query.id,
      resourceInfo:{},
      resourceForm:{
        name:'',
        resourceSite:null,
        answerFile:null,
        synopsis:'',
        resourceType:'Courseware',
        grade:'',
        chapterIdList:[],
        knowledgeIdList:[],
        openState:'Privately',
        oeseId:'',
        oeseBookId:''
      },
     resourceRules: {
        resourceType: [{ required: true, message: '请选择资源类型', trigger: 'change' }],
        name:[
          { required: true, message: '请输入资源名称', trigger: 'blur' },
          { max: 30, message: "允许的最大长度是30位", trigger: "blur" }
        ],
        synopsis:[{ max: 200, message: "允许的最大长度是200位", trigger: "blur" }],
        openState: [{required: true, message: '请设置权限', trigger: 'change' }]
      },
     
      uploadSiteList: [],
      uploadAnswerList: [],
      showAnswerUpload: false,
      activeType:"chapter",
      resourceTypeList:[],
  
      tagsList:[],
      chapterTags:[],
      knowledgeTags:[],
      bytesPerPiece: 50 * 1024 * 1024,
      volumeId:'',
      subjectCode:'',

      
    };
  },
  components: {
    topPopover,
    leftFixedNav
  },
  watch: {
  },
  computed: {
    ...mapGetters([
      'gradeList',
      'getuserInfo',
      'isReady'
    ]),

    resourceFileName() {
      return this.resourceForm.resourceType === '4' ? '试卷上传':'资源上传'
    },

    resourceFileAttach() {
      return this.resourceForm.resourceType === '4' ? '答案上传':'资源封面'
    }
  },
  mounted() {
   
  },
  created(){
    this.getResourceType();
    this.getResourceInfo();
  },
  methods: {

    setparams(volumeId,subjectCode) {
      this.volumeId = volumeId
      this.subjectCode = subjectCode
    },

    exceedFile(files, fileList) {
      return this.$message({
        message:'只允许上传一个文件！',
        type:'warning'
      })
    },

    closeTag(index) {
      if(this.activeType == "chapter") {
        this.chapterTags.splice(index,1)
        this.$refs.chapterTree.setCheckedNodes(this.chapterTags)
      }else {
        this.knowledgeTags.splice(index,1)
        this.$refs.knowledgeTree.setCheckedNodes(this.knowledgeTags)
      }

    },

    handleClick(tab, event) {
      if(tab.name == "chapter") {
        this.tagsList = this.chapterTags
      }else {
        this.tagsList = this.knowledgeTags
      }
    },

    resourceTypeChange(){
      this.showAnswerUpload = this.resourceForm.resourceType === '4'
    },

    toPageBack() {
        this.$router.go(-1);
    },

    defaultCheckChapters() {
      if(this.resourceInfo.chapterList && this.resourceInfo.chapterList.length){
        this.$refs.chapterTree.setNodesByIds(this.resourceInfo.chapterList)
      }
    },

    defaultCheckKnows() {
      if(this.resourceInfo.knowledgeList && this.resourceInfo.knowledgeList.length) {
        this.$refs.knowledgeTree.setNodesByIds(this.resourceInfo.knowledgeList)
      }
      
    },

    getResourceInfo() {
      this.$http.get(`/api/open/resources/${this.resourceId}`,{})
      .then((result)=>{
        if(result.status == '200') {
          this.resourceInfo = result.data;
          this.resourceForm = {
            name:result.data.name,
            resourceSite:result.data.resourceSite,
            answerFile:result.data.answerFile,
            synopsis:result.data.synopsis,
            resourceType:result.data.resourceType,
            grade:result.data.grade,
            chapterIdList:result.data.chapterSet,
            knowledgeIdList:result.data.knowledgeSet,
            openState:result.data.openState,
            oeseId:result.data.oeseId,
            oeseBookId:result.data.oeseBookId
          };
          this.resourceTypeChange();
          this.uploadSiteList = [{
            id:result.data.resourceSite.id,
            name: result.data.resourceSiteName,
            status: 'success'
          }];
          if(result.data.answerFile){
            this.uploadAnswerList = [{
                id:result.data.answerFile.id,
                name: result.data.answerFileName,
                status: 'success'
            }];
          }
          
        }
      })
    },

    /**获取章节*/
    getCheckedChapters(list) {
      this.chapterTags = list
      this.tagsList = this.chapterTags
    },

    /**获取知识点*/
    getCheckedKnows(list) {
      this.knowledgeTags = list
      this.tagsList = this.knowledgeTags
    },

    /**获取资源类型*/
    getResourceType(){
      this.$http.get(`/api/open/common/getResourceType`)
        .then((result)=>{
          if(result.status == '200') {
            this.resourceTypeList = result.data
            this.resourceForm.resourceType = this.resourceTypeList[0].id
          }
        })

    },

    /**上传资源 */
    submitResource(){
      if (this.uploadSiteList.length > 0){
        this.resourceForm.resourceSite = {id:this.uploadSiteList[0].id};
      } else {
        this.$message({message:'请上传资源',type:'error'});
        return false;
      }
      if (this.uploadAnswerList.length > 0){
        this.resourceForm.answerFile = {id:this.uploadAnswerList[0].id};
      }
      let knowledgeIds = []
      let chapterIds = []
      this.knowledgeTags.forEach(item=>{
        knowledgeIds.push(item.id)
      })
      this.chapterTags.forEach(item=>{
        chapterIds.push(item.id)
      })
      this.resourceForm.chapterIdList = chapterIds;
      this.resourceForm.knowledgeIdList = knowledgeIds;
      this.resourceForm.oeseBookId = this.volumeId

      console.log(this.resourceForm)
      this.$refs.resourceForm.validate((valid)=>{
          if(valid){
            this.$http.put(`/api/open/resources/${this.resourceId}`,this.resourceForm)
              .then((result)=>{
                if(result.status == '200') {
                  this.$message({message:'更新成功',type:'success'});

                  this.reload()
                  // this.toPageBack();
               }
              })
          } else {
            this.$message({message:'valid no pass',type:'warning'});
            return false;
          }
      })
      
    },

    defaultUpload(){

    },

    beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
    },

    removeSite(file, fileList) {
      this.uploadSiteList = [];
    },

    removeAnswer(file, fileList) {
      this.uploadAnswerList = [];
    },

    handleBeforeUploadSite(file) {
      this.handleBeforeUpload(file,'site');
    },

    handleBeforeUploadSurface(file) {
      this.handleBeforeUpload(file,'surface');
    },

     /**
     * 拦截上传，手动实现上传文件
     */
    handleBeforeUpload (file,curUpload) {
        let currentKey = 0;
        if (curUpload === 'site'){
          this.uploadSiteList = [...this.uploadSiteList, {
            name: file.name,
            id: ''
          }]
        } else {
          this.uploadAnswerList = [...this.uploadAnswerList, {
            name: file.name,
            id: ''
          }]
        }
        
        initFileUpload({
          md5: "",
          multipartUpload: file.size > this.bytesPerPiece ? true : false, // 是否需要分片
          name: file.name,
          size: file.size
        }).then((res)=>{

          uploadFilesBySteaps({
            file: file,
            uploadUrl:res.data.uploadUrl, 
            limitSize: this.bytesPerPiece,
            callBack: ()=>{},
            errBack: ()=>{},
            httpConfig: {clsoeMessage: true}
          }).then((uploadResponse)=>{
            if(file.size > this.bytesPerPiece) {
              // 合并文件
              this.$http.post(res.data.completeMultipartUrl, uploadResponse).then((mergeResponse)=>{
                this.confirmUpload(mergeResponse.data.id, currentKey,curUpload);
              }).catch((mergeError)=>{
                this.$message({message:'上传失败，请删除并重新上传',type:'error'});
              })
            } else {
              this.confirmUpload(uploadResponse[0].id, currentKey,curUpload);
            }
          }).catch((uploadError)=>{
            this.$message({message:'网络状况不佳，请删除并重新上传',type:'error'});
          })
        }).catch((initErr)=>{
          
        })
        return false;
      },
      /**
       * 平台确认上传完成
       */
      confirmUpload(id, currentKey,curUpload) {
        // 平台确认
        completeFileUpload(id).then((completeResponse)=>{
          this.$message({message:'上传成功',type:'success'});
          if (curUpload === 'site'){
            this.uploadSiteList[currentKey].id = id;
          } else {
            this.uploadAnswerList[currentKey].id = id;
          }
        }).catch((completeErr)=>{
          this.$message({message:completeErr || '上传失败',type:'warning'});
        })
      },
  }
};
</script>
<style lang="less">
.resource-update{
  .el-tag--small {
    margin-left: 10px;
    margin-bottom: 10px;
  }
  .el-textarea__inner {
    background-color: transparent;
  }
  .el-upload-list__item {
    width: 90%;
    &:hover {
      background-color:transparent;
    }
    &:focus {
      outline:0px;
    }
  }
}

</style>
<style lang="less" scoped>
.resource-update {
  display: flex;

  .resource-wrap-right {
    width: 100%;
    margin-left: 20px;
    padding-bottom: 20px;
    .title-wrap {

      display: flex;
      align-items: center;
      justify-content: space-between;

      .title {
        font-size: 18px;
        color: #3399ff;
        height: 40px;
        line-height: 40px;

      }
    }


    .content-warp {
      // border:1px solid #e2e2e2;
      padding: 0 10px;

      .top-p {
        height: 36px;
        line-height: 36px;
        border-bottom: 1px solid #e2e2e2;
        margin-bottom: 10px;
      }

      .tag-class {
        margin-left: -10px;
        margin-bottom: 20px;
      }
    }

    .active-div {
      text-align: center;
    }
  }
  

}
</style>
