<template>
  <div class="resource">
    <left-fixed-nav :isfixTab="isfixTab">
      <div slot="left">
        <div class="resource-wrap-left">
          <top-popover v-if="isReady" :chooseType="activeType" ref="filter" @setparams="setparams">
            <div slot="reference">
              <p class="top-title">
                <span v-if="$refs.filter && activeType=='chapter'">{{$refs.filter.oese.name}}</span>
                <span v-if="$refs.filter && activeType=='chapter'" >{{$refs.filter.volume.name}}</span>
                <span v-if="$refs.filter && activeType=='knowledge'" >{{$refs.filter.subject.subjectName}}</span>
                <i class="iconfont iconshezhi settingicon"></i>
              </p>
            </div>
            <div slot="popover">
            </div>
          </top-popover>
          <div class="tab-class">
            <el-tabs stretch v-model="activeType" @tab-click="handleClick">
              <el-tab-pane label="按章节" name="chapter">
                <div class="tree-class" >
                  <pointTree chooseType="chapter" :volumeId="volumeId" @getCheckedNodes="getCheckedChapters" ref="chapterTree"></pointTree>
                </div>
              </el-tab-pane>
              <el-tab-pane label="按考点" name="knowledge">
                <div class="tree-class">
                  <pointTree chooseType="knowledge" :subjectCode="subjectCode" @getCheckedNodes="getCheckedKnows" ref="knowledgeTree"></pointTree>
                </div>
              </el-tab-pane>
            </el-tabs>
          </div>
        </div>
      </div>
      <div slot="right">
        <div class="resource-wrap-right">
          <div class="bread-div">
            <div>
              <i class="iconfont iconshouye iconclass"></i> 当前位置：首页 > 我的资源 > 上传资源
            </div>
          </div>

          <p class="title">上传资源</p>

          <div class="content-warp el-radio-costom">
            
            <el-form :model="resourceForm" ref="resourceForm" :rules="rules"  size="small" label-width="100px" class="demo-ruleForm" >
              <p class="top-p">1、选择资源</p>
              <el-form-item label="资源类型" :required="true" prop="resourceType" >
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
                <div v-for="(item, index) in uploadSiteList" :key="index">
                    <el-progress 
                      :percentage="item.percent || 0"
                      :stroke-width="5" 
                      :status="item.status" >
                    </el-progress>
                </div>

              </el-form-item>

              <el-form-item prop="answerFile" v-if="showAnswerUpload" :label="resourceFileAttach" :required="true">
                <el-upload
                  class="upload-demo"
                  accept="file"
                  ref="answerFile"
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
                <div v-for="(item, index) in uploadAnswerList" :key="index">
                    <el-progress 
                      :percentage="item.percent || 0"
                      :stroke-width="5" 
                      :status="item.status" >
                    </el-progress>
                </div>
              </el-form-item>

              <p class="top-p">2、资源信息</p>

              <el-form-item label="资源名称" prop="name" :required="true">
                <el-input v-model="resourceForm.name" placeholder="请输入名称"></el-input>
              </el-form-item>
              <el-form-item label="资源简介" prop="synopsis">
                <el-input
                  type="textarea"
                  class="input-class"
                  :autosize="{ minRows: 2, maxRows: 4}"
                  placeholder="请输入描述"
                  v-model="resourceForm.synopsis">
                </el-input>
              </el-form-item>

              <el-form-item label="学段" prop="learningSection">
                <el-select v-model="resourceForm.learningSection" placeholder="请选择" class="input-class" disabled >
                  <el-option label="小学" value="PrimarySchool"></el-option>
                  <el-option label="初中" value="JuniorMiddleSchool"></el-option>
                  <el-option label="高中" value="HighSchool"></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="科目" >
                  <el-select v-model="resourceObject.subjectName"  placeholder="请选择" class="input-class" :disabled="subjectDisabled" >
                    <el-option :label="list.subjectName" :value="list.code" :key="list.code" v-for="list in subjectList"></el-option>
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
            <el-button type="primary" @click="submitResource" size="mini">发布资源 </el-button>
            <el-button @click="toPageBack" size="mini">取 消</el-button>
            
          </div>

        </div>
      </div>
    </left-fixed-nav>
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
      resourceForm:{
        name:'',
        resourceSite:null,
        answerFile:null,
        synopsis:'',
        resourceType:'Courseware',
        grade:'',
        chapterIdList:[],
        knowledgeIdList:[],
        openState:'Open',
        oeseId:'',
        oeseBookId:'',
        learningSection:'',
        subjectCode:''
      },
      rules: {
        resourceType: [{ required: true, message: '请选择资源类型', trigger: 'change' }],
        name:[
          { required: true, message: '请输入资源名称', trigger: 'blur' },
          { max: 60, message: "允许的最大长度是60位", trigger: "blur" }
        ],
        resourceSite:[{ required: true, message: '请上传资源', trigger: 'change' }],
        synopsis:[{ max: 200, message: "允许的最大长度是200位", trigger: "blur" }],
        grade: [{ required: true, message: '请选择年级', trigger: 'change' }],
        openState: [{required: true, message: '请设置权限', trigger: 'change' }]
      },
      resourceObject:{
        subjectName:''
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
      subjectDisabled:false,

    };
  },
  components: {
    topPopover,
    leftFixedNav
  },
  watch: {
    isReady(val) {
      if(val) {
        if(this.getuserInfo.userType == 'Teacher') {
          this.resourceObject.subjectName = this.getuserInfo.subjectCode
          this.subjectDisabled = true
        }else {
          this.resourceObject.subjectName = this.subjectList[0].code
        }


        // this.resourceObject.subjectName = this.getuserInfo.subject.name
        this.resourceForm.learningSection = this.getuserInfo.learningSection

        this.resourceForm.grade = this.gradeList[0].key;
      }
    },
  },
  computed: {
    ...mapGetters([
      'gradeList',
      'subjectList',
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
    
    if(this.isReady) {
      if(this.getuserInfo.userType == 'Teacher') {
        this.resourceObject.subjectName = this.getuserInfo.subjectCode
        this.subjectDisabled = true
      }else {
        this.resourceObject.subjectName = this.subjectList[0].code
      }
      this.resourceForm.learningSection = this.getuserInfo.learningSection

      this.resourceForm.grade = this.gradeList[0].key;
   
    }

  },
  created(){
    this.getResourceType();
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
      }
      if (this.resourceForm.resourceType=='4') {
        if(this.uploadAnswerList.length > 0) {
          this.resourceForm.answerFile = {id:this.uploadAnswerList[0].id};
        }else {
          return this.$message({message:'请上传套题试卷的答案',type:'error'});
        }
      }
      
      if(!this.knowledgeTags.length && !this.chapterTags.length) {
        return this.$message.warning('请选择关联的章节或者知识点');
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
      this.resourceForm.subjectCode = this.subjectCode

      this.$refs.resourceForm.validate((valid)=>{
          if(valid){
            this.$http.post(`/api/open/resources`,this.resourceForm)
              .then((result)=>{
                if(result.status == '200') {
                  this.$message({message:'添加成功',type:'success'});

                  this.reload()
                  // this.toPageBack();
                }
              })
          } else {
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
            id: '',
            percent: 10,
            
          }]
        } else {
          this.uploadAnswerList = [...this.uploadAnswerList, {
            name: file.name,
            id: '',
            percent: 10,
          }]
        }
        
        initFileUpload({
          md5: "",
          multipartUpload: file.size > this.bytesPerPiece ? true : false, // 是否需要分片
          name: file.name,
          size: file.size
        }).then((res)=>{

          const totalPieces = file.size > this.bytesPerPiece ? Math.ceil(file.size / this.bytesPerPiece) : 1;
          const percentAdd = Math.floor((100 - 15) / totalPieces); //上传进度增长值，预留15%给前后

          uploadFilesBySteaps({
            file: file,
            uploadUrl:res.data.uploadUrl, 
            limitSize: this.bytesPerPiece,
            callBack: ()=>{
              if (curUpload === 'site'){
                this.uploadSiteList[currentKey].percent+=percentAdd;
                //this.uploadSiteList = [];
              } else {
                this.uploadAnswerList[currentKey].percent+=percentAdd;
                //this.uploadAnswerList = [];
              }
            },
            errBack: ()=>{
              if (curUpload === 'site'){
                this.uploadSiteList[currentKey].status == 'exception';
                //this.uploadSiteList = [];
              } else {
                this.uploadAnswerList[currentKey].status == 'exception';
                //this.uploadAnswerList = [];
              }
            },
            httpConfig: {clsoeMessage: true}
          }).then((uploadResponse)=>{
            if(file.size > this.bytesPerPiece) {
              // 合并文件
              this.$http.post(res.data.completeMultipartUrl, uploadResponse).then((mergeResponse)=>{
                this.confirmUpload(mergeResponse.data.id, currentKey,curUpload);
              }).catch((mergeError)=>{
                this.$message({message:'上传失败，请删除并重新上传',type:'error'});
                if (curUpload === 'site'){
                  this.uploadSiteList[currentKey].status == 'exception';
                } else {
                  this.uploadAnswerList[currentKey].status == 'exception';
                }
              })
            } else {
              this.confirmUpload(uploadResponse[0].id, currentKey,curUpload);
            }
          }).catch((uploadError)=>{
            this.$message({message:'网络状况不佳，请删除并重新上传',type:'error'});
          })
        }).catch((initErr)=>{

          if (curUpload === 'site'){
            this.uploadSiteList[currentKey].status == 'exception';
          } else {
            this.uploadAnswerList[currentKey].status == 'exception';
          }
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
            this.uploadSiteList[currentKey].percent = 100;
            this.uploadSiteList[currentKey].status = 'success';
          } else {
            this.uploadAnswerList[currentKey].id = id;
            this.uploadAnswerList[currentKey].percent = 100;
            this.uploadAnswerList[currentKey].status = 'success';
          }
        }).catch((completeErr)=>{
          this.$message({message:completeErr || '上传失败',type:'warning'});
          if (curUpload === 'site'){
            this.uploadSiteList[currentKey].status == 'exception';
          } else {
            this.uploadAnswerList[currentKey].status == 'exception';
          }
        })
      },
  }
};
</script>
<style lang="less">
.resource{
  .el-tag--small {
    margin-left: 10px;
    margin-bottom: 10px;
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
.resource {
  //height: 100%;
  //background-color: #f0f3fa;
  //overflow: auto;
  //width: 90%;
  //margin:0 auto;



  .resource-wrap-right {
    padding-bottom: 20px;
    
    .title {
      font-size: 18px;
      color: #3399ff;
      height: 40px;
      line-height: 40px;
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
