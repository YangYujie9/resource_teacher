<template>

  <div class="block">
    <el-tree
      :data="originalTreeData"
      node-key="id"
      default-expand-all
      highlight-current
      ref="tree"
      
      :props="defaultProps"
      :filter-node-method="filterNode"
      icon-class="iconfont iconshouqi"
      :current-node-key="defaultSelectedNode"
      :expand-on-click-node="false"
      @node-click="handleNodeClick"
    >
      <span class="custom-tree-node" slot-scope="{ node, data }" :class="{customclass:(data.memberType == 'Organization' && !orgSelectable)}">
        <span class="nodetree">{{ node.label }}</span>
        <span class="active-wrap" v-if="enableEdit">
          
          <i class="iconfont iconiconjia iconclass" v-show="data.memberType == 'Organization'" @click="appendNode(node,data)"></i>
          <i class="iconfont iconbianji iconclass" @click="editNode(node,data)"></i>
          <i class="iconfont iconshanchu-copy" @click="deleteNode(node,data)"></i>
          <!-- <el-button type="text" size="mini" @click="() => append(data)"><i class="iconfont iconbianji"></i></el-button>
          <el-button type="text" size="mini" @click="() => remove(node, data)"><i class="iconfont iconshanchu-copy"></i></el-button> -->
        </span>
      </span>
    </el-tree>
  </div>
</template>

<script>
export default {
  name: "basicTree",
  props: {
    treeData: {
      type: [Object, Array],
      default: {}
    } /*树数据*/,
    enableEdit: {
      type: Boolean,
      default: false
    } /*是否允许编辑，默认不允许*/,
    filterText: {
      type:String,
      default:''
    },
    orgSelectable: {
      type:Boolean,
      default: false
    },
    defaultRoot:{
      type:Boolean,
      default:false
    },/*是否默认选中根节点，默认选中第一个学校节点*/
  },
  data() {
    return {
      defaultProps: {
        children: 'children',
        label: 'name',
        memberType: 'memberType',
      },

      originalTreeData:[],/*初始树数据*/
      currentSelectedNode:null,/*当前选中的节点*/
      defaultSelectedNode:"",/*默认选中的节点*/
      defaultSelectedId:this.selectedId,/*默认选中的节点id*/
      isInit:false,/*是否已初始化*/
      currentComponentId:null,/*树UUID*/
      firstSchool:null/*第一个学校节点*/
    };
  },
  created() {
    if(this.originalTreeData && this.originalTreeData.length > 0){
      this.initTreeData(JSON.parse(JSON.stringify(this.originalTreeData)));
    }
  },
  computed: {
    keyword() {

      return this.filterText
      
    },

  },
  mounted() {

  },
  watch: {
    keyword(val) {

      this.$refs.tree.filter(val);
    },
    treeData: {
      handler: function(newVal, oldVal) {

          this.initTreeData(JSON.parse(JSON.stringify(newVal)));
          let selectNode = this.defaultRoot? this.defaultSelectedNode: this.firstSchool;
          this.$emit('selectnode',selectNode)
          
          this.$nextTick(()=>{
            
            this.$refs.tree.setCurrentKey(selectNode);
            
          })
          
      }

    },

  },
  methods: {
    /*初始化树数据*/
    initTreeData(data) {
      let treeData = [];
      if (data.hasOwnProperty("members")) {
        let node = data.root;
        if (node) {
          // node.selected = true; /*默认选中根节点*/
          // node.isRoot = true; /*标记是是顶级节点*/
          // node.expand = true; /*默认展开顶级节点*/
          this.defaultSelectedNode = node.resourceId.id;
          this.constructTreeData(node, data.members);
          treeData.push(node);
          if (!this.defaultRoot) {
            this.firstSchool = this.deepFirstSearch(node);
          }
          this.originalTreeData = treeData;
          

        }
      }
      
    },
    /*重构树数据格式*/
    constructTreeData(node, data) {
      node.title = node.name;
      node.id = node.resourceId.id;
      let nodeChildren = data.filter(function(item) {
        return item.parentId && item.parentId.id === node.resourceId.id;
      });
      if (nodeChildren && nodeChildren.length > 0) {
        node.children = nodeChildren;
        
        for (let i = 0; i < node.children.length; i++) {
          let newNode = node.children[i];
          this.constructTreeData(newNode, data);
        }
      }
    },
    /*依次深度优先遍历--递归式*/
    deepFirstSearch(node) {
      let result;
      let isNotFound = true;
      if (node.children) {
        for (let n = 0; n < node.children.length; n++) {
          if (isNotFound) {
            result = this.deepFirstSearch(node.children[n]);
            isNotFound = result.memberType !== "School";
          }
        }
        return result;
      } else {
        return node;
      }
    },

    editNode(node,data) {
      this.$emit('editnode',node,data)
    },

    appendNode(node,data) {
      this.$emit('appendnode',node,data)
    },
    deleteNode(node,data) {
      this.$emit('deletenode',node,data)
    },

    // addscholl(node,data) {
    //   this.$emit('addscholl',node,data)
    // },
    
    //筛选
    filterNode(value, data) {

      if (!value) return true;
      return data.name.indexOf(value) !== -1;
    },

    handleNodeClick(data) {
      this.$emit('handleNodeClick',data)
    }


  }
};
</script>
<style lang="less">
.block {
  .el-tree-node__content {
    height: 44px;
  }
  .el-tree-node__expand-icon {
    color: #333333;
  }
  .el-tree-node__expand-icon.is-leaf {
    color: transparent;
  }

  .el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content,
  .el-tree-node__content:hover {
    cursor: pointer;
    color:#409EFF;
    background-color: transparent;
    // .active-wrap {
    //   display: block;
    // }
  }


}

</style>
<style lang="less" scoped>
.block {
    .custom-tree-node {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-right: 8px;

      &:hover {

        .active-wrap {
          display: block;
        }
      }
    }

    .customclass {
      //color: red;
      &:hover {
        cursor: default;
        color: #606266 !important;
      }

      .nodetree {
        color: #606266 !important;
      }
    }

    .active-wrap {
      display: none;
    }
}
</style>
