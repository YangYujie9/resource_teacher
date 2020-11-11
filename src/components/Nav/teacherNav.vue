<template>
  <div class="tearch-nav">
    <el-menu
      class="el-menu-vertical-demo"
      background-color="#f2f5fc"
      :default-active="activeIndex"
      @select="handleSelect"
    >
      <el-menu-item :index="list.index" v-for="list in meauList">
        <i :class="list.icon"></i>
        <span slot="title">{{list.name}}</span>
      </el-menu-item>

    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex:'',
      meauList: [{
          index:'/teacher/personal/profile',
          icon:'el-icon-user',
          name:'个人信息'
        },{
          index:'/teacher/personal/myResources',
          icon:'el-icon-paperclip',
          name:'我的资源'
        },{
          index:'/teacher/personal/mySharing',
          icon:'el-icon-share',
          name:'我的分享'
        },{
          index:'/teacher/personal/myCollections',
          icon:'el-icon-star-off',
          name:'我的收藏'
        },{
          index:'/teacher/personal/myDownload',
          icon:'el-icon-download',
          name:'我的下载'
        },{
          index:'/teacher/personal/myExampaper',
          icon:'el-icon-document',
          name:'我的组卷'
        },{
          index:'/teacher/personal/myWarehouse',
          icon:'el-icon-menu',
          name:'我的题库'
        },
        // {
        //   index:'8',
        //   icon:'el-icon-menu',
        //   name:'我的组课'
        // },{
        //   index:'9',
        //   icon:'el-icon-menu',
        //   name:'我的消息'
        // },{
        //   index:'10',
        //   icon:'el-icon-menu',
        //   name:'我的班级'
        // },

      ]
    };
  },
  watch: {

  },
  activated() {
    
    this.meauList.forEach(list=>{
      this.$route.fullPath.indexOf(list.index)>-1?this.activeIndex = list.index:null
    })

  },
  mounted() {

      this.meauList.forEach(list=>{
        this.$route.fullPath.indexOf(list.index)>-1?this.activeIndex = list.index:null
      })


  },
  methods: {
    handleSelect(key, keyPath) {
      if (key.indexOf("/") == 0) {
        this.$router.push(key);
      }
    }
  }
};
</script>
<style  lang="less">
.tearch-nav {
  .el-menu-item:hover {
    background-color: #97b5fe4a !important;
    color: #409EFF;
  }
  .el-menu-item:focus,
  .el-menu-item.is-active {
    background-color: #97b5fe !important;
    color: #ffffff;
  }
  .el-menu {
    border-right: 0px;
  }

  .el-menu-item, .el-submenu__title {
    height: 42px;
    line-height: 42px;
  }

  .el-menu-item.is-active {
        background-color:#97b5fe !important;
    color: #ffffff;
  }
}
</style>
<style scoped lang="less">
.tearch-nav {
  width: 200px;
  border: 1px solid #e2e2e2;
  // height: 50%;
  // padding: 20px 0;
  //margin-right: -10px;
}
</style>