<template>
	<div class="basket-tag">

    <div class="ball" :class="{ball_hover: isAdd}" ref="ball"></div>
    <div class="right-tag" @click="gotoExamination">
      <el-badge :value="testBasket" class="item">
        <div class="circle"  ref="basket">
          <i class="iconfont iconjiagouwuche iconposition"></i>
        </div>
      </el-badge>
      <span class="spandiv">试题篮</span>
    </div>

  </div>
</template>

<script>

export default {

  props: {

  },

  data() {
    return {
    	testBasket: 0,
      isAdd: false,

    };
  },

  // computed: {
  //     ...mapGetters([
  //       'paperId',

  //     ]),
  // },
  mounted() {
  	// getmyTestBasket()
  },

  methods: {
    addToBasket(event,callback) {
      // 
      this.$refs.ball.style.top = event.pageY + 'px'
      this.$refs.ball.style.left = event.pageX + 'px'
      this.$refs.ball.style.opacity = 1
      this.$refs.ball.style.transition = 'left 0s, top 0s';
      setTimeout(()=>{

        let basket = this.$refs.basket.getBoundingClientRect()
        this.$refs.ball.style.top = basket.top + 20 +'px';
        this.$refs.ball.style.left = basket.left + 30 +'px';
        this.$refs.ball.style.opacity = '0'
        this.$refs.ball.style.transition = 'left 0.5s linear, top 0.5s ease-in, opacity 1s ease-in';
          // this.getmyTestBasket(callback)
      }, 20)
    },
    getmyTestBasket(callback,event) {

    	this.$http.get(`/api/open/paper/myTestBasket`)

    	.then((data)=>{

        this.$store.commit('setpaperId',data.data.paperId)
        
        if(data.data.paperId != JSON.parse(localStorage.getItem("paperId"))) {

          
          localStorage.setItem('paperId',JSON.stringify(data.data.paperId))
        }
        

        event? this.addToBasket(event):null
        
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
        this.$emit('gettestBasket',this.testBasket)
        callback && callback()

      })
    },


    gotoExamination() {

      this.$router.push('/questions/examinationPaper')
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
  .ball {
    width: 8px;
    height: 8px;         
    background: #409EFF;
    border-radius: 50%;
    position: fixed;
    left: 90px;
    top: 100px;
    opacity: 0;

  }

  .ball_hover {    
      top: 58%;
      left: 93%;
      transition: right 1s linear, top 1s ease-in;
      width:12px;
      height:12px;
      background: #5EA345;
      border-radius: 50%;
      position: fixed;
      background: red;
  }
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