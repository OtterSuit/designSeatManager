<template>
  <div style="padding:30px">
    <!-- 头部 -->
    <myfilters
      title="巡回"
      :content="content"
      :choose-time="true"
      :search-content="true"
      format="yyyy.MM.dd"
      placeholder="姓名/就诊卡号"
      @contentChange="contentChange"
      @timeChange="timeChange"
    >
      <template slot="expand">
        <el-select v-model="statusValue" placeholder="请选择" @change="statusChange">
          <el-option
            v-for="item in status"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </template>
    </myfilters>
    <!-- 头部 end -->
    <!-- 重新穿刺确认提示框 -->
    <el-dialog
      title="重新穿刺"
      :visible.sync="dialogVisible"
      width="42%"
      :before-close="handleClose"
    >
      <div class="dialogTop">
        <div class="leftIcon">
          <i class="el-icon-warning" />
        </div>
        <div class="rightTip">
          <div class="tip">选择重新穿刺，此患者将排号在呼叫台的下一位，请留意呼叫信息。</div>
          <div class="tipName">患者姓名 王菲菲</div>
          <div class="tipCard">就诊卡号 02165428</div>
        </div>
      </div>
      <div class="dialogBottom">
        <div class="leftTip">重新穿刺原因</div>
        <div class="radio">
          <el-row>
            <el-radio v-model="radio" label="1" @change="otherfunDefault">滚针</el-radio>
          </el-row>
          <div class="radio-other">
            <el-row>
              <el-col>
                <el-radio v-model="radio" label="2" @change="otherfun">其他原因<span class="radio-space">白</span>
                  <el-input v-model="otherCause" :disabled="other" />
                </el-radio>
              </el-col>

            </el-row>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="warning" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 暂停输液确认框 -->
    <el-dialog
      title="暂停输液"
      :visible.sync="dialogVisibleStop"
      width="42%"
      :before-close="handleClose"
    >
      <div class="dialogTop">
        <div class="leftIcon">
          <i class="el-icon-warning" />
        </div>
        <div class="rightTip">
          <div class="tip">患者确定要暂停输液吗</div>
          <div class="tipName">患者姓名 王菲菲</div>
          <div class="tipCard">就诊卡号 02165428</div>
        </div>
      </div>
      <div class="dialogBottom">
        <div class="leftTip">暂停原因</div>
        <el-row>
          <div class="radio">
            <el-radio v-model="radioStop" label="1" @change="personDefault">个人原因</el-radio>
            <div class="radio-other">
              <el-radio v-model="radioStop" label="2" @change="otherBad">不良反应<span class="radio-space">白</span>
                <span>
                  <el-select v-model="valueBad" placeholder="请选择不良反应类型" :disabled="disableBad">
                    <el-option
                      v-for="item in badAction"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </span>
              </el-radio>
              <div class="radio-other">
                <el-radio v-model="radioStop" label="3" @change="otherfunSecond">其他原因<span class="radio-space">白</span>
                  <span>
                    <el-input v-model="otherStopCause" :disabled="otherDisable" />
                  </span>
                </el-radio>
              </div>
            </div>
          </div>
        </el-row></div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="warning" @click="confirmStop">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 终止输液 -->
    <el-dialog
      title="终止输液"
      :visible.sync="dialogVisibleEnd"
      width="42%"
      :before-close="handleClose"
    >
      <div class="dialogTopEnd">
        <div class="leftIcon">
          <i class="el-icon-warning" />
        </div>
        <div class="rightTip">
          <div class="tip">患者输液药品未执行完成，确认要终止吗？</div>
          <div class="tipName">患者姓名 王菲菲</div>
          <div class="tipCard">就诊卡号 02165418</div>
        </div>
      </div>
      <div class="dialogBottom">
        <div class="leftTip">终止输液原因</div>
        <div class="radio">
          <el-radio v-model="radioEnd" label="1" @change="personDefaultSecond">个人原因</el-radio>
          <div class="radio-other">
            <el-radio v-model="radioEnd" label="2" @change="otherBadSecond">不良反应<span class="radio-space">白</span>
              <span>
                <el-select v-model="valueBadSecond" placeholder="不良反应类型" :disabled="disableBadEnd">
                  <el-option
                    v-for="item in badActionSecond"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </span>
            </el-radio>
            <div class="radio-other">
              <el-radio v-model="radioEnd" label="3" @change="otherCauseEnd">其他原因<span class="radio-space">白</span>
                <span>
                  <el-input v-model="otherEndCause" :disabled="otherDisableEnd" />
                </span>
              </el-radio>
            </div>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="danger" @click="confirmEnd">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 对话框end -->
    <!-- table -->
    <el-table
      :data="showData"
    >
      <el-table-column label="序号" type="index" width="100" />
      <el-table-column prop="patientName" label="患者姓名" />
      <el-table-column prop="numMedical" label="就诊卡号" />
      <el-table-column prop="numSeat" label="座位号" />
      <el-table-column prop="operator" label="穿刺护士" />
      <el-table-column
        label="穿刺时间"
        prop="time"
        width="150"
      />
      <el-table-column
        label="状态"
      >
        <template slot-scope="scope">
          <div :class="stateColor(scope.row.state)">
            <i :class="stateIcon(scope.row.state)" />
            {{ state(scope.row.state) }}
          </div>
        </template>
      </el-table-column>
      <el-table-column>
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
              <el-dropdown-item
                :command="{
                  index: scope.$index,
                  row: scope.row,
                  action: 'handleDetails'
                }"
              >查看详细</el-dropdown-item>
              <el-dropdown-item
                :command="{
                  index: scope.$index,
                  row: scope.row,
                  action: 'handleAgain'
                }"
              >重新穿刺</el-dropdown-item>
              <el-dropdown-item
                :disabled="scope.row.state=='1'||scope.row.state=='3'"
                :command="{
                  index: scope.$index,
                  row: scope.row,
                  action: 'handleStopOrcontinue'
                }"
                @click.native="test()"
              >暂停/继续</el-dropdown-item>
              <el-dropdown-item
                :disabled="scope.row.state=='1'||scope.row.state=='3'"
                :command="{
                  index: scope.$index,
                  row: scope.row,
                  action: 'handleEnd'
                }"
              >终止输液</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>
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
      // 确认对话框
      dialogVisible: false,
      radio: '1',
      otherCause: '',
      other: true,
      dialogVisibleStop: false,
      badAction: [
        {
          value: '头晕',
          label: '头晕'
        }, {
          value: '乏力',
          label: '乏力'
        }
      ],
      radioStop: '1',
      valueBad: '',
      otherDisable: true,
      otherStopCause: '',
      disableBad: true,
      dialogVisibleEnd: false,
      radioEnd: '1',
      disableBadEnd: true,
      otherDisableEnd: true,
      otherEndCause: '',
      valueBadSecond: '',
      badActionSecond: [
        {
          value: '头晕',
          label: '头晕'
        }, {
          value: '乏力',
          label: '乏力'
        }
      ],
      // 下拉选择状态
      status: [
        {
          value: '全部',
          label: '全部'
        },
        {
          value: '输液完成',
          label: '输液完成'
        },
        {
          value: '正在输液',
          label: '正在输液'
        },
        {
          value: '已终止',
          label: '已终止'
        },
        {
          value: '暂停输液',
          label: '暂停输液'
        }
      ],
      statusValue: '全部',
      // 状态标签文字
      state(state) {
        const stateMap = {
          '1': '输液完成',
          '2': '正在输液',
          '3': '已终止',
          '4': '暂停输液'
        }
        return stateMap[state]
      },
      // 状态的icon
      stateIcon(state) {
        const stateMap = {
          '1': 'el-icon-success',
          '2': 'el-icon-time',
          '3': 'el-icon-warning',
          '4': 'el-icon-remove-outline'
        }
        return stateMap[state]
      },
      // 状态颜色
      stateColor(state) {
        const stateMap = {
          '1': 'success-color',
          '2': 'goon-color',
          '3': 'end-color',
          '4': 'stop-color'
        }
        return stateMap[state]
      },
      tableData: [
        {
          patientName: '刘小明',
          numMedical: '1001234',
          numSeat: '06',
          operator: '李丽丽',
          time: '2020.08.10 09:45:32',
          state: '1'
        },
        {
          patientName: '屠志',
          numMedical: '1001232',
          numSeat: '12',
          operator: '陈美珍',
          time: '2020.08.10 09:45:32',
          state: '2'
        },
        {
          patientName: '杨兰',
          numMedical: '1004523',
          numSeat: '08',
          operator: '李丽丽',
          time: '2020.08.10 09:45:32',
          state: '3'
        },
        {
          patientName: '匡巧峰',
          numMedical: '1001135',
          numSeat: '09',
          operator: '李丽丽',
          time: '2020.08.10 09:45:32',
          state: '4'
        },
        {
          patientName: '魏峰',
          numMedical: '1007532',
          numSeat: '02',
          operator: '李丽丽',
          time: '2020.08.10 09:45:32',
          state: '1'
        },
        {
          patientName: '徐浩然',
          numMedical: '1007534',
          numSeat: '09',
          operator: '李丽丽',
          time: '2020.08.10 09:45:32',
          state: '3'
        }
      ],
      row: ''
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
    test() {
      console.log('test')
    },
    // 时间改变
    timeChange(date) {
      console.log(date)
    },
    // 卡号/病人改变
    contentChange(content) {
      console.log(content)
    },
    // 选择状态改变
    statusChange() {
      console.log(this.statusValue)
      // 筛选
      if (this.statusValue === '全部') {
        this.showData = this.tableData
      } else if (this.statusValue === '输液完成') {
        this.showData = []
        this.tableData.forEach(item => {
          if (item.state === '1') {
            this.showData.push(item)
          }
        })
      } else if (this.statusValue === '正在输液') {
        this.showData = []
        this.tableData.forEach(item => {
          if (item.state === '2') {
            this.showData.push(item)
          }
        })
      } else if (this.statusValue === '已终止') {
        this.showData = []
        this.tableData.forEach(item => {
          if (item.state === '3') {
            this.showData.push(item)
          }
        })
      } else if (this.statusValue === '暂停输液') {
        this.showData = []
        this.tableData.forEach(item => {
          if (item.state === '4') {
            this.showData.push(item)
          }
        })
      }
    },
    handleDetails() {
      console.log('路由跳转')
      this.$router.push({
        name: 'retrievedetail'
      })
    },
    // 重新穿刺
    handleAgain() {
      this.dialogVisible = true
    },
    // 暂停输液
    handleStopOrcontinue(index, row) {
      if (row.state === '2') {
        this.dialogVisibleStop = true
        this.row = row
      } else {
        row.state = '2'
      }
    },
    confirmStop() {
      console.log('确认暂停')
      this.dialogVisibleStop = false
      console.log(this.row)
      this.row.state = '4'
    },
    personDefault(label) {
      if (label === '1') {
        this.otherDisable = true
        this.disableBad = true
      }
    },
    otherfunSecond(label) {
      if (label === '3') {
        this.otherDisable = false
        this.disableBad = true
      }
    },
    otherBad(label) {
      if (label === '2') {
        this.disableBad = false
        this.otherDisable = true
      }
    },
    handleCommand({ index, row, action }) {
      this[action](index, row)
    },
    // 终止输液
    handleEnd(insex, row) {
      this.dialogVisibleEnd = true
      this.row = row
    },
    confirmEnd() {
      console.log('确认终止')
      this.dialogVisibleEnd = false
      this.row.state = 3
    },
    personDefaultSecond(label) {
      if (label === '1') {
        this.disableBadEnd = true
        this.otherDisableEnd = true
      }
    },
    otherBadSecond(label) {
      if (label === '2') {
        this.disableBadEnd = false
        this.otherDisableEnd = true
      }
    },
    otherCauseEnd(label) {
      if (label === '3') {
        this.disableBadEnd = true
        this.otherDisableEnd = false
      }
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    otherfunDefault(label) {
      if (label === '1') {
        this.other = true
      }
    },
    otherfun(label) {
      console.log(this.other)
      if (label === '2') {
        this.other = false
      }
    }
  }
}

