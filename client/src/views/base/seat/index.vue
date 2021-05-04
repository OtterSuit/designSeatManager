<template>
  <div style="padding:30px">
    <!-- 添加表格上方过滤条件 -->
    <myfilters
      ref="myfilters"
      title="座位"
      placeholder="请搜索座位号"
      :add-button="true"
      :search-button="true"
      :search-content="true"
      addifo="添加座位"
      @searchClick="searchClick($event)"
      @addClick="addClick"
    />
    <el-table
      :data="tableData"
      style="width: 100%"
      :cell-style="tableStyle"
      :header-cell-style="tableStyle"
      border
    >
      <el-table-column
        prop="seat_id"
        label="座位号"
      />
      <el-table-column
        prop="storey"
        label="座位楼层"
      />
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
      <el-table-column width="200">
        <template slot-scope="scope">
          <el-button
            slot="reference"
            size="mini"
            icon="el-icon-edit-outline"
            @click="handleEdit(scope.$index, scope.row)"
          >编辑</el-button>
          <el-popconfirm
            icon-color="red"
            title="确认删除吗"
            @onConfirm="handleDelete(scope.$index, scope.row)"
          >
            <el-button
              slot="reference"
              size="mini"
              icon="el-icon-delete"
            >删除</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <div style="text-align:center;margin-top:10px">
      <el-pagination
        class="page"
        :page-size="pageSize"
        :pager-count="5"
        layout="prev, pager, next"
        :total="total"
        @current-change="currentChange"
      />
    </div>
    <el-dialog :title="title" :visible.sync="show" width="800px">
      <div class="dialog-main">
        <el-form ref="form" :model="form" label-width="100px">
          <el-row>
            <el-col :span="11">
              <el-form-item label="座位号">
                <el-input v-model="form.seat_id" />
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="座位楼层">
                <!-- <el-input v-model="form.storey" /> -->
                <el-select v-model="form.storey">
                  <el-option label="一楼" value="一楼" />
                  <el-option label="二楼" value="二楼" />
                  <el-option label="三楼" value="三楼" />
                  <el-option label="四楼" value="四楼" />
                  <el-option label="五楼" value="五楼" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="22">
              <el-form-item label="状态">
                <!-- <el-input v-model="form.status" type="textarea" /> -->
                 <el-select v-model="form.status" :disabled="title === '添加座位'?true:false">
                  <el-option label="空闲" value="0" />
                  <el-option label="使用中" value="1" />
                  <el-option label="已被预约" value="2" />
                  <el-option label="暂停使用" value="3" />
                  <el-option label="暂时离开" value="4" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button v-show="!edit" type="primary" @click="addSubmit">确认</el-button>
        <el-button v-show="edit" type="primary" @click="editSubmit">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import myfilters from '@/components/myfilters'
// import { /* getInfoChange,  */addInfoChange, editInfoChange, deleteInfoChange } from '@/api/people/infoChange'
import api from '@/api'

