<template>
  <div class="tearch-home">

    <div class="home-part-warp">
      

      <div class="part-one home-content">
        <div class="top-left">
          <selectPointTree ref="tree" @getPointIds="getPointIds" :isSetCache="true" :isRemembered="true"></selectPointTree>

      
        </div>

        <div class="top-middle" ref="pic_wrap">
          <el-carousel height="100%" indicator-position="none" :interval="4000">
            <el-carousel-item >
              <img src="@/assets/images/home1.png" alt="" width="100%" height="100%">
            </el-carousel-item>
            <el-carousel-item >
              <img src="@/assets/images/home2.png" alt="" width="100%" height="100%">
            </el-carousel-item>
            <el-carousel-item >
              <img src="@/assets/images/home3.png" alt="" width="100%" height="100%">
            </el-carousel-item>
          </el-carousel>
          <!-- <img src="@/assets/images/carousel.png" alt="" width="100%" height="100%"> -->
        </div>
        <div class="top-right ">
          <div style="border-bottom: 1px dashed #c8cacf;">
            <el-button type="danger" @click="uploadResource" size="large" style="width: 100%"><i class="iconfont iconshangchuan"></i> 上传我的资源</el-button>
            <p style="line-height: 38px;text-align: center;font-size: 16px;">已有资源 <span style="color: #5182f4;">{{resourceCount}}</span> 份 </p>
          </div>

          <p style="font-size: 16px;margin: 10px 0px;">资源统计</p>
          <ul>
            <li v-for="item in staticList" @click="gotoResource(item.resourceName)" class="cursor">
              <span>{{item.resourceName}}</span> <span>{{item.number}}</span> 
            </li>
          </ul>
        </div>
      </div>

      <!-- 带图片样式 -->
      <!-- <div v-for="list in NavigationBars">
        <div class="home-nav">
          <span>{{list.navigationName}}</span>
          <el-button type="text" style="color: #ffffff;" @click="getResourceList(list)" >换一批</el-button>
        </div>
        <div class="home-content">
          <div class="resource-wrap">
            <div class="one-resource" v-for="item in list.resourceList" @click="resourcePreview(item.resourceId)">


              <img :src="item.surfaceUrl" alt="" class="pic-class" v-if="item.surfaceUrl">
              <img src="@/assets/images/default.jpg" style="width: 100%;" v-if="!item.surfaceUrl">
              <p class="title-class" style="">{{item.name}}</p>
              <p class="foot-tag">
                <span>{{item.preview}}人阅读</span>
                <span><i class="iconfont iconpinglun1 tag-icon" ></i>{{item.download}}</span>   评论数
                <span><i class="el-icon-download tag-icon" ></i>{{item.download}}</span>
                <span><i class="iconfont icondianzan tag-icon"></i>{{item.thumbUp}}</span>
              </p>
            </div>
          </div>
        </div>
      </div> -->
      <div class="home-nav-wrap">
        <div v-for="list in NavigationBars">
          <div class="home-nav">
            <span>{{list.navigationName}}</span>
            <!-- <div style="display: flex;">
              <el-tabs v-model="activeName">
                <el-tab-pane label="用户管理" name="first"></el-tab-pane>
                <el-tab-pane label="配置管理" name="second"></el-tab-pane>
                <el-tab-pane label="角色管理" name="third"></el-tab-pane>
                <el-tab-pane label="定时任务补偿" name="fourth"></el-tab-pane>
              </el-tabs> -->
              <el-button type="text" style="color: #ffffff;margin-left: 50px;" @click="getResourceList(list)" v-if="list.url!='newResource' && list.resourceList.length == 18 ">换一批</el-button>
            <!-- </div> -->
          </div>
          <div class="home-content">
            <div class="resource-wrap">

              <ul>
                <li v-for="item in list.resourceList" class="one-piece" @click="resourcePreview(item.resourceId)">
                  <!-- <span style="display: inline-block;width: 3px;height: 3px;background-color: #333;margin-right: 8px;bottom: 3px;"></span> -->
                  <!-- /*<span style="margin-right: 8px;font-size: 20px;font-weight: 600;">·</span>*/ -->
                  <span class="tag-class">{{item.resourceName}}</span>
                  <el-divider direction="vertical" style="color: #a7aeb4;"></el-divider>
                  <span>{{item.name}}</span>
                </li>
              </ul>
              <!-- <div class="one-resource" v-for="item in list.resourceList" @click="resourcePreview(item.resourceId)">


                <img :src="item.surfaceUrl" alt="" class="pic-class" v-if="item.surfaceUrl">
                <img src="@/assets/images/default.jpg" style="width: 100%;" v-if="!item.surfaceUrl">
                <p class="title-class" style="">{{item.name}}</p>
                <p class="foot-tag">
                  <span>{{item.preview}}人阅读</span>
                  <span><i class="iconfont iconpinglun1 tag-icon" ></i>{{item.download}}</span>   评论数
                  <span><i class="el-icon-download tag-icon" ></i>{{item.download}}</span>
                  <span><i class="iconfont icondianzan tag-icon"></i>{{item.thumbUp}}</span>
                </p>
              </div> -->
            </div>
          </div>
        </div>
      </div>



    </div>  






  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// import topPopover from "@/components/Popover/topPopover";