</script>

<style scoped>

.success-color {
  color:#29C06D
}
.end-color {
   color: #FF4C4C;
 }
.stop-color {
   color: #F88407;
}
::v-deep .has-gutter {
  color: #666666;
}
/* 确认对话框样式 */
/* 上部分 */
.dialogTop{
  /* margin-top: -5px; */
  display: flex;
  flex-direction:row;
}
.dialogTopEnd{
  display: flex;
  flex-direction:row;
}
.dialogTopEnd .leftIcon{
  color: #FF4C4C;
}
.leftIcon{
  margin-left: 18px;
   margin-top: 20px;
  color:#F9944A ;
}
::v-deep .leftIcon .el-icon-warning{
  font-size: 300%;
}
.rightTip{
  margin-top: 20px;
  margin-left: 18px;
  font-weight: 600;
}
.dialogTopEnd .tip{
  color: #FF4C4C;
  font-size: 16px;
  margin-bottom: 11px;
}
.tip{
  color: #F9944A;
  font-size: 16px;
  margin-bottom: 11px;
}
.tipName,.tipCard{
  color: #999999;
  font-size: 12px;
  font-weight: 500;
}
.tipName {
  margin-bottom: 7px;
}
.tipCard {
  margin-bottom: 20px;
}
::v-depp .el-dialog__body{
  border-top:1px solid black;
}
::v-deep .el-dialog__title{
  font-weight: 600;
}
::v-deep .el-dialog{
  border-radius: 20px;
  background-color:#F4F4F4 ;
}
/* 下部分 */
.dialogBottom{
  display: flex;
  flex-direction: row;
  margin-top: 10px;
}
.leftTip{
  font-size: 14px;
  color: #666666;
  margin-left: 60px;
  margin-right: 10px;
}
.radio{
  margin-bottom: 10px;
}
.radio-space{
  color: white;
}
::v-deep .el-radio__label .el-input__inner{
  width: auto;
}
::v-deep .el-input .el-input--suffix{
  width: auto;
}
.radio-other{
  height: 100%;
  margin: 20px 0 -2px 0;
}
.dialogBtn {
  margin-bottom: 10px;
  width: 100%;
  display: flex;
}
.dialogBtnEnd{
  margin-bottom: 10px;
  width: 100%;
  display: flex;
}
.btn-space{
  width: 500px;
}
/* footer按钮 */
::v-deep .dialogBtn .el-button--primary{
  background-color: #F9944A;
  width: 40%;
  margin-left: 10px;
  margin-right: 10px;
  border-color:#F9944A ;
}
::v-deep .dialogBtnEnd .el-button--primary{
  background-color: #FF4C4C;
  width: 40%;
  margin-left: 10px;
  margin-right: 10px;
  border-color:#FF4C4C ;
}
</style>

