<template>
  <div class="collection">

    <div class="collection-wrap">

        <div v-if="resourceType == 'question'" class="question-wrap"> 
          <div class="question-wrap-top">
            <div class="top1">
              <p>试题收藏夹目录</p>
              <p>
                <el-button type="text" @click="addFolderDialog">新增收藏夹</el-button>
              </p>
            </div>
           <!--  <el-radio-group v-model="search.folder" size="small"  v-for="list in folderNameList" >
              <el-radio-button :label="list.folderId" class="button1"><span>{{list.folderName}}</span><span><i class="iconfont iconbianji iconclass" @click="editFolderDialog(list)"></i>
                  <i class="iconfont iconshanchu-copy iconclass" @click="deleteFolder(list.folderId)"></i></span></el-radio-button>
   
            </el-radio-group> -->
            <ul style="margin-top: 8px;">
              <li class="top2" v-for="list in folderNameList">
                <p class="default" :class="{activeclass:list.check}" @click="chooseFolder(list)">{{list.folderName}}</p>
                <p>
                  <i class="iconfont iconbianji iconclass" @click="editFolderDialog(list)"></i>
                  <i class="iconfont iconshanchu-copy iconclass" @click="deleteFolder(list.folderId)"></i>
                 </p>
              </li>
            </ul>
          </div>
          <div class="top-search" style="margin-top: 20px;">
            <el-form :inline="true" :model="search" class="demo-form-inline " >
                <el-form-item label="题型">
                  <el-select v-model="search.questionType" class="search-class" size="mini" clearable @change="resetPage">
                    <el-option :label="list.name" :value="list.code" :key="list.code" v-for="list in typeList"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="难度">
                  <el-select v-model="search.difficultyType" class="search-class" size="mini" clearable @change="resetPage">
                    <el-option :label="list.value" :value="list.key" :key="list.key" v-for="list in partDifficultyList"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="上传时间">
                  <el-date-picker
                    v-model="search.time"
                    @change="resetPage"
                    type="daterange"
                    size="mini"
                    value-format="yyyy-MM-dd"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    style="width:260px;"
                  ></el-date-picker>
                </el-form-item>
               
            </el-form>

          </div>
          <div style="margin-top: 10px;text-align: right;">
            <span class="cursor" v-show="!isAnswer" @click="isAnswer=true">
              <i class="iconfont iconxianshi" style="position: relative;top:1px"></i> 
              显示答案
            </span>
            <span class="cursor" v-show="isAnswer" @click="isAnswer=false">
              <i class="iconfont iconyincang"></i> 
              隐藏答案
            </span>
            <el-button type="primary" plain size="small" style="margin-left:20px;" @click="addAllQuestion">
               <i class="iconfont iconiconjia" style="font-size:12px;"></i> 全部加入试卷
            </el-button>
          </div>
          <div class="top-total">
            <p class="top-p">共有<span class="activecolor">{{total}}</span>个资源符合结果</p>
          </div>
          <div class="question-wrap-bottom">
            <questionList :isAnswer="isAnswer" :tableData="tableData"  :folderId="folderId" @getData="getTableData" :isCollected="true" @getmyTestBasket="getmyTestBasket" @getSimilarity="getSimilarity" @addCollectFolder="addCollectFolder" :testBasket="testBasket"></questionList>
          </div>

          <basketTag ref="basketTag" @gettestBasket="gettestBasket"></basketTag>
        </div>

        <div v-else-if="resourceType == 'actualpaper'" class="actual-wrap">
          <div class="top-search el-radio-costom">
            <el-form  :model="search" class="demo-form-inline" label-width="80px">
                <el-form-item label="年级">
                  <el-radio-group v-model="search.grade" size="mini" @change="resetPage">
                    <el-radio-button :label="list.key" :key="list.key" v-for="list in gradeList1">{{list.value}}</el-radio-button>
                  </el-radio-group>

                </el-form-item>
                <el-form-item label="年份">
                  <el-radio-group v-model="search.year" size="mini" @change="resetPage">
                    <el-radio-button :label="list" :key="list" v-for="list in yearList"></el-radio-button>
                  </el-radio-group>

                </el-form-item>

                <el-form-item label="试卷类型">
                  <el-radio-group v-model="search.testPaperType" size="mini" @change="resetPage">
                    <el-radio-button :label="list.key" :key="list.key" v-for="list in testPaperTypeList">{{list.value}}</el-radio-button>
                  </el-radio-group>
                  <!-- <el-select v-model="search.testPaperType" class="search-class" size="mini" clearable @change="resetPage">
                    <el-option :label="list.value" :value="list.key" :key="list.key" v-for="list in fileTypeList"></el-option>
                  </el-select> -->
                </el-form-item>
                <el-form-item label="收藏时间">
                  <el-date-picker
                    v-model="search.time"
                    @change="resetPage"
                    type="daterange"
                    size="mini"
                    value-format="yyyy-MM-dd"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    style="width:260px;"
                  ></el-date-picker>
                </el-form-item>
                <el-form-item label="试卷名称">
                  <el-input v-model="search.paperName" prefix-icon="el-icon-search" class="search-class" placeholder="试卷名称" size="mini" clearable @change="resetPage"></el-input>
                </el-form-item>
            </el-form>

          </div>
          <div class="actual-content">
            <el-table
              :data="tableData">
              <el-table-column
                prop="title"
                label="试卷标题">
                <template slot-scope="scope">
                  <div>
                    <p @click="previewPaper(scope.row)" class="cursor">{{scope.row.name}}</p>
                    <p style="color: #bcbec2;">
                      <span>{{scope.row.gradeName}}</span>
                      <el-divider direction="vertical"></el-divider>
                      <span>{{scope.row.testPaperTypeName}}</span>
                      <el-divider direction="vertical"></el-divider>
                      <span>{{scope.row.region}}</span>
                      <el-divider direction="vertical"></el-divider>
                      <span>{{scope.row.year}}</span>
                    </p>
                  </div>
                </template>
              </el-table-column>
              <!-- <el-table-column
                prop="totalQuestion"
                label="题数"
                align="center"
                width="100">
              </el-table-column>
              <el-table-column
                prop="completedQuestion"
                label="已传题数"
                align="center"
                width="100">
              </el-table-column> -->
              <el-table-column
                prop="createTime"
                label="上传日期"
                align="center"
                width="200">
              </el-table-column>
              <el-table-column
                prop="collectTime"
                label="收藏日期"
                align="center"
                width="200">
              </el-table-column>
              <el-table-column
                prop="address"
                label="操作"
                align="center"
                width="200">
                <template slot-scope="scope">
   
                  <!-- <el-button type="text" size="small" @click="previewPaper(scope.row)">预览</el-button>
                  <el-button type="text" size="small" @click="collectPaper(scope.row.paperId)">收藏</el-button> -->
                  <el-button type="text" size="small" @click="cancelCollect(scope.row.paperId)">取消收藏</el-button>
                  <!-- <el-button type="text" size="small">下载</el-button> -->
                </template>
              </el-table-column>
            </el-table>

          </div>
        </div>
        <div v-else >
          <div class="top-search">
            <el-form :inline="true" :model="search" class="demo-form-inline " >
                
                <el-form-item label="上传时间">
                  <el-date-picker
                    v-model="search.time"
                    @change="resetPage"
                    type="daterange"
                    size="mini"
                    value-format="yyyy-MM-dd"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    style="width:260px;"
                  ></el-date-picker>
                </el-form-item>
                <el-form-item label="文件类型">
                  <el-select v-model="search.fileType" class="search-class" size="mini" clearable @change="resetPage">
                    <el-option :label="list.value" :value="list.key" :key="list.key" v-for="list in fileTypeList"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="文件名">
                  <el-input v-model="search.fileName" class="search-class" placeholder="请输入文件名" size="mini" clearable @change="resetPage" prefix-icon="el-icon-search"></el-input>
                </el-form-item>
            </el-form>

          </div>

          <div class="top-total">
            <p class="top-p">共有<span class="activecolor">{{total}}</span>个资源符合结果</p>
          </div>
          <div class="paper-wrap">

            <div class="singal-paper" v-for="list in tableData">
              <div class="singal-paper-left">
                <div   class="left-title">
                  <p @click="resourcePreview(list.resourceId)" class="hiddentext"><i class="iconfont" :class="setClass(list.fileType)"></i><span class="text">{{list.name}}</span></p>
                </div>
                <p>
                  <span>贡献者：{{list.userName}}</span>
                  <span class="left-tag">{{list.createTime}}</span>
                  <span class="left-tag">下载量：{{list.download}}</span>
                  <span class="left-tag">点赞数：{{list.thumbUp}}</span>
                </p>
              </div>
              <div  class="singal-paper-middle">
                <p>{{list.preview}}人已读</p>
                <p>
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
              <div class="singal-paper-right">
                <el-button type="primary" size="mini" @click="deleteFile(list.resourceId)">删除</el-button>
              </div>
            </div>


          </div>
        </div>
        <div class="pagination">
          <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="search.page"
            :page-sizes="[20, 40, 80, 100]"
            :page-size="search.size"
            layout="total, prev, pager, next, sizes"
            :total="total"
          ></el-pagination>
        </div>
      
    </div>



    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      width="600px"
      custom-class="newfavorite">
      <div class="newfavorite">
        <span>名称：</span><el-input v-model="newfolderName" style="width:380px;" size="small"></el-input>

        
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addFolder" size="small">确 定</el-button>
        <el-button @click="dialogVisible = false" size="small">取 消</el-button>
      </span>
    </el-dialog>

    <similarityDialog :dialogVisible="similarityVisible" :questionId="similarityId" @close="close_similarity" @getmyTestBasket="getmyTestBasket" @addCollectFolder="addCollectFolder"></similarityDialog>
    <favoriteDialog :dialogVisible="favoriteVisible" :questionId="collectId" @close="close_favorite"></favoriteDialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import basketTag from "@/components/Popover/basketTag";
