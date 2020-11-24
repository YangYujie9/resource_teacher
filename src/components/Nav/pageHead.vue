<template>
  <div class="header">
    <div class="top">
      <div class="top-wrap">
        <p>{{getuserInfo.person.fullName}}您好，欢迎来到教育资源云平台！</p>
        <div class="fr">
          <ul>
            <li>              
              <el-dropdown @command="handleCommand">
                <span class="el-dropdown-link">
                  <i class="iconfont iconrenyuan icontouxiang1"></i>
                  <span style=""> {{getuserInfo.person.fullName}}</span>
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="personal" v-if="getuserInfo.userType == 'Teacher'">我的资源</el-dropdown-item>
                  <el-dropdown-item command="exit">退出登录</el-dropdown-item>

                </el-dropdown-menu>
              </el-dropdown>
            </li>
            <!-- <li>

              <i class="iconfont iconrenyuan icontouxiang1"></i>
              <el-popover width="116" trigger="hover">
                <div style="text-align: center;">
                  <ul>
                    <li style="cursor: pointer;" @click="personalInfo">我的资源</li>
                    <li style="cursor: pointer;" @click="exit">退出登录</li>
                  </ul>


                </div>

                <span style="" slot="reference" > {{getuserInfo.person.fullName}}</span>

              </el-popover>
            </li> -->
            <li @click="$router.push({path: '/teacher/home',query:{type:'2'}})" :class="{activelink:searchType=='school'}">
              <!-- <img src="@/assets/images/ben.png" alt /> -->
              <i class="iconfont iconboshimao iconclass1"></i>
              <span> 校本资源</span>
            </li>
            <li @click="$router.push({path: '/teacher/home'})" :class="{activelink:searchType=='open'}">
              <!-- <img src="@/assets/images/zi.png" alt /> -->
              <i class="iconfont iconkapian iconclass1"></i>
              <span> 公共资源</span>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="middle">
      <div class="middle-wrap">
        <div class="logo cursor" @click="$router.push('/teacher/home')">
          <img src="@/assets/images/logo3.png" alt width="280px" v-if="!getsiteInfo.picture" />
          <img :src="getsiteInfo.picture" alt width="260px" v-if="getsiteInfo.picture" />
        </div>
        <div class="search">
          <!-- <el-radio-group v-model="type" size="medium">
            <el-radio-button label="课件"></el-radio-button>
            <el-radio-button label="学案"></el-radio-button>
            <el-radio-button label="教案"></el-radio-button>
            <el-radio-button label="习题"></el-radio-button>
            <el-radio-button label="微课"></el-radio-button>
            <el-radio-button label="教学反思"></el-radio-button>
            <el-radio-button label="在线课程"></el-radio-button>
            <el-radio-button label="学校"></el-radio-button>
            <el-radio-button label="老师"></el-radio-button>
          </el-radio-group> -->

          <div class="search_s">
            <!-- <el-select v-model="selectSource" placeholder="请选择" style="width: 120px;">
                <el-option :label="list.navigationName" :value="list.navigationId.id" v-for="list in resourceTypeList"></el-option>
              </el-select> -->
            <el-input placeholder="请输入内容" v-model="keyword" class="input-with-select">
              <el-select v-model="selectSource" slot="prepend" placeholder="请选择">
                <el-option :label="list.navigationName" :value="list.navigationId.id" v-for="list in resourceTypeList"></el-option>
              </el-select>
              <el-button slot="append" type="primary">搜索</el-button>
            </el-input>
          </div>
        </div>

        <div class="resource-tag" v-show="show">
          <p><span class="tag-title">我的资源</span></p>
          <div class="tag-wrap">
            <div>
              <p class="nump">0</p>
              <p class="textp">下载</p>
            </div>
            <div>
              <p class="nump">0</p>
              <p class="textp">收藏</p>
            </div>
            <div>
              <p class="nump">0</p>
              <p class="textp">共享</p>
            </div>
            <div>
              <p class="nump">0</p>
              <p class="textp">私有</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Cookies from "js-cookie"
