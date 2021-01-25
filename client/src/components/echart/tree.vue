<!-- 折线图 -->
<template>
  <div ref="box">
    <!-- echart表格 -->
    <div ref="myTree" :style="echartStyle" />
  </div>
</template>

<script>
import resize from './mixins/resize'
export default {
  mixins: [resize],
  props: {
    // 样式 - 1
    echartStyle: {
      type: Object,
      default() {
        return {}
      }
    },

    // 标题文本 - 1
    titleText: {
      type: String,
      default: ''
    },

    // 数据
    data: {
      type: Array,
      default() {
        return []
      }
    },

    // 颜色
    color: {
      type: Array,
      default() {
        return ['#5cacff', '#faa465', '#5cd1ce', '#c3aeef', '#f49299', '#fce289']
      }
    },
    right: {
      type: String,
      default: '20%'
    }
  },
  data() {
    return {
      chart: null
    }
  },
  // 监听数据变化 变化时刷新图表
  watch: {
    opinionData: {
      handler(newValue, oldValue) {
        this.chart.clear() // 清空画布
        this.drawTree('myTree') // 刷新echarts图表
      },
      deep: true
    }
  },
  mounted() {
    this.$nextTick(function() {
      this.drawTree('myTree')
    })
  },
  methods: {
    // 监听扇形图点击
    eConsole(param) {
    // 向父组件传值
      this.$emit('currentEchartData', param.name)
    },

    // 绘制折线图
    drawTree(ref) {
      this.chart = this.$echarts.init(this.$refs[ref])
      this.chart.on('click', this.eConsole)
      this.chart.showLoading()
      this.chart.hideLoading()
      this.chart.setOption({
        title: {
          left: 'center',
          text: this.titleText, // 标题文本
          textStyle: {
            fontSize: 16,
            color: '#333'
          }
        },
        tooltip: {
          trigger: 'item',
          triggerOn: 'mousemove'
        },
        // legend: {
        //   top: '2%',
        //   left: '3%',
        //   orient: 'vertical',
        //   data: [{
        //     name: 'tree1',
        //     icon: 'rectangle'
        //   },
        //   {
        //     name: 'tree2',
        //     icon: 'rectangle'
        //   }],
        //   borderColor: '#c23531'
        // },
        series: [
          {
            type: 'tree',

            data: this.data,

            top: '0',
            left: '7%',
            bottom: '1%',
            right: this.right,

            symbolSize: 7,

            label: {
              position: 'left',
              verticalAlign: 'middle',
              align: 'right',
              fontSize: 14
            },

            leaves: {
              label: {
                position: 'right',
                verticalAlign: 'middle',
                align: 'left'
              }
            },

            expandAndCollapse: true,
            animationDuration: 550,
            animationDurationUpdate: 750
          }
        ]
      })
    }
  }
}
</script>
