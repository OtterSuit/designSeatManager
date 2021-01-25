<template>
  <div id="print" style="padding:30px">
    <!-- 头部 -->
    <myfilters
      :title="title"
      :content="content"
      :find-button="true"
      :exportout-button="true"
      @exportExcel="exportExcel"
      @exportPDF="exportPDF"
      @exportHTML="exportHTML"
      @searchClick="searchClick"
    >
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
        <el-table-column prop="peopleNum" label="总人数" />
        <el-table-column prop="vd" label="静脉输液(VD)" />
        <el-table-column prop="iv" label="静脉注射(IV)" />
        <el-table-column prop="im" label="肌内注射(IM)" />
        <el-table-column prop="atomization" label="雾化" />
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
      title: '输液人数统计',
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
          peopleNum: '210',
          vd: '89',
          iv: '37',
          im: '94',
          atomization: '94'
        },
        {
          time: '2020.08.09',
          peopleNum: '244',
          vd: '64',
          iv: '42',
          im: '17',
          atomization: '13'
        },
        {
          time: '2020.08.08',
          peopleNum: '523',
          vd: '31',
          iv: '61',
          im: '72',
          atomization: '70'
        },
        {
          time: '2020.08.07',
          peopleNum: '456',
          vd: '19',
          iv: '94',
          im: '39',
          atomization: '60'
        },
        {
          time: '2020.08.06',
          peopleNum: '518',
          vd: '48',
          iv: '84',
          im: '42',
          atomization: '36'
        },
        {
          time: '2020.08.05',
          peopleNum: '199',
          vd: '82',
          iv: '38',
          im: '27',
          atomization: '20'
        },
        {
          time: '2020.08.04',
          peopleNum: '598',
          vd: '13',
          iv: '36',
          im: '94',
          atomization: '78'
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
          ['输液人数统计', '', '', '', '', '']
        ]
        const header = ['日期', '总人数', '静脉输液(VD)', '静脉注射(IV)', '肌内注射(IM)', '雾化']
        const filterVal = ['time', 'peopleNum', 'vd', 'iv', 'im', 'atomization']
        const data = this.formatJson(filterVal)
        const merges = ['A1:F1']
        excel.export_json_to_excel({
          multiHeader,
          header,
          data,
          merges,
          filename: '输液人数统计'
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
      a.download = '输液人数统计.html'
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
::v-deep .el-button{
  margin: auto;
}
::v-deep .content{
    margin-left: 2px;
}
::v-deep .tiaozhengyong{
  line-height: 30px;
}
</style>
