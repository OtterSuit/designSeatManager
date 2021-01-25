<template>
  <div>
    <div class="tabs-main">
      <el-tabs v-model="activeName" tab-position="left" style="height:100%">
        <el-tab-pane label="工作记录查询" name="workloadQuery" />
        <el-tab-pane label="输液人数统计" name="infusionsNum" />
        <el-tab-pane label="个人工作量统计" name="personalWorkload" />
        <el-tab-pane label="输液室工作量统计" name="infusionRoom" />
        <!-- <el-tab-pane label="接单数统计" name="ordersNum" /> -->
        <!-- <el-tab-pane label="大输液统计" name="daTongYeNum" /> -->
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
import workloadQuery from './workloadQuery'
import infusionsNum from './infusionsNum'
import personalWorkload from './personalWorkload'
import infusionRoom from './infusionRoom'
// import ordersNum from './ordersNum'
// import daTongYeNum from './daTongYeNum'
export default {
  components: {
    workloadQuery, infusionsNum, personalWorkload, infusionRoom
    //  ordersNum, daTongYeNum
  },
  data() {
    return {
      activeName: 'workloadQuery',
      componentsList: {
        workloadQuery: 'workloadQuery',
        infusionsNum: 'infusionsNum',
        personalWorkload: 'personalWorkload',
        infusionRoom: 'infusionRoom'
        // ordersNum: 'ordersNum',
        // daTongYeNum: 'daTongYeNum'
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
