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
        prop="remark"
        label="备注"
      />
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
    <el-dialog title="岗位变动信息" :visible.sync="show" width="800px">
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
              <el-form-item label="备注">
                <el-input v-model="form.remark" type="textarea" />
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
import { /* getInfoChange,  */addInfoChange, editInfoChange, deleteInfoChange } from '@/api/people/infoChange'
import api from '@/api'

export default {
  components: {
    myfilters
  },
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
      oldForm: null
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
      if (select.content === '') {
        this.table = JSON.parse(JSON.stringify(this.oldTable))
        this.total = this.oldTable.length
        this.tableData = this.table.slice(0, this.pageSize)
        return
      }
      const arr = []
      // this.oldTable.forEach(item => {
      //   if (this.idFormat(item) === select.content) {
      //     arr.push(item)
      //   }
      // })
      if (arr.length === 0) {
        this.$refs.myfilters.select.content = ''
        this.$message({
          message: '不存在用户',
          type: 'warning'
        })
      } else {
        this.total = arr.length
        this.table = arr
        this.tableData = this.table.slice(0, this.pageSize)
      }
    },
    addClick() {
      this.edit = false
      this.form = {}
      this.show = true
    },
    addSubmit() {
      addInfoChange().then(response => {
        if (response.code === 20000) {
          this.$message({
            message: '添加成功',
            type: 'success'
          })
          this.oldTable.push(this.form)
          this.table.push(this.form)
          this.total += 1
          this.show = false
        }
      })
    },
    editSubmit() {
      if (JSON.stringify(this.form) === JSON.stringify(this.oldForm)) {
        this.$message('无信息修改')
        this.show = false
        return
      }
      editInfoChange().then(response => {
        if (response.code === 20000) {
          this.$message({
            message: '修改成功',
            type: 'success'
          })
          this.tableData.splice(this.editIndex, 1, this.form)
          this.show = false
        }
      })
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
    handleDelete(index, row) {
      deleteInfoChange().then(response => {
        if (response.code === 20000) {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          this.tableData.splice(index, 1)
        }
      })
    },
    tableStyle() {
      return {
        textAlign: 'center'
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