import selectPointTree from "@/components/Popover/selectPointTree";

export default {
  props: ["isfixTab"],
  components: {
    // topPopover,
    selectPointTree
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
      NavigationBars:[],
      activeName:'',
      chapterIds:[],
      knowledgeIds:[],
      height: 100,



    };
  },

  watch: {


    openState(val) {
      this.getNavData()
      this.getResourceCount()
      this.getResourceStatic()
    }


  },
  computed: {

    ...mapGetters([
      'resource',
      'getuserInfo',
      'isReady'

    ]),
    openState() {
      return this.$route.query.type
    }
  },
  beforeRouteEnter(to, from, next) {
    if (from.path == "/teacher/resourceRreview") {
      to.meta.keepAlive = true;
    } else {
      to.meta.keepAlive = false;
    }
    next();
  }, 
  mounted() {


    // this.subjectCode = this.getuserInfo.subjectCode
    this.getResourceCount()

    this.getResourceStatic()

    


    this.$nextTick(()=>{
      this.height = this.$refs.pic_wrap.offsetHeight - 105
      this.$refs.tree.$refs.tree_wrap.style.height = this.height + 'px'
    })
    
  },
  methods: {

  	handleClick(tab, event) {

    },

    getCheckedChapters(list) {



    },

    getCheckedKnows(list) {

    },
    getPointIds(list1,list2,subjectCode,volumeId) {

      this.chapterIds = list1
      this.knowledgeIds = list2

      if(this.subjectCode != subjectCode) {
        
        this.subjectCode = subjectCode
        this.getNavigationBars()
      }

      this.volumeId = volumeId
      
    },
    setparams(volumeId,subjectCode,gradeId,oeseId) {

      this.volumeId = volumeId

      this.subjectCode = subjectCode

      let rememberedSearch = {
        volumeId: volumeId,
        subjectCode: subjectCode,
        gradeId: gradeId,
        oeseId: oeseId
      }

      localStorage.setItem('rememberedSearch',JSON.stringify(rememberedSearch))

      
    },
    uploadResource() {
      this.$router.push('/teacher/uploadResource')
    },

    getPonitTree() {},
    pointNodeClick() {},

    defaultPointNode() {},

    //获取公开的资源总数
    getResourceCount(){

      
      
      let schoolId = this.openState? this.getuserInfo.school.id:''
      this.$http.get(`/api/open/resources/list/count?schoolId=${schoolId}`)
        .then((result)=>{
          if(result.status == '200') {
            this.resourceCount = result.data
          }
        })
    },

    //获取每个资源类型的统计数
    getResourceStatic(){

      
      let schoolId = this.openState? this.getuserInfo.school.id:''
      this.$http.get(`/api/open/resources/list/static?schoolId=${schoolId}`)
        .then((result)=>{
          if(result.status == '200') {
            this.staticList = result.data
          }
        })
    },

    //获取n条精品资源
    getBoutiqueList(){
      this.$http.get(`/api/open/resources/list/number`,{
          // grade:this.filter.grade.key,

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
          // grade:this.filter.grade.key,
          type:'hot',
          number:10})
        .then((result)=>{
          if(result.status == '200') {
            this.hotList = result.data
          }
        })
    },

    getResourceList(item) {

      


      this.$http.get(`/api/open/resources/list/number`,{
          // grade:this.filter.grade.key,
          learningSection: this.getuserInfo.learningSection,
          subject: this.subjectCode,
          type:item.url,
          openState:this.openState?'SemiOvert':'',
          number:18
        })
        .then((data)=>{
          if(data.status == '200') {

            item.resourceList = data.data
          }
        })
    },


    getNavData() {
      this.NavigationBars.forEach(item=>{

        // item.resourceList = []
        this.$set( item, 'resourceList', [] )
        this.getResourceList(item)

      })
    },
    getNavigationBars() {
      this.$http.get(`/api/open/common/enabledNavigationBars/1`)
      .then((data)=>{
        if(data.status = '200') {

          this.NavigationBars = data.data
          this.getNavData()
          // console.log(this.NavigationBars)
          
          
        }
        
      })
    },

    gotoResource(name) {

      let list = this.resource.filter(item=>{
        return item.value == name
      })

      if(list && list.length) {
        this.$router.push(`/teacher/resource/${list[0].key}`)
      }

    },
    resourcePreview(resourceId) {

      this.$router.push({path: '/teacher/resourceRreview', query: {id:resourceId}})
      
    },

  }
};
</script>
<style lang="less">
.tearch-home {


  .el-carousel__item.is-animating {
    transition: transform 0.8s ease-in-out;
  }
  .el-carousel {
    height: 100%;
  }
  .tree-content {
    padding: 0 5px;
  }
  .tree-class {
    overflow: auto;

  }


  .el-divider {
    background-color: #a7aeb4;
  }

  .resource-wrap {

    li:hover {
      .el-divider {
        background-color: #409EFE;
      }
    }


    
  }

  .top-left {
    .settingicon {
      display: none;
    }
    .titlep {
      padding: 0 20px !important;
    }
  }
}
</style>
<style lang="less" scoped>
.tearch-home {

  .home-nav-wrap {

    padding-bottom: 30px;
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
      min-height: 220px;
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


        ul {
          display: flex;
          flex-wrap: wrap;
          width: 100%;
          // list-style-type: disc;

          li {
            width: 33%;
            line-height: 32px;
            cursor: pointer;
            white-space:nowrap;
            overflow:hidden; 
            text-overflow:ellipsis;
            position:relative;
            padding-left: 10px;


            .tag-class {
              display: inline-block;
              width: 60px;
              color: #9e9fa0;
              text-align: right;
            }

            &:hover {
              color: #409EFE;
              .tag-class {
                color: #409EFE;
              }
            }

            // &::before {
            //   position: absolute;
            //   left: 0;
            //   content: '';
            //   top: 16px;
            //   width: 3px;
            //   height: 3px;
            //   background: #b4c6d0;
            // }

            // &:hover:before {
            //   background: #4b98ff;
            // }
          }
        }
      }

    }

    
    .part-one {
      height: calc(40vh);
      position: relative;
      min-height: 370px;
      display: flex;

      .top-left {
        // position:absolute;
        // height: 100%;
        width: 20%;
        min-width: 200px;
        // left: -20%;
        padding: 20px 0px;
        border: 1px solid #e2e2e2;
        // background-color:blue;

        // margin-left: 1.5%;
        margin-right: 1%;


        .search-wrap {
          text-align: center;
        }

        .left-tree-content {
          padding: 0 5px;
          height: calc(100% - 10px);

          .tree-class {
            overflow: auto;
            height: calc(100% - 50px);
            padding-bottom: 20px;
          }
        }


      }

      .top-middle {
        width: 58%;
        // border: 1px solid #e2e2e2;
        height: 100%;
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
            line-height: 30px;

          }
        }
      }
    }
  }
}
</style>