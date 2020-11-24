<template>
  <div>
    <el-dialog
      title="添加收藏"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      width="840px"
      custom-class="favorite"
      :before-close="closeDialog">
      <div class="favorite">
        <div class="favorite-top">
          <p class="favorite-top-left">
            <i class="iconfont iconshoucang1 icon"></i>
          </p>
          <div>
            <p class="p1">添加收藏</p>
            <p>将该试题添加为收藏，方便以后直接在“我的收藏”中返问。</p>
          </div>
        </div>
        <el-form label-width="80px" :model="collection" size="small">
          <!-- <el-form-item label="名称：">
            <el-input v-model="collection.name" style="width:675px;"></el-input>
          </el-form-item> -->
          <el-form-item label="收藏夹：">
            <el-select v-model="collection.folderId" placeholder="请选择" style="width:560px;margin-right: 20px;">
              <span slot="prefix"><i class="iconfont iconwenjianjia iconclass" style="color:#faca10;margin-left:4px;"></i></span>
              <el-option
                v-for="item in folderNameList"
                :key="item.id"
                :label="item.folderName"
                :value="item.folderId">

                <span style="float: left"><i class="iconfont iconwenjianjia iconclass" style="color:#faca10;"></i> {{ item.folderName }}</span>
                <!-- <span style="float: right; color: #8492a6; font-size: 13px"><i class="iconfont iconshanchu-copy"></i></span>  -->
              </el-option>
            </el-select>
            <el-button type="primary" @click="newfavoriteVisible=true">新建收藏夹</el-button>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addCollectFolder" size="small">收 藏</el-button>
        <el-button @click="closeDialog" size="small">取 消</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="新建收藏夹"
      :visible.sync="newfavoriteVisible"
      :close-on-click-modal="false"
      width="600px"
      custom-class="newfavorite">
      <div class="newfavorite">
        <span>名称：</span><el-input v-model="newfolderName" style="width:380px;" size="small"></el-input>

        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addFolder" size="small">添 加</el-button>
        <el-button @click="newfavoriteVisible = false" size="small">取 消</el-button>
      </span>
    </el-dialog>
    <!-- <newFavorite :dialogVisible="newfavoriteVisible" @close="close_newfavorite" @getData="getFolderNameList"></newFavorite> -->
  </div>
</template>

<script>
import newFavorite from './new_favorite'
import { VueDebounce } from "@/utils/public";


export default {
  props: ["dialogVisible",'questionId'],
  components: {
    newFavorite
  },
  data() {
    return {
      newfavoriteVisible:false,
      newfolderName:'',
      collection: {
        name: '',
        folderId: ""
      },
      folderNameList: [],
      // list: ["全部", "选择题", "填空题", "解答题", "判断题", "全部"],

    };
  },
  mounted() {
    //this.$emit("getTreeData", this.treeData);
    // MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
    this.getFolderNameList()

  },

  methods: {
    closeDialog() {
      this.$emit("close");
    },

    close_newfavorite() {
      this.newfavoriteVisible = false
    },

    // getFolderNameListDebounce: VueDebounce('getFolderNameList',1000),


    getFolderNameList() {
      this.$http.get(`/api/open/collectFolder/getFolderNameList`)
      .then((data)=>{
        this.folderNameList = data.data
        if(this.folderNameList.length) {
          if(this.isAdd) {
            this.collection.folderId = this.folderNameList[this.folderNameList.length-1].folderId
            this.isAdd = false
          }else {
            this.collection.folderId = this.folderNameList[0].folderId
          }
        }


        
        
      })
    },

    addCollectFolder() {
      this.$http.post(`/api/open/collectFolder/addCollectFolder`,{
        folderId: this.collection.folderId,
        questionId: this.questionId
      })

      .then((data)=>{
        if(data.status == '200') {
          this.$message({
            message:"收藏成功",
            type:"success"
          })
          
        }
        this.$emit("close");
      })
    },

    cancelCollect() {
      this.$http.post(`/api/open/collect/${collectId}`,{
        folderName: this.collection.folderName,
        questionId: this.questionId
      })

      .then((data)=>{
        if(data.status == '200') {
          this.$message({
            message:"取消收藏成功",
            type:"success"
          })
          this.$emit("close");
        }
      })
    },

    addFolder() {
      this.$http.post(`/api/open/collectFolder/addFolder`,{
        folderName: this.newfolderName
      })
      

      .then((data)=>{
        if(data.status == '200') {
          
          this.newfavoriteVisible = false
          this.isAdd = true
          this.getFolderNameList()  
        }
      })
    }
    
  }
};
</script>
<style lang="less">
.favorite {

  .el-dialog__footer {
    text-align: center;
  }
  .el-input__inner {
      // background: transparent !important;
  }
  
}
</style>
<style scoped lang="less">
.favorite {
  &-top {
    display: flex;
    align-items: center;
    margin-bottom: 20px;

    &-left {
      width: 80px;

      .icon {
        font-size: 56px;
        color: #faca10;
      }
    }

    .p1 {
      font-size: 18px;
    }
  }


}
  .newfavorite {
    margin-top: 20px;
    text-align: center;
  }
</style>