export default {
  components: {
    myfilters
  },
  inject: ['reload'],
  data() {
    return {
      total: 100,
      pageSize: 20,
      show: false,
      edit: false,
      editIndex: 0,
      oldTable: [],
      tableData: [],
      table: [],
      form: {},
      oldForm: null,
      title: ''
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      api.getAllSeat().then(res => {
        console.log(res)
        this.table = res.result
        this.oldTable = JSON.parse(JSON.stringify(this.table))
        this.total = this.oldTable.length
        this.tableData = this.table.slice(0, this.pageSize)
      })
    },
    // 分页
    currentChange(page) {
      this.tableData = this.table.slice((page - 1) * this.pageSize, page * this.pageSize)
    },
    searchClick(select) {
      if (select.content.indexOf('F1') !== -1 || select.content.indexOf('f1') !== -1) {
        select.storey = '一楼'
      } else if (select.content.indexOf('F2') !== -1 || select.content.indexOf('f2') !== -1) {
        select.storey = '二楼'
      } else if (select.content.indexOf('F3') !== -1 || select.content.indexOf('f3') !== -1) {
        select.storey = '三楼'
      } else if (select.content.indexOf('F4') !== -1 || select.content.indexOf('f4') !== -1) {
        select.storey = '四楼'
      } else if (select.content.indexOf('F5') !== -1 || select.content.indexOf('f5') !== -1) {
        select.storey = '五楼'
      }
      console.log(select.content.length)
      if (select.content === 4) { // 精确查找
        api.getSeat({ seat_id: select.content, storey: select.storey }).then(res => {
          console.log(res)
          this.tableData = res.item
        })
      } else {
        api.getSeat({ storey: select.storey }).then(res => {
          console.log(res)
          this.tableData = res.item
        })
      }

      // if (select.content === '') {
      //   this.table = JSON.parse(JSON.stringify(this.oldTable))
      //   this.total = this.oldTable.length
      //   this.tableData = this.table.slice(0, this.pageSize)
      //   return
      // }
      // const arr = []
      // // this.oldTable.forEach(item => {
      // //   if (this.idFormat(item) === select.content) {
      // //     arr.push(item)
      // //   }
      // // })
      // if (arr.length === 0) {
      //   this.$refs.myfilters.select.content = ''
      //   this.$message({
      //     message: '不存在用户',
      //     type: 'warning'
      //   })
      // } else {
      //   this.total = arr.length
      //   this.table = arr
      //   this.tableData = this.table.slice(0, this.pageSize)
      // }
    },
    addClick() {
      this.edit = false
      this.form = {}
      this.show = true
      this.title = '添加座位'
      this.form.status = '0'
    },
    addSubmit() {
      // addInfoChange().then(response => {
      //   if (response.code === 20000) {
      //     this.$message({
      //       message: '添加成功',
      //       type: 'success'
      //     })
      //     this.oldTable.push(this.form)
      //     this.table.push(this.form)
      //     this.total += 1
      //     this.show = false
      //   }
      // })
      console.log(this.form)
      this.form.status = '0'
      this.form.user_now = ''
      this.form.appointment_time = ''
      api.registerSeat(this.form).then(res => {
        console.log(res)
        this.$message({
          message: '成功添加新座位',
          type: 'success'
        })
        this.reload()
        this.oldTable.push(this.form)
        this.table.push(this.form)
        this.total += 1
        this.show = false
      })
    },
    editSubmit() {
      if (JSON.stringify(this.form) === JSON.stringify(this.oldForm)) {
        this.$message('无信息修改')
        this.show = false
        return
      } else {
        console.log(this.form)
        api.leaveSeatNow({ seat_id: this.form.seat_id, status: this.form.status}).then(res => {
          console.log(res)
          this.$message({
            message: '修改座位状态成功！',
            type: 'success'
          })
          this.reload()
        })
      } 
      // editInfoChange().then(response => {
      //   if (response.code === 20000) {
      //     this.$message({
      //       message: '修改成功',
      //       type: 'success'
      //     })
      //     this.tableData.splice(this.editIndex, 1, this.form)
      //     this.show = false
      //   }
      // })
    },
    // idFormat(row, index) {
    //   const storeyId = {
    //     '一楼': 'A',
    //     '二楼': 'B',
    //     '三楼': 'C',
    //     '四楼': 'D',
    //     '五楼': 'E'
    //   }
    //   return storeyId[row.storey] + row.id
    // },
    handleEdit(index, row) {
      this.form = JSON.parse(JSON.stringify(row))
      this.oldForm = JSON.parse(JSON.stringify(row))
      this.edit = true
      this.editIndex = index
      this.show = true
    },
    handleDelete(index, row) { // 删除座位
      console.log(row)
      if (row.user_now === '') {
        api.removeSeat({ seat_id: row.seat_id }).then(res => {
          console.log(res)
          this.$message({
            type: 'success',
            message: '成功删除' + row.seat_id + '座位'
          })
          this.reload()
        })
      } else {
        this.$message({
          type: 'warning',
          message: '对不起！该座位有人在使用 无法删除'
        })
      }
      // deleteInfoChange().then(response => {
      //   if (response.code === 20000) {
      //     this.$message({
      //       message: '删除成功',
      //       type: 'success'
      //     })
      //     this.tableData.splice(index, 1)
      //   }
      // })
    },
    tableStyle() {
      return {
        textAlign: 'center'
      }
    },
    // 状态样式
    // 状态标签文字
    status(status) {
      if (status === '0') {
        return '空闲'
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
  }
}
</script>
<style lang="scss" type="text/scss" scoped>
::v-deep .el-dialog__body {
  padding-left: 0;
}
::v-deep .tabsHeader {
  margin: 0;
  position: relative;
  top: 0 !important;
}
</style>
