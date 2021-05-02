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
        <el-table-column label="具体时间" prop="option_time" sortable />
        <el-table-column label="被举报人" prop="be_informant" />
        <el-table-column label="举报人" prop="informant" />
        <el-table-column label="被举报座位" prop="seat_id" />
        <el-table-column label="举报原因" prop="remark" width="500px"/>
      </el-table>
    </div>
  </div>

</template>

<script>
import api from '@/api'
import store from '@/store'
import common from '../../utils/gettime'
import myfilters from '@/components/myfilters'
import htmlToPdf from '@/vendor/Export2Pdf'
import htmlToHtml from '@/vendor/Export2Html'

export default {
  name: 'Reputation',
  components: {
    myfilters
  },
  data() {
    return {
      title: '举报记录',
      tableData: [],
      isAdmin: false // 是否是管理员
    }
  },
  computed: {
    // 计算tableData有几条数据
    content() {
      return '共' + this.tableData.length + '条数据'
    }
  },
  created(){
    const school_id = store.getters.schoolId
    api.getUser({ school_id: school_id }).then(res => {
      console.log(res)
      if (res.item.identity === 'admin') {
        this.isAdmin = true
      }
    })
    //   查所有的举报记录 并且处理时间格式
      api.getInfoForReputation().then(res => {
          for (let index = 0; index < res.item.length; index++) {
            const element = res.item[index];
            // console.log(common(element.option_time))
            res.item[index].option_time = common(element.option_time)
          }
          if (this.isAdmin !== true) {
          for (let index = 0; index < res.item.length; index++) {
            res.item[index].informant = '***'
          }
        }
        this.tableData = res.item
      })
  },
  methods: {
    // 导出
    exportExcel() {
      import('@/vendor/Export2Excel').then(excel => {
        const multiHeader = [
          ['举报记录', '', '', '','','']
        ]
        const header = ['具体时间', '被举报人', '举报人','被举报座位', '举报原因']
        const filterVal = ['date', 'informant', 'be_informant','seat_id', 'remark']
        const data = this.formatJson(filterVal)
        const merges = ['A1:D1']
        excel.export_json_to_excel({
          multiHeader,
          header,
          data,
          merges,
          filename: '举报记录'
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