import similarityDialog from '@/components/Dialog/similarity'
import questionList from '@/components/Question/questionList'
import favoriteDialog from '@/components/Dialog/favorite'
import { getquestionType,getfileType } from '@/utils/basic.service.js'
import { debounce } from '@/utils/public.js'
export default {
  components: {
    basketTag,
    questionList,
    similarityDialog,
    favoriteDialog
  },
  props:{
    grade:String,
    chapterIds: Array,
    knowledgeIds: Array,
    resourceType:String,
    fileTypeList: Array,
  },
  data() {
    return {
      search: {
        folder:'',
        questionType: "",
        difficultyType: "",
        time: "",
        fileType:'',
        fileName:'',
        grade:'',
        year:'全部',
        paperName:'',
        testPaperType:'',
        page:1,
        size:20,
      },
      dialogVisible: false,
      dialogTitle: '新建收藏夹',
      newfolderName:'',
      folderNameList:[],
      editfolderId:'',
      tableData:[],
      typeList:[],
      total: 0,
      similarityVisible: false,
      favoriteVisible: false,
      similarityId:'',
      collectId:'',
      isAnswer:false,
      testBasket:0,
      testPaperTypeList:[],
      regionList:[],
      yearList:[],
      folderId:'',
    };
  },
  computed: {
    ...mapGetters([
      'gradeList',
      'getuserInfo',
      'partDifficultyList'
    ]),

    gradeList1() {
      let arr1 = []
      arr1.push({key:'',value:'全部'})
      this.gradeList.forEach(item=>{
        arr1.push(item)
      })
      return arr1    
    },
  },
  watch: {
    resourceType(val) {
      this.tableData = []
      this.resetPage()

      if(val == 'question') {
        this.getmyTestBasket()
      }
    },

    
    grade(val) {
      this.resetPage()
    },
    chapterIds(val) {
      this.resetPage()
    },
    knowledgeIds(val) {
      this.resetPage()
    },
  },
  activated() {
    
    this.getTableData()

  },
  mounted() {
    this.getquestionType()
    this.getFolderNameList()

    this.getregion()
    this.getyearList()
    this.gettypeList()
    this.getTableData()

  },
  methods: {

    resourcePreview(resourceId) {
      this.$router.push({path: '/teacher/resourceRreview', query: {id:resourceId}})
    },

    close_similarity() {
      this.similarityVisible = false
      this.getTableData()
    },
    close_favorite() {
      this.favoriteVisible = false
      this.getTableData()
    },
    getSimilarity(id) {
      this.similarityId = id
      this.similarityVisible = true
    },

    addCollectFolder(id) {
      this.collectId = id
      this.favoriteVisible = true
    },
    // 分页
    handleSizeChange(val) {
      this.search.size = val
      // console.log(`每页 ${val} 条`);
      this.resetPage()
      
    },
    // 分页
    handleCurrentChange(val) {
      this.search.page = val
      // console.log(`当前页: ${val}`);
      this.getTableData()
      // this.$emit('backToTop')
    },
    gettestBasket(num) {
      this.testBasket = num
    },

    previewPaper(row) {
      this.$router.push({path: `/questions/actualPaper/actualPreview`,query: row})
    },
    chooseFolder(list) {
      this.folderNameList.forEach(item=>{
        item.check = false
      })

      list.check = true


      // let checkedFolder = this.folderNameList.filter(item=>{
      //   return item.check
      // })
      this.folderId = list.folderId
      this.resetPage()
    },
    getquestionType() {
      this.typeList = []
      getquestionType(this.getuserInfo.subjectCode)
      .then((data)=>{
        if (data.status == "200") {
            

            this.typeList = data.data
            // this.search.type = this.typeList[0].key;
            this.resetPage()
        } 
      })
    },
    getFolderNameList() {
      this.$http.get(`/api/open/collectFolder/getFolderNameList`)
      .then((data)=>{
        data.data.forEach(item=>{
          item.check = false
        })
        this.folderNameList = data.data

        if(this.folderNameList.length) {
          this.folderNameList[0].check = true
          this.folderId = this.folderNameList[0].folderId
        }

   
        
      })
    },
    addFolderDialog() {
      this.newfolderName = ''
      this.dialogTitle = '新建收藏夹'
      this.editfolderId = ''
      this.dialogVisible = true
    },

    editFolderDialog(list) {
      this.newfolderName = list.folderName
      this.dialogTitle = '编辑收藏夹'
      this.editfolderId = list.folderId
      this.dialogVisible = true
    },
    addFolder() {
      if(this.editfolderId) {
        this.$http.put(`/api/open/collectFolder/updateFolder`,{
          folderId: this.editfolderId,
          folderName: this.newfolderName
        })
        .then((data)=>{
          if(data.status == '200') {
            
            this.dialogVisible = false
            this.$message.success('新建成功')
            this.getFolderNameList()  
          }
        })
      }else {

        this.$http.post(`/api/open/collectFolder/addFolder`,{
          folderName: this.newfolderName
        })

        .then((data)=>{
          if(data.status == '200') {
            
            this.dialogVisible = false
            this.$message.success('编辑成功')
            this.getFolderNameList()  
          }
        })
      }

    },

    deleteFolder(folderId) {
        this.$confirm('删除收藏夹后该收藏夹下的收藏记录也将删除，确定删除吗', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {

          this.$http.delete(`/api/open/collectFolder/${folderId}`)
          .then((data)=>{
            if(data.status == '200') {
              this.getFolderNameList()

              this.$message({
                type: 'success',
                message: '删除成功!'
              });
            }
          })

        }).catch(() => {
         
        });
    },

    resetPage() {
      this.search.page = 1
      this.getTableData()
    },
    getTableData: debounce(function() {

      if(!this.chapterIds.length && !this.knowledgeIds.length) {
          this.tableData = []
          this.total = 0
          return 
      }
      //题库
      if(this.resourceType == 'question') {


        let params = {
          // grade: this.grade,
          folderId: this.folderId,
          questionType: this.search.questionType,
          difficultyType: this.search.difficultyType,
          startTime: this.search.time?this.search.time[0]:'',
          endTime: this.search.time?this.search.time[1]:'',
          page: this.search.page - 1,
          size: this.search.size
        }
        this.$http.post(`/api/open/collectFolder/getFolderQuestionList`,{
          chapterIds: this.chapterIds,
          knowledgeIds: this.knowledgeIds
        },params)  
        .then((data)=>{
          if(data.status == '200') {
            this.tableData = data.data.content
            this.total = data.data.totalElements
          }
        })



      }else if(this.resourceType == 'actualpaper') {


        let params = {
          name:this.search.paperName,
          grade: this.search.grade,
          testPaperType: this.search.testPaperType,
          year:this.search.year == '全部'?'':this.search.year,
          regionId: this.search.regionId,
          startTime: this.search.time?this.search.time[0]:'',
          endTime: this.search.time?this.search.time[1]:'',
          page: this.search.page - 1,
          size: this.search.size 

        }
        this.$http.get(`/api/open/collect/paperList`,params)  
        .then((data)=>{
          if(data.status == '200') {
            this.tableData = data.data.content
            this.total = data.data.totalElements
          }
        })


      }else {
        //资源
        let params = {
          name: this.search.fileName,
          fileType: this.search.fileType,
          resourceType: this.resourceType=='0'?'':this.resourceType,
          grade: this.grade,
          // oeseType: this.search.fileType,
          startTime: this.search.time[0],
          endTime: this.search.time[1],
          page: this.search.page - 1,
          size: this.search.size
        }
        this.$http.post(`/api/open/collect/list`,{
          chapterIds: this.chapterIds,
          knowledgeIds: this.knowledgeIds
        },params)  
        .then((data)=>{
          if(data.status == '200') {
            this.tableData = data.data.content
            this.total = data.data.totalElements
          }
        })
      }
    }),
    getmyTestBasket(callback) {
      this.$nextTick(()=>{
        this.$refs.basketTag.getmyTestBasket(callback)
      })

      


    },
    deleteFile(resourceId) {
      this.$confirm('确定删除该收藏记录吗', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {

        this.$http.delete(`/api/open/collect/resource/${resourceId}`)
        .then((data)=>{
          if(data.status == '200') {
            this.getTableData()

            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          }
        })

      }).catch(() => {
       
      });
    },
    addAllQuestion() {
      let ids = []

      this.tableData.forEach(item=>{
        ids.push(item.questionId)
      })

      this.$http.post(`/api/open/paper/addTestBasket/batchAdd`,{
        questionIds:ids.join()
      })
      .then((data)=>{
        if(data.status == '200') {

          this.getTableData()
          this.getmyTestBasket()

          this.$message({
            message:'加入试卷成功',
            type:'success'
          }) 
        }
 
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
    },

    getregion() {
      this.$http.get(`/api/open/common/region`)
      .then(data=>{
        if(data.status == '200') {
          let list = []

          list.push({key:'',value:'全部'})
          data.data.forEach(item=>{
            list.push(item)
          })
          this.regionList = list
        }
      })
    },



    getyearList() {
      this.$http.get(`/api/open/common/yearList`)
      .then(data=>{

        if(data.status == '200') {
          let list = []

          list.push('全部')
          data.data.forEach(item=>{
            list.push(item)
          })
          this.yearList = list
        }
      })
    },


    gettypeList() {
      this.$http.get(`/api/open/common/testPaperType`)
      .then(data=>{
        if(data.status == '200') {
          let list = []

          list.push({key:'',value:'全部'})
          data.data.forEach(item=>{
            list.push(item)
          })
          this.testPaperTypeList = list
        }
      })
      
    },

    cancelCollect(paperId) {
      this.$http.delete(`/api/open/collect/paper/${paperId}`)
      .then((data)=>{
        if(data.status == '200') {
          this.$message.success('取消收藏成功')
          this.getTableData()
        }
      })
    },
  }
};
</script>
<style lang="less">
.collection {
  .actual-content {
    .el-form--inline .el-form-item {
      display: flex;
      align-items:center;
    }

    .el-form--inline .el-form-item__label {
      flex-shrink: 0;
    }

    .el-table th, {
      background-color: #9cb9ff; 
      color: #ffffff;
      // text-align: center;
    }
    .el-table tr {
      background-color: #f0f3fa;
      
    }
    .el-table__empty-block {
      background-color: #f0f3fa;
    }
    .el-table td, .el-table th.is-leaf {
      border-bottom: 1px solid #e2e2e2;
    }
  }

  .el-dialog__footer {
    text-align: center;
  }
  .actual-wrap {
    .el-radio-button__orig-radio:disabled:checked+.el-radio-button__inner {
      background-color: #a5a7a9;
      border-color: #a5a7a9;
      box-shadow: -1px 0 0 0 #a5a7a9;
    }


  }
}

.newfavorite {
  .el-input__inner {
    background-color: #ffffff;
  }
}
</style>
<style scoped lang="less">
.collection {

  

    &-wrap {

      margin-bottom: 30px;

      .question-wrap {
        // border: 1px solid #e2e2e2;
        // background-color: #f6faff;
        // padding: 10px;

        &-top {
          font-size: 13px;
          border: 1px solid #e2e2e2;

          .top1 {
            line-height: 40px;
            background-color: #ffffff;
            border-bottom: 1px solid #e2e2e2;
            padding: 0 20px;
            display: flex;
            justify-content: space-between;
          }

          
          .top2 {
            height: 32px;
            line-height: 32px;
            display: flex;
            padding: 0 20px;
            justify-content: space-between;

            .default {
              cursor: pointer;

              &:hover {
                color: #409EFF;
              }
            }

            .activeclass {
              color: #409EFF;
            }
          }
        }

        &-bottom {
          //border: 1px solid #e2e2e2;
          background-color: #f6faff;
          margin-top: 20px;
          border: 1px solid #e2e2e2;
          padding: 10px 20px 20px 20px;
        }      
      }


      .actual-wrap {

        .actual-content {
          margin-top: 10px;
          border:1px solid #e2e2e2;
        }
      }

      .paper-wrap {


        .singal-paper {
          border: 1px solid #e2e2e2;
          margin-top: 10px;
          //background-color: #f6faff;
          padding:20px;
          border-radius: 4px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          line-height: 2.5;
          transition:0.3s;
          &:hover {
            box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
          }
          
          &-left {

            width: 70%;
            min-width: 0px;

            .left-title {
              padding-right: 20px;
              font-size: 1.2rem;
              font-weight: 600;
              color: #333333;
              cursor: pointer;
              display: flex;
              align-items: center;
              justify-content: space-between;

              .text {
                margin-left: 3px;
              }

              .type-class {
                //width: 60px;
                height: 32px;
                line-height: 32px;
                padding: 0px 20px;
                background-color: #00cc00;
                text-align: center;
                color: #ffffff;
                font-size: 0.9rem;
                border-radius: 4px;
                flex-shrink: 0;
              }

              
            }

            .left-tag {
              margin-left: 30px;
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

          }

          &-middle {
            width: 30%;
            border-left: 1px solid #e2e2e2;
            text-align: center;
          }


          &-right {
            width: 80px;
            flex-shrink: 0;
            text-align: center;
          }

        }
      }


    }
  
}

  .newfavorite {
    margin-top: 20px;
    text-align: center;
  }
</style>