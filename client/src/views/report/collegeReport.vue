<template>
  <div id="print" style="padding:30px">
    <!-- 头部 -->
    <myfilters
      :title="title"
      :exportout-button="true"
      @exportExcel="exportExcel"
      @exportPDF="exportPDF"
      @exportHTML="exportHTML"
    />
    <!-- 头部end -->
    <!-- table -->
    <div ref="html">
      <el-table
        :data="tableData"
        style="width: 100%;"
      >
        <el-table-column label="学院" prop="_id" />
        <el-table-column label="申请总人数" prop="num_tutorial" sortable />
        <el-table-column label="备注" :formatter="remarkFormat" />
      </el-table>
    </div>
  </div>

</template>

<script>
import myfilters from '@/components/myfilters'
import htmlToPdf from '@/vendor/Export2Pdf'
import htmlToHtml from '@/vendor/Export2Html'
import api from '@/api'
// import { getDashboard } from '@/api/dashboard/dashboard'

export default {
  components: {
    myfilters
  },
  data() {
    return {
      title: '学院申请统计',
      tableData: []
    }
  },
  computed: {
    // 计算tableData有几条数据
    content() {
      return '共' + this.tableData.length + '条数据'
    }
  },
  created() {
    api.historySum({ type: 'college' }).then(res => {
        this.tableData = res
    })
  },
  methods: {
    remarkFormat(row, index) {
      return row.remark || '无'
    },
    // 导出
    exportExcel() {
      import('@/vendor/Export2Excel').then(excel => {
        const multiHeader = [
          ['学院申请统计', '', '']
        ]
        const header = ['学院', '申请总人数', '备注']
        const filterVal = ['_id', 'num_tutorial', 'remark']
        const data = this.formatJson(filterVal)
        const merges = ['A1:C1']
        excel.export_json_to_excel({
          multiHeader,
          header,
          data,
          merges,
          filename: '学院申请统计'
        })
      })
    },
    formatJson(filterVal) {
      return this.tableData.map(v => {
        return filterVal.map(j => {
          return v[j]
        })
      }
      )
    },
    exportHTML() {
      const a = document.createElement('a')
      const url = window.URL.createObjectURL(
        new Blob([htmlToHtml.getHtml(this.$refs.html.innerHTML, this.title)], {
          type: ''
        })
      )
      a.href = url
      a.download = this.title + '.html'
      a.click()
      window.URL.revokeObjectURL(url)
    },
    exportPDF() {
      htmlToPdf.downloadPDF(document.querySelector('#print'), `${this.title}`)
    }
  }
}

</script>
<style lang="scss" type="text/scss" scoped>
::v-deep .el-table .cell{
    text-align: center;
}
</style>
