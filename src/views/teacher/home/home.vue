<template>
  <div class="tearch-home">

    <div class="home-part-warp">
      

      <div class="part-one">
        <div class="top-left">
       
          <div class="search-wrap">
            <el-radio-group v-model="activeType" size="mini" @change="getPonitTree">
              <el-radio-button label="Chapter">章节目录</el-radio-button>
              <el-radio-button label="Knowledge">知识点</el-radio-button>
            </el-radio-group>
          </div>
          <top-popover>
            <div slot="reference" class="search-class">
              <p class="top-title">
                  <span>人教版：</span>
                  <span v-if="filter.grade.value">{{filter.grade.value}}</span>
                  <i class="iconfont iconshezhi settingicon"></i>
                </p>
            </div>
            <div slot="popover">
              <div>
        
                <p>年级：</p>
                <el-radio-group v-model="filter.grade" size="mini" @change="getPonitTree">
                  <el-radio-button v-for="list in gradeList" :label="list" :key="list.key">{{list.value}}</el-radio-button>
                </el-radio-group>

                <!-- <p>科目：</p>
                <el-radio-group v-model="filter.subject" size="mini" @change="changeSubject">
                  <el-radio-button :label="item" :key="item.key" v-for="item in subjectsList">{{item.value}}</el-radio-button>
                </el-radio-group> -->
              </div>
            </div>
          </top-popover>

          <div class="tree-class">
            <pointTree chooseType="chapter" :grade="filter.grade.key" :subjectCode="getuserInfo.subjectCode"  @getCheckedNodes="getCheckedChapters" ref="chapterTree" v-show="activeType=='Chapter'"></pointTree>
            <pointTree chooseType="knowledge" :grade="filter.grade.key" :subjectCode="getuserInfo.subjectCode"  @getCheckedNodes="getCheckedKnows" ref="knowledgeTree" v-show="activeType=='Knowledge'"></pointTree>
          </div>
      
        </div>

        <div class="top-middle">
          <img src="@/assets/images/carousel.png" alt="" width="100%" height="100%">
        </div>
        <div class="top-right ">
          <div style="border-bottom: 1px dashed #c8cacf;">
            <el-button type="danger" @click="uploadResource" size="large" style="width: 100%"><i class="iconfont iconshangchuan"></i> 上传我的资源</el-button>
            <p style="line-height: 38px;text-align: center;font-size: 16px;">已有资源<span style="color: #5182f4;">12983</span> 份 </p>
          </div>

          <p style="font-size: 16px;margin: 10px 0px;">资源统计</p>
          <ul>
            <li v-for="i in 10"><span>课件</span> <span>920</span> </li>

          </ul>
        </div>
      </div>

      <div class="home-nav">
        <span>精品资源</span>
        <el-button type="text" style="color: #ffffff;">换一批</el-button>
      </div>
      <div class="home-content">
        <div class="resource-wrap">
          <div class="one-resource" v-for="i in 9">
            <img src="@/assets/images/book.png" alt="">

            <p style="text-align: center;margin-top: 10px;line-height: 2;">小石潭记</p>
            <p class="foot-tag">
              <span>100w人阅读</span>
              <span><i class="iconfont iconpinglun1 tag-icon" ></i>100w</span>
              <span><i class="iconfont icondianzan tag-icon"></i>6000w</span>
            </p>
          </div>
        </div>
      </div>


      <div class="home-nav">
        <span>热门资源</span>
        <el-button type="text" style="color: #ffffff;">换一批</el-button>
      </div>
      <div class="home-content">
        <div class="resource-wrap">
          <div class="one-resource" v-for="i in 11">
            <img src="@/assets/images/book.png" alt="">

            <p style="text-align: center;margin-top: 10px;line-height: 2;">小石潭记</p>
            <p class="foot-tag">
              <span>100w人阅读</span>
              <span><i class="iconfont iconpinglun1 tag-icon" ></i>100w</span>
              <span><i class="iconfont icondianzan tag-icon"></i>6000w</span>
            </p>
          </div>
        </div>
      </div>
    </div>  




    <!-- <div class="home-content">
      <el-button type="danger" @click="uploadResource" size="small">上传我的资源</el-button>
    </div> -->


  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import topPopover from "@/components/Popover/topPopover";
export default {
  props: ["isfixTab"],
  components: {
    topPopover,
  },

  data() {
    return {
      activeType:"Chapter",
      filter: {
        grade: "",
      },
      subjectsList:[],
      sectionList:[]
      //subjectName:'',


    };
  },

  watch: {
    gradeList(val) {

      if(val.length) {
        this.filter.grade = val[0]
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

    this.gradeList.length? this.filter.grade = this.gradeList[0]: null
    // this.subjectCode = this.getuserInfo.subjectCode


    
    
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

    getPonitTree() {},
    pointNodeClick() {},

    defaultPointNode() {},

  }
};
</script>
<style lang="less">
// 
</style>
<style lang="less" scoped>
.tearch-home {
  // .home-content {
  //   height: 400px;
  //   text-align: center;
  //   .search-class {
  //     display: flex;
  //     height: 36px;
  //     line-height: 36px;
  //     color: #409EFF;
  //     justify-content: space-around;
  //     cursor: pointer;
  //   }
  // }

    .home-nav {
      height: 40px;
      line-height: 40px;
      color: #ffffff;
      background-color: #5182f4;
      margin-bottom: 20px;
      margin-top: 20px;
      padding:0px 16.5%;
      display: flex;
      justify-content: space-between;

      &-content {
        display: flex;
        justify-content: space-between;
        width: 67%;
        margin: 0 auto;
        background-color:blue;
      }
    }
  .home-part-warp {
    
    img {
      max-width: 100%;
      max-height: 100%;
      vertical-align: middle;
    }
    .home-content {
      width: 67%;
      margin: 0 auto;
      // background-color:red;
      // height: 300px;


      // justify-content: space-between;
      .resource-wrap {
        margin-right: -3%;
        display: flex;
        flex-wrap: wrap;
        .one-resource {
          width: 17%;
          margin-bottom: 20px;
          margin-right: 3%;
          cursor: pointer;
          // height: 300px;

          .foot-tag {
            display: flex;
            justify-content: space-between;
            align-items:center;
            font-size: 0.9rem;

            .tag-icon {
              font-size: 0.9rem;
            }
          }
        }
      }

    }

    
    .part-one {
      height: calc(40vh);
      position: relative;

      display: flex;

      .top-left {
        // position:absolute;
        height: 100%;
        width: 14%;
        min-width: 200px;
        // left: -20%;
        padding: 20px 5px;
        border: 1px solid #e2e2e2;
        // background-color:blue;

        margin-left: 1.5%;
        margin-right: 1%;


        .search-wrap {
          text-align: center;
        }

        .tree-class {
          overflow: auto;
          height: calc(100% - 50px);
        }
      }

      .top-middle {
        width: 53%;
        // border: 1px solid #e2e2e2;
        margin-right: 1%;
      }


      .top-right {
        padding: 20px;
        width: 13%;
        height: 100%;
        background-color:#ebeff3;
        border: 1px solid #e2e2e2;


        ul {
          height:calc(100% - 120px);
          overflow-y: auto;
          list-style-type: circle;


          li {
            display: flex;
            justify-content: space-between;
            padding: 0 20px;
            line-height: 32px;

          }
        }
      }
    }
  }
}
</style>