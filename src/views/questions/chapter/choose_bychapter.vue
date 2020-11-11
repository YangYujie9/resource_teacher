<template>
  <div class="chapter">
    <!-- <ul><li v-for="i in 89">{{i}}</li></ul> -->
    <!-- <el-backtop target=".home .el-scrollbar__wrap" :bottom="80"></el-backtop> -->
    <left-fixed-nav :isfixTab="isfixTab">
      <div slot="left">
        <selectPointTree ref="tree" @getPointIds="getPointIds" treeType="chapter" :isfixTab="isfixTab"></selectPointTree>
         <!--  <top-popover v-if="isReady" ref="filter" @setparams="setparams">
            <div slot="reference">
              <p class="top-title">
                <span v-if="$refs.filter">{{$refs.filter.subject.subjectName}}</span>
                <span v-if="$refs.filter">{{$refs.filter.oese.name}}</span>
                
                <i class="iconfont iconshezhi settingicon"></i>
              </p>
            </div>
            <div slot="popover">

            </div>
          </top-popover>

          <div class="tree-content">
            <div class="tree-class" :class="{treeclassfixed:isfixTab}" v-if="getuserInfo.learningSection">
              <pointTree chooseType="chapter" :volumeId="volumeId" :subjectCode="subjectCode"  @getCheckedNodes="getCheckedChapters" ref="chapterTree"></pointTree>
            </div>
          </div> -->

      </div>

      <div slot="right">
        <div class="bread-div">
          <div>

            <i class="iconfont iconshouye iconclass"></i>当前位置：章节挑题
          </div>

          <!-- <span style="padding:0 10px;">></span>同步卷 -->
          <div>
            <el-button
              type="danger"
              size="mini"
              v-show="activeName == 'question'"
              @click="$router.push('/questions/submitQuestions')"
            >上传试题</el-button>
            <!-- <el-button type="danger" size="mini" :class="{upbutton: isfixTab}">上传试题</el-button> -->
          </div>
        </div>
        <div class="tab-div">
          <test-question :chapterIds="chapterIds" :volumeId="volumeId" :subjectCode="subjectCode" @backToTop="backToTop"></test-question>
<!-- 
          <el-tabs v-model="activeName" stretch>
            <el-tab-pane label="同步题" name="question">
              <test-question :chapterList="chapterList" :gradeName="filter.grade.value" :subjectCode="filter.subjectCode" @changeTestBasket="changeTestBasket"></test-question>
            </el-tab-pane>
            <el-tab-pane label="同步卷" name="paper">
              <test-paper></test-paper>
            </el-tab-pane>
          </el-tabs> -->
        </div>


      </div>
    </left-fixed-nav>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
import leftFixedNav from "@/components/Nav/leftFixedNav";
// import topPopover from "@/components/Popover/topPopover";
import testQuestion from "./test_question";
import testPaper from "./test_paper";
import selectPointTree from "@/components/Popover/selectPointTree";
export default {
  components: {
    leftFixedNav,
    // topPopover,
    testQuestion,
    testPaper,
    selectPointTree
  },
  props: ["isfixTab"],
  data() {
    return {
      activeName: "question",
      filter: {
        version: "",
        grade: "",
        subjectId:"",
        subjectCode:'',
      },
      testBasket:0,
      form: {
        grade:'',

      },
      chapterList:[],
      visionList:[],
      volumeId:'',
      subjectCode: '',
      chapterIds:[],


    };
  },

  watch: {


  },

  computed: {
      ...mapGetters([
        'gradeList',
        'getuserInfo',
        'isReady'

      ]),
  },
  activated() {
    

  },

  mounted() {

    this.gradeList.length? this.filter.grade = this.gradeList[0]: null

    if(this.getuserInfo.userType == 'Teacher') {
      
      this.filter.subjectCode = this.getuserInfo.subjectCode
    }

    // console.log(this.filter.subjectCode)
  },
  methods: {


    getPointIds(list1,list2,subjectCode,volumeId) {

      this.chapterIds = list1

      if(this.subjectCode != subjectCode) {
        
        this.subjectCode = subjectCode

      }

      this.volumeId = volumeId
      
    },
    setparams(volumeId,subjectCode) {

      this.volumeId != volumeId?this.volumeId = volumeId:null

      this.subjectCode != subjectCode?this.subjectCode = subjectCode:null
      
    },
    getCheckedChapters(list) {

      this.chapterList = list
      

    },

    backToTop() {
      this.$emit('backToTop')
    },
  }
};
</script>
<style lang="less">
.chapter {
  .el-tabs__item {
    color: #9c9fa5;
    height: 37px;
    line-height: 38px;
    top: -2px;
  }
  .el-tabs__item.is-active {
    color: #409eff;
  }

  .el-tabs__nav-scroll {
    width: 200px;
  }
  .el-tabs__header {
    border: 1px solid #e2e2e2;
    background-color: #f2f5fc;
  }

  .el-badge__content {
    background-color: #ff7f21;
  }
  .el-badge__content.is-fixed {
    right: 18px;
    top: -4px;
  }
}
</style>
<style scoped lang="less">
.chapter {



  .tab-div {
    //height: 38px;
    line-height: 38px;
    //border: 1px solid #e2e2e2;
    //padding: 0 20px;
  }


}
</style>