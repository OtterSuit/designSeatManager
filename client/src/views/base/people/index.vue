<template>
  <div style="padding:30px">
    <!-- 添加表格上方过滤条件 -->
    <myfilters
      ref="myfilters"
      title="人员信息"
      :add-button="true"
      :search-button="true"
      :search-name="true"
      :choose-college="true"
      addifo="添加人员"
      @searchClick="searchClick($event)"
      @addClick="addClick"
      @collegeChange="collegeChange"
    />
    <el-table
      :data="tableData"
      style="width: 100%"
      :cell-style="tableStyle"
      :header-cell-style="tableStyle"
      border
    >
      <el-table-column
        prop="schoolID"
        label="学号"
      />
      <el-table-column
        prop="name"
        label="名称"
      />
      <el-table-column
        prop="identity"
        label="身份"
        :formatter="formatIdentity"
      />
      <el-table-column
        prop="college"
        label="学院"
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
    <el-dialog :title="dialogTitle" :visible.sync="show" width="800px">
      <div class="dialog-main">
        <el-form ref="form" :model="form" label-width="100px" :rules="rules">
          <el-row type="flex">
            <el-col :span="11">
              <el-form-item label="学号" prop="schoolID">
                <el-input ref="idInput" v-model.number="form.schoolID" />
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="名称" prop="name">
                <el-input v-model="form.name" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex">
            <el-col :span="11">
              <el-form-item label="身份" prop="identity">
                <el-select v-model="form.identity">
                  <el-option label="用户" value="user" />
                  <el-option label="管理员" value="admin" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="学院" prop="college">
                <el-input v-model="form.college" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex">
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
// import { getPeopleInfo } from '@/api/baseData/baseData'
import api from '@/api'
import { /* getInfoChange, */ addInfoChange, editInfoChange, deleteInfoChange } from '@/api/people/infoChange'
export default {
  components: {
    myfilters
  },
  data() {
    return {
      rules: {
        schoolID: [
          { required: true, message: '请输入学号', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        identity: [
          { required: true, message: '请选择身份', trigger: ['blur', 'change'] }
        ],
        college: [
          { required: true, message: '请输入学院', trigger: 'blur' }
        ]
      },
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
      dialogTitle: ''
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      // getPeopleInfo().then(res => {
      //   console.log(res)
      //   this.table = res.data.items.peopleMessage
      //   this.oldTable = JSON.parse(JSON.stringify(this.table))
      //   this.total = this.oldTable.length
      //   this.tableData = this.table.slice(0, this.pageSize)
      // })
      api.getAllUser().then(res => {
        console.log(res);
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
    collegeChange(college) {
      if (college === '全部学院') {
        this.table = JSON.parse(JSON.stringify(this.oldTable))
        this.total = this.oldTable.length
        this.tableData = this.table.slice(0, this.pageSize)
        return
      }
      const arr = []
      this.oldTable.forEach(item => {
        if (item.college === college) {
          arr.push(item)
        }
      })
      this.total = arr.length
      this.table = arr
      this.tableData = this.table.slice(0, this.pageSize)
    },
    searchClick(select) {
      if (select.name === '') {
        this.table = JSON.parse(JSON.stringify(this.oldTable))
        this.total = this.oldTable.length
        this.tableData = this.table.slice(0, this.pageSize)
        return
      }
      const arr = []
      this.oldTable.forEach(item => {
        if (item.name === select.name) {
          arr.push(item)
        }
      })
      if (arr.length === 0) {
        this.$refs.myfilters.select.name = ''
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
    formatIdentity(row, index) {
      return row.identity === "admin" ? '管理员' : '用户'
    },
    addClick() {
      this.edit = false
      this.form = {}
      this.dialogTitle = '新增人员信息'
      this.show = true
      this.$nextTick(x => {
        this.$refs.idInput.focus()
      })
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
    handleEdit(index, row) {
      this.form = JSON.parse(JSON.stringify(row))
      this.oldForm = JSON.parse(JSON.stringify(row))
      this.edit = true
      this.editIndex = index
      this.dialogTitle = '修改人员信息'
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
</style>
