<template>
  <div class="Intelligent">
    <left-fixed-nav :isfixTab="isfixTab">
      <div slot="left">
            <top-popover>
              <div slot="reference">
                <p class="top-title">
                  <span>人教版：</span>
                  <span v-if="filter.grade">{{filter.grade.value}}</span>
                  <i class="iconfont iconshezhi settingicon"></i>
                </p>
              </div>
              <div slot="popover">
                <div>
                  <!-- <p>版本：</p>
                  <el-radio-group v-model="filter.version" size="mini">
                    <el-radio-button :label="item" v-for="item in visionList"></el-radio-button>
                  </el-radio-group> -->

                  <p>年级：</p>
                  <el-radio-group v-model="filter.grade" size="mini">
                    <el-radio-button :label="item" :key="item.key" v-for="item in gradeList">{{item.value}}</el-radio-button>
                  </el-radio-group>
                </div>
              </div>
            </top-popover>


          <div class="tab-class">
            <el-tabs stretch v-model="activeType" @tab-click="handleClick">
              <el-tab-pane label="按章节" name="chapter">
                <div class="tree-class" :class="{treeclassfixed:isfixTab}">
                  <pointTree chooseType="chapter" :grade="filter.grade.key" :subjectCode="getuserInfo.subjectCode"  @getCheckedNodes="getCheckedChapters" ref="chapterTree"></pointTree>
                </div>
              </el-tab-pane>
              <el-tab-pane label="按考点" name="detial">
                <div class="tree-class">
                  <pointTree chooseType="knowledge" :grade="filter.grade.key" :subjectCode="getuserInfo.subjectCode"  @getCheckedNodes="getCheckedKnows" ref="knowledgeTree"></pointTree>
                </div>
              </el-tab-pane>
            </el-tabs>
          </div>
        <!-- </div> -->
      </div>

      <div slot="right">
        <div class="bread-div">
          <div>
            <i class="iconfont iconshouye iconclass"></i>当前位置：智能挑题 > 按章节
          </div>
        </div>

        <div class="top-wrap">
          <p>选择考核范围</p>
          <div class="tag-wrap">
            <el-tag
              v-for="(tag,index) in tagsList" 
              :key="tag.id"
              size="small"
              closable
              effect="dark"
              @close="closeTag(index)"
            >{{ tag.name }}</el-tag>
          </div>
        </div>

        <div class="set-wrap">
          <ul>
            <li>
              <p class="title1">题目设置</p>
              <p class="title2">请选择题型</p>
              <div class="btngroup">
                <el-checkbox-group v-model="search.type" size="mini">
                  <el-checkbox-button
                    v-for="item in typeList"
                    :label="item"
                    :key="item.label"
                  >{{item.label}}</el-checkbox-button>
                </el-checkbox-group>
              </div>
              <p class="title2">题量设置</p>
              <div class="inputgroup title2">
                <p v-for="type in search.type" style="margin-right:20px;margin-bottom:10px;">
                  <label class="label1">{{type.label}}</label>
                  <el-input
                    v-model="type.number"
                    placeholder="请输入题量"
                    size="mini"
                    style="width:122px;"
                  ></el-input>
                </p>
              </div>
            </li>

            <li>
              <p class="title1">难度设置</p>
              <div class="btngroup">
                <el-radio-group v-model="search.difficulty" size="mini">
                  <el-radio-button v-for="item in partDifficultyList" :label="item" :key="item">{{item}}</el-radio-button>
                </el-radio-group>
              </div>
            </li>

            <!-- <li>
              <p class="title1">题类设置</p>
              <div class="btngroup">
                <el-radio-group v-model="search.cateage" size="mini">
                  <el-radio-button v-for="item in cateageList" :label="item" :key="item">{{item}}</el-radio-button>
                </el-radio-group>
              </div>
            </li> -->

            <li>
              <p class="title2">
                试卷标题 
                <el-input v-model="name" placeholder="请输入试卷标题" style="width:240px;" size="small" clearable></el-input>
              </p>
              <p class="title2" style="text-align: center;">
                <!-- <el-button type="primary" size="mini" @click="scoredialogVisible=true">分值设定</el-button>
                <el-button type="primary" size="mini" @click="analysisdialogVisible=true">试卷分析</el-button> -->
                <el-button type="primary" size="mini" @click="IntelligentChoose">完成组卷</el-button>
              </p>
            </li>
          </ul>
        </div>
      </div>
    </left-fixed-nav>

    <!-- <scoredialog :dialogVisible="scoredialogVisible" @close="closescore"></scoredialog>
    <analysisdialog :dialogVisible="analysisdialogVisible" @close="closeanalysis"></analysisdialog> -->
  </div>
