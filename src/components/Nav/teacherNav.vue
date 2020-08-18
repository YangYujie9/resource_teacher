<template>
  <div class="tearch-nav">
    <el-menu
      class="el-menu-vertical-demo"
      background-color="#f2f5fc"
      @select="handleSelect"
    >
      <el-menu-item index="1">
        <i class="el-icon-menu"></i>
        <span slot="title">个人信息</span>
      </el-menu-item>
      <el-menu-item index="2">
        <i class="el-icon-document"></i>
        <span slot="title">我的资源</span>
      </el-menu-item>
      <el-menu-item index="3">
        <i class="el-icon-setting"></i>
        <span slot="title">我的分享</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <span slot="title">我的收藏</span>
      </el-menu-item>
      <el-menu-item index="5">
        <i class="el-icon-setting"></i>
        <span slot="title">我的下载</span>
      </el-menu-item>
      <el-menu-item index="/teacher/myExampaper">
        <i class="el-icon-setting"></i>
        <span slot="title">我的组卷</span>
      </el-menu-item>

      <el-menu-item index="/teacher/myWarehouse">
        <i class="el-icon-setting"></i>
        <span slot="title">我的题库</span>
      </el-menu-item>
      <el-menu-item index="8">
        <i class="el-icon-setting"></i>
        <span slot="title">我的组课</span>
      </el-menu-item>
      <el-menu-item index="9">
        <i class="el-icon-setting"></i>
        <span slot="title">我的消息</span>
      </el-menu-item>
      <el-menu-item index="10">
        <i class="el-icon-setting"></i>
        <span slot="title">我的班级</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  mounted() {},
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
  // height: 50%;
  padding: 20px 0;
  //margin-right: -10px;
}
</style>