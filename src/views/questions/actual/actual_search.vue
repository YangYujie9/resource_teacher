<template>
	<div>
    <div class="search-div el-radio-costom">
      <ul>
        <li>
          <p>年级</p>
          <div class="div2">
            <el-radio-group v-model="search.grade" size="mini" @change="getTruePaperList">
              <el-radio-button :label="list.key" :key="list.key" v-for="list in gradeList1">{{list.value}}</el-radio-button>
            </el-radio-group>
          </div>
        </li>
        <li>
          <p>年份</p>
          <div class="div2">
            <el-radio-group v-model="search.year" size="mini" @change="getTruePaperList">
              <el-radio-button :label="list" :key="list" v-for="list in yearList1"></el-radio-button>
            </el-radio-group>
          </div>
        </li>
        <li>
          <p>类型</p>
          <div class="div2">
            <el-radio-group v-model="search.type" size="mini" @change="getTruePaperList">
              <el-radio-button :label="list.key" :key="list.key" v-for="list in testPaperTypeList1">{{list.value}}</el-radio-button>
            </el-radio-group>
          </div>
        </li>
        <li>
          <p>地区</p>
          <div class="div2">
             <el-select v-model="search.region" placeholder="请选择" size="mini" clearable @change="getTruePaperList">
              <el-option
                v-for="item in regionList"
                :key="item"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
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
                <span>{{scope.row.testPaperTypeName}}</span>
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
          width="120">
          <template slot-scope="scope">
            <el-button type="text" size="small" v-if="isComplete=='false'" @click="continueUpload(scope.row)">继续上传</el-button>
            <el-button type="text" size="small" v-if="isComplete=='true'" @click="previewPaper(scope.row)">预览</el-button>
            <el-button type="text" size="small" v-if="isComplete=='true'">收藏</el-button>
            <el-button type="text" size="small" v-if="isComplete=='true'">下载</el-button>
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
import { getquestionType } from '@/utils/basic.service.js';


export default {
  props: ['regionList','gradeList','yearList','testPaperTypeList'],
  data() {
    return {
      questionTypeList:[],
      paperList:[],
      tableData:[],
      search: {
        type: '',
        grade: "",
        year: "全部",
        region:'',
        page: 1,
        size: 20,
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
    isComplete() {

      return this.$route.params.isComplete



    },

    gradeList1() {
      let arr1 = []
      arr1.push({key:'',value:'全部'})
      this.gradeList.forEach(item=>{
        arr1.push(item)
      })
      return arr1    
    },


    yearList1() {
      let arr2 = []
      arr2.push('全部')
      this.yearList.forEach(item=>{
        arr2.push(item)
      })
      return arr2
    },

    testPaperTypeList1() {
      let arr3 = []
      arr3.push({key:'',value:'全部'})
      this.testPaperTypeList.forEach(item=>{
        arr3.push(item)
      })
      return arr3
    }
  },


  watch: {
    isComplete(val) {
      this.getTruePaperList()
      this.search.type = ''
      this.search.grade = ''
      this.search.year = "全部"
      this.search.region = ''
      this.search.page = 1
      this.search.size = 20
    },






  },


  mounted() {

    this.getTruePaperList()
  },
  methods: {

    init() {

    },
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


    getTruePaperList() {

      let params = {
        // name
        grade: this.search.grade,
        testPaperType: this.search.type,
        year:this.search.year == '全部'?'':this.search.year,
        region: this.search.region,
        page: this.search.page - 1,
        size: this.search.size
      }
      this.$http.get(`/api/open/paper/getTruePaperList/${this.$route.params.isComplete}`,params)
      .then(data=>{
        if(data.status == '200') {
          this.tableData = data.data.content
          this.total = data.data.totalElements
        }
      })
    },


    previewPaper(row) {
      this.$router.push({path: `/questions/actualPreview`,query: row})
    },

    continueUpload(row) {
      this.$router.push(`/questions/actualPaper/maintain/${row.paperId}`)
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
  .el-table__empty-block {
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