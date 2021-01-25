<template>
  <div style="padding:30px">
    <myfilters
      ref="myfilters"
      title="权限管理"
      :content="content"
      :choose-department="true"
      searchifo="切换"
      :search-button="true"
      :search-name="true"
      @searchClick="searchClick($event)"
    />
    <el-table
      :data="tableData"
      style="width: 100%"
      :cell-style="tableStyle"
      :header-cell-style="tableStyle"
      border
    >
      <el-table-column
        prop="module"
        label="模块"
      />
      <el-table-column
        prop="content"
        label="权限内容"
      />
      <el-table-column label="权限设置" width="160">
        <template slot-scope="scope">
          <el-switch
            v-model="tableData[scope.$index].setting"
          />
        </template>
      </el-table-column>
    </el-table>
    <div style="text-align:center;margin-top:10px;">
      <el-button type="primary" @click="onSubmit">提交权限信息</el-button>
      <el-button type="primary" @click="onCancel">取消</el-button>
    </div>
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
      content: '',
      tableData: [
        {
          module: '人员管理',
          content: '查看岗位变动信息',
          setting: false
        },
        {
          module: '人员管理',
          content: '添加岗位变动信息',
          setting: false
        },
        {
          module: '人员管理',
          content: '编辑岗位变动信息',
          setting: false
        },
        {
          module: '人员管理',
          content: '删除岗位变动信息',
          setting: false
        }
      ],
      oldTableData: []
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.oldTableData = JSON.parse(JSON.stringify(this.tableData))
    },
    // 切换用户
    searchClick(select) {
      this.content = select.department + '   ' + select.name
      this.$message({
        message: '切换用户成功',
        type: 'success'
      })
    },
    // 提交权限信息
    onSubmit() {
      if (JSON.stringify(this.tableData) === JSON.stringify(this.oldTableData)) {
        this.$message('无信息修改')
        return
      }
      this.$message({
        message: '提交成功',
        type: 'success'
      })
      this.oldTableData = JSON.parse(JSON.stringify(this.tableData))
    },
    onCancel() {
      this.tableData = JSON.parse(JSON.stringify(this.oldTableData))
      this.$message({
        message: '取消成功',
        type: 'success'
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
::v-deep .content {
  font-size: 14px;
  display: inline-block;
  color: #787878;
}
</style>
