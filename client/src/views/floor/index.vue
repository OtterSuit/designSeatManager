<template>
  <div>
    <div class="tabs-main">
      <el-tabs v-model="activeName" tab-position="left" style="height:100%">
        <el-tab-pane label="一楼" name="一楼" />
        <el-tab-pane label="二楼" name="二楼" />
        <el-tab-pane label="三楼" name="三楼" />
        <el-tab-pane label="四楼" name="四楼" />
        <el-tab-pane label="五楼" name="五楼" />
      </el-tabs>
    </div>
    <div class="transform">
      <transition name="fade-transform" mode="out-in">
        <floorSituation :title="activeName" />
        <!-- :table-data="tableData[activeName]"  -->
      </transition>
    </div>
  </div>
</template>

<script>
import floorSituation from './floorSituation'
import api from '@/api'
// import { getPeopleInfo, getSeatInfo } from '@/api/baseData/baseData'

export default {
  components: {
    floorSituation
  },
  data() {
    return {
      activeName: '一楼',
      tableData: {
        '一楼': [],
        '二楼': [],
        '三楼': [],
        '四楼': [],
        '五楼': []
      },
      seatMessage: null,
      peopleMessage: null
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      api.getSeat({ storey: this.title }).then(res => {
        console.log(res)
        this.leftlist = res.item
      })
    },
    getFloorSeat() {
      if (this.seatMessage && this.peopleMessage) {
        for (let len = this.peopleMessage.length - 1; len >= 0; len--) {
          this.tableData[this.seatMessage[len].floor].push({
            seatMessage: this.seatMessage[len],
            peopleMessage: this.peopleMessage[len]
          })
        }
      }
      console.log(this.tableData)
    }
  }
}
</script>
<style lang="scss" type="text/scss" scoped>
::v-deep .transform {
  margin-left:210px
}
::v-deep.tabs-main {
  position: fixed;
  height: 100%;
  width: 210px;
  background: #F6F6F6;
  .el-tabs--left .el-tabs__item.is-left{
    text-align: left;
    position: relative;
    left: 15px;
    padding: 30px;
  }
  .el-tabs__active-bar.is-left{
    top: 40px!important;
    // right: 15px;
    height: 20px!important;
    width: 4px!important
  }
  .el-tabs--left .el-tabs__nav-wrap.is-left::after{
    display: none;
  }
}
// .transform{
//   margin-top:30px
// }
// ::v-deep.tabs-main {
//   position: fixed;
//   height: 100%;
//   width: 210px;
//   background: #F6F6F6;
//   .el-tabs--left .el-tabs__item.is-left{
//     text-align: left;
//     position: relative;
//     left: 15px;
//     padding: 30px;
//   }
//   .el-tabs__active-bar.is-left{
//     top: 40px;
//     right: 150px;
//     height: 20px!important;
//     width: 4px
//   }
//   .el-tabs--left .el-tabs__nav-wrap.is-left::after{
//     display: none;
//   }
// }
</style>
