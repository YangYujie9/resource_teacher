<template>
  <div class="collection">

    <div class="collection-wrap">

        <div class="question-wrap"> 

          <div class="top-search">
            <el-form :inline="true" :model="search" class="demo-form-inline " >
                <el-form-item label="题型">
                  <el-select v-model="search.questionType" class="search-class" size="mini" clearable @change="resetPage">
                    <el-option :label="list.value" :value="list.key" :key="list.key" v-for="list in typeList"></el-option>
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
               <el-form-item label="题目名称">
                  <el-input v-model="search.keyword" class="search-class" placeholder="题目名称" size="mini" clearable @change="resetPage" prefix-icon="el-icon-search"></el-input>
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
            <questionList :isAnswer="isAnswer" :tableData="tableData" @getData="getTableData" @getmyTestBasket="getmyTestBasket" @getSimilarity="getSimilarity" @addCollectFolder="addCollectFolder" :testBasket="testBasket"></questionList>
          </div>

          <basketTag ref="basketTag" @gettestBasket="gettestBasket"></basketTag>
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



    <!-- <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      width="600px"
      custom-class="newfavorite">
      <div class="newfavorite">
        <span>名称：</span><el-input v-model="newfolderName" style="width:380px;" size="small"></el-input>

        
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addFolder" size="small">添 加</el-button>
        <el-button @click="dialogVisible = false" size="small">取 消</el-button>
      </span>
    </el-dialog> -->

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
        keyword:'',
        page:1,
        size:20,
      },
      dialogVisible: false,
      dialogTitle: '新建收藏夹',
      newfolderName:'',
      folderNameList:[],
      editfolderId:'',
      tableData:[],
      fileTypeList:[],
      typeList:[],
      total: 0,
      similarityVisible: false,
      favoriteVisible: false,
      similarityId:'',
      collectId:'',
      isAnswer:false,
      testBasket:0,
    };
  },
  computed: {
    ...mapGetters([
      'gradeList',
      'getuserInfo',
      'partDifficultyList'
    ]),
  },
  watch: {
    
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
  mounted() {
    this.getquestionType()
    this.getFolderNameList()
    this.getmyTestBasket()

  },
  methods: {

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


    chooseFolder(list) {
      this.folderNameList.forEach(item=>{
        item.check = false
      })

      list.check = true
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

  
      })
    },




    resetPage() {
      this.search.page = 1
      this.getTableData()
    },
    getTableData:debounce(function() {
      //题库

      let params = {
        method:0,
        questionType: this.search.questionType,
        difficultyType: this.search.difficultyType,
        name: this.search.keyword,
        grade: this.grade,
        subjectCode: this.getuserInfo.subjectCode,
        startTime: this.search.time?this.search.time[0]:'',
        endTime: this.search.time?this.search.time[1]:'',
        page: this.search.page - 1,
        size: this.search.size,

      }

        this.$http.post(`/api/open/question/0/questions`,{
          chapterIds: this.chapterIds,
          knowledgeIds: this.knowledgeIds
        },params)  
        .then((data)=>{
          if(data.status == '200') {
            this.tableData = data.data.content
            this.total = data.data.totalElements
          }
        })



      
    }),
    getmyTestBasket() {
      this.$nextTick(()=>{
        this.$refs.basketTag.getmyTestBasket()
      })

      


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
  }
};
</script>
<style lang="less">
.collection {




  .el-dialog__footer {
    text-align: center;
  }
  .question-wrap {
    .el-radio-group {
      width: 100%;
    }
    .el-radio-button {
      width: 100%;
    }
    .el-radio-button__inner {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }

    .el-radio-button__orig-radio:checked+.el-radio-button__inner {
      background-color:transparent;
      border-color: transparent;
      color: #409EFF;
      box-shadow: 0px 0 0 0 #409EFF;
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