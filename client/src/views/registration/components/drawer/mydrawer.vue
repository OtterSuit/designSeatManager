<template>
  <div style="margin-bottom:10px">
    <el-form ref="drawer" :model="drawer">
      <el-drawer
        :visible.sync="drawerOn"
        :before-close="handleClose"
        :size="size"
      >
        <div style="padding: 20px">

          <el-row>
            <div class="topPosition">
              <!-- 标题 -->
              <el-col :span="5">
                <div class="title">{{ titleDrawer }}</div>
              </el-col>
              <!-- switch -->
              <el-col :span="4">
                <el-form-item v-if="seatLabel" label="只展示空座位">
                  <el-switch v-model="drawer.delivery" />
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item v-if="allLabel" label="默认全选">
                  <el-switch v-model="drawer.deliverySecond" />
                </el-form-item>
              </el-col>
              <!-- 提示可选 -->
              <el-col :span="6">
                <div v-if="chooseTip" class="tipChoose">
                  <div class="chooseok-fir"><div class="chooseOk">可</div><div class="space">可选</div></div>
                  <div class="chooseno-fir"><div class="chooseNo">不</div><div class="space">已占座</div></div>
                </div>
              </el-col>
            </div>
          </el-row>
          <!-- 第二行主体部分 放插槽-->
          <el-row>
            <div>
              <slot name="secondRow" />
            </div>
          </el-row>
          <!-- 第三部分 显示选择和确认按钮 -->
          <div class="footer">
            <span class="smallfont">{{ footerTip }}  </span><span class="bigfont">{{ itemNum }}</span>
            <div class="footerBtn">
              <el-button type="primary" @click="seatconfirm">确 定</el-button>
            </div>
          </div>
        </div>
      </el-drawer>
    </el-form>
  </div>
</template>
<script>
export default {
  name: 'Mydrawer',
  props: {
    titleDrawer: {
      type: String,
      default: ''
    },
    drawerOn: {
      type: Boolean,
      default: false
    },
    seatLabel: {
      type: Boolean,
      default: false
    },
    allLabel: {
      type: Boolean,
      default: false
    },
    allSelect: {
      type: Boolean,
      default: false
    },
    confirmPrint: {
      type: Boolean,
      default: false
    },
    footerTip: {
      type: String,
      default: ''
    },
    itemNum: {
      type: String,
      default: ''
    },
    chooseTip: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: '45%'
    }
  },
  data() {
    return {
      drawer: {
        delivery: false,
        deliverySecond: false
      }
    }
  },
  methods: {
    handleClose() {
      this.$emit('close')
    },
    // 全选
    selectall() {
      this.$emit('selectall')
    },
    // 确认座位
    seatconfirm() {
      this.$emit('seatconfirm')
    },
    // 确认换座位
    seatChangeConfirmfun() {
      this.$emit('seatChangeConfirmfun')
    },
    // 确认打印
    printconfirm() {
      this.$emit('printconfirm')
    }
  }

}
</script>
  <style lang="scss" type="text/scss" scoped>
::v-deep .el-drawer__header :focus {
  outline: none;
}
::v-deep .el-drawer{
  overflow: scroll;
}
.topPosition{
  margin-top: -70px;
}
.title{
  margin-top: 10px;
  font-size: 18px;
}
.tipChoose{
  display: flex;
  margin-top: -8px;
}
.chooseok-fir{
  display: flex;
  color: #999999;
  margin-right: 10px;
}
.chooseno-fir{
  display: flex;
  color: #999999;
}
.chooseOk{
  border: 1px #cccccc solid;
  color:#F6F6F6;
  background-color:#F6F6F6;
}
.chooseNo{
  border: 1px #cccccc solid;
  color:#D9ECFF;
  background-color:#D9ECFF;
}
.space{
  margin-left: 7px;
}
.footerBtn{
  float: right;
}
.printBtn{
  margin-top: 20px;
  position: relative;
}
::v-deep .printBtn .allPrint .el-button{
  color: #409EFF;
  font-size: 12px;
  border: none;
}
.confirmPrint{
  background-color: #409EFF;
  color: white;
}
::v-deep .printBtn .allPrint .el-button :active{
  background-color:white;
}
::v-deep .printBtn .allPrint .el-button:focus {
  background-color: white;
}
::v-deep .printBtn .allPrint .el-button:visited{
  background-color: white;
}
::v-deep .footerBtn .el-button{
  font-size: 18px;
  width: 160px;
  height: 60px;
}

.bigfont{
  font-size: 24px;
  font-weight: 600;
}
.smallfont{
  font-size: 12px;
  color: #999999;
}

</style>

