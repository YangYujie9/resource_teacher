<template>
<div>
    <el-dialog
      title="新建收藏夹"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      width="600px"
      custom-class="favorite"
      :before-close="closeDialog">
      <div class="favorite">
        <span>名称：</span><el-input v-model="collection.name" style="width:380px;" ></el-input>
        <!-- <el-form label-width="100px" :model="collection" size="small">
          <el-form-item label="名称：">
            <el-input v-model="collection.name" style="width:380px;"></el-input>
          </el-form-item>
          <el-form-item label="创建位置：">
            <el-select v-model="collection.favotite" placeholder="请选择" style="width:380px;">
              <span slot="prefix"><i class="iconfont iconwenjianjia iconclass" style="color:#faca10;margin-left:4px;"></i></span>
              <el-option
                v-for="item in list"
                :key="item"
                :label="item"
                :value="item">

                <span style="float: left"><i class="iconfont iconwenjianjia iconclass" style="color:#faca10;"></i> {{ item }}</span>
                <span style="float: right; color: #8492a6; font-size: 13px"><i class="iconfont iconshanchu-copy"></i></span>  
              </el-option>
            </el-select>

          </el-form-item> -->
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="closeDialog" size="small">添 加</el-button>
        <el-button @click="closeDialog" size="small">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ["dialogVisible"],
  data() {
    return {
      collection: {
        name: [],
        favotite: ""
      },
      // list: ["全部", "选择题", "填空题", "解答题", "判断题", "全部"],

    };
  },
  mounted() {
    //this.$emit("getTreeData", this.treeData);
    MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
  },

  methods: {
    closeDialog() {
      this.$emit("close");
    }
  }
};
</script>
<style lang="less">
.favorite {

  .el-dialog__footer {
    text-align: center;
  }
}
</style>
<style scoped lang="less">
.favorite {
  margin-top: 20px;
  text-align: center;
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
</style>