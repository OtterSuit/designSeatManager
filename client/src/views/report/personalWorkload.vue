<template>
  <div id="print" style="padding:30px">
    <!-- 头部 -->
    <myfilters
      :title="title"
      :content="content"
      :exportout-button="true"
      :find-button="true"
      @exportExcel="exportExcel"
      @exportPDF="exportPDF"
      @exportHTML="exportHTML"
      @searchClick="searchClick"
    >
      <!-- 选择护士 -->
      <template slot="expand">
        <el-select v-model="nurseSelect" placeholder="护士姓名" @change="nurseChoose">
          <el-option
            v-for="item in optionsnurse"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </template>
      <template slot="extent">
        <!-- 选择查询模式 -->
        <el-col :span="5">
          <el-select v-model="dateSelect" @change="dateChoose">
            <el-option
              v-for="item in optionsDate"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-col>
        <!-- 过滤条件 -->
        <el-col :span="8">
          <el-date-picker
            v-if="dayDate"
            v-model="day"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="dayChoose"
          />
          <el-date-picker
            v-if="monthDate"
            v-model="month"
            type="monthrange"
            range-separator="至"
            start-placeholder="开始月份"
            end-placeholder="结束月份"
            @change="monthChoose"
          />
          <el-date-picker
            v-if="yearDate"
            v-model="year"
            type="year"
            range-separator="至"
            start-placeholder="开始年份"
            end-placeholder="结束年份"
            @change="yearChoose"
          />
        </el-col>
        <!-- 过滤条件end -->
      </template>
    </myfilters>
    <!-- 头部end -->

    <!-- table -->
    <div ref="html">
      <el-table
        :data="tableData"
        style="width: 100%;"
      >
        <el-table-column label="日期" prop="time" width="100" />
        <el-table-column prop="people" label="总人数" />
        <el-table-column prop="orders" label="接单" />
        <el-table-column prop="dispensing" label="配药" />
        <el-table-column prop="scalp" label="穿刺" />
        <el-table-column prop="changeFluid" label="换液" />
        <el-table-column prop="finish" label="输液完成" />
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
      title: '个人工作量统计',
      day: '',
      month: '',
      year: '',
      dateSelect: '按日查找',
      dayDate: true,
      monthDate: false,
      yearDate: false,
      tableData: [
        {
          time: '2020.08.10',
          people: '21',
          orders: 0,
          dispensing: 0,
          scalp: 8,
          changeFluid: 6,
          finish: 7
        }

      ],
      optionsDate: [
        {
          value: '按日查找',
          label: '按日查找'
        },
        {
          value: '按月查找',
          label: '按月查找'
        },
        {
          value: '按年查找',
          label: '按年查找'
        }
      ],
      nurseSelect: '',
      optionsnurse: [
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
    // 护士姓名改变
    nurseChoose(content) {
      console.log(content)
    },
    // 查询统计按钮
    searchClick(content) {
      console.log(content)
    },
    // 选择查找类型
    dateChoose(content) {
      console.log(content)
      if (content === '按月查找') {
        this.dayDate = false
        this.monthDate = true
        this.yearDate = false
      } else if (content === '按年查找') {
        this.dayDate = false
        this.monthDate = false
        this.yearDate = true
      } else if (content === '按日查找') {
        this.dayDate = true
        this.monthDate = false
        this.yearDate = false
      }
    },
    // 导出
    exportExcel() {
      import('@/vendor/Export2Excel').then(excel => {
        const multiHeader = [
          ['个人工作量统计', '', '', '', '', '', '']
        ]
        const header = ['日期', '总人数', '接单', '配药', '穿刺', '换液', '输液完成']
        const filterVal = ['time', 'people', 'orders', 'dispensing', 'scalp', 'changeFluid', 'finish']
        const data = this.formatJson(filterVal)
        const merges = ['A1:G1']
        excel.export_json_to_excel({
          multiHeader,
          header,
          data,
          merges,
          filename: '个人工作量统计'
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
      a.download = '个人工作量统计.html'
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
// ::v-deep .el-range-editor.el-input__inner{
//     width: 300px;
// }
// ::v-deep .el-input__inner{
//     width: 85%;
//     margin-left: 30px;
// }
::v-deep .el-table .cell{
    text-align: center;
}
::v-deep .el-button{
  margin: auto;
}
::v-deep .el-date-editor .el-range-editor .el-input__inner .el-date-editor--daterange{
    margin-right: 20px;
}
::v-deep .content{
    margin-left: 2px;
}
::v-deep .tiaozhengyong{
  line-height: 30px;
}
// ::v-deep .el-input .el-input--suffix{
//     width: 60%;
// }
// ::v-deep .el-select{
//     width: 60%;
// }
</style>
