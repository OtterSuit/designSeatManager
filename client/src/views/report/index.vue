<template>
  <div>
    <div class="tabs-main">
      <el-tabs v-model="activeName" tab-position="left" style="height:100%">
        <el-tab-pane label="学院申请统计" name="collegeReport" />
        <el-tab-pane label="楼层申请统计" name="floorReport" />
      </el-tabs>
    </div>
    <div class="transform">
      <transition name="fade-transform" mode="out-in">
        <component :is="isComponent" />
      </transition>
    </div>
  </div>
</template>
<script>
import collegeReport from './collegeReport'
import floorReport from './floorReport'

export default {
  components: {
    collegeReport, floorReport
    //  ordersNum, daTongYeNum
  },
  data() {
    return {
      activeName: 'collegeReport',
      componentsList: {
        collegeReport: 'collegeReport',
        floorReport: 'floorReport'
      }
    }
  },
  computed: {
    isComponent() {
      console.log(this.activeName)
      return this.componentsList[this.activeName]
    }
  },
  methods: {

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
    top: 40px;
    right: 150px;
    height: 20px!important;
    width: 4px
  }
  .el-tabs--left .el-tabs__nav-wrap.is-left::after{
    display: none;
  }
}
</style>
