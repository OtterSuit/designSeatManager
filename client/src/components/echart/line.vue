<!-- 折线图 -->
<template>
  <div ref="box">
    <!-- echart表格 -->
    <div ref="myLine" :style="echartStyle" />
  </div>
</template>

<script>
// import elementResizeDetectorMaker from 'element-resize-detector'
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

    // 提示框键名
    tooltipFormatter: {
      type: String,
      default: ''
    },

    // 区域名称 - 1
    opinion: {
      type: Object,
      default() {
        return {
          data: []
        }
      }
    },

    // 提示框标题
    seriesName: {
      type: Array,
      default() {
        return []
      }
    },

    // 区域数据 - 1
    opinionData: {
      type: Array,
      default() {
        return []
      }
    },

    // x 轴
    x: {
      type: Array,
      default() {
        return []
      }
    },

    xTick: {
      type: Object,
      default() {
        return {
          alignWithLabel: true,
          lineStyle: {
            color: '#999'
          }
        }
      }
    },
    xLabel: {
      type: Object,
      default() {
        return {
          color: 'rgba(0,0,0,0.45)'
        }
      }
    },
    xLine: {
      type: Object,
      default() {
        return {
          lineStyle: {
            color: '#999'
          }
        }
      }
    },

    // y轴
    y: {
      type: Object,
      default() {
        return {
          type: 'value',
          minInterval: 5,
          min: 0,
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          axisLabel: {
            color: 'rgba(0,0,0,0.45)'
          }
        }
      }
    },

    // 颜色
    color: {
      type: Array,
      default() {
        return ['#5cacff', '#faa465', '#5cd1ce', '#c3aeef', '#f49299', '#fce289']
      }
    },
    top: {
      type: String,
      default: '15%'
    }
    // magicTypeShow: {
    //   type: Boolean,
    //   default: true
    // }
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
        this.drawLine('myLine') // 刷新echarts图表
      },
      deep: true
    }
  },
  mounted() {
    this.$nextTick(function() {
      this.drawLine('myLine')
    })
    // var erd = elementResizeDetectorMaker()
    // const that = this
    // erd.listenTo(this.$refs.box, function(element) {
    //   that.$nextTick(function() {
    //     // 使echarts尺寸重置
    //     that.charts.resize()
    //   })
    // })
  },
  methods: {
    // 监听扇形图点击
    eConsole(param) {
    // 向父组件传值
      this.$emit('currentEchartData', param.name)
    },

    // 绘制折线图
    drawLine(ref) {
      this.chart = this.$echarts.init(this.$refs[ref])
      this.chart.on('click', this.eConsole)
      this.chart.setOption({
        title: {
          left: 'center',
          text: this.titleText, // 标题文本
          textStyle: {
            fontSize: 16,
            color: '#333'
          }
        },
        color: this.color,
        tooltip: {
          trigger: 'axis'
        },
        legend: this.opinion, // 区域名称
        grid: {
          left: '1%',
          right: '1%',
          bottom: '3%',
          top: this.top,
          containLabel: true
        },
        toolbox: {
          showTitle: false,
          right: '3%',
          top: '0%',
          emphasis: {
            iconStyle: {
              borderColor: '#5cacff'
            }
          }
          // feature: {
          //   // saveAsImage: {},
          //   magicType: { show: this.magicTypeShow, type: ['line', 'bar'] }
          // }
        },
        xAxis: { // x 轴
          type: 'category',
          boundaryGap: true,
          data: this.x,
          axisTick: this.xTick,
          axisLabel: this.xLabel,
          axisLine: this.xLine
        },
        yAxis: this.y,
        series: this.opinionData // 区域数据
      })
    }
  }
}
</script>