</template>

<script>
import leftFixedNav from "@/components/Nav/leftFixedNav";
// import scoredialog from "@/components/Dialog/score_setting";
// import analysisdialog from "@/components/Dialog/analysis";
import { mapGetters } from 'vuex'
import topPopover from "@/components/Popover/topPopover";
import { getquestionType } from '@/utils/basic.service.js'


export default {
  components: {
    leftFixedNav,
    // scoredialog,
    // analysisdialog,
    topPopover
  },
  props: ["isfixTab"],
  inject: ['reload'],
  data() {
    return {
      isMulti: false,
      filter: {
        grade: "",
      },
      activeType: "chapter",
      typeList:[],
      tagsList: [],
      chapterTags:[],
      knowledgeTags:[],
      subjectCode:'',
      // currentPage: 1,
      // scoredialogVisible: false,
      // analysisdialogVisible: false,
      // pointList: [],

      name: "",
      search: {
        type: [],
        difficulty: "",
        cateage: ""
      },
      cateageList: ["常考题", "易错题", "好题", "压轴题"],
      isAnswer: false,

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

    gradeList(val) {
      if(val.length) {
        this.filter.grade = val[0]
      }

    },
  },


  mounted() {
    this.gradeList.length? this.filter.grade = this.gradeList[0]: null
    this.subjectCode = this.getuserInfo.subjectCode
    this.search.difficulty = this.partDifficultyList[0]
    // this.subjectCode = this.getuserInfo.subjectCode
    this.getquestionType()
    
    //console.log(this.form.type);
  },
  methods: {

    handleClick(tab, event) {
      if(tab.name == "chapter") {
        this.tagsList = this.chapterTags
      }else {
        this.tagsList = this.knowledgeTags
      }
    },



    closeTag(index) {

      if(this.activeType == "chapter") {

        this.chapterTags.splice(index,1)
        this.$refs.chapterTree.setCheckedNodes(this.chapterTags)

      }else {
        this.knowledgeTags.splice(index,1)
        this.$refs.knowledgeTree.setCheckedNodes(this.knowledgeTags)
      }
    },

    getquestionType() {
      this.typeList = []
      if(!this.subjectCode) {return false}

      getquestionType(this.subjectCode)
      .then((data)=>{
        if (data.status == "200") {
            
            let arr = []
            data.data.forEach(item=>{
              arr.push({
                label: item,
                number:''
              })
            })
            this.typeList = arr

            this.search.type.push(this.typeList[0]);
            // this.search.type = this.typeList[0];

        } 
      })


    },

    IntelligentChoose() {
      if(!this.name) {
        return this.$message({
          message: '试卷标题不可以为空！',
          type:'warning'
        })
      }
      let tagIds = []
      let questions = []

      this.tagsList.forEach(item=>{
        tagIds.push(item.id)
      })

      this.search.type.forEach(item=>{
        questions.push(`${item.label},${item.number}`)
      })

      let params = {
        name: this.name,
        questions: questions,
        difficultyType: this.search.difficulty,
        chapterIds: '',
        knowledgeIds:'',
        gradeName:this.filter.grade.value.substr(0,this.filter.grade.value.length-1)
      }

      if(this.activeType == "chapter") {
        params.chapterIds = tagIds.join()
      }else {
        params.knowledgeIds = tagIds.join()
      }

      // console.log(params)
      this.$http.post(`/api/open/paper/addTestBasket/auto`,params)
      .then((data)=>{

        if(data.status == '200') {


          this.$confirm('组卷完成，是否进入试卷中心？', '', {
            confirmButtonText: '进入',
            cancelButtonText: '取消',
            type: '',
            center: true
          }).then(() => {

            this.$store.commit('setpaperId',data.data.id)
            
            this.$router.push(`/questions/examinationPaper`)


          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消继续上传'
            });
          });
        }


      })
      
    },
    // closescore() {
    //   this.scoredialogVisible = false;
    // },

    // closeanalysis() {
    //   this.analysisdialogVisible = false;
    // },

    getCheckedNodes(cur, prev) {
      let arr = [];
      prev.checkedNodes.forEach(node => {
        node.children && node.children.length ? null : arr.push(node);
      });
      this.pointList = arr;
    },
    changePoint(index) {
      this.pointList.splice(index, 1);
      this.$refs.tree1.setCheckedNodes(this.pointList);
    },

    getCheckedChapters(list) {
      this.chapterTags = list
      this.tagsList = this.chapterTags

    },

    getCheckedKnows(list) {
      this.knowledgeTags = list
      this.tagsList = this.knowledgeTags
    },
  }
};
</script>
<style lang="less">
.Intelligent {
  .el-tag {
    margin-left: 10px;
    margin-bottom: 10px;
  }
  .btngroup {
    .el-radio-button__inner {
      background-color: #dbe5fd;
      color: #84a6f7;
      border-radius: 3px;
      margin-right: 10px;
      margin-top: 10px;
      margin-bottom: 10px;
      border-left: 1px solid #dcdfe6;
    }

    .el-radio-button:first-child .el-radio-button__inner,
    .el-radio-button:last-child .el-radio-button__inner {
      border-radius: 3px;
    }

    .el-radio-button__orig-radio:checked+.el-radio-button__inner {
      background-color: #409EFF;
      box-shadow: -1px 0 0 0 #409EFF;
      color: #ffffff;
      border-left: 1px solid #409EFF;
    }
  }
  .el-checkbox-button__inner {
    margin-top: 10px;
    margin-right: 10px;
    border-left: 1px solid #dcdfe6;
    border-radius: 3px;
  }
  .el-checkbox-button:first-child .el-checkbox-button__inner,
  .el-checkbox-button:last-child .el-checkbox-button__inner {
    border-radius: 3px;
  }

  .el-checkbox-button__inner {
    background-color: #f2f5fc;
  }


  .el-input__inner {
    background: transparent;  //#f0f3fa;

  }

  .el-checkbox__inner {
    background-color: #f2f5fc;
  }
  .el-checkbox {
    color: #9d9ea1;
  }

  .el-card__body {
    padding: 0px;
  }

  .el-table thead {
    color: #606266;
  }
}
</style>
<style scoped lang="less">
.Intelligent {
  color: #727374;
  font-size: 14px;
  .top-p {
    height: 36px;
    line-height: 36px;
    color: #3399ff;
    font-weight: 600;
    display: flex;
    justify-content: space-between;
    padding-left: 20px;

    .p2 {
      color: #abb4ca;

      span {
        cursor: pointer;
      }

      .active {
        color: #3399ff;
      }
    }
  }


  .top-wrap {
    padding: 10px 20px 0 20px;

    .tag-wrap {
      margin: 10px 0 10px -10px;
      //margin-top: 10px;
    }
  }

  .set-wrap {
    background-color: #f2f5fc;
    //font-size: 0.9rem;

    ul {
      border: 1px solid #e2e2e2;
      padding-bottom: 20px;

      li {
        padding: 10px 20px;
        border-bottom: 1px dashed #dee1e7;

        .title1 {
          color: #6f96f5;
        }
        .title2 {
          margin-top: 10px;
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

        &:last-child {
          border-bottom: 0px;
        }
      }
    }
  }
}
</style>