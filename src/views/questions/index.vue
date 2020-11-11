<template>
  <div class="home"  v-loading.fullscreen.lock="!isReady">
   <!--  /*<el-scrollbar style="height:100%"  ref="home">*/ -->
    <el-backtop target=".home .el-scrollbar__wrap" :bottom="80"></el-backtop>
    <div class="el-scrollbar__wrap" ref="home">
      <page-head  v-if="isReady"></page-head>
      <div class="home-wrap">
        <div class="nav" :class="{ fixedNavbar: isfixTab}" ref="navBar">
          <ul>
            <li
              v-for="(list,index) in navList"
              @click="choose_nau(list)"
              :class="{active:list.check}"
            >{{list.label}}</li>
          </ul>
        </div>
        <router-view v-if="!$route.meta.keepAlive && isReady"  :isfixTab="isfixTab" @backToTop="backToTop" ></router-view>
        <keep-alive>
          <router-view v-if="$route.meta.keepAlive && isReady"  :isfixTab="isfixTab" @backToTop="backToTop"></router-view>
        </keep-alive>


        <!-- <router-view :isfixTab="isfixTab" @backToTop="backToTop"  v-if="isReady"></router-view> -->

      </div>
      <div class="footer">{{getsiteInfo.copyright}}</div>
    </div>
<!--     </el-scrollbar> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import pageHead from "@/components/Nav/pageHead";
export default {
  components: {
    pageHead
  },
  data() {
    return {
      isfixTab: false,
      //isfixLeft: false,
      treeData: {
        data: [],
        showCheckBox: false
      },
      navList: [
        {
          label: "章节挑题",
          route: "/questions/chooseBychapter",
          check: false
        },
        {
          label: "知识点挑题",
          route: "/questions/chooseByknowledge",
          check: false
        },
        {
          label: "智能挑题",
          route: "/questions/chooseByIntelligents",
          check: false
        },
        {
          label: "真题试卷",
          route: "/questions/actualPaper",
          check: false
        },
        {
          label: "试卷中心",
          route: "/questions/examinationPaper",
          check: false
        },
        {
          label: "资源中心",
          route: "/teacher/home",
          check: false
        }
      ],
    };
  },

  computed: {

    ...mapGetters([
      'getuserInfo',
      'isReady',
      'getsiteInfo'

    ]),

  },
  watch:{



    $route(to,from){

      this.$refs['home'].scrollTop = 0
      this.navList.forEach(list=>{
        to.path.indexOf(list.route)>-1?list.check=true:list.check=false
      })

    }

  },
  mounted() {
    //window.addEventListener('scroll', this.handleTabFix, true)
    // el-scrollbar需要加上wrap this.$refs.home.wrap.addEventListener("scroll", this.handleTabFix, true);
    this.$refs.home.addEventListener("scroll", this.handleTabFix, true);

    this.navList.forEach(list=>{
      this.$route.fullPath.indexOf(list.route)>-1?list.check=true:list.check=false
    })

  },
  methods: {
    // 先分别获得id为testNavBar的元素距离顶部的距离和页面滚动的距离
    // 比较他们的大小来确定是否添加fixedNavbar样式
    handleTabFix() {
      // let scrollTop = this.$refs.home.scrollTop;
      // let scrollTop = this.$refs['home'].$refs['wrap'].scrollTop;
      let scrollTop = this.$refs['home'].scrollTop;
      let offsetTop = this.$refs.navBar.scrollTop;

      scrollTop > 208 ? (this.isfixTab = true) : (this.isfixTab = false);
    },

    choose_nau(list) {

      // if(this.getuserInfo.userType == 'Teacher') {
        this.navList.forEach(list => {
          list.check = false;
        });
        list.check = true;
        this.$router.push(list.route);
      // }else {

      //   return this.$message.warning('您无进入此页面的权限')
      // }

    },

    backToTop() {

      this.$refs['home'].scrollTo(0,0)
    }
  }
};
</script>
<style lang="less">
  .form-class {
    .el-radio-button__inner {
      border-left: 1px solid #b3d8ff;
      border-radius: 3px;
      color: #409eff;
      background: #ecf5ff;
      border-color: #b3d8ff;

      &:hover {
        color: #fff;
        background-color: #409eff;
        border-color: #409eff;
      }
    }

    .el-radio-button__orig-radio:checked + .el-radio-button__inner {
      -webkit-box-shadow: 0px 0 0 0 #409eff;
      box-shadow: 0px 0 0 0 #409eff;
    }
    .el-radio-button:first-child .el-radio-button__inner,
    .el-radio-button:last-child .el-radio-button__inner {
      // border-left: 1px solid #b3d8ff;
      border-radius: 3px;
    }


    .el-radio-button__orig-radio:disabled:checked+.el-radio-button__inner {
      background-color: #409eff;
      color: #ffffff;
    }

    .el-card .qt1 img {
      vertical-align: middle;
      float: right;
      max-height: 200px;
      width: auto;
    }
  }
</style>
<style scoped lang="less">
.home {
  //width: 100%;
  height: calc(100% - 0px);
  background-color: #f0f3fa;
  overflow-y: auto;
  width: 100%;
  min-width: 1400px;


  &-wrap {
    width: 100%;
    position: relative;
    
    min-height: 100%;

    .nav {
      min-width: 1300px;
      padding: 0 12.5%;
      height: 40px;
      line-height: 40px;
      color: #ffffff;
      background-color: #5182f4;
      margin-bottom: 20px;
      z-index: 1000;
      ul {
        display: flex;
        justify-content: center;
        min-width: 1100px;
        font-size: 1.1rem;

        li {
          margin: 0px 30px;
          text-align: center;
          flex-grow: 1;
          word-wrap: nowrap;
          padding: 0 20px;
          cursor: pointer;

          &:hover {
            background-color: rgba(0, 0, 0, 0.1);
          }
        }

        .active {
          background-color: rgba(0, 0, 0, 0.1);
        }
      }
    }

    .fixedNavbar {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      margin-bottom: 20px;
      // border-top: 0.05rem solid #f5f5f5;
      // border-bottom: 0.05rem solid #f5f5f5;
      // background: #f5f5f5;
    }
  }

  .footer {
    height: 60px;
    line-height: 60px;
    background-color: #75777c;
    text-align: center;
    color: #ffffff;
  }
}
</style>