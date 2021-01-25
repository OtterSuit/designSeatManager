<template>
  <div style="padding:30px">
    <!-- 头部 -->
    <myfilters
      title="配药"
      :content="content"
      :choose-time="true"
      format="yyyy.MM.dd"
      :search-content="true"
      placeholder="姓名/就诊卡号"
      @timeChange="timeChange"
    >
      <template slot="expand">
        <el-select v-model="valueStatus" placeholder="请选择状态" @change="statusChange">
          <el-option
            v-for="item in statusList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </template>
    </myfilters>
    <!-- 头部 end -->
    <!-- table -->
    <el-table :data="showData" style="width: 100%">
      <el-table-column label="序号" type="index" width="100" />
      <el-table-column prop="patientName" label="病人姓名" />
      <el-table-column prop="code" label="就诊卡号" />
      <el-table-column prop="seatNum" label="座位号" />
      <el-table-column prop="operator" label="登记护士" />
      <el-table-column prop="Time" label="登记时间" />
      <el-table-column
        label="状态"
      >
        <!-- 状态 -->
        <template slot-scope="scope">
          <div :class="stateColor(scope.row.state)">
            <i :class="stateIcon(scope.row.state)" />
            {{ state(scope.row.state) }}
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="180"
      >
        <template slot-scope="scope">
          <el-button icon="el-icon-document" size="mini" @click="openInfo(scope.row)">查看详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- table end -->
  </div>
</template>

<script>
import myfilters from '@/components/myfilters'
export default {
  components: {
    myfilters
  },
  data() {
    return {
      showData: [],
      valueStatus: '全部',
      statusList: [
        {
          value: '全部',
          label: '全部'
        },
        {
          value: '配药完成',
          label: '配药完成'
        }, {
          value: '等待配药',
          label: '等待配药'
        }
      ],
      // 状态标签文字
      state(state) {
        const stateMap = {
          '1': '配药完成',
          '2': '等待配药'
        }
        return stateMap[state]
      },
      // 状态的icon
      stateIcon(state) {
        const stateMap = {
          '1': 'el-icon-success',
          '2': 'el-icon-time'
        }
        return stateMap[state]
      },
      // 状态颜色
      stateColor(state) {
        const stateMap = {
          '1': 'success-color',
          '2': 'wait-color'
        }
        return stateMap[state]
      },
      editIndex: 0,
      show: false,
      type: '清洗框/架',
      tableData: [
        {
          patientName: '王菲菲',
          code: '1001234',
          seatNum: '06',
          operator: '赵美丽',
          Time: '2020.08.10 09:45:32',
          state: '2'
        },
        {
          patientName: '郝颖乘',
          code: '1001232',
          seatNum: '12',
          operator: '赵美丽',
          Time: '2020.08.10 09:45:32',
          state: '2'
        },
        {
          patientName: '陈淳',
          code: '1004523',
          seatNum: '34',
          operator: '赵美丽',
          Time: '2020.08.10 09:45:32',
          state: '1'
        },
        {
          patientName: '王慧兰',
          code: '1001135',
          seatNum: '18',
          operator: '赵美丽',
          Time: '2020.08.10 09:45:32',
          state: '1'
        },
        {
          patientName: '吴丽兰',
          code: '1007532',
          seatNum: '08',
          operator: '赵美丽',
          Time: '2020.08.10 09:45:32',
          state: '2'
        }
      ]

    }
  },
  computed: {
    // 计算tableData有几条数据
    content() {
      return '共' + this.tableData.length + '条数据'
    }
  },
  created() {
    this.showData = this.tableData
  },
  methods: {
    statusChange() {
      if (this.valueStatus === '全部') {
        this.showData = this.tableData
      } else if (this.valueStatus === '配药完成') {
        this.showData = []
        this.tableData.forEach(item => {
          if (item.state === '1') {
            this.showData.push(item)
          }
        })
      } else {
        this.showData = []
        this.tableData.forEach(item => {
          if (item.state === '2') {
            this.showData.push(item)
          }
        })
      }
    },
    // // 清洗弹窗确认按钮
    // cleanSubmit() {
    //   this.$refs.form.validate((valid) => {
    //     if (valid) {
    //       this.$message({
    //         message: '清洗成功',
    //         type: 'success'
    //       })
    //       this.show = false
    //       this.tableData[this.editIndex].state = '1'
    //     } else {
    //       this.$message({
    //         message: '请按要求填写',
    //         type: 'warning'
    //       })
    //     }
    //   })
    // },
    // 输入框改变
    contentChange(content) {
      console.log(content)
    },
    // 时间改变
    timeChange(date) {
      console.log(date)
    },
    // 查看详情
    openInfo(row) {
      // if (row.state === '1') {
      //   this.$router.push({
      //     name: 'medicaldetail'
      //   })
      // } else {
      //   this.$message('还未配药')
      // }
      console.log(row)
      this.$router.push({
        name: 'medicaldetail'
      })
    }
  }
}
</script>
<style lang="scss" type="text/scss" scoped>
::v-deep .el-form-item__label {
  text-align: left;
  font-weight: normal;
}
.dialog-content {
  text-align: center;
}
.dialog-cleaningBox {
  font-size: 24px;
  line-height: 31px;
  margin-top: 22px;
}
.dialog-code {
  font-size: 14px;
  color: rgba(153, 153, 153, 1);
  line-height: 19px;
  margin-top: 11px;
  margin-bottom: 58px;
}
.dialog-main {
  height: 420px;
}
// ::v-deep .el-form-item__content{
//   margin-left: 20px;
// }
// ::v-deep .el-input--suffix .el-input__inner{
//   margin-left: 30px;
// }
// ::v-deep .el-range-editor.el-input__inner{
//   margin-left: 60px;
// }
.success-color{
  color:#29C06D
}
.wait-color{
  color: #666666;
}
::v-deep .el-button{
  border: 1px #409EFF solid;
  color:#409EFF ;
}
</style>
