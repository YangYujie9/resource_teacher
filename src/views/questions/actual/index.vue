<template>
  <div class="actual-paper">
    <left-fixed-nav :isfixTab="isfixTab">
      <div slot="left" class="el-radio-costom left">
        <el-radio-group v-model="activePage" size="small" @change="changeType">
          <el-radio-button :label="list.label" :key="list.route" v-for="list in typeList"></el-radio-button>

        </el-radio-group>
      </div>

      <div slot="right">
        <div class="bread-div">
          <div>
            <i class="iconfont iconshouye iconclass"></i>当前位置：真题试卷 > {{activePage}}
          </div>
        </div>
        <router-view :regionList="regionList" :yearList="yearList" :testPaperTypeList="testPaperTypeList"></router-view>
<!--         <router-view v-if="!$route.meta.keepAlive" :regionList="regionList" :yearList="yearList" :testPaperTypeList="testPaperTypeList"></router-view>
        <keep-alive>
          <router-view v-if="$route.meta.keepAlive" :regionList="regionList" :yearList="yearList" :testPaperTypeList="testPaperTypeList"></router-view>
        </keep-alive> -->
        <!-- <div  v-show="activePage=='真题查询'">

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
      activePage: '',
      isTemplate: false,
      typeList: [{
        label:'真题查询',
        route:'/questions/actualPaper/search/true'
      },{
        label:'真题维护',
        route:'/questions/actualPaper/maintain'
      },{
        label:'未完成',
        route:'/questions/actualPaper/search/false'
      }],
      regionList:[],
      yearList:[],
      testPaperTypeList:[],




    };
  },
  computed: {

    ...mapGetters([
      'getuserInfo',
      'difficultyList',
      'subjectList',
      'gradeList'

    ]),
  },


  watch: {


    $route(val) {
      this.typeList.forEach(item=>{
        if(this.$route.fullPath.indexOf(item.route)>-1) {
          this.activePage = item.label
        }
      })
    }
  },

  created() {
    this.getregion()
    this.getyearList()
    this.gettypeList()
  },
  mounted() {
    console.log(this.$route)
    this.typeList.forEach(item=>{
      if(this.$route.fullPath.indexOf(item.route)>-1) {
        this.activePage = item.label
      }
    })
    // this.getuserInfo.school?this.getgradeList():null
    // this.getregion()
    // this.getyearList()
    // this.gettypeList()
  },
  methods: {
    changeType() {
      // if(this.activePage == '真题查询') {
      //   this.$router.push(`/questions/actualPaper/search/${true}`)
      // }else if(this.activePage == '未完成') {
      //   this.$router.push(`/questions/actualPaper/search/${false}`)
      // }else {
      //   this.$router.push(`/questions/actualPaper/maintain`)
      // }
      let checked = this.typeList.filter(item=>{
        return item.label == this.activePage
      })

      this.$router.push(checked[0].route)
    },

    getregion() {
      this.$http.get(`/api/open/common/region`)
      .then(data=>{
        if(data.status == '200') {
          this.regionList = data.data
        }
      })
    },



    getyearList() {
      this.$http.get(`/api/open/common/yearList`)
      .then(data=>{
        if(data.status == '200') {
          this.yearList = data.data
        }
      })
    },


    gettypeList() {
      this.$http.get(`/api/open/common/testPaperType`)
      .then(data=>{
        if(data.status == '200') {
          this.testPaperTypeList = data.data
        }
      })
      
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
      // border:1px solid #e2e2e2 !important;
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