<template>
  <div class="tearch-home">

    <div class="home-part-warp">
      

      <div class="part-one home-content">
        <div class="top-left">
       
          <div class="search-wrap">
            <el-radio-group v-model="activeType" size="mini" @change="getPonitTree">
              <el-radio-button label="chapter">章节目录</el-radio-button>
              <el-radio-button label="knowledge">知识点</el-radio-button>
            </el-radio-group>
          </div>
          <top-popover v-if="isReady" :chooseType="activeType" ref="filter" @setparams="setparams">
            <div slot="reference">
              <p class="top-title">
                <span v-if="$refs.filter" >{{$refs.filter.subject.subjectName}}</span>
                <span v-if="$refs.filter && activeType=='chapter'">{{$refs.filter.oese.name}}</span>
                <!-- <span v-if="$refs.filter && activeType=='chapter'" >{{$refs.filter.volume.name}}</span> -->
                
                <i class="iconfont iconshezhi settingicon"></i>
              </p>
            </div>
            <div slot="popover">
            </div>
          </top-popover>

          <div class="tree-class">
            <pointTree chooseType="chapter" :volumeId="volumeId"  @getCheckedNodes="getCheckedChapters" ref="chapterTree" v-show="activeType=='chapter'"></pointTree>
            <pointTree chooseType="knowledge"  :subjectCode="subjectCode"  @getCheckedNodes="getCheckedKnows" ref="knowledgeTree" v-show="activeType=='knowledge'"></pointTree>
          </div>
      
        </div>

        <div class="top-middle">
          <img src="@/assets/images/carousel.png" alt="" width="100%" height="100%">
        </div>
        <div class="top-right ">
          <div style="border-bottom: 1px dashed #c8cacf;">
            <el-button type="danger" @click="uploadResource" size="large" style="width: 100%"><i class="iconfont iconshangchuan"></i> 上传我的资源</el-button>
            <p style="line-height: 38px;text-align: center;font-size: 16px;">已有资源<span style="color: #5182f4;">{{resourceCount}}</span> 份 </p>
          </div>

          <p style="font-size: 16px;margin: 10px 0px;">资源统计</p>
          <ul>
            <li v-for="item in staticList"><span>{{item.resourceName}}</span> <span>{{item.number}}</span> </li>
          </ul>
        </div>
      </div>

      <div class="home-nav">
        <span>精品资源</span>
        <el-button type="text" style="color: #ffffff;" @click="getBoutiqueList" >换一批</el-button>
      </div>
      <div class="home-content">
        <div class="resource-wrap">
          <div class="one-resource" v-for="item in boutiqueList" @click="resourcePreview(item.resourceId)">


            <img :src="item.surfaceUrl" alt="" class="pic-class" v-if="item.surfaceUrl">
            <img src="@/assets/images/default.jpg" style="width: 100%;" v-if="!item.surfaceUrl">
            <p class="title-class" style="">{{item.name}}</p>
            <p class="foot-tag">
              <span>{{item.preview}}人阅读</span>
              <!-- <span><i class="iconfont iconpinglun1 tag-icon" ></i>{{item.download}}</span>   评论数-->
              <span><i class="el-icon-download tag-icon" ></i>{{item.download}}</span>
              <span><i class="iconfont icondianzan tag-icon"></i>{{item.thumbUp}}</span>
            </p>
          </div>
        </div>
      </div>



      <div class="home-nav">
        <span>热门资源</span>
        <el-button type="text" style="color: #ffffff;" @click="getHotList" >换一批</el-button>
      </div>
      <div class="home-content">
        <div class="resource-wrap">
          <div class="one-resource" v-for="item in hotList" @click="resourcePreview(item.resourceId)">
            <img :src="item.surfaceUrl" alt="" v-if="item.surfaceUrl">
            <img src="@/assets/images/default.jpg" style="width: 100%;" v-if="!item.surfaceUrl">

            <p class="title-class" >{{item.name}}</p>
            <p class="foot-tag">
              <span>{{item.preview}}人阅读</span>
              
              <span><i class="el-icon-download tag-icon" ></i>{{item.download}}</span>
              <span><i class="iconfont icondianzan tag-icon"></i>{{item.thumbUp}}</span>
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
      activeType:"chapter",
      filter: {
        grade: "",
      },
      subjectsList:[],
      sectionList:[],
      resourceCount:0,
      staticList:[],
      boutiqueList:[],
      hotList:[],
      volumeId:'',
      subjectCode:'',

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
      'isReady'

    ]),


  },

  mounted() {

    this.gradeList.length? this.filter.grade = this.gradeList[0]: null
    // this.subjectCode = this.getuserInfo.subjectCode
    this.getResourceCount()
    this.getBoutiqueList()
    this.getHotList()
    this.getResourceStatic()


    
    
  },
  methods: {

  	handleClick(tab, event) {

    },

    getCheckedChapters(list) {



    },

    getCheckedKnows(list) {

    },

    setparams(volumeId,subjectCode) {

      this.volumeId = volumeId

      this.subjectCode = subjectCode

      
    },
    uploadResource() {
      this.$router.push('/teacher/uploadResource')
    },

    getPonitTree() {},
    pointNodeClick() {},

    defaultPointNode() {},

    //获取公开的资源总数
    getResourceCount(){
      this.$http.get(`/api/open/resources/list/count`)
        .then((result)=>{
          if(result.status == '200') {
            this.resourceCount = result.data
          }
        })
    },

    //获取每个资源类型的统计数
    getResourceStatic(){
      this.$http.get(`/api/open/resources/list/static`)
        .then((result)=>{
          if(result.status == '200') {
            this.staticList = result.data
          }
        })
    },

    //获取n条精品资源
    getBoutiqueList(){
      this.$http.get(`/api/open/resources/list/number`,{
          grade:this.filter.grade.key,
          type:'boutique',
          number:10})
        .then((result)=>{
          if(result.status == '200') {
            this.boutiqueList = result.data
          }
        })
    },

    //获取n条最热资源
    getHotList(){
      this.$http.get(`/api/open/resources/list/number`,{
          grade:this.filter.grade.key,
          type:'hot',
          number:10})
        .then((result)=>{
          if(result.status == '200') {
            this.hotList = result.data
          }
        })
    },

    resourcePreview(resourceId) {

      this.$router.push({path: '/teacher/resourceRreview', query: {id:resourceId}})
      
    },

  }
};
</script>
<style lang="less">
// 
</style>
<style lang="less" scoped>
.tearch-home {


    .home-nav {
      height: 40px;
      line-height: 40px;
      color: #ffffff;
      background-color: #5182f4;
      margin-bottom: 20px;
      margin-top: 20px;
      padding:0px 12.5%;
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
      width: 75%;
      margin: 0 auto;
      min-height: 300px;
      // background-color:red;
      // height: 300px;


      // justify-content: space-between;
      .resource-wrap {
        margin-right: -4%;
        display: flex;
        flex-wrap: wrap;
        .one-resource {
          width: 16%;
          margin-bottom: 20px;
          margin-right: 4%;
          cursor: pointer;
          // height: 300px;

          .title-class {
            text-align: center;
            margin-top: 5px;
            line-height: 2;
            white-space:nowrap;
            overflow:hidden; 
            text-overflow:ellipsis;


            &:hover {
               text-overflow:inherit;
               overflow:visible;
            }
          }


          .pic-class {

          }



          .foot-tag {
            margin-top: 2px;
            display: flex;
            justify-content: space-between;
            align-items:center;
            font-size: 0.9rem;

            .tag-icon {
              font-size: 0.9rem;
              margin-right: 5px;
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
        width: 20%;
        min-width: 200px;
        // left: -20%;
        padding: 20px 5px;
        border: 1px solid #e2e2e2;
        // background-color:blue;

        // margin-left: 1.5%;
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
        width: 58%;
        // border: 1px solid #e2e2e2;
        margin-right: 1%;
      }


      .top-right {
        padding: 20px;
        width: 20%;
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