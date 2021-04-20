<template>
  <div class="dashboard-container">
    <el-row :gutter="20">
      <el-col :span="4">
        <div class="top box top1">
          <!-- <i class="el-icon-school" /> -->
          <div class="top-title">{{ top.first._id }}</div>
          <div class="top-date">过去7日</div>
          <count-to
            :start-val="0"
            :end-val="top.first.num_tutorial"
            :duration="3000"
            :autoplay="true"
            class="top-num"
          />
        </div>
      </el-col>
      <el-col :span="4">
        <div class="top box top2">
          <i class="iconfont icon-tubiao- top-icon" />
          <div class="top-title">{{ top.second._id }}</div>
          <div class="top-date">过去7日</div>
          <count-to
            :start-val="0"
            :end-val="top.second.num_tutorial"
            :duration="3000"
            :autoplay="true"
            class="top-num"
          />
        </div>
      </el-col>
      <el-col :span="4">
        <div class="top box top3">
          <i class="iconfont icon-zhuangpei top-icon" />
          <div class="top-title">{{ top.third._id }}</div>
          <div class="top-date">过去7日</div>
          <count-to
            :start-val="0"
            :end-val="top.third.num_tutorial"
            :duration="3000"
            :autoplay="true"
            class="top-num"
          />
        </div>
      </el-col>
      <el-col :span="4">
        <div class="top box top4">
          <i class="iconfont icon-fengbao top-icon" />
          <div class="top-title">{{ top.forth._id }}</div>
          <div class="top-date">过去7日</div>
          <count-to
            :start-val="0"
            :end-val="top.forth.num_tutorial"
            :duration="3000"
            :autoplay="true"
            class="top-num"
          />
        </div>
      </el-col>
      <el-col :span="4">
        <div class="top box top5">
          <i class="iconfont icon-miejun top-icon" />
          <div class="top-title">{{ top.fifth._id }}</div>
          <div class="top-date">过去7日</div>
          <count-to
            :start-val="0"
            :end-val="top.fifth.num_tutorial"
            :duration="3000"
            :autoplay="true"
            class="top-num"
          />
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="16">
        <div class="middle box">
          <span class="title">楼层申请量统计</span>
          <span
            class="content"
            style="margin-left: 5px;font-size: 12px; color: #999"
          >按月统计</span>
          <i
            class="el-icon-s-data echartsIcon"
            :class="{ activeIcon: activeIcon === 'bar' }"
            @click.prevent="activeIconChange('bar')"
          />
          <i
            class="el-icon-minus echartsIcon"
            style="font-weight: 900"
            :class="{ activeIcon: activeIcon === 'line' }"
            @click.prevent="activeIconChange('line')"
          />
          <m-line :echart-style="lineStyle" :opinion-data="floorCount" :x="barX" />
        </div>
      </el-col>
      <el-col :span="8">
        <div class="middle box">
          <span class="title">座位实时统计</span>
          <m-pie
            class="echart"
            :echart-style="style"
            :opinion="opinion1"
            :radius="radius"
            :color="['#80e3bd', '#80a9fa']"
            :opinion-data="seatRealtime"
            :center="['50%', '60%']"
            label="{c}"
          />
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="16">
        <div class="bottom box" style="overflow-y: scroll;">
          <span class="title">学院申请人数统计</span>
          <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="_id" label="学院" />
            <el-table-column prop="thisWeek" label="本周人次" />
            <el-table-column prop="lastWeek" label="上周人次" width="120" />
            <el-table-column prop="increase" label="增长率" :formatter="increase" />
          </el-table>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="bottom box">
          <span class="title">座位损坏情况</span>
          <m-pie
            class="echart"
            :echart-style="style"
            :opinion="opinion2"
            :radius="radius"
            :opinion-data="seatSituation"
            :center="['50%', '60%']"
            label="{c}"
          />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import countTo from 'vue-count-to'
