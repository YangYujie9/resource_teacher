<template>
	<div class="basket-tag">
    <div class="right-tag">
      <el-badge :value="testBasket" class="item">
        <div class="circle">
          <i class="iconfont iconjiagouwuche iconposition"></i>
        </div>
      </el-badge>
      <span class="spandiv">试题篮</span>
    </div>
  </div>
</template>

<script>
	// import { mapGetters } from 'vuex'
export default {

  props: {

  },
  data() {
    return {
    	testBasket: 0,

    };
  },

  // computed: {
  //     ...mapGetters([
  //       'paperId',

  //     ]),
  // },
  mounted() {
  	//getmyTestBasket()
  },

  methods: {

    getmyTestBasket(gradeName) {


    	this.$http.get(`/api/open/paper/${gradeName.substr(0,gradeName.length-1)}/myTestBasket`)

    	.then((data)=>{

        this.$store.commit('setpaperId',data.data.paperId)
        let count = 0
        if(data.data.questionMap) {
          for(let key in data.data.questionMap) {
            data.data.questionMap[key].forEach(item=>{
              count++
            })
          }
          // data.data.questionMap.forEach(item=>{
          //   console.log(item)
          // })
        }
        this.testBasket = count

      })
    }
  }
};
</script>
<style lang="less">
.basket-tag {

  .el-dialog__footer {
    text-align: center;
  }
}
</style>
<style scoped lang="less">
.basket-tag {
  .right-tag {
    cursor: pointer;
    position: fixed;
    top: 55%;
    right: 2%;

    .circle {
      width: 52px;
      height: 52px;
      background: #3399ff;
      border-radius: 26px;
      text-align: center;

      .iconposition {
        position: relative;
        font-size: 30px;
        color: #ffffff;
        top: 10px;
      }
    }

    .spandiv {
      font-size: 0.8rem;
      position: relative;
      top: 10px;
    }
  }
}
</style>