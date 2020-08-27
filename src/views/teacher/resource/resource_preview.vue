<template>
  <div class="rescoure-preview">
    <div class="bread-div">
      <span style=""><i class="iconfont iconshouye iconclass"></i>当前位置：首页 > 课件</span>
    </div>

    <div class="rescoure-preview-wrap">
      <div class="rescoure-preview-wrap-left">
        <div class="rescoure-preview-wrap-left-top">
          <div style="display: flex;">
            <div style="width: 60px;height: 60px;"><i class="iconfont iconppt ppticon" style="font-size: 4rem;"></i></div>
            <div style="margin-left: 10px;">
              <p class="title">
                <span>第五课时物质的分散系</span>
                <el-rate
                  v-model="score"
                  disabled
                  show-score
                  text-color="#ff9900"
                  disabled-void-color="#C0C4CC"
                  score-template="{value}">
                </el-rate>
              </p>
              <p  style="margin-top: 10px;">
                化学 > 教材空 > 高一上
              </p>
            </div>
          </div>
          <div class="active-div">
            <p>
              <span>阅读（31）</span>
              <span>下载（31）</span>
              <span>评论（31）</span>
            </p>
            <p style="margin-top: 10px;">
              <span class="cursor"><i class="iconfont iconpinglun1 icon-color"></i> 评论</span>
              <span class="cursor"><i class="iconfont iconshoucang1 icon-color"></i> 收藏</span>
              <span class="cursor"><i class="iconfont iconfenxiang icon-color"></i> 分享</span>
              <span class="cursor"><i class="iconfont iconxiazai2 icon-color"></i> 下载</span>
            </p>
          </div>
        </div>

        <div class="rescoure-preview-wrap-left-content">
          <p>苏教版必修专题一第一单元</p>
          <div class="paper-content"></div>
        </div>
      </div>
      <div class="rescoure-preview-wrap-right">
        <el-button type="danger" @click="uploadResource" size="large" style="width: 100%"><i class="iconfont iconshangchuan"></i> 上传我的资源</el-button>
        <div class="person-div">
          <p style=" height: 40px;line-height: 40px;">资源贡献者</p>

          <div class="personinfo">
            <div style="width: 60px;height: 60px;background-color: #e2e2e2;"></div>
            <div style="margin-left: 10px;">
              <p>调问问</p>
              <p>贡献于2020-09-21</p>
            </div>
          </div>  
        </div>
  
        <div style="margin-top: 10px;">
          <div style="display: flex;justify-content: space-between;align-items: center;"> 
            <span style="font-size: 1.2rem;">同类精品资源</span>
            <el-button type="text">换一批</el-button>
          </div>

          <div>
            <span><i class="iconfont iconppt ppticon"></i> 第六课时 过滤与洁净</span>
          </div>
        </div>
      </div>
    </div>  
  </div>
</template>

<script>

import { mapGetters } from 'vuex'

export default {


  data() {
    return {
      score: 3,
    };
  },

  watch: {



  },
  computed: {

    ...mapGetters([
      'gradeList',
      'getuserInfo',

    ]),

 
  },
  mounted() {

  },

  methods: {
    uploadResource() {
      this.$router.push('/teacher/uploadResource')
    },

    
  }
};
</script>
<style lang="less">
.rescoure-preview {

}

</style>
<style scoped lang="less">
.rescoure-preview {
  width: 70%;
  margin: 0 auto;
  .ppticon {
    color: #d24625;
    font-size: 1.3rem;
  }

  .wordicon {
    color: #2a5698;
    font-size: 1.3rem;
  }

  .excelicon {
    color: #0f7b10;
    font-size: 1.3rem;
  }

  .pdficon {
    color: #dc2e1b;
    font-size: 1.3rem;
  }
  &-wrap {
    display: flex;


    &-left {
      width: 80%;
      margin-right: 20px;

      &-top {
        width: 100%;
        margin-top: 10px;
        display: flex;
        justify-content: space-between;


        .title {
          font-size: 1.3rem;
          display: flex;
        }

        .active-div {
          text-align: right;

          .icon-color {
            color: #409EFF;
          }
          span {
            margin-left: 20px;
          }
        }
      }


      &-content {
        margin-top: 20px;
        background-color:#ebeef6;
        padding: 20px;

        .paper-content {
          margin-top: 10px;
          background-color: #fbf9f9;
          height: 200px;
        }
      }
    }

    &-right {
      width: 20%;

      .person-div {
        margin-top: 20px;
        // padding-top:10px;
        padding-bottom:20px;
        border-top:1px dashed #ceced0;
        border-bottom:1px dashed #ceced0;

        .personinfo {
          display: flex;
          align-items:flex-end;
        }
      }


    }
  }
}
</style>