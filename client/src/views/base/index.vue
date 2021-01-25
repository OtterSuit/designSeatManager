<template>
  <div>
    <div class="tabsHeader">
      <el-tabs v-model="activeName" type="border-card">
        <el-tab-pane name="people">
          <span slot="label"><i class="el-icon-document" /> 人员信息</span>
        </el-tab-pane>
        <el-tab-pane name="seat">
          <span slot="label"><i class="el-icon-notebook-2" /> 座位信息</span>
        </el-tab-pane>
      </el-tabs>
    </div>
    <transition name="fade-transform" mode="out-in">
      <component :is="isComponent" />
    </transition>
  </div>
</template>

<script>
import people from './people'
import seat from './seat'

export default {
  components: {
    people, seat
  },
  data() {
    return {
      activeName: 'people',
      componentsList: {
        people: 'people',
        seat: 'seat'
      }
    }
  },
  computed: {
    isComponent() {
      return this.componentsList[this.activeName]
    }
  }
}
</script>
<style lang="scss" type="text/scss" scoped>
::v-deep .tabsHeader {
  margin: 0;
  position: relative;
  top: 0 !important;
}
</style>
