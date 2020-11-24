<template>
  <div class="top-popover">
    <div class="top-div">
      <p class="titlep">
        <slot name="reference"></slot>
      </p>
      <div class="popover-div" v-show="!isError">
          <div style="padding-bottom: 8px;">
            <p>学科：</p>
             <el-radio-group v-model="subject" size="mini" :disabled="subjectEditable" @change="changeSubject">
                <el-radio-button :label="item" :key="item.code" v-for="item in subjectList">{{item.subjectName}}</el-radio-button>
            </el-radio-group>
          </div>
          <div v-show="chooseType=='chapter'"  class="one-part">
            <p>年级：</p>
             <el-radio-group v-model="grade" size="mini" @change="getOeseList" :disabled="isError">
              <el-radio-button :label="list" :key="list.key" v-for="list in customGradeList">{{list.value}}</el-radio-button>
            </el-radio-group>
          </div>
          <div v-show="chooseType=='chapter'"  class="one-part">
            <p>教材版本：</p>
             <el-radio-group v-model="oese" size="mini" :disabled="isError">
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
    isActual: {
      type: Boolean,
      default: false
    },
    gradeId: {
      type: String
    },
    isError: {
      type: Boolean,
      default: false
    },
    questionDetail: {
      type: Object
    },
    isRemembered: {
      type: Boolean,
      default: false
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
      grade:'',
      oese:'',
      volume:'',
      subjectEditable:false,
      versionList:[],
      volumeList:[],
      query: {},
      rememberedSearch:'',
    };
  },
  watch: {

    volume(val) {
      let id = val?val.id:''
      let oeseId = this.oese.id?this.oese.id:''
      this.$emit('setparams',id,this.subject.code, this.grade.key, oeseId)
    },

    subject(val) {
      let oeseId = this.oese.id?this.oese.id:''
      this.$emit('setparams',this.volume.id,val.code, this.grade.key, oeseId)
    },


    oese(val) {
      let id = val?val.id:''
      this.$emit('setoeseId', id)
    }


  },
  computed: {

    ...mapGetters([
      'gradeList',
      'subjectList',
      'getuserInfo',
      'isReady'

    ]),

    customGradeList() {

      if(this.subject.code == 'SubjectPhysic') {
        let list = []
        this.gradeList.forEach(item=>{
          if(item.key != 'SEVENTH_GRADE_U' && item.key != 'SEVENTH_GRADE_D') {
            list.push(item)
          }
        })
        return list
      }else {
        return this.gradeList
      }
    }
  },


  mounted() {
    if(this.isActual) {
      this.subjectEditable = true
      this.subject = this.subjectList.filter(item=>{
        return item.code == this.subjectCode
      })[0]


      this.grade = this.gradeList.filter(item=>{
        return item.key == this.gradeId
      })[0]

      this.getOeseList()
      // this.versionList = this.acVersionList
      // this.oese = this.versionList[0]

      // this.volumeList = this.acVolumeList
      // this.volume = this.volumeList[0]

      // this.$emit('setparams',this.volume.oeseId,this.subject.code)
    }else if(this.isError){
        this.subjectEditable = true
        this.subject = this.subjectList.filter(item=>{
          return item.code == this.questionDetail.subjectCode
        })[0]


        if(this.questionDetail.oeseBook && this.questionDetail.oeseBook.id)
        this.volume = {
          id: this.questionDetail.oeseBook.id,
          name: this.questionDetail.oeseBook.name
        }

      // this.getVersion()


    
    }else {


      if(this.getuserInfo.userType == 'Teacher') {
        this.subjectEditable = true
        this.subject = this.subjectList.filter(item=>{
          return item.code == this.getuserInfo.subjectCode
        })[0]
      }else {
        this.subject = this.subjectList[0]
        
      }

      this.rememberedSearch = JSON.parse(localStorage.getItem("rememberedSearch"))

      if(this.isRemembered && this.rememberedSearch) {
        

        let grade = this.customGradeList.filter(item=>{
          return item.key == this.rememberedSearch.gradeId
        })

        this.grade = (grade && grade.length)?grade[0]:this.customGradeList[0]
        console.log(this.grade)
      }else {
        this.grade = this.customGradeList[0] 
      }
      

      this.getOeseList('mounted')



    }

  
    

      // console.log(this.acVersionList, this.acVolumeList, this.subjectCode)
  
    

  },
  methods: {
    changeSubject() {
      this.grade = this.customGradeList[0]
      this.getOeseList()
    },

    getOeseList(flag) {



      this.versionList = []
      this.volumeList = []

      this.$http.get(`/api/open/common/books/${this.getuserInfo.school.id}?subjectCode=${this.subject.code}&grade=${this.grade.key}`)
      .then(data=>{
        if(data.status == '200') {
          if(data.data.oese && data.data.oese.id) {
            this.versionList.push(data.data.oese)
            this.oese = this.versionList[0]

            // if(this.isError) {
            //   this.oese = this.versionList.filter(list=>{
            //     return list.oeseId == this.questionDetail.versionId
            //   })[0]
            // }else {
            //   this.oese = this.versionList[0]
            // }

          }else {
            this.oese = ''
          }

          if(data.data.volumes && data.data.volumes.length) {
            this.volumeList = data.data.volumes
            this.volume = this.volumeList[0]

            // if(this.isError) {
            //   this.volume = this.volumeList.filter(list=>{
            //     return list.oeseId == this.questionDetail.volumeId
            //   })[0]
            // }else {
            //   this.volume = this.volumeList[0]
            // }

          }else {
            this.volume = ''
          }

          if(!this.oese && !this.volume) {

            let oeseId = this.oese.id?this.oese.id:''

            this.$emit('setparams',this.volume.id,this.subject.code, this.grade.key, oeseId)
          }


          //记住首页选项的页面

          if(this.isRemembered && flag=='mounted') {

              let oese = this.versionList.filter(list=>{
                return list.id == this.rememberedSearch.oeseId
              })
              let volume = this.volumeList.filter(list=>{
                return list.id == this.rememberedSearch.volumeId
              })
              oese && oese.length?this.oese = oese[0]:null

              volume && volume.length?this.volume = volume[0]:null

          }
        }
      })
    },

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
    z-index: 2000;

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
      padding: 0 40px 0 20px;
      position: relative;

      .top-title {
        
        // padding: 0 40px 0 20px;
        // display: flex;
        // justify-content: space-around;
        
        text-align: center;
        white-space: nowrap;
        overflow: hidden;
        text-overflow:ellipsis;



      }

        .settingicon {
          position: absolute;
          right: 10px;
          color: #cdd7d7;
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