<template>
  <div style="padding:30px">
    <!-- 添加表格上方过滤条件 -->
    <myfilters
      title="账号信息"
      addifo="添加账号信息"
      :add-button="true"
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
        prop="name"
        label="姓名"
        fixed
      />
      <el-table-column
        prop="username"
        label="用户名"
      />
      <el-table-column
        prop="password"
        label="密码"
      />
      <el-table-column label="操作" width="160" fixed="right">
        <template slot-scope="scope">
          <el-button
            size="mini"
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
              type="danger"
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
    <el-dialog title="账号信息" :visible.sync="show" width="800px">
      <div class="dialog-main">
        <el-form ref="form" :model="form" label-width="80px" :rules="rules">
          <el-row type="flex">
            <el-col :span="12">
              <el-form-item label="姓名" prop="name">
                <el-input v-model="form.name" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="用户名" prop="username">
                <el-input v-model="form.username" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex">
            <el-col :span="12">
              <el-form-item label="密码" prop="password">
                <el-input v-model="form.password" />
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
import { getRegister } from '@/api/systemSettings/register'
import myfilters from '@/components/myfilters'
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
      tableData: [],
      table: [],
      rules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      },
      form: {
        name: '',
        username: '',
        password: ''
      },
      oldForm: null
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      getRegister().then(response => {
        this.table = response.data.items
        this.total = response.data.total
        this.tableData = this.table.slice(0, this.pageSize)
      })
    },
    // 分页
    currentChange(page) {
      this.tableData = this.table.slice((page - 1) * this.pageSize, page * this.pageSize)
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
    addClick() {
      this.edit = false
      this.form = {
        name: '',
        username: '',
        password: ''
      }
      this.show = true
    },
    addSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$message({
            message: '添加成功',
            type: 'success'
          })
          this.table.push(this.form)
          this.total += 1
          this.show = false
        } else {
          this.$message({
            message: '请按要求填写',
            type: 'warning'
          })
        }
      })
    },
    editSubmit() {
      if (JSON.stringify(this.form) === JSON.stringify(this.oldForm)) {
        this.$message('无信息修改')
        this.show = false
        return
      }
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$message({
            message: '修改成功',
            type: 'success'
          })
          this.tableData.splice(this.editIndex, 1, this.form)
          this.show = false
          this.edit = false
        } else {
          this.$message({
            message: '请按要求填写',
            type: 'warning'
          })
        }
      })
    },
    handleEdit(index, row) {
      this.oldForm = JSON.parse(JSON.stringify(row))
      this.form = JSON.parse(JSON.stringify(row))
      this.edit = true
      this.editIndex = index
      this.show = true
    },
    handleDelete(index, row) {
      this.$message({
        message: '删除成功',
        type: 'success'
      })
      this.tableData.splice(index, 1)
    },
    tableStyle() {
      return {
        textAlign: 'center'
      }
    }
  }
}
</script>