export default {
  props:['show'],
  data() {
    return {
      type: "上海",
			keyword: "",
      logo:'',
      searchType:'',
      selectSource: '',
      resourceTypeList:[]
    };
  },

  watch: {
    $route(to,from) {


      if(to.fullPath.indexOf('/teacher')==0 && to.fullPath.indexOf('/teacher/personal')==-1) {

        this.searchType = to.query.type == '2'?'school':'open'
      }else {
        this.searchType = ''
      }
    },
  },
  computed: {
    
    ...mapGetters([
      'getuserInfo',
      'getsiteInfo'

    ]),

  },
  mounted() {


    this.getNavigationBars()
    if(this.$route.fullPath.indexOf('/teacher')==0 && this.$route.fullPath.indexOf('/teacher/personal')==-1) {

      this.searchType = this.$route.query.type == '2'?'school':'open'
    }

  },
  methods: {
              //退出登录
    exit() {

      this.$http.get(`/api/open/user/logout`)
      .then(data=>{
        if(data.status == '200') {

          Cookies.remove("resource-teacher")

          localStorage.clear()
          //this.$router.push('/login')
          window.location.reload()
        }
      })


      
    },

    personalInfo() {
      this.$router.push('/teacher/personal')
    },

    getNavigationBars() {
      this.$http.get(`/api/open/common/enabledNavigationBars/0`)
      .then((data)=>{
        if(data.status = '200') {
          // console.log(this.NavList)
          let arr = []

          for(let i=0;i<data.data.length;i++) {

            if(data.data[i].navigationName != '首页' && data.data[i].navigationName != '题库') {

              arr.push(data.data[i])
            }
          }
          this.resourceTypeList = arr

          this.selectSource = this.resourceTypeList.length?this.resourceTypeList[0].navigationId.id:''
        }
        
      })
    },
    handleCommand(command) {
      if(command == 'personal') {
        this.$router.push('/teacher/personal')
      }else if(command == 'exit') {
        this.exit()
      }
    },



  }
};
</script>


<style lang="less">
.header {

  .el-dropdown {
    color: #909399;

    &:focus {
      outline: 0px;
    }
  }
  .el-input__inner {
    border-radius: 0px;
    background: #f0f3fa;
  }

  .el-radio-button__inner {
    border: none;
    background: #f0f3fa;
  }
  .el-radio-button:first-child .el-radio-button__inner {
    border-left: none;
    border-radius: 0px;
  }
  .el-radio-button:last-child .el-radio-button__inner {
    border-radius: 0px;
  }
  .el-radio-button__orig-radio:checked + .el-radio-button__inner {
    background-color: #5182f4;
    border-color: #5182f4;
  }
  .el-input-group__append,
  .el-input-group__prepend{
    background-color: #5182f4;
    border: 1px solid #5182f4;
    color: #fff;
    border-radius: 0px;
  }
  .el-input-group__prepend {
    width: 120px;
    // background-color: transparent; 
    // border-right: 2px solid #5182f4;
  }
  .el-input-group {
    border:2px solid #5182f4;
  }
}
</style>
<style scoped lang="less">
.header {
  width: 100%;
  min-width: 1400px;

  .iconclass1 {
    font-size: 20px;
  }

  .top {
    height: 48px;
    background-color: #f2f2f2;
    color: #909399;

    &-wrap {
      height: 100%;
      width: 80%;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .fr ul {
        display: flex;
        align-items: center;
        li {
          margin-left: 20px;
          cursor: pointer;
        }

        .activelink {
          color: #409EFF;
        }
      }
    }
  }

  .middle {
    height: 130px;
    position: relative;

    .resource-tag {
			width: 12%;
      position: absolute;
			right: 2%;
			
			.tag-title {
				border-bottom: 2px solid #2196f3;
				padding-bottom: 2px;
			}

      .tag-wrap {
				margin-top: 3px;
				display: flex;
				justify-content: space-between;
        text-align: center;
        line-height: 1.5;

        .nump {
          color: #2196f3;
        }

        .textp {
          color: #909399;
          font-size: 13px;
        }
      }
    }
    &-wrap {
      width: 70%;
      height: 100%;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .search {
        width: 720px;
        .search_s {
          // border: 2px solid #5182f4;
        }
      }
    }
  }

  .nav {
    height: 40px;
    line-height: 40px;
    color: #ffffff;
    background-color: #5182f4;
    ul {
      display: flex;
      justify-content: center;

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
    top: 2.25rem;
    left: 0;
    width: 100%;
    border-top: 0.05rem solid #f5f5f5;
    border-bottom: 0.05rem solid #f5f5f5;
    background: #f5f5f5;
  }
}
</style>