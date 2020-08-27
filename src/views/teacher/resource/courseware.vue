<template>
  <div class="courseware">
    <resourceList :isfixTab="isfixTab" :resourceName="rescoure.name"></resourceList>
  </div>
</template>

<script>

import { mapGetters } from 'vuex'
import topPopover from "@/components/Popover/topPopover";
import resourceList from "./resourceList";
export default {
  props: ['isfixTab'],
  components: {
    resourceList,
    topPopover,
  },
  data() {
    return {
      rescoure: {
        name:'课件'
      }
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


    
  }
};
</script>
<style lang="less">
.rescoure-center {
  .content-wrap {
    width: 68% !important;
    margin:0 auto !important;
  }
}

</style>
<style scoped lang="less">
.rescoure-center {
  width: 100%;


  &-top {
    width: 68%;
    margin: 0 auto;
    min-width: 1250px;
    height: 100%;
    // display: flex;
  }
  .rescoure-wrap {
    // padding: 0px 10px;

    // width: 70%;
    // margin: 0 auto;
    

    .top-div {
      height: 36px;
      line-height: 36px;
      border: 1px solid #e2e2e2;
      margin-top: 20px;
      display: flex;
      background-color: #e8ecf0;
      color: #9ea1a5;

      .top-p {
        border-right: 1px solid #e2e2e2;
        padding: 0 10px;

        .active-color {
          color: #409EFF;
        }
      }
    }
    .rescoure-content-wrap {
      

      .one-part {
        margin-top: 20px;
        border: 1px solid #e2e2e2;
        padding: 20px 10px;
        display: flex;
        color: #9ea1a5;
        line-height: 34px;

        &-left {
          width: 70%;

          .left-title {
            
            font-size: 1.2rem;
            font-weight: 600;
            color: #333333;

            .text {
              margin-left: 3px;
            }
          }

          .left-tag {
            margin-left: 30px;
          }



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
        }

        &-right {
          width: 30%;
          border-left: 1px solid #e2e2e2;
          text-align: center;
        }
      } 
    }


  }
}
</style>