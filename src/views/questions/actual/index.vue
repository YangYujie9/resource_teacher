<template>
  <div class="actual-paper">
    <left-fixed-nav :isfixTab="isfixTab">
      <div slot="left" class="el-radio-costom left">
        <el-radio-group v-model="activePage" size="small">
          <el-radio-button label="真题查询"></el-radio-button>
          <el-radio-button label="真题维护" ></el-radio-button>
          <el-radio-button label="未完成"></el-radio-button>
        </el-radio-group>
      </div>

      <div slot="right">
        <div class="bread-div">
          <div>
            <i class="iconfont iconshouye iconclass"></i>当前位置：真题试卷 > {{activePage}}
          </div>
        </div>

<!--         <div  v-show="activePage=='真题查询'">

          <actualSearch :isComplete="true"></actualSearch>
        </div>


        <div  v-show="activePage=='未完成'">

          <actualSearch :isComplete="false"></actualSearch>
        </div>
        <div v-show="activePage=='真题维护'">
          <actualMaintain></actualMaintain>
        </div> -->
      </div>
    </left-fixed-nav>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import leftFixedNav from "@/components/Nav/leftFixedNav";
import actualSearch from './actual_search'
import actualMaintain from './actual_maintain'
import { getquestionType } from '@/utils/basic.service.js';


export default {
  components: {
    leftFixedNav,
    actualSearch,
    actualMaintain

  },
  props: ["isfixTab"],
  data() {
    return {
      activePage: '真题查询',
      isTemplate: false,




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
    this.getgradeList()
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

    getregion() {
      this.$http.get(`/api/open/common/gradeList/${this.getuserInfo.school.id}`)
      .then(data=>{
        if(data.status == '200') {
          this.gradeList = data.data
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

    addTemplate() {

      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          this.isTemplate = true
        } else {
          
          return false;
        }
      });
    },


  
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