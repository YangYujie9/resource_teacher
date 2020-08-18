<template>
  <div class="ques-home">
    <el-scrollbar style="height:100%" ref="quesHome">
      <page-head></page-head>
      <div class="ques-home-wrap">
        <div class="nav" :class="{ fixedNavbar: isfixTab}" ref="navBar">
          <ul>
            <li
              v-for="(list,index) in NavList"
              @click="choose_nau(list)"
              :class="{active:list.check}"
            >{{list.label}}</li>
          </ul>
        </div>

        <router-view :isfixTab="isfixTab"></router-view>
      </div>
      <div class="footer"></div>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import pageHead from "@/components/Nav/pageHead";
export default {
  components: {
    pageHead
  },
  computed: {

    ...mapGetters([
      'gradeList',

    ]),

    subjectName() {
      return this.getuserInfo.subject.name
    }

  },
  data() {
    return {
      isfixTab: false,

      //isfixLeft: false,
      NavList: [
        {
          label: "首页",
          route: "/teacher/home",
          check: false
        },
        {
          label: "课件",
          route: "2",
          check: false
        },
        {
          label: "教案",
          route: "2",
          check: false
        },
        {
          label: "学案",
          route: "2",
          check: false
        },
        {
          label: "套题试卷",
          route: "2",
          check: false
        },
        {
          label: "教学反思",
          route: "2",
          check: false
        },
        {
          label: "微课",
          route: "2",
          check: false
        },
        {
          label: "题库",
          route: "/questions/chooseBychapter",
          check: false
        }
      ]
    };
  },
  mounted() {
    //window.addEventListener('scroll', this.handleTabFix, true)
    this.$refs.quesHome.wrap.addEventListener(
      "scroll",
      this.handleTabFix,
      true
    );


    this.NavList.forEach(list=>{
      this.$route.fullPath.indexOf(list.route)>-1?list.check=true:list.check=false
    })
  },
  methods: {
    // 先分别获得id为testNavBar的元素距离顶部的距离和页面滚动的距离
    // 比较他们的大小来确定是否添加fixedNavbar样式
    handleTabFix() {
      let scrollTop = this.$refs["quesHome"].$refs["wrap"].scrollTop;
      //window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      let offsetTop = this.$refs.navBar.scrollTop;
      scrollTop > 208 ? (this.isfixTab = true) : (this.isfixTab = false);
      //scrollTop > 268 ? this.isfixLeft = true : this.isfixLeft = false
      // console.log(this.isfixTab,this.isfixLeft)
    },
    choose_nau(list) {
      this.NavList.forEach(list => {
        list.check = false;
      });
      list.check = true;

      if (list.route.indexOf('/')==0) {

        this.$router.push(list.route);

      }
      
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
      border-left: 1px solid #b3d8ff;
      border-radius: 3px;
    }
  }
</style>
<style lang="less">
.ques-home {
  //width: 100%;
  height: calc(100% - 0px);
  background-color: #f0f3fa;
  overflow: auto;

  &-wrap {
    width: 100%;
    position: relative;
    //height: 100%;

    .nav {
      height: 40px;
      line-height: 40px;
      color: #ffffff;
      background-color: #5182f4;
      margin-bottom: 20px;
      z-index: 1000;
      ul {
        display: flex;
        justify-content: center;
        font-size: 1.1rem;

        li {
          margin: 0px 30px;
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
    //background-color: red;
  }
}
</style>