<template>
  <div class="tearch-home">
<!--     <left-fixed-nav :isfixTab="isfixTab">
      <div slot="left">
        
          <top-popover>
            <div slot="reference">
              <p class="top-title">
                <span>人教版：</span>
                <span>{{form.grade.value}}</span>
                <i class="iconfont iconshezhi settingicon"></i>
              </p>
            </div>
            <div slot="popover">
              <div>
                <p>年级：</p>
                 <el-radio-group v-model="form.grade" size="mini">
                    <el-radio-button :label="item" :key="item.key" v-for="item in gradeList">{{item.value}}</el-radio-button>
                </el-radio-group>
              </div>
            </div>
          </top-popover>
          <div class="tab-class">
            <el-tabs stretch v-model="activeType" @tab-click="handleClick">
              <el-tab-pane label="按章节" name="chapter">
                <div class="tree-class" :class="{treeclassfixed:isfixTab}">
                  <pointTree chooseType="chapter" :grade="form.grade.key" :subjectName="subjectName"  @getCheckedNodes="getCheckedChapters" ref="chapterTree"></pointTree>
                </div>
              </el-tab-pane>
              <el-tab-pane label="按考点" name="detial">
                <div class="tree-class">
                  <pointTree chooseType="knowledge" :grade="form.grade.key" :subjectName="subjectName"  @getCheckedNodes="getCheckedKnows" ref="knowledgeTree"></pointTree>
                </div>
              </el-tab-pane>
            </el-tabs>
          </div>
      </div>

      <div slot="right">
        <div class="content-class">









        </div>
      </div>
    </left-fixed-nav> -->

    <div class="home-content">
      <el-button type="danger" @click="uploadResource" size="small">上传我的资源</el-button>
    </div>


  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import leftFixedNav from "@/components/Nav/leftFixedNav";
import topPopover from "@/components/Popover/topPopover";
export default {
  props: ["isfixTab"],
  components: {
    leftFixedNav,
    topPopover,
  },

  data() {
    return {
      activeType:"chapter",
      form: {
        grade: "",
      },
      //subjectName:'',


    };
  },

  watch: {
    gradeList(val) {

      if(val.length) {
        this.form.grade = val[0]
      }
      

    },


  },
  computed: {

    ...mapGetters([
      'gradeList',
      'getuserInfo',

    ]),

    subjectName() {
      return this.getuserInfo.subject.name
    }

  },

  mounted() {




    
    
  },
  methods: {

  	handleClick(tab, event) {

    },

    getCheckedChapters(list) {



    },

    getCheckedKnows(list) {

    },

    uploadResource() {
      this.$router.push('/teacher/uploadResource')
    },


  }
};
</script>
<style lang="less">
// 
</style>
<style lang="less" scoped>
.tearch-home {
  .home-content {
    height: 400px;
    text-align: center;

  }
}
</style>