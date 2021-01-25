<!-- 柱状图 -->
<template>
  <div ref="box">
    <!-- echart表格 -->
    <div ref="myBar" :style="echartStyle" />
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

    // 区域名称 - 1
    opinion: {
      type: Array,
      default() {
        return []
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
    formatter: {
      type: String,
      default: '{a} <br/>{b} : {c}'
    }
    // provideNumber: {
    //   type: Number,
    //   default: 6
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
        this.drawBar('myBar') // 刷新echarts图表
      },
      deep: true
    }
  },
  mounted() {
    this.$nextTick(function() {
      this.drawBar('myBar')
    })
  },
  methods: {
    // 监听扇形图点击
    eConsole(param) {
    // 向父组件传值
      this.$emit('currentEchartData', param.name)
    },

    // 绘制柱状图
    drawBar(ref) {
      this.chart = this.$echarts.init(this.$refs[ref])
      this.chart.on('click', this.eConsole)
      // window.addEventListener('resize', this.charts.resize)
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
          // formatter: '{b} : {c} ({d}%)'
          formatter: this.formatter
          // formatter: "{a} <br/> " + this.tooltipFormatter + ":{c}"
        },
        color: this.color,
        legend: {
          left: 'center',
          data: this.opinion // 区域名称
        },
        grid: {
          left: '1%',
          right: '1%',
          bottom: '3%',
          top: '15%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: this.x,
          axisTick: this.xTick,
          // axisLabel: this.xLabel,
          axisLine: this.xLine,
          // 底部label超过x个数就换行
          axisLabel: {
            textStyle: {
              color: '#7c8893',
              fontSize: 12
            },
            color: 'rgba(0,0,0,0.45)',
            interval: 0,
            formatter: function(params) {
              var newParamsName = '' // 最终拼接成的字符串
              var paramsNameNumber = params.length // 实际标签的个数
              var provideNumber = 8 // 每行能显示的字的个数
              var rowNumber = Math.ceil(paramsNameNumber / provideNumber) // 换行的话，需要显示几行，向上取整
              /**
				 * 判断标签的个数是否大于规定的个数， 如果大于，则进行换行处理 如果不大于，即等于或小于，就返回原标签
				 */
              // 条件等同于rowNumber>1
              if (paramsNameNumber > provideNumber) {
                /** 循环每一行,p表示行 */
                for (var p = 0; p < rowNumber; p++) {
                  var tempStr = '' // 表示每一次截取的字符串
                  var start = p * provideNumber // 开始截取的位置
                  var end = start + provideNumber // 结束截取的位置
                  // 此处特殊处理最后一行的索引值
                  if (p === rowNumber - 1) {
                    // 最后一次不换行
                    tempStr = params.substring(start, paramsNameNumber)
                  } else {
                    // 每一次拼接字符串并换行
                    tempStr = params.substring(start, end) + '\n'
                  }
                  newParamsName += tempStr // 最终拼成的字符串
                }
              } else {
                // 将旧标签的值赋给新标签
                newParamsName = params
              }
              // 将最终的字符串返回
              return newParamsName
            }
          }
        },
        yAxis: this.y,
        series: this.opinionData // 区域数据
      })
    }
  }
}
</script>
