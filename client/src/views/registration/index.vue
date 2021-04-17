<template>
  <div class="barcode">
    <!-- 头部 -->
    <myfilters title="人员登记">
      <template slot="extent">
        <el-button class="shuakaBtn" @click="dialogVisible = true">
          <div><i class="iconfont iconshuaka" /> 刷卡登记</div>
        </el-button>
      </template>
    </myfilters>
    <!-- 头部 end -->
    <!-- 抽屉组件 选择座位-->
    <Mydrawer
      :drawer-on="drawerOn"
      title-drawer="请选择座位"
      :seat-label="false"
      footer-tip="您已经选择座位："
      :item-num="itemNumSeat"
      :choose-tip="true"
      @close="close"
      @seatconfirm="seatconfirm"
      @seatChangeConfirmfun="seatChangeConfirmfun"
    >
      <template slot="secondRow">
        <el-select v-model="drawer.floor" @change="floorChange">
          <el-option label="一楼" value="一楼" />
          <el-option label="二楼" value="二楼" />
          <el-option label="三楼" value="三楼" />
          <el-option label="四楼" value="四楼" />
          <el-option label="五楼" value="五楼" />
        </el-select>
        <ul>
          <div class="showli">
            <li
              v-for="(item, index) in seatList"
              :key="index"
              :class="{
                active: chooseAfterValue.indexOf(item.seat_id) != -1,
                choosenow: item.seat_id === seatChoosed,
                haveUser: item.user_now !== ''
              }"
              @click="chooseSeat(item)"
            >
              <div class="seatLabelstyle">{{ item.seat_id }}</div>
            </li>
          </div>
        </ul>
      </template>
    </Mydrawer>
    <!-- 抽屉组件end -->
    <!-- 刷卡提示 -->
    <el-dialog title="刷卡登记" :visible.sync="dialogVisible" width="35%">
      <div class="dialog">
        <div class="dia_txt">
          请将<span class="txt_m">身份证</span> 或<span
            class="txt_m"
          >学生卡</span>放到读卡器上
          <div><i class="iconfont iconshuaka" /></div>
        </div>
      </div>
    </el-dialog>
    <!-- 刷卡提示end -->
    <!-- 登记查询 -->
    <div class="queryBegin">
      <div class="queryResTitle" style="margin: 10px 15px">人员查询</div>
      <el-form label-width="180px">
        <el-form-item label="学生学号">
          <el-input
            v-model="school_id"
            style="width: 50%"
            placeholder="请输入学生学号"
            @submit.native.prevent
          />
          <el-button
            class="searchIcon"
            type="primary"
            icon="el-icon-search"
            :disabled="school_id.trim()===''"
            @click="queryMessage"
          >查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 查询结果 -->
    <div v-if="isQuery" class="queryResult">
      <div class="queryResTitle" style="margin: 10px 15px">查询结果</div>
      <el-form :model="query" label-width="100px">
        <el-row :gutter="30">
          <el-col :span="6">
            <el-form-item label="学号:">
              {{ query.school_id }}
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="姓名:">
              {{ query.name }}
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="身份:">
              {{ query.identity === 'admin' ? '管理员' : '用户' }}
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="学院:">
              {{ query.college }}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="30">
          <el-col :span="6">
            <el-form-item label="座位号:">
              <span
                style="font-size: 14px"
                :class="statusColor(query.seat_id)"
              >
                {{ status(query.seat_id) }}
              </span>
            </el-form-item>
          </el-col>
          <el-col :span="18">
            <el-form-item label="备注:">
              {{ query.remark }}
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-row>
        <div style="margin-left: 95px">
          <el-col :span="8">
            <el-button
              type="primary"
              @click="seatPlanOn"
            >
              <i class="iconfont iconzuowei" />
              {{ seatTitle(query.seat_id) }}
            </el-button>
          </el-col>
          <el-col :span="6">
            <el-button
              v-if="query.status"
              @click="query.status=false"
            >
              <i class="iconfont icondayin" />
              注销座位
            </el-button>
          </el-col>
        </div>
      </el-row>
    </div>
    <div v-if="isQuery" class="queryHistory">
      <el-collapse accordion>
        <el-collapse-item>
          <template slot="title">
            <div class="queryResTitle">
              历史记录
            </div>
          </template>
          <!-- table -->
          <el-table
            :data="tableData"
            style="width: 100%"
          >
            <el-table-column label="时间" prop="date" />
            <el-table-column label="楼层" prop="floor" />
            <el-table-column label="座位号" prop="id" />
            <el-table-column label="备注" prop="remark" />
          </el-table>
          <!-- table end -->
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script>
import myfilters from '@/components/myfilters'
import Mydrawer from './components/drawer/mydrawer.vue'
// import { getPeopleInfo, getSeatInfo } from '@/api/baseData/baseData'
import api from '@/api'

