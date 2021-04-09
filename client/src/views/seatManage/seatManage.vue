<template>
  <div class="app-container">
    <myfilters :title="title" :content="'共有' + leftlist.length + '个座位'">
      <!-- 状态提示 -->
      <template slot="extent">
        <div class="flex-show">
          <div class="blockOne" />
          <span class="tipOne">空座</span>
          <div class="blockTwo" />
          <span class="tipOne">已占座</span>
          <div class="blockThird" />
          <span class="tipOne">暂离</span>
        </div>
      </template>
    </myfilters>
    <!-- 座位列表的展示区域 start -->
    <div class="seat" style="overflow-y:scroll; height:70vh">
      <div style="text-align: left; color: #ccc; font-weight: 600">
        <el-card v-if="haveSeat === ''" shadow="hover">
          欢迎选座
        </el-card>
        <el-card v-else shadow="hover">
          您的位置：{{ haveSeat }}
        </el-card>
      </div>
      <div class="seat_left">
        <ul>
          <li
            v-for="(item, index) in leftlist"
            :key="index"
            class="seat_select"
            :class="{
              active: item.status !== '0',
            }"
            @click="choosely(index, item)"
          >
            <!-- calling: item.status === '0'&& item.user_now !== '', -->
            <div
              v-if="chooseClick.indexOf(item) > -1"
              class="jiaobiao"
            >
              <img
                src="@/assets/images/jiaobiao2.png"
                alt=""
                width="20px"
              >
            </div>
            <h4>{{ item.seat_id }}</h4>
            <P class="fontName">{{ item.user_now }}<br></P>
          </li>
        </ul>
      </div>
      <!-- 展示end -->
    </div>
    <!--
    <div>
      <el-button type="primary" @click="changeOK">换 座</el-button>
    </div>
    -->
    <div style="text-align: center">
      <el-button v-if="haveSeat === ''" type="primary" :disabled="chooseClick.length==0?true:false" @click="pickSeat">选 座</el-button>
      <el-button v-else type="primary" @click="outSeat">退 座</el-button>
    </div>
    <div style="text-align: left">
      <el-button type="primary" @click="appointmentOK">预 约</el-button>
    </div>
    <div style="text-align: center">
      <el-button v-if="isAdmin" type="primary" @click="outAllSeat">管理员一键退座</el-button>
    </div>
  </div>
</template>

<script>
import myfilters from '@/components/myfilters'
import api from '@/api'
import store from '@/store'
// import { getSeatList } from '@/api/seat/seat'
// import parseTime from '@/utils/index.js'

