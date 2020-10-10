<template>
  <div class="top-popover">
    <div class="top-div">
      <p class="titlep">
        <slot name="reference"></slot>
      </p>
      <div class="popover-div">
          <div style="padding-bottom: 8px;">
            <p>学科：</p>
             <el-radio-group v-model="subject" size="mini" :disabled="subjectEditable" @change="getVersion">
                <el-radio-button :label="item" :key="item.code" v-for="item in subjectList">{{item.subjectName}}</el-radio-button>
            </el-radio-group>
          </div>
          <div v-show="chooseType=='chapter'"  class="one-part">
            <p>教材版本：</p>
             <el-radio-group v-model="oese" size="mini" @change="getVolumeList" :disabled="isError">
                <el-radio-button :label="item" :key="item.oeseId" v-for="item in versionList">{{item.name}}</el-radio-button>
            </el-radio-group>
          </div>
          <div v-show="chooseType=='chapter'"  class="one-part">
            <p>册别：</p>
             <el-radio-group v-model="volume" size="mini" :disabled="isError" >
                <el-radio-button :label="item" :key="item.oeseId" v-for="item in volumeList">{{item.name}}</el-radio-button>
            </el-radio-group>
          </div>

          <slot name="popover">
          </slot>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
export default {
  props: {
    chooseType:{
      type:String,
      default:'chapter',
    },
    subjectCode: {
      type:String,
    },
    acVersionList: {
      type:Array,
    },
    acVolumeList: {
      type: Array
    },
    isError: {
      type: Boolean,
      default: false
    },
    questionDetail: {
      type: Object
    }
  },
  components: {},
  data() {
    return {
      filter: {
        subject:'',
        oese: '',
        volume:'',
      },
      subject:'',
      oese:'',
      volume:'',
      subjectEditable:false,
      versionList:[],
      volumeList:[],
      query: {},
    };
  },
  watch: {

    volume(val) {

      val?this.$emit('setparams',val.oeseId,this.subject.code):null
    },

    subject(val) {

      this.$emit('setparams',this.volume.oeseId,val.code)
    }


  },
  computed: {

    ...mapGetters([
      'subjectList',
      'getuserInfo',
      'isReady'

    ]),
  },
  mounted() {
      if(this.acVersionList&&this.acVersionList.length) {
        this.subjectEditable = true
        this.subject = this.subjectList.filter(item=>{
          return item.code == this.subjectCode
        })[0]

        this.versionList = this.acVersionList
        this.oese = this.versionList[0]

        this.volumeList = this.acVolumeList
        this.volume = this.volumeList[0]

        // this.$emit('setparams',this.volume.oeseId,this.subject.code)
      }else if(this.isError){
          this.subjectEditable = true
          this.subject = this.subjectList.filter(item=>{
            return item.code == this.questionDetail.subjectCode
          })[0]

        this.getVersion()
      
      }else {

        if(this.getuserInfo.userType == 'Teacher') {
          this.subjectEditable = true
          this.subject = this.subjectList.filter(item=>{
            return item.code == this.getuserInfo.subjectCode
          })[0]
        }else {
          this.subject = this.subjectList[0]
          
        }

        this.getVersion()
      }

    
      

        // console.log(this.acVersionList, this.acVolumeList, this.subjectCode)
    
    

  },
  methods: {

    getVersion() {
      
      this.versionList = []
      this.volumeList = []

      this.$http.get(`/api/open/common/oeses/${this.subject.code}`)
      // this.$http.get(`/api/open/common/oeses/${this.getuserInfo.learningSection}/${this.subject.code}`)
      .then((data)=>{
        if(data.status == '200') {
          this.versionList = data.data
          if(this.versionList.length) {
            if(this.isError) {
              this.oese = this.versionList.filter(list=>{
                return list.oeseId == this.questionDetail.versionId
              })[0]
            }else {
              this.oese = this.versionList[0]
            }


            if(this.oese) {
              this.getVolumeList()
            }

            
            
          }

        }
      })
    },


    getVolumeList() {
      this.volumeList = []
      this.$http.get(`/api/open/common/oeseList/${this.oese.oeseId}`)
      .then((data)=>{
        if(data.status == '200') {
          this.volumeList = data.data

          if(this.volumeList.length) {
            if(this.isError) {
              this.volume = this.volumeList.filter(list=>{
                return list.oeseId == this.questionDetail.volumeId
              })[0]
            }else {
              this.volume = this.volumeList[0]
            }
          }
          

          // this.volume?this.$emit('setparams',this.volume.oeseId,this.subject.code):null
        }
      })
    }
  }
};
</script>
<style lang="less">
.top-popover {
  

  // .el-radio-button:first-child .el-radio-button__inner, .el-radio-button:last-child .el-radio-button__inner   
    .el-radio-button__inner {
      border: 0px;
      background-color: transparent;
      border-radius: 3px;
      font-size: 14px;
      color: #666;
    }
    .el-input__inner {
      background: #f0f3fa;
    }

    .el-radio-button:first-child .el-radio-button__inner,.el-radio-button:last-child .el-radio-button__inner {
      border-left: 0px;
      border-radius: 3px;
    }

    .el-radio-button__orig-radio:disabled+.el-radio-button__inner {
      background-color: transparent;
    }

    .el-radio-button__orig-radio:disabled:checked+.el-radio-button__inner {
      background-color: #409eff;
      color: #ffffff;
    }
}
</style>
<style scoped lang="less">
.top-popover {
  .top-div {
    height: 36px;
    position: relative;
    cursor: pointer;
    z-index: 1000;

    &:hover {
      .popover-div {
        display: block;
      }
    }

    .titlep {
      color: #3399ff;
      font-weight: 600;
      line-height: 36px;
      // text-align: center;


      .top-title {
        position: relative;
        padding: 0 20px;
        display: flex;
      justify-content: space-around;

        .settingicon {
          position: absolute;
          right: 20px;
          color: #cdd7d7;
        }
      }
    }

    .popover-div {
      padding: 20px;
      position: absolute;
      width: 700px;
      background-color: #f2f5fc;
      
      border: 1px solid #3399ff;
      //border-left: 0px;
      line-height: 40px;
      display: none;

      .one-part {
        border-top: 1px dashed #afb1b5;
        padding-bottom: 8px;
      }
    }
  }
}
</style>