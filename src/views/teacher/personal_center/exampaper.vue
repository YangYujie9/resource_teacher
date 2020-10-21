<template>
  <div class="exampaper">


    <div class="exampaper-wrap">


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
              <el-form-item label="试卷名">
                <el-input v-model="search.keyword" class="search-class" placeholder="请输入试卷名" size="mini" clearable @change="resetPage" prefix-icon="el-icon-search"></el-input>
              </el-form-item>
          </el-form>

      </div>

      <!-- <div style="margin-top:10px;">
        <span style="margin-right: 10px;">关键字</span>
        <el-input v-model="search.keyword" placeholder="请输入内容" style="width:200px;" size="mini"></el-input>
      </div> -->

      <div class="top-total" style="">
        <p class="top-p">共有<span class="activecolor">{{total}}</span>个资源符合结果</p>
      </div>
      <div class="wrap-content-right-wrap">
        <div class="singal-paper" v-for="list in tableData">
          <div>
            <p class="p1">{{list.name}}</p>
            <p class="p2"><span>组卷日期：{{list.createTime}}</span><span style="margin-left:20px;">下载日期：{{list.downloadedTime?list.downloadedTime:'未下载'}}</span></p>
          </div>
          <div style="min-width: 90px;flex-shrink: 0;">
            <el-button type="text" @click="browsePaper(list.paperId)">浏览</el-button>
            <el-button type="text" @click="downloadPaper(list.paperFileId)">下载</el-button>
            <el-button type="text" @click="editPaper(list.paperId)">编辑</el-button>
            <el-button type="text" @click="deletePaper(list.paperId)">删除</el-button>
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
    </div>


    <el-dialog 
      title="试卷预览" 
      :visible.sync="dialogVisible" 
      :close-on-click-modal='false'
      width="860px">
      <div class="preview-wrap">
        <div class="active-wrap">
 
          <span class="ansbtn cursor btn-class" v-show="!isAnswer" @click="isAnswer=true">
            <i class="iconfont iconxianshi" style="position: relative;top:1px"></i> 
            显示答案
          </span>
          <span class="ansbtn cursor btn-class" v-show="isAnswer" @click="isAnswer=false">
            <i class="iconfont iconyincang"></i> 
            隐藏答案
          </span>
        </div>
        <div class="myexampaper-wrap">
          <paperPreview :isAnswer="isAnswer" :paperId="paperId" knowledgeType="knowledge"></paperPreview>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="" size="mini">确 定</el-button>
        <el-button @click="dialogVisible = false" size="mini">取 消</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import Cookies from 'js-cookie'
import paperPreview from '@/components/Question/paperPreview'
import { debounce } from '@/utils/public.js'
export default {
  components: {
    paperPreview
  },
  props:{
    chapterIds: Array,
    knowledgeIds: Array,
    resourceType:String,
    fileTypeList:Array,
  },
  data() {
    return {
      search: {
        time: "",
        keyword:'',
        page:1,
        size:20
      },
      total:0,
      tableData:[],
      dialogVisible:false,
      questionList:[],
      isAnswer: false,
      paperName:'',
      paperId:'',


    };
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
    this.getTableData()
  },
  methods: {
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
    resetPage() {
      this.search.page = 1
      this.getTableData()
    },


    getTableData: debounce(function() {


      let params = {
        name: this.search.keyword,
        grade: this.grade,
        startTime:this.search.time? this.search.time[0]:'',
        endTime: this.search.time?this.search.time[1]:'',
        page: this.search.page - 1,
        size: this.search.size


      }




      this.$http.post(`/api/open/paper/getPaperList`, {
          chapterIds: this.chapterIds,
          knowledgeIds: this.knowledgeIds
        },
          params
      )

      .then((data)=>{
        if(data.status == '200') {
          this.tableData = data.data.content
          this.total = data.data.totalElements
        }
      })
    }),

    browsePaper(paperId) {

      this.paperId = paperId
      console.log(this.paperId)
      this.dialogVisible = true

    },



    downloadPaper(paperFileId) {
      this.$http.get(`/api/open/common/${paperFileId}/download`)
        .then((data)=>{
          if(data.status == '200') {
            window.open(data.data)
          }
        })

    },
    editPaper(paperId) {

      // this.$store.commit('setpaperId',paperId)

      // Cookies.set("paperId", paperId)

      this.$router.push({path: '/questions/examinationPaper', query: {paperId: paperId}})
    },
    deletePaper(paperId) {
        this.$confirm('此操作将永久删除该组卷吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.delete(`/api/open/paper/${paperId}`)
          .then((data)=>{
            if(data.status == '200') {
              this.getTableData()

              this.$message({
                message:'删除成功',
                type:'success'
              })
            }
          })
        }).catch(() => {
         
        });



    },
  }
};
</script>
<style lang="less">
.exampaper {
  .el-radio-button__inner {
    border: 0px;
    background-color: #f6faff;
    border-radius: 3px;
    font-size: 14px;
    color: #666;
  }
  .el-input__inner {
    background: transparent;
  }
  .el-range-editor .el-range-input {
    background: transparent;
  }
  .el-radio-button:first-child .el-radio-button__inner {
    border-left: 0px;
    border-radius: 3px;
  }
  .el-radio-button:last-child .el-radio-button__inner {
    border-radius: 3px;
  }

  .el-card {
    background-color: #f0f3fa;
    border-color: #e7eaf1;
  }
  .el-card__body {
    padding: 0px;
  }

  .el-tabs__header {
    margin: 0 0 5px;
  }

  .wrap-content {
    .el-button {
      font-size: 13px;
    }
  }

  .el-date-editor .el-range-separator {
    width: 8%;
  }

  .el-button+.el-button {
    margin-left: 20px;
  }
}
</style>
<style scoped lang="less">
.exampaper {



    &-wrap {
      // margin-top: 10px;
      // display: flex;
   
      margin-bottom: 30px;
      // margin-top: 10px;
      // padding:20px;


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
        
        

        .p1 {
          font-size: 1rem;
          color: #409EFF;
        }

        .p2 {
          font-size: 0.8rem;
          color: #828282;
        }
      }
        
      
    
  }

  .preview-wrap {

    

    .active-wrap {
      position: relative;
      height: 24px;


      .btn-class {
        position: absolute;
        right: 20px;
      }
    }

    .myexampaper-wrap {
      padding: 0 20px;
      height: calc(50vh);
      overflow-y: auto;
    }
  }
}
</style>