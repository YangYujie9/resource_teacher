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

        <router-view :isfixTab="isfixTab" @backToTop="backToTop" :resourceTypeList="resourceTypeList"  v-if="resourceTypeList.length"></router-view>
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
      'isReady'

    ]),

    subjectName() {
      return this.getuserInfo.subject.name
    }

  },
  watch: {
    $route(to,from){
      this.NavList.forEach(list=>{
        to.path.indexOf(list.route)>-1?list.check=true:list.check=false
      })

    }
  },

  data() {
    return {
      isfixTab: false,
      resourceTypeList:[],
      resource: [
        {
          value: '课件',
          key:'CourseWare',
        },{
          value: '教案',
          key:'TeachPlan',
        },{
          value: '学案',
          key:'LearningCase',
        },{
          value: '套题试卷',
          key:'ExaminationPaper',
        },{
          value: '教学反思',
          key:'TeachReflection',
        },{
          value: '微课',
          key:'VideoLesson',
        },{
          value: '素材',
          key:'Material',
        },{
          value: '电子教材',
          key:'ElectronicMaterials',
        }
      ],
      NavList: [
        {
          label: "首页",
          route: "/teacher/home",
          check: false
        },
        {
          label: "课件",
          route: "/teacher/resource/CourseWare",
          check: false
        },
        {
          label: "教案",
          route: "/teacher/resource/TeachPlan",
          check: false
        },
        {
          label: "学案",
          route: "/teacher/resource/LearningCase",
          check: false
        },
        {
          label: "套题试卷",
          route: "/teacher/resource/ExaminationPaper",
          check: false
        },
        {
          label: "教学反思",
          route: "/teacher/resource/TeachReflection",
          check: false
        },
        {
          label: "微课",
          route: "/teacher/resource/VideoLesson",
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


    this.getResourceType()

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


    },
    /**获取资源类型*/
    getResourceType(){
      this.$http.get(`/api/open/common/getResourceType`)
        .then((result)=>{
          if(result.status == '200') {
            result.data.forEach(item=>{
              for(let i=0;i<this.resource.length;i++) {
                if(item.name == this.resource[i].value) {
                  item.key = this.resource[i].key
                }
              }
            })
            // this.resourceForm.resourceType = this.resourceTypeList[0].id

            this.resourceTypeList = result.data
          }
        })

    },

    backToTop() {
      this.$refs["quesHome"].$refs["wrap"].scrollTo(0,0)
    }
  }
};
</script>
<style lang="less">
.ques-home {
  .el-radio-costom {
    .el-radio-button__inner {
      border: 0px;
      background-color: #f2f5fc;
      border-radius: 3px;
      font-size: 0.9rem;
      color: #666;
    }
    .el-input__inner {
      background: transparent;
    }

    .el-radio-button:first-child .el-radio-button__inner {
      border-left: 0px;
      border-radius: 3px;
    }
    .el-radio-button:last-child .el-radio-button__inner {
      border-radius: 3px;
    }
    .el-button--primary.is-plain {
      background: #f2f5fc;
      border-color: #e2e2e2;
      color: #7b9ff6;

      &:hover,
      &:active,
      &:focus {
        color: #5182f4;
      }
    }

    .el-radio-button__orig-radio:checked+.el-radio-button__inner {
      color: #FFF;
      background-color: #409EFF;
      border-color: #409EFF;
      box-shadow: -1px 0 0 0 #409EFF;
    }
  }
}

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
  }
</style>
<style lang="less">
.ques-home {
  //width: 100%;
  height: calc(100% - 0px);
  background-color: #f0f3fa;
  overflow: auto;
  width: 100%;
  min-width: 1400px;

  &-wrap {
    width: 100%;
    min-width: 1300px;
    position: relative;
    min-height: calc(100vh - 268px);
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
    // margin-top: 30px;
    height: 60px;
    line-height: 60px;
    background-color: #75777c;
  }
}
</style>