export default {
  components: {
    myfilters
  },
  inject: ['reload'],
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      leftlist: [], // 该楼层的所有座位
      chooseClick: [], // 选中的空座位
      haveSeat: '', // 是否有座位号
      isShow: true, // 在没有选中某一座位时禁止使用
      isAdmin: false // 是否是管理员
    }
  },
  watch: {
    title(newVal, oldVal) {
      console.log(newVal + '=====' + oldVal)
      // getSeatList(newVal).then(res => {
      //   console.log(res)
      //   this.leftlist = res.data.items
      // })
      api.getSeat({ storey: newVal }).then(res => {
        console.log(res)
        this.leftlist = res.item
      })
      const school_id = store.getters.schoolId
      api.getUser({ school_id: school_id }).then(res => {
        console.log(res)
        this.haveSeat = res.item.seat_id // 告知用户他的座位号
      })
      this.chooseClick.length = 0 // 清空数组
    }
  },
  created() {
    // getSeatList(this.title).then(res => {
    //   console.log(res)
    //   this.leftlist = res.data.items
    // })
    api.getSeat({ storey: this.title }).then(res => {
      console.log(res)
      this.leftlist = res.item
    })
    const school_id = store.getters.schoolId
    api.getUser({ school_id: school_id }).then(res => {
      console.log(res)
      this.haveSeat = res.item.seat_id // 告知用户他的座位号
      if (res.item.identity === 'admin') {
        this.isAdmin = true
      }
    })
  },
  methods: {
    // 数组换位函数
    swapArr(arr, index1, index2) {
      [arr[index1].status, arr[index2].status] = [arr[index2].status, arr[index1].status]
      const temp = arr[index1].studentName
      arr[index1].studentName = arr[index2].studentName
      arr[index2].studentName = temp
      return arr
    },
    // 选择对应的座位号
    choosely(n, item) {
      // console.log(n,item)
      this.chooseClick.push(item)
      if (this.chooseClick.indexOf(n) !== -1) {
        return
      }
      if (this.chooseClick.length === 2) {
        this.chooseClick.splice(0, 1)
      }
      // console.log(this.chooseClick)

      // // 如果是呼叫状态则不让用户点击
      // if (item.status === '3' && item.studentName !== '') {
      //   this.$message({
      //     message: '对不起！该座位不是空闲状态，请勿操作',
      //     type: 'warning'
      //   })
      //   return
      // }
      // if (this.chooseClick.indexOf(n) !== -1) {
      //   return
      // }
      // // 存的是index
      // this.chooseClick.push(n)
      // // 将要换座的两个座位
      // if (this.chooseClick.length > 2) {
      //   this.chooseClick.shift()
      // }
    },

    // 计算预约到期时间
    timeMethod(timeLength) {
      const now = new Date() // 读取当前日期
      const year = now.getFullYear()
      const month = now.getMonth() + 1
      const day = now.getDate()
      // const hour = now.getHours()
      // const minutes = now.getMinutes()
      const seconds = now.getSeconds()
      // console.log(now.getMinutes())
      // console.log(minutesTemp)
      now.setMinutes(now.getMinutes() + timeLength)// 加上预约时间
      const newMinutes = now.getMinutes()
      const newHours = now.getHours()
      // const time_str = year + '-' + month + '-' + day + '-' + hour + '-' + minutes + '-' + seconds
      const time_str2 = year + '-' + month + '-' + day + '-' + newHours + '-' + newMinutes + '-' + seconds
      // console.log(time_str);
      // console.log(time_str2)
      return time_str2
    },
    // 预约按钮
    appointmentOK() {
      if (this.chooseClick.length === 1) {
        // const nowDate = new Date();
        const appointment_time = this.timeMethod(2)
        // 选择了空座位且点击预约 调用接口
        api.postAppointmentSeat({ seat_id: this.chooseClick[0].seat_id, status: '2', appointment_time: appointment_time })
          .then(res => {
            console.log(res)
          })
        setTimeout(() => {
          api.postAppointmentSeat({ seat_id: this.chooseClick[0].seat_id, status: '0', appointment_time: '' })
            .then(res => {
              console.log(res)
              console.log('预约已过期！')
            })
        }, 36000 * 2)
      }
    },
    // 落座
    pickSeat() {
      const name = store.getters.name // 从数据仓库拿信息
      const school_id = store.getters.schoolId
      console.log(name + school_id)
      api.pickSeat({ seat_id: this.chooseClick[0].seat_id, user_now: name, status: '1' }).then(res => {
        console.log(res)
        this.reload()
      })
      api.postUserPickSeat({ seat_id: this.chooseClick[0].seat_id, school_id: school_id }).then(res => {
        console.log(res)
        if (res) {
          api.getUser({ school_id: school_id }).then(res => {
            console.log(res)
            this.haveSeat = res.item.seat_id // 告知用户他的座位号
          })
        }
      })
    },
    // 用户退座
    outSeat() {
      const school_id = store.getters.schoolId
      api.outSeat({ seat_id: this.haveSeat }).then(res => {
        console.log(res)
        this.reload()
      })
      api.postOutSeat({ school_id: school_id }).then(res => {
        console.log(res)
      })
    },
    // 一键退座
    outAllSeat() {
      api.outAllSeat().then(res => {
        console.log(res)
        this.reload()
      })
      api.poostOutAllSeat().then(res => {
        console.log(res)
      })
    },

    // 换位按钮(没用了)
    changeOK() {
      if (this.chooseClick.length === 2) {
        // 如果两个都为空座
        if (this.leftlist[this.chooseClick[0]].studentName === '' && this.leftlist[this.chooseClick[1]].studentName === '') {
          this.$message('不能交换两个空座,请重新选择')
          this.chooseClick = []
          return
        }
        // 调用座位管理的交换座位接口（传原id和新id）
        // this.leftlist[this.chooseClick[0]].id 相当于通过index找对应的座位id chooseClick存的是index
        // api.seatListChange({ scrid: this.leftlist[this.chooseClick[0]].id, targetId: this.leftlist[this.chooseClick[1]].id })
        //   .then(res => {
        //     console.log(res)
        //   })
        // 交换座位
        console.log(this.chooseClick)
        this.swapArr(this.leftlist, this.chooseClick[0], this.chooseClick[1])
        // 清空数组
        this.chooseClick.length = 0
        // 再重新判断占座之前清空数组
        this.$message({
          message: '换座成功！',
          type: 'success'
        })
      } else {
        this.$message({
          message: '请选择两个座位交换',
          type: 'warning'
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
//.app-container{
 // height: 100vh;
//}
.seat {
  float: left;
  width: 100%;
  height: auto;
  padding: 20px;
  border: 1px solid #e4e4e4;

  .seat_left {
    float: left;
    width: 100%;
    // height: 110%;
    h4 {
      text-align: center;
      margin: 5px 0;
    }
    ul {
      float: left;
      width: 100%;
      list-style: none;
      margin: 0;
      padding: 0;
      .seat_select {
        float: left;
        width: 10%;
        margin: 1%;
        border: 1px solid #999999;
        border-radius: 5px;
        background: #fff;
        color: #999999;
        &:hover {
          cursor: pointer;
          background: rgba($color: #99ceff, $alpha: 0.3);
        }
        p {
          font-size: 14px;
          line-height: 12px;
          /* padding-left: 10px; */
        }
        .jiaobiao{
          position: absolute
        }
      }
      .active {
        background: #ecf5ff;
        color: #47a1ff;
        border: 1px solid #47a1ff;
      }
      .activeNow {
        // background: #9ec6f5;
        color: #47a1ff;
        border: 1px solid #47a1ff;
      }
      .calling {
        background: #ffeded !important;
        color: #ff9797;
        border: 1px solid #ff9797;
      }
    }
  }
}
// 头部提示
.flex-show {
  color: #999999;
  font-size: 12px;
  display: flex;
  flex-direction: row;
  .blockOne {
    width: 16px;
    height: 16px;
    margin: 0 10px;
    background-color: #ffffff;
    border: 1px solid #e9e9eb;
    border-radius: 3px;
  }
  .blockTwo {
    width: 16px;
    height: 16px;
    margin: 0 10px;
    background-color: #ecf5ff;
    border: 1px solid #d9ecff;
    border-radius: 3px;
  }
  .blockThird {
    width: 16px;
    height: 16px;
    margin: 0 10px;
    background-color: #ffeded;
    border: 1px solid #ffdbdb;
    border-radius: 3px;
  }
}
::v-deep .el-radio__label .el-input__inner {
  width: auto;
}
::v-deep .el-input .el-input--suffix {
  width: auto;
}
.fontName {
  text-align: center !important;
  font-size: 16px !important;
}
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