export default {
  components: {
    myfilters,
    Mydrawer
  },
  inject: ['reload'], // 引用注入
  data() {
    return {
      isQuery: false, // 是否查询
      itemNumSeat: '',
      drawerOn: false,
      chooseAfterValue: [],
      seatList: [],
      dialogVisible: false,
      school_id: '', // 查询输入
      queryBtn: true, // 查询按钮
      query: {},
      tableData: [],
      seatChoosed: '', // 用来浅拷贝
      total: 100,
      pageSize: 20,
      // peopleMessage: '',
      // seatMessage: '',
      drawer: {
        floor: '一楼'
      },
      historyModel: { // 历史记录
        user_college: '',
        user_name: '',
        user_school_id: '',
        user_option_type: ''
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      // getPeopleInfo().then(res => {
      //   if (res.code === 20000) {
      //     this.peopleMessage = res.data.items.peopleMessage
      //   }
      // })
      // getSeatInfo().then(res => {
      //   if (res.code === 20000) {
      //     this.seatMessage = res.data.items.seatMessage
      //     this.seatList = this.seatMessage.filter(item => {
      //       return item.floor === this.drawer.floor
      //     })
      //   }
      // })
      // api.getUser({school_id: '1706300053'}).then(res => {
      //   console.log(res);
      // })
    },
    floorChange() {
      api.getStorey({ storey: this.drawer.floor }).then(res => {
        console.log(res)
        this.seatList = res.seats
      })
      // this.seatList = this.seatMessage.filter(item => {
      //   return item.floor === this.drawer.floor
      // })
    },
    seatPlanOn() { // 安排座位或者退座 判断标签决定走哪一步
      console.log(this.query)
      if (this.query.seat_id === '') { // 还未有座位 需要安排座位
        this.drawerOn = true
        this.floorChange()
      } else {
        api.outSeat({ seat_id: this.query.seat_id }).then(res => {
          console.log(res)
          this.$message({
            type: 'success',
            message: '退座成功'
          })
        })
        api.postOutSeat({ school_id: this.query.school_id }).then(res => {
          console.log(res)
          this.reload()
        })
      }
    },
    // 抽屉组件
    close() {
      this.drawerOn = false
    },
    // 选座
    chooseSeat(item) {
      // this.chooseAfterValue.includes(item.seat_id) &&
      console.log(item)
      if (item.status !== '0') {
        return this.$message({
          type: 'error',
          message: '对不起，该座有人'
        })
      }
      this.seatChoosed = item.seat_id
      this.itemNumSeat = item.seat_id
    },
    // 确认选座
    seatconfirm() {
      api.pickSeat({ seat_id: this.seatChoosed, user_now: this.query.name, status: '1' }).then(res => {
        console.log(res)
        this.$message({
          type: 'success',
          message: '成功登记入座'
        })
      })
      api.postUserPickSeat({ seat_id: this.seatChoosed, school_id: this.query.school_id }).then(res => {
        console.log(res)
        if (res) {
          api.getUser({ school_id: this.query.school_id }).then(res => {
            console.log(res)
            this.historyModel.user_college = res.item.college
            this.historyModel.user_name = res.item.name
            this.historyModel.user_school_id = res.item.school_id
            this.historyModel.user_option_type = '1'
            console.log(this.historyModel)
            api.historyPush(this.historyModel).then(res => {
              console.log(res)
            })
          })
        }
        this.reload()
      })
      // if (this.seatChoosed !== '') {
      //   api.chooseSeat({ seat_id: this.seatChoosed, user_id: this.query.id }).then(res => {
      //     console.log(res)
      //   })
      //   if (this.query.status) {
      //     // this.chooseAfterValue.splice(this.chooseAfterValue.length - 1, 1, this.seatChoosed)
      //   }
      //   this.$set(this.query, 'status', this.seatChoosed)
      //   this.chooseAfterValue.push(this.seatChoosed)
      // }
      this.drawerOn = false
    },
    // 换座确认
    seatChangeConfirmfun() {
      this.drawerOn = false
    },
    status(status) {
      if (status !== '') {
        return status
      } else {
        return '未安排'
      }
      // return status ? status : '未安排'
    },
    statusColor(status) {
      return status ? 'success' : 'error'
    },
    seatTitle(status) {
      if (status !== '') {
        return '退座'
      } else {
        return '安排座位'
      }
      // return status ? '退座' : '安排座位'
    },
    queryMessage() { // 查询人员
      this.isQuery = false
      api.getUser({ school_id: this.school_id }).then(res => {
        console.log(res)
        if (res.code === 200){
          this.query = res.item
          this.isQuery = true
          this.$message({
            message: '查询成功',
            type: 'success'
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.dialog {
  margin-top: 20px;
  .dia_txt {
    text-align: center;
    font-size: 24px;
    i {
    font-size: 200px;
    line-height: 250px;
    color: #409eff;
    }
  }
}
.txt_m {
  color: #fe0942;
  margin: 0 10px;
}

::v-deep .queryBegin {
  padding: 20px 10px;
  background: #ffffff;
  .el-form-item__label {
    font-size: 15px;
    line-height: 60px;
    margin-right: 10px;
  }
  .el-input__inner {
    width: 100%;
    height: 60px;
    background: #ffffff;
    border-radius: 4px;
  }
  .searchIcon {
    margin-left: 30px;
    width: 150px;
    height: 60px
  }
}

.queryResTitle {
  font-size: 18px;
  color: #999999;
}
.queryResult {
  margin-top:20px;
  padding: 20px 10px;
  background-color: #ffffff;
}
.queryHistory {
  margin-top:20px;
  padding: 0 20px;
  background-color: #ffffff;
}
.error {
  color: #ff4c4c;
}
.success {
  color: #29c06d;
}
::v-deep .el-button.shuakaBtn {
  background-color: #40c9c6;
  color: white;
}
.barcode {
  padding: 30px;
  background-color: #f0f2f5;
  min-height: calc(100vh - 50px);
}

// 座位展示 未解决边界
.showli {
  list-style: none;
  height: 70vh;
  overflow: scroll;
  display: flex;
  flex-wrap: wrap;
  overflow-x: hidden;
}
.showli li {
  margin: 0 20px 20px 20px;
  width: 120px;
  height: 67px;
  border: 1px solid #cccccc;
  text-align: center;
  border-radius: 5px;
  color: #999999;
}
.active {
  background-color: #ecf5ff;
  color: #47a1ff ;
  border: 1px solid #c5e1fc;
}

.seatLabelstyle {
  font-size: 20px;
  line-height: 70px;
}
.choosenow {
  color: #409eff !important;
  border: 1px solid #409eff !important;
  font-weight: 600;
}
.haveUser {
  background: #D9ECFF;
}

// 改一下滚动条
::v-deep ::-webkit-scrollbar {
  width: 10px !important;
}
</style>
