<template>
  <el-dialog
    title="试卷分析"
    :visible.sync="visible"
    :close-on-click-modal="false"
    width="800px"
    :before-close="closeDialog"
    @opened="getdata"
  >
    <div class="analisis">
      <el-radio-group v-model="activetype" size="small">
        <el-radio-button label="entirety">总体分析</el-radio-button>
        <el-radio-button label="difficulty">难度分析</el-radio-button>
        <el-radio-button label="point">知识点分析</el-radio-button>
      </el-radio-group>

      <div class="centent-wrap">
        <div class="circle" v-show="activetype=='entirety'">
          <div id="circle_one" style="width:45%;"></div>
          <div id="circle_two" style="width:55%;"></div>
        </div>
        <div v-show="activetype=='difficulty'">
            <el-table
              :data="difficultyData"
              border
              style="width: 100%">
              <!-- <el-table-column
                type="index"
                label="题号"
                align="center"
                width="80">
              </el-table-column> -->
              <el-table-column
                prop="key"
                align="center"
                label="试题难易程度">
              </el-table-column>
              <el-table-column
                prop="num"
                align="center"
                label="题量">
                <template  slot-scope="scope">
                  {{scope.row.value?scope.row.value.length:0}}
                </template>
              </el-table-column>
              <!-- <el-table-column
                prop="index"
                align="center"
                label="题号">
              </el-table-column> -->
              <el-table-column
                prop="pencent"
                align="center"
                label="题量占比">
                <template  slot-scope="scope">
                  {{scope.row.value?(scope.row.value.length*100/total).toFixed(2):0}}%
                </template>
              </el-table-column>
            </el-table>
        </div>
        <div v-show="activetype=='point'">
            <el-table
              :data="pointData"
              border
              style="width: 100%">
              <!-- <el-table-column
                type="index"
                label="题号"
                align="center"
                width="80">
              </el-table-column> -->
              <el-table-column
                prop="key"
                align="center"
                label="知识点">
              </el-table-column>
              <el-table-column
                prop="value"
                align="center"
                label="题量">
              </el-table-column>

              <el-table-column
                prop="pencent"
                align="center"
                label="题量占比">
                <template  slot-scope="scope">
                  {{(scope.row.value*100/total).toFixed(2)}}%
                </template>
              </el-table-column>
            </el-table>
        </div>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="closeDialog" size="mini">取 消</el-button>
      <el-button type="primary" @click="closeDialog" size="mini">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import echarts from "echarts";
import { mapGetters } from 'vuex'
var circle_one_chart;
var circle_two_chart;
export default {
  props: {
    dialogVisible: {
      type:Boolean,
    }, 
    paperId: {
      type: String,
    }
  },
  data() {
    return {
      activetype: "entirety",
      total: 0,
      difficultyData: [],
      pointData:[],
      circle_one_option: {
        title: {
          text: "试题总体分析",
          left: "center",
          top: "0%"
        },
        color: ["#ffab47", "#ff8a00"],
        tooltip: {
          trigger: "item",
          formatter: "{b} : {c} ({d}%)"
        },
        legend: {
          x: "center",
          y: "bottom",
          data: [],
          //icon: "circle",
          padding: 0,
          itemGap: 6,
          itemWidth: 16,
          // formatter: function(name) {
          //   console.log(option)
          //   // return name+'20';
          // },
          textStyle: {
            color: "#949494"
          }
        },

        series: [
          {
            type: "pie",
            radius: "60%",
            center: ["50%", "50%"],
            //selectedMode: 'single',
            label: {
              //饼图图形上的文本标签
              normal: {
                show: true,
                position: "inner", //标签的位置
                textStyle: {
                  fontWeight: 300,
                  fontSize: 12 //文字的字体大小
                },
                formatter: "{d}%"
              }
            },
            data: [
      
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      },
      circle_two_option: {
        title: {
          text: "题型总体分析",
          left: "center",
          top: "0%"
        },
        color: ["#4fa0f7", "#95c8ff", "#2489f6","#89b5e6", "#79aee8","#0f77e6","#7fdeff","#39cccc","#1ca7ec","#22deca"],
        tooltip: {
          trigger: "item",
          formatter: "{b} : {c} ({d}%)"
        },
        legend: {
          x: "center",
          y: "bottom",
          data: [],
          //icon: "circle",
          padding: 0,
          itemGap: 6,
          itemWidth: 16,
          textStyle: {
            color: "#949494"
          }
        },

        series: [
          {
            type: "pie",
            radius: "60%",
            center: ["50%", "50%"],
            //selectedMode: 'single',
            label: {
              //饼图图形上的文本标签
              normal: {
                show: true,
                position: "inner", //标签的位置
                textStyle: {
                  fontWeight: 300,
                  fontSize: 12 //文字的字体大小
                },
                formatter: "{d}%"
              }
            },
            data: [],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      }
    };
  },
  computed: {
    visible() {
      return this.dialogVisible;
    },

    ...mapGetters([
      'gradeList',
      'getuserInfo',

    ]),
  },
  mounted() {},
  methods: {
    closeDialog() {
      this.$emit("close");
    },

    changeindex(index) {
      const list = {
        "0": "零",
        "1": "一",
        "2": "二",
        "3": "三",
        "4": "四",
        "5": "五",
        "6": "六",
        "7": "七",
        "8": "八",
        "9": "九"
      };
      return list[index + 1];
    },

    getdata() {


      this.$http.get(`/api/open/paper/getPaperAnalysis/${this.paperId}`)
      .then((data)=>{
        if(data.status == '200') {
          // data.data.questionList.forEach(list=>{

          // })
          this.total = 0
          this.pointData = []
          this.circle_one_option.legend.data = []
          this.circle_one_option.series[0].data = []

          this.circle_two_option.legend.data = []
          this.circle_two_option.series[0].data = []

          this.difficultyData = data.data.questionList

          for(let key in data.data.typeMap) {
            this.total += Number(data.data.typeMap[key])
            this.circle_one_option.legend.data.push(key)
            // this.circle_one_option.legend.formatter = function(name) {
            //   return name + data.data.typeMap[key]
            // }
            this.circle_one_option.series[0].data.push({name: key, value:data.data.typeMap[key]})

          }


          for(let key in data.data.questionTypeMap) {
            this.circle_two_option.legend.data.push(key)
            this.circle_two_option.series[0].data.push({name: key, value:data.data.questionTypeMap[key]})
          }

          for(let key in data.data.knowledgeMap) {
            this.pointData.push({key: key,value:data.data.knowledgeMap[key]})
          }



          if (circle_one_chart) {
            circle_one_chart.clear();
            circle_one_chart = null;
          }
          // console.log(document.getElementById("circle_one"));

          this.$nextTick(() => {

            circle_one_chart = echarts.init(document.getElementById("circle_one"));
            circle_one_chart.setOption(this.circle_one_option);
          });

          if (circle_two_chart) {
            circle_two_chart.clear();
            circle_two_chart = null;
          }

          this.$nextTick(() => {
            circle_two_chart = echarts.init(document.getElementById("circle_two"));
            circle_two_chart.setOption(this.circle_two_option);
          });
        }
      })




    }
  }
};
</script>
<style lang="less">
.analisis {
  .el-table td,
  .el-table th {
    padding: 8px 0;
  }

  .el-radio-button__inner {
    margin-right: 20px;
  }
}
</style>
<style scoped lang="less">
.analisis {
  .centent-wrap {
    margin-top: 10px;

    .circle {
      display: flex;
      height: 300px;
    }
  }
}
</style>