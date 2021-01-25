<!-- 自定义 echart 组件 -->
<template>
  <div ref="box">
    <!-- echart表格 -->
    <!-- <div id="myChart" :style="echartStyle"></div> -->
    <div ref="myPie" :style="echartStyle" />
  </div>
</template>

<script>
import resize from './mixins/resize'
export default {
  mixins: [resize],
  props: {
    // 样式
    echartStyle: {
      type: Object,
      default() {
        return {}
      }
    },
    // 标题文本
    titleText: {
      type: String,
      default: ''
    },
    // 提示框键名
    tooltipFormatter: {
      type: String,
      default: ''
    },
    // 扇形区域名称
    opinion: {
      type: Object,
      default() {
        return {}
      }
    },
    // 提示框标题
    seriesName: {
      type: String,
      default: ''
    },
    // 扇形区域数据
    opinionData: {
      type: Array,
      default() {
        return []
      }
    },
    radius: {
      type: Array,
      default() {
        return ['0', '45%']
      }
    },
    center: {
      type: Array,
      default() {
        return ['50%', '50%']
      }
    },
    // 颜色
    color: {
      type: Array,
      default() {
        return ['#5cacff', '#faa465', '#5cd1ce', '#c3aeef', '#f49299', '#fce289']
      }
    },
    label: {
      type: String,
      default: '{d}%'
    },
    position: {
      type: String,
      default: ''
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
        this.drawPie('myPie') // 刷新echarts图表
      },
      deep: true
    }
  },
  mounted() {
    this.$nextTick(function() {
      this.drawPie('myPie')
    })
  },
  methods: {
    // 监听扇形图点击
    eConsole(param) {
      // 向父组件传值
      this.$emit('currentEchartData', param.name)
    },
    // 绘制饼状图
    drawPie(ref) {
      this.chart = this.$echarts.init(this.$refs[ref])
      // window.addEventListener('resize', this.charts.resize)
      // this.charts = this.$echarts.init(document.getElementById(id));
      this.chart.on('click', this.eConsole)
      this.chart.setOption({
        title: {
          text: this.titleText, // 标题文本
          left: 'center',
          textStyle: {
            fontSize: 16,
            color: '#333'
          }
        },
        color: this.color,
        tooltip: {
          trigger: 'item',
          formatter: '{b} : {c} ({d}%)'
          // formatter: "{a} <br/>{b} : {c}"
          // formatter: "{a} <br/> " + this.tooltipFormatter + ":{c}"
        },
        legend: this.opinion, // 扇形区域名称
        label: {
          formatter: this.label
        },
        series: [
          {
            name: this.seriesName, // 提示框标题
            type: 'pie',
            radius: this.radius,
            center: this.center,
            label: {
              position: this.position
            },
            // selectedMode: 'single',
            data: this.opinionData, // 扇形区域数据
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      })
    }
  }
}
</script>

<style scoped>
  #myChart{
    width: 100%;
  }
</style>
