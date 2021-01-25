<template>
  <div id="print" style="padding:30px">
    <!-- 头部 -->
    <myfilters
      :title="title"
      :content="content"
      :exportout-button="true"
      @exportExcel="exportExcel"
      @exportPDF="exportPDF"
      @exportHTML="exportHTML"
    >
      <template slot="extent">
        <!-- 选择查询模式 -->
        <el-select v-model="nurseSelect" placeholder="护士姓名" @change="nurseChoose">
          <el-option
            v-for="item in optionsNurse"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <!-- 过滤条件 -->
        <!-- <el-date-picker
          v-if="dayDate"
          v-model="day"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          @change="dayChoose"
        /> -->
        <el-date-picker
          v-model="month"
          type="monthrange"
          range-separator="至"
          start-placeholder="开始月份"
          end-placeholder="结束月份"
          @change="monthChoose"
        />
        <!-- <el-date-picker
          v-if="yearDate"
          v-model="year"
          type="year"
          range-separator="至"
          start-placeholder="开始年份"
          end-placeholder="结束年份"
          @change="yearChoose"
        /> -->
        <!-- 过滤条件end -->
      </template>
    </myfilters>
    <!-- 头部end -->

    <!-- table -->
    <div ref="html">
      <el-table
        :data="showData"
        style="width: 100%;"
      >
        <el-table-column label="序号" type="index" width="60" />
        <el-table-column prop="operatorType" label="操作类型" width="80" />
        <el-table-column prop="operatorTime" label="操作时间" />
        <el-table-column prop="operator" label="操作护士" width="80" />
        <el-table-column prop="name" label="患者姓名" />
        <el-table-column prop="nameMedical" label="药品名称" />
      </el-table>
    </div>
  </div>
</template>

<script>
import myfilters from '@/components/myfilters'
import htmlToPdf from '@/vendor/Export2Pdf'
import htmlToHtml from '@/vendor/Export2Html'
export default {
  components: {
    myfilters
  },
  data() {
    return {
      title: '工作记录查询',
      month: '',
      nurseSelect: '',
      showData: [],
      tableData: [
        {
          operatorType: '拔针',
          operatorTime: '2020.08.10 09:45:54',
          operator: '张佳佳',
          name: '王菲菲',
          nameMedical: '庆大毒素针;10%葡萄糖注射液'
        },
        {
          operatorType: '换液',
          operatorTime: '2020.08.10 09:45:54',
          operator: '张佳佳',
          name: '王菲菲',
          nameMedical: '维生素C针;10%葡萄糖注射液'
        },
        {
          operatorType: '换液',
          operatorTime: '2020.08.10 09:45:54',
          operator: '张佳佳',
          name: '王菲菲',
          nameMedical: '林可毒素针;5%葡萄糖氯化钠注射液'
        },
        {
          operatorType: '换液',
          operatorTime: '2020.08.10 05:45:54',
          operator: '李小琴',
          name: '顾郁芳',
          nameMedical: '庆大毒素针;10%葡萄糖氯化钠注射液'
        }
      ],
      optionsNurse: [
        {
          value: '全部',
          label: '全部'
        },
        {
          value: '赵美丽',
          label: '赵美丽'
        },
        {
          value: '王桂芳',
          label: '王桂芳'
        },
        {
          value: '李小琴',
          label: '李小琴'
        }
      ],
      allTableData: []
    }
  },
  computed: {
    // 计算tableData有几条数据
    content() {
      return '共' + this.tableData.length + '条数据'
    }
  },
  created() {
    this.allTableData = JSON.parse(JSON.stringify(this.tableData))
    this.showData = this.tableData
  },
  methods: {
    // 过滤选择
    dayChoose(day) {
      console.log(day)
    },
    monthChoose(month) {
      console.log(month)
    },
    yearChoose(year) {
      console.log(year)
    },
    // 护士姓名选择改变
    nurseChoose() {
      // 筛选
      if (this.nurseSelect === '全部') {
        this.showData = this.tableData
      } else if (this.nurseSelect === '赵美丽') {
        this.showData = []
        this.tableData.forEach(item => {
          if (item.operator === '赵美丽') {
            this.showData.push(item)
          }
        })
      } else if (this.nurseSelect === '王桂芳') {
        this.showData = []
        this.tableData.forEach(item => {
          if (item.operator === '王桂芳') {
            this.showData.push(item)
          }
        })
      } else if (this.nurseSelect === '李小琴') {
        this.showData = []
        this.tableData.forEach(item => {
          if (item.operator === '李小琴') {
            this.showData.push(item)
          }
        })
      }
    },
    // 查询
    searchClick(content) {
      console.log(content)
    },
    // 导出
    exportExcel() {
      import('@/vendor/Export2Excel').then(excel => {
        const multiHeader = [
          ['工作记录', '', '', '', '']
        ]
        const header = ['操作类型', '操作时间', '操作护士', '患者姓名', '药品名称']
        const filterVal = ['operatorType', 'operatorTime', 'operator', 'name', 'nameMedical']
        const data = this.formatJson(filterVal)
        const merges = ['A1:E1']
        excel.export_json_to_excel({
          multiHeader,
          header,
          data,
          merges,
          filename: '工作记录'
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
      a.download = '工作记录查询.html'
      a.click()
      window.URL.revokeObjectURL(url)
    },
    exportPDF() {
      htmlToPdf.downloadPDF(document.querySelector('#print'), `${this.title}`)
    }
    // 选择查找类型
    // dateChoose(content) {
    //   console.log(content)
    //   if (content === '按月查找') {
    //     this.dayDate = false
    //     this.monthDate = true
    //     this.yearDate = false
    //   } else if (content === '按年查找') {
    //     this.dayDate = false
    //     this.monthDate = false
    //     this.yearDate = true
    //   } else if (content === '按日查找') {
    //     this.dayDate = true
    //     this.monthDate = false
    //     this.yearDate = false
    //   }
    // }
  }
}

</script>
<style lang="scss" type="text/scss" scoped>

::v-deep .el-range-editor.el-input__inner{
    width: 300px;
}
::v-deep .el-input__inner{
     width: 95%;
    margin-left: 10px;
}
::v-deep .el-table .cell{
    text-align: center;
}
::v-deep .el-button{
  margin: auto;
}
// ::v-deep .tiaozhengyong{
//   line-height: 30px;
// }
</style>
