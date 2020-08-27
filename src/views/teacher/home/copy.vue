<template>
  <div class="resource">
    <left-fixed-nav :isfixTab="isfixTab">
      <div slot="left">
        <div class="resource-wrap-left">
          <top-popover>
              <div slot="reference">
                <p class="top-title">
                  <span>{{resourceObject.gradeName}}</span>
                  <i class="iconfont iconshezhi settingicon"></i>
                </p>
              </div>
              <div slot="popover">
                <div>
                  <p>年级：</p>
                   <el-radio-group v-model="resourceObject.gradeId" size="mini">
                      <el-radio-button :label="item.key" :key="item.key" v-for="item in gradeList">{{item.value}}</el-radio-button>
                  </el-radio-group>
                </div>
              </div>
          </top-popover>
          <div class="tab-class">
            <el-tabs stretch v-model="activeType" @tab-click="handleClick">
              <el-tab-pane label="按章节" name="chapter">
                <div class="tree-class" >
                  <pointTree chooseType="chapter" :grade="resourceObject.gradeId" :subjectCode="resourceObject.subjectCode"  @getCheckedNodes="getCheckedChapters" ref="chapterTree"></pointTree>
                </div>
              </el-tab-pane>
              <el-tab-pane label="按考点" name="detial">
                <div class="tree-class">
                  <pointTree chooseType="knowledge" :grade="resourceObject.gradeId" :subjectCode="resourceObject.subjectCode" @getCheckedNodes="getCheckedKnows" ref="knowledgeTree"></pointTree>
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
            
            <el-form :model="resourceForm" ref="resourceForm" :rules="resourceRules"  size="small" label-width="100px" class="demo-ruleForm" :show-message='false'>
              <p class="top-p">1、选择资源</p>
              <el-form-item label="资源类型" :required="true" >
                <el-radio-group v-model="resourceForm.resourceType">
                  <el-radio-button :label="item.id" :value="item.id" v-for="item in resourceTypeList">{{item.name}}</el-radio-button>
                </el-radio-group>
              </el-form-item>
              <el-form-item prop="resourceSite" label="文件上传" :required="true" >
                <el-upload
                  class="upload-demo"
                  ref="resourceSite"
                  accept="file"
                  action="/api/open/common/file/initUpload"
                  :on-remove="beforeRemoveSite"
                  :before-remove="beforeRemove"
                  :before-upload="handleBeforeUploadSite"
                  :http-request="defaultUpload"
                  :disabled="uploadSiteList.uploadList.length>0"
                  :limit="1">
                  <el-button size="mini" type="primary">点击上传</el-button>
                </el-upload>
                <div v-for="(item, index) in uploadSiteList.uploadList" :key="index">
                    <el-progress 
                      :percentage="item.percent || 0"
                      :stroke-width="5" 
                      :status="item.status"/>
                    </el-progress>
                </div>
              </el-form-item>

              <el-form-item prop="surface" label="封面上传">
                <el-upload
                  class="upload-demo"
                  accept="image/jpeg,image/png,image/jpg,image/gif"
                  ref="surface"
                  action="/api/open/common/file/initUpload"
                  :before-remove="beforeRemove"
                  :on-remove="beforeRemoveSurface"
                  :before-upload="handleBeforeUploadSurface"
                  :http-request="defaultUpload"
                  :disabled="uploadSurfaceList.uploadList.length>0"
                  :limit="1">
                  <el-button size="mini" type="primary">点击上传</el-button>
                  <div slot="tip" class="el-upload__tip">只能上传png、jpeg、jpg、gif格式的图片</div>
                </el-upload>
                <div v-for="(item, index) in uploadSurfaceList.uploadList" :key="index">
                    <el-progress 
                      :percentage="item.percent || 0"
                      :stroke-width="5" 
                      :status="item.status"/>
                    </el-progress>
                </div>
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

              <el-form-item label="学段" prop="learningSection" :required="true">
                <el-select v-model="resourceForm.learningSection" placeholder="请选择" class="input-class" disabled >
                  <el-option label="小学" value="PrimarySchool"></el-option>
                  <el-option label="初中" value="JuniorMiddleSchool"></el-option>
                  <el-option label="高中" value="HighSchool"></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="科目" prop="subjectId" :required="true" >
                  <el-select v-model="resourceForm.subjectId" placeholder="请选择" class="input-class" disabled >
                    <el-option :label="resourceObject.subjectName" :value="resourceObject.subjectId" >{{resourceObject.subjectName}}</el-option>
                  </el-select>
              </el-form-item>

              <el-form-item label="年级" prop="grade" :required="true" >
                <el-select v-model="resourceForm.grade" placeholder="请选择" class="input-class">
                  <el-option :label="item.name" :value="item.id" v-for="item in gradeSectionList">{{item.name}}</el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="版本" prop="oeseType">
                <el-select v-model="resourceForm.oeseType" placeholder="请选择" class="input-class">
                  <el-option label="人教版" value="PepEdition"></el-option>
                  <el-option label="沪教版" value="ShVersion"></el-option>
                  <el-option label="苏教版" value="SueOclock"></el-option>
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
  data() {
    return {
      resourceForm:{
        name:'',
        resourceSite:null,
        surface:null,
        synopsis:'',
        oeseType:'',
        resourceType:'Courseware',
        grade:'',
        schoolId:'',
        subjectId:'',
        learningSection:'',
        chapterIdList:[],
        knowledgeIdList:[],
        openState:''
      },
     resourceRules: {
        resourceType: [{ required: true, message: '请选择资源类型', trigger: 'change' }],
        name:[
          { required: true, message: '请输入资源名称', trigger: 'blur' },
          { max: 30, message: "允许的最大长度是30位", trigger: "blur" }
        ],
        synopsis:[{ max: 30, message: "允许的最大长度是200位", trigger: "blur" }],
        grade: [{required: true, message: '请选择年级', trigger: 'change' }],
        openState: [{required: true, message: '请设置权限', trigger: 'change' }],
        subjectId: [{required: true, message: '请选择学科', trigger: 'change' }]
      },
      resourceObject:{
        gradeId:'',
        gradeName:'',
        subjectId:'',
        subjectCode:'',
        subjectName:''
      },
      uploadSiteList: {
          name: '',
          resourceSite: '',
          uploadList:[]
      },
      uploadSurfaceList: {
          name: '',
          uploadList:[]
      },
      activeType:"chapter",
      resourceTypeList:[],
      gradeSectionList:[],
      tagsList:[],
      chapterTags:[],
      knowledgeTags:[],
      bytesPerPiece: 50 * 1024 * 1024
      
    };
  },
  components: {
    topPopover,
    leftFixedNav
  },
  watch: {
    gradeList(val) {
      if(val.length) {
        this.resourceObject.gradeId = val[0].key;
        this.resourceObject.gradeName = val[0].value;
      }
    },

    getuserInfo(val) {
      console.log(val)
    },
  },
  computed: {
    ...mapGetters([
      'gradeList',
      'getuserInfo',
    ]),
  },
  mounted() {
    this.resourceObject.subjectId = this.getuserInfo.subject.id
    this.resourceObject.subjectName = this.getuserInfo.subject.name
    this.resourceObject.subjectCode = this.getuserInfo.subjectCode
    this.resourceObject.gradeId = this.gradeList[0].key;
    this.resourceObject.gradeName = this.gradeList[0].value;

    this.resourceForm.learningSection = this.getuserInfo.learningSection
    this.resourceForm.schoolId = this.getuserInfo.school.id
    this.resourceForm.subjectId = this.getuserInfo.subject.id

    this.getGradeSectionList(this.resourceForm.learningSection);
  },
  created(){
    this.getResourceType();
  },
  methods: {
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
          }
        })

    },

    /**通过学段获取年级*/
    getGradeSectionList(learningSection){
      this.$http.get(`/api/open/common/grade/`+learningSection)
        .then((result)=>{
          if(result.status == '200') {
            this.gradeSectionList = result.data
          }    
        })

    },

    /**上传资源 */
    submitResource(){
      if (this.uploadSiteList.uploadList.length > 0){
        this.resourceForm.resourceSite = {id:this.uploadSiteList.uploadList[0].id};
      }
      if (this.uploadSurfaceList.uploadList.length > 0){
        this.resourceForm.surface = {id:this.uploadSurfaceList.uploadList[0].id};
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

      this.$refs.resourceForm.validate((valid)=>{
          if(valid){
            this.$http.post(`/api/open/resources`,this.resourceForm)
              .then((result)=>{
                if(result.status == '200') {
                  this.$message({message:'添加成功',type:'success'});
                  this.toPageBack();
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

    beforeRemoveSite(file, fileList) {
        this.uploadSiteList.uploadList.splice(0, 1);
        this.uploadSiteList.name  = '';
    },

    beforeRemoveSurface(file, fileList) {
        this.uploadSurfaceList.uploadList.splice(0, 1);
        this.uploadSurfaceList.name  = '';
    },

    handleBeforeUploadSite(file) {
      this.handleBeforeUpload(file,'site');
    },

    handleBeforeUploadSurface(file) {
      if(!/\.(png|jpe?g|gif|svg|PNG|JPE?G|GIF|SVG)(\?.*)?$/.test(file.name)) {
        this.$message({message:'仅支持png、jpeg、jpg、gif格式的图片！',type:'error'});
        return false;
      }
      this.handleBeforeUpload(file,'surface');
    },

     /**
     * 拦截上传，手动实现上传文件
     */
    handleBeforeUpload (file,curUpload) {
        let currentKey = 0;
        if (curUpload === 'site'){
          this.uploadSiteList.name = file.name.split('.')[0];
          this.uploadSiteList.uploadList = [...this.uploadSiteList.uploadList, {
            name: file.name,
            percent: 10,
            id: '',
            status: 'active'
          }]
        } else {
          this.uploadSurfaceList.name = file.name.split('.')[0];
          this.uploadSurfaceList.uploadList = [...this.uploadSurfaceList.uploadList, {
            name: file.name,
            percent: 10,
            id: '',
            status: 'active'
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
                this.uploadSiteList.uploadList[currentKey].percent+=percentAdd;
              } else {
                this.uploadSurfaceList.uploadList[currentKey].percent+=percentAdd;
              }  
            },
            errBack: ()=>{
              if (curUpload === 'site'){
                this.uploadSiteList.uploadList[currentKey].status = 'exception';
              } else {
                this.uploadSurfaceList.uploadList[currentKey].status = 'exception';
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
                  this.uploadSiteList.uploadList[currentKey].status = 'exception';
                } else {
                  this.uploadSurfaceList.uploadList[currentKey].status = 'exception';
                }
              })
            } else {
              this.confirmUpload(uploadResponse[0].id, currentKey,curUpload);
            }
          }).catch((uploadError)=>{
            console.error(uploadError);
            this.$message({message:'网络状况不佳，请删除并重新上传',type:'error'});
          })
        }).catch((initErr)=>{
          console.log(initErr);
          if (curUpload === 'site'){
            this.uploadSiteList.uploadList[currentKey].status = 'exception';
          } else {
            this.uploadSurfaceList.uploadList[currentKey].status = 'exception';
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
            this.uploadSiteList.uploadList[currentKey].id = id;
            this.uploadSiteList.uploadList[currentKey].percent = 100;
            this.uploadSiteList.uploadList[currentKey].status = 'success';
            this.uploadSiteList.resourceSite = this.uploadSiteList.uploadList.length ? this.uploadSiteList.uploadList.length + '' : '';
            this.$refs.resourceForm.validateField('resourceSite');
          } else {
            this.uploadSurfaceList.uploadList[currentKey].id = id;
            this.uploadSurfaceList.uploadList[currentKey].percent = 100;
            this.uploadSurfaceList.uploadList[currentKey].status = 'success';
          }
        }).catch((completeErr)=>{
          console.log(completeErr);
          this.$message({message:completeErr || '上传失败',type:'warning'});
          if (curUpload === 'site'){
            this.uploadSiteList.uploadList[currentKey].status = 'exception';
          } else {
            this.uploadSurfaceList.uploadList[currentKey].status = 'exception';
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