import mPie from '@/components/echart/pie'
import mLine from '@/components/echart/line'
import api from '@/api'
// import { getDashboard } from '@/api/dashboard/dashboard'
// import quickSort from '@/utils/sort'
// import { registerInfo } from '@/api/registerInfo/registerInfo'
export default {
  components: {
    countTo,
    mLine,
    mPie
  },
  data() {
    return {
      tableData: [],
      activeIcon: 'line',
      topDict: {
        0: 'first',
        1: 'second',
        2: 'third',
        3: 'forth',
        4: 'fifth'
      },
      top: {
        first: { _id: 'XX学院', num_tutorial: 0 },
        second: { _id: 'XX学院', num_tutorial: 0 },
        third: { _id: 'XX学院', num_tutorial: 0 },
        forth: { _id: 'XX学院', num_tutorial: 0 },
        fifth: { _id: 'XX学院', num_tutorial: 0 },
        sixth: { _id: 'XX学院', num_tutorial: 0 }
      },
      lineStyle: {
        height: '280px',
        width: '100%'
      },
      floorCount: [
        {
          name: '发生次数',
          type: 'line',
          data: [],
          // 1,2,4,5,6
          smooth: true,
          areaStyle: {
            color: 'rgba(64, 158, 255,.4)'
          }
        }
      ],
      barX: ['一楼', '二楼', '三楼', '四楼', '五楼'],
      opinion1: {
        textStyle: {
          color: '#8C8C8C'
        },
        left: 'auto',
        itemHeight: 9,
        icon: 'circle',
        data: ['占座', '空座']
      },
      opinion2: {
        left: 'auto',
        itemHeight: 9,
        textStyle: {
          color: '#8C8C8C'
        },
        icon: 'circle',
        data: ['完好', '损坏']
      },
      seatRealtime: [],
      seatSituation: [],
      radius: ['50%', '70%'],
      style: {
        height: '270px',
        width: '100%'
      }
    }
  },
  created() {
    console.log(this.$router)
    // 学院学习人数统计 上面五个块
    api.historySum({ type: 'college' }).then(res => {
      // console.log(res)
      // 排序算法设计思路 首先对获得的res进行处理 找出 res下 num_tutorial由大到小的排序顺序
      // 获得之后进行遍历 再添加给top进行渲染
      const sorted_keys_array = Object.keys(res).sort((a, b) => {
        return res[b].num_tutorial - res[a].num_tutorial
      })
      // console.log(sorted_keys_array)
      for (let i = 0; i < 5; i++) {
        // console.log(res[sorted_keys_array[i]])
        this.top.first = res[sorted_keys_array[0]]
        this.top.second = res[sorted_keys_array[1]]
        this.top.third = res[sorted_keys_array[2]]
        this.top.forth = res[sorted_keys_array[3]]
        this.top.fifth = res[sorted_keys_array[4]]
      }
      // Object.keys(res).sort().map(key => {
      //   console.log(res[key])
      //   temp[key] = res[key]
      // })

      // for (let i = 0; i <= res.length - 1; i++) {
      //   console.log(res[i])
      //   if(res[i]>res[i+1]){

      //   }
      // }
    })
    // 楼层入座记录统计
    api.historySum({ type: 'storey' }).then(res => {
      console.log(res)
      // this.$set(this.floorCount[0], 'data', res)
      const tempData = []
      for (let i = 0; i < res.length; i++) {
        if (res[i]._id === '一楼') {
          tempData[0] = res[i].num_tutorial
        } else if (res[i]._id === '二楼') {
          tempData[1] = res[i].num_tutorial
        } else if (res[i]._id === '三楼') {
          tempData[2] = res[i].num_tutorial
        } else if (res[i]._id === '四楼') {
          tempData[3] = res[i].num_tutorial
        } else if (res[i]._id === '五楼') {
          tempData[4] = res[i].num_tutorial
        }
      }
      this.$set(this.floorCount[0], 'data', tempData)
    })

    // 拿到全部历史记录
    // api.historyFind().then(res => {
    //   console.log(res)
    // })
    // getDashboard().then(res => {
    //   console.log(res)
    //   if (res.code === 20000) {
    //     this.tableData = res.data.items.registCompare
    //     this.seatRealtime = res.data.items.seatRealtime
    //     this.seatSituation = res.data.items.seatSituation
    //     const topData = quickSort(res.data.items.top)
    //     for (let i = 0; i < 5; i++) {
    //       this.top[this.topDict[i]] = topData[i]
    //     }
    //     console.log(this.floorCount[0].data)
    //     // console.log(res.data.items.floorCount)
    //     this.$set(this.floorCount[0], 'data', res.data.items.floorCount)
    //   }
    // })
    // registerInfo('111').then(res => {
    //   console.log(res)
    // })
  },
  methods: {
    // 不良事件图形类型转换
    activeIconChange(icon) {
      if (this.activeIcon === icon) return
      this.activeIcon = icon
      this.floorCount[0].type = icon
    },
    increase(row, column) {
      return (row.thisWeek - row.lastWeek) / row.lastWeek
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-container {
  padding: 20px;
  background-color: #f0f2f5;
}
.top {
  height: 140px;
  color: #fff;
  .top-title {
    font-size: 18px;
    height: 24px;
    line-height: 24px;
    margin-bottom: 2px;
  }
  .top-date {
    font-size: 12px;
    height: 16px;
    line-height: 16px;
    margin-bottom: 20px;
  }
  .top-num {
    font-size: 30px;
    height: 40px;
    line-height: 40px;
  }
}
.middle {
  height: 360px;
}
.bottom {
  height: 340px;
}
.box {
  box-shadow: 0px 0px 9px 3px rgba(0, 0, 0, 0.05);
  background-color: #fff;
  border-radius: 6px;
  margin-bottom: 20px;
  position: relative;
  padding: 20px;
}
.top1 {
  background: linear-gradient(
    180deg,
    rgba(64, 158, 255, 1) 0%,
    rgba(143, 197, 253, 1) 100%
  );
}
.top2 {
  background: linear-gradient(
    180deg,
    rgba(249, 148, 74, 1) 0%,
    rgba(255, 189, 140, 1) 100%
  );
}
.top3 {
  background: linear-gradient(
    180deg,
    rgba(33, 187, 184, 1) 0%,
    rgba(111, 232, 229, 1) 100%
  );
}
.top4 {
  background: linear-gradient(
    180deg,
    rgba(41, 192, 109, 1) 0%,
    rgba(124, 215, 165, 1) 100%
  );
}
.top5 {
  background: linear-gradient(
    180deg,
    rgba(255, 118, 118, 1) 0%,
    rgba(255, 176, 176, 1) 100%
  );
}
.top6 {
  background: linear-gradient(
    180deg,
    rgba(27, 172, 193, 1) 0%,
    rgba(118, 218, 228, 1) 100%
  );
}
.top-icon {
  color: #fff;
  opacity: 0.1;
  font-size: 84px;
  position: absolute;
  bottom: 0px;
  right: 6px;
}
.echartsIcon {
  float: right;
  width: 40px;
  height: 28px;
  background: rgba(244, 244, 245, 1);
  border-radius: 0px 3px 3px 0px;
  border: 1px solid rgba(233, 233, 235, 1);
  text-align: center;
  line-height: 28px;
  color: #bfcbd9;
  font-size: 18px;
  cursor: pointer;
  // margin-right: 20px;
}
.activeIcon {
  background: rgba(236, 245, 255, 1);
  border: 1px solid rgba(217, 236, 255, 1);
  color: #409eff;
}
.title {
  font-size: 18px;
  display: inline-block;
  margin-bottom: 20px;
}
.content {
  font-size: 12px;
  color: #999;
}
::v-deep .el-col-4 {
  width: 20%;
}
::v-deep .el-progress-bar__inner {
  text-align: left;
}
::v-deep .el-progress-bar__innerText {
  font-size: 10px;
}
::v-deep .el-progress-bar__outer {
  background: rgba(64, 158, 255, 0.1);
}
</style>
