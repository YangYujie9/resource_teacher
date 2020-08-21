<template>
	<div>
    <div class="search-div el-radio-costom">
      <ul>
        <li>
          <p>题型</p>
          <div class="div2">
            <el-radio-group v-model="search.type" size="mini">
              <el-radio-button :label="item.label" v-for="item in list"></el-radio-button>
            </el-radio-group>
          </div>
        </li>
         <li>
          <p>难度</p>
          <div class="div2">
            <el-radio-group v-model="search.difficulty" size="mini">
              <el-radio-button :label="item.label" v-for="item in list"></el-radio-button>
            </el-radio-group>
          </div>
        </li>


      </ul>
    </div>
    
    <div class="paper-content-wrap">
      <el-table
        :data="tableData">
        <el-table-column
          prop="title"
          label="试卷标题">
          <template slot-scope="scope">
            <div>
              <p>{{scope.row.name}}</p>
              <p style="color: #bcbec2;">
                <span>{{scope.row.gradeName}}</span>
                <el-divider direction="vertical"></el-divider>
                <span>{{scope.row.type}}</span>
                <el-divider direction="vertical"></el-divider>
                <span>{{scope.row.region}}</span>
                <el-divider direction="vertical"></el-divider>
                <span>{{scope.row.year}}</span>
              </p>
            </div>
          </template>
        </el-table-column>
        <el-table-column
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
        </el-table-column>
        <el-table-column
          prop="lastTime"
          label="更新日期"
          align="center"
          width="100">
        </el-table-column>
        <el-table-column
          prop="address"
          label="操作"
          align="center"
          width="100">
          <template slot-scope="scope">
            <el-button type="text" size="small" v-if="!isComplete" @click="continueUpload">继续上传</el-button>
            <el-button type="text" size="small" v-if="isComplete">收藏</el-button>
            <el-button type="text" size="small" v-if="isComplete">下载</el-button>
          </template>
        </el-table-column>
      </el-table>

    </div>
    <div class="pagination">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="search.page"
        :page-sizes="[20, 40, 60, 100]"
        :page-size="search.size"
        layout="total, prev, pager, next, sizes"
        :total="total"
      ></el-pagination>
    </div>

	</div>

</template>


<script>
import { mapGetters } from 'vuex'
import leftFixedNav from "@/components/Nav/leftFixedNav";
import { getquestionType } from '@/utils/basic.service.js';


export default {
  components: {
    leftFixedNav,

  },
  props: {
  	isComplete:Boolean
  },
  data() {
    return {
      activePage: '真题查询',
      isTemplate: false,
      gradeList:[],
      questionTypeList:[],
      paperList:[],
      tableData:[],
      // tableData:[{
      //     title: "2020届合肥省衡水中学高三高考前密卷（一）数学（理）试卷",
      //     number:10,
      //     finish: 3,
      //     update: '2020-9-8',
      //     grade:'高三',
      //     type:'月考',
      //     address: '河北省',
      //     year:"2020"
      //   },{
      //     title: "2020届合肥省衡水中学高三高考前密卷（一）数学（理）试卷",
      //     number:10,
      //     finish: 3,
      //     update: '2020-9-8',
      //     grade:'高三',
      //     type:'月考',
      //     address: '河北省',
      //     year:"2020"
      //   }
      // ],
      list: [
        { label: "选择题", number: "" },
        { label: "填空题", number: "" },
        { label: "解答题", number: "" },
        { label: "判断题", number: "" }
      ],
      title: "",
      search: {
        type: '',
        difficulty: "",
        cateage: "",
        page: 1,
        size: 20,
      },
      form: {
        name:'',
        year:'',
        subject:'',
        learningSection:'',
        grade:'',
        address:'',
        questionType:[],
        type:'',
      },
      total:0,
    };
  },
  computed: {

    ...mapGetters([
      'getuserInfo',
      'difficultyList',
      'subjectList'

    ]),
  },


  watch: {

  },


  mounted() {
    // this.getgradeList()

    this.getTruePaperList()
  },
  methods: {
    // 分页
    handleSizeChange(val) {
      this.search.size = val
      // console.log(`每页 ${val} 条`);
      // this.resetPage()
    },
    // 分页
    handleCurrentChange(val) {
      this.search.page = val
      // console.log(`当前页: ${val}`);
      // this.getTableData()
    // },
    },

    getquestionType() {
      this.questionTypeList = []
      getquestionType(this.subjectCode)
      .then((data)=>{
        if (data.status == "200") {

          this.questionTypeList = data.data
          this.form.questionType.push(this.questionTypeList[0]);
          this.resetPage()
        } 
      })
    },



    getgradeList() {
      this.$http.get(`/api/open/common/gradeList/${this.getuserInfo.school.id}`)
      .then(data=>{
        if(data.status == '200') {
          this.gradeList = data.data
        }
      })
    },

    getTruePaperList() {
      this.$http.get(`/api/open/paper/getTruePaperList/${this.isComplete}`)
      .then(data=>{
        if(data.status == '200') {
          this.tableData = data.data.content
        }
      })
    },


    continueUpload(row) {
      this.$router.push(`/addquestion/submitQuestions/${row.paperId}`)
    }


  
  }
};
</script>
<style lang="less">
.actual-paper {
  .tree-wrap {
    border:0px;
    // width: 300px;
  }
  .left {
    .el-radio-button,
    .el-radio-button__inner {
      width: 100%;
      
      
    }
    .el-radio-button__inner {
      border:1px solid #e2e2e2 ;
      margin-bottom: 10px;
    }

    .el-radio-button__orig-radio:checked + .el-radio-button__inner {
      border-color:#409EFF;
    }
  }

  .el-table th, {
    background-color: #9cb9ff; 
    color: #ffffff;
    // text-align: center;
  }
  .el-table tr {
    background-color: #f0f3fa;
    
  }

  .el-table td, .el-table th.is-leaf {
    border-bottom: 1px solid #e2e2e2;
  }

  .el-input__inner {
    background-color: transparent;
  }


  .el-checkbox-group {
    display: flex;
    flex-wrap: wrap;
  }

}

</style>
<style scoped lang="less">
.actual-paper {
  .paper-content-wrap {
    margin-top: 10px;
    border:1px solid #e2e2e2;


  }

  .input-class {
    width: 300px;
  }
  .pagination {
    text-align: right;
    margin: 20px 0px;
  }

  .inputgroup {
    display: flex;
    flex-wrap: wrap;

    .label1 {
      color: #fff;
      background-color: #409eff;
      border-color: #409eff;
      box-shadow: -1px 0 0 0 #8cc5ff;
      padding: 6px 13px;
      border-radius: 4px;
      font-size: 12px;
      margin-right: 10px;
    }
  }
}

</style>