<template>
  <div style="padding:30px">
    <!-- 头部 -->
    <myfilters
      ref="myfilters"
      :title="title"
      :content="content"
      :search-content="true"
      placeholder="请输入姓名"
      @contentChange="contentChange"
    />
    <el-table :data="showData">
      <el-table-column type="index" width="100" />
      <el-table-column label="姓名" prop="user_now" />
      <el-table-column label="座位号" prop="seat_id" />
      <!--<el-table-column label="就坐时间" prop="time"/> -->
      <el-table-column
        label="状态"
      >
        <!-- 状态 -->
        <template slot-scope="scope">
          <div :class="statusColor(scope.row.status)">
            <i :class="statusIcon(scope.row.status)" />
            {{ status(scope.row.status) }}
          </div>
        </template>
      </el-table-column>
      <!-- 操作 -->
      <el-table-column v-if="isAdmin">
        <template slot-scope="scope">
          <el-dropdown trigger="click" class="dropdown" @command="handleCommand">
            <span class="el-dropdown-link">
              <el-button
                size="mini"
                icon="el-icon-s-tools"
              >操作
                <i class="el-icon-arrow-down el-icon--right" />
              </el-button>
            </span>
            <el-dropdown-menu slot="dropdown">
            <!-- 先确定用户是不是管理员 如果是 可以有权利直接扣信誉分并且使其退座 -->
            <el-dropdown-item
                :command="{
                  index: scope.$index,
                  row: scope.row,
                  action: 'seatLeave'
                }"
              >强制退座</el-dropdown-item>
            <!--
              <el-dropdown-item
                v-if="scope.row.status!=='1'"
                :command="{
                  index: scope.$index,
                  row: scope.row,
                  action: 'tempLeave'
                }"
              >暂时离开</el-dropdown-item>
              <el-dropdown-item
                v-else
                :command="{
                  index: scope.$index,
                  row: scope.row,
                  action: 'comeback'
                }"
              >继续使用</el-dropdown-item>
              -->
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import myfilters from '@/components/myfilters'
import api from '@/api'
import store from '@/store'

export default {
  components: {
    myfilters
  },
  inject: ['reload'],
  props: {
    title: {
      type: String,
      default: '一楼'
    },
    tableData: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      showData: [],
      isAdmin: false // 是不是管理员 默认不是
    }
  },
  computed: {
    // 计算tableData有几条数据
    content() {
      return '共' + this.showData.length + '条数据'
    }
  },
  watch: {
    title(newVal, oldVal) {
      console.log(newVal + '=====' + oldVal)
      this.showData.splice(0, this.showData.length)
      // this.showData.length = 0 // 使用置length为0 的方法会出现bug 谨慎使用
      api.getSeat({ storey: newVal }).then(res => {
        // this.showData = res.item
        for (let i = 0; i < res.item.length; i++) {
          if (res.item[i].status !== '0') {
            this.showData.push(res.item[i])
            console.log(this.showData)
          }
        }
      })
    },
    tableData() {
      this.showData = this.tableData
    }
  },
  mounted() {
    console.log(this.title)
    this.showData.splice(0, this.showData.length)
    // this.showData = this.tableData
    api.getSeat({ storey: this.title }).then(res => {
      // this.showData = res.item
      for (let i = 0; i < res.item.length; i++) {
        if (res.item[i].status !== '0') {
          this.showData.push(res.item[i])
          console.log(this.showData)
        }
      }
    })
    const school_id = store.getters.schoolId
    api.getUser({ school_id: school_id }).then(res => {
      if (res.item.identity === 'admin') {
        this.isAdmin = true
      }
    })
  },
  methods: {
    idFormat(row, index) {
      const floorId = {
        '一楼': 'A',
        '二楼': 'B',
        '三楼': 'C',
        '四楼': 'D',
        '五楼': 'E'
      }
      return floorId[row.seatMessage.floor] + row.seatMessage.id
    },
    contentChange(content) {
      if (content === '') {
        this.showData = this.tableData
      } else {
        const arr = []
        this.tableData.forEach(item => {
          if (item.peopleMessage.name === content) {
            arr.push(item)
          }
        })
        if (arr.length === 0) {
          this.$refs.myfilters.select.content = ''
          this.showData = this.tableData
          this.$message({
            type: 'error',
            message: '对不起，查无此人'
          })
        } else {
          this.showData = arr.slice(0, arr.length)
        }
      }
    },
    handleCommand({ index, row, action }) {
      this[action](index, row)
    },
    seatLeave(index, row){
      console.log(row)
      api.userQueryForName({ name:row.user_now }).then(res=>{
      // 强制用户退座
      api.outSeat({ seat_id: row.seat_id }).then(res => {
        console.log(res)
        this.reload()
      })
      api.postOutSeat({ school_id: res.item.school_id }).then(res => {
        console.log(res)
      })
    })
     
    },
    // tempLeave(index, row) {
    //   console.log(row.status)
    //   this.$confirm('暂时离开？')
    //     .then(_ => {
    //       this.$set(row, 'status', '1')
    //     })
    //     .catch(_ => {})
    // },
    // comeback(index, row) {
    //   this.$set(row, 'status', 0)
    // },
    endSeat(index, row) {
      // 浅拷贝 让row指向当前行地址为了之后对话框准备
      this.$confirm('确定离开？')
        .then(_ => {
          this.showData.splice(index, 1)
          this.tableData.splice(index, 1)
        })
        .catch(_ => {})
    },
    // 状态样式
    // 状态标签文字
    status(status) {
      if (status === '0') {
        return '暂无使用'
      } else if (status === '1') {
        return '使用中'
      } else if (status === '2') {
        return '已被预约'
      } else if (status === '3') {
        return '暂停使用'
      } else if (status === '4') {
        return '暂时离开'
      }
    },
    // 状态的icon
    statusIcon(status) {
      if (status === '0') {
        return 'el-icon-success'
      } else if (status === '1') {
        return 'el-icon-loading'
      } else if (status === '2') {
        return 'el-icon-date'
      } else if (status === '3') {
        return 'el-icon-error'
      } else if (status === '4') {
        return 'el-icon-watch'
      }
    },
    // 状态颜色
    statusColor(status) {
      if (status === '0') {
        return 'success-color'
      } else if (status === '1') {
        return 'normal-color'
      } else if (status === '2') {
        return 'date'
      } else if (status === '3') {
        return 'error-color'
      } else if (status === '4') {
        return 'warning-color'
      }
    }
    // seatTime(row, index) {
    //   return row.time || this.getTime()
    // },
    // getTime() {
    //   const date = new Date()
    //   return (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes()
    // }
  }
}
</script>
<style lang="scss" type="text/scss" scoped>
// 状态颜色样式
.success-color{
  color:#409EFF
}
.end-color{
  color: #FF4C4C;
}
</style>
