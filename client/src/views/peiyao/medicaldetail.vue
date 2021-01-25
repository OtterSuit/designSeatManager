<template>
  <div class="medicalMain">
    <!-- 头部 -->
    <myfilters
      title="王菲菲"
      content="NO.1001234"
      :back-button="true"
      @backClick="backClick"
    />
    <!-- 头部 end -->
    <!-- 患者信息 -->
    <div class="Infomation-medical">
      <el-row>
        <el-col :span="6">
          <div id="cardInfo">
            {{ $data.title[0] }}
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4"><span class="label">患者姓名</span> <span class="span-font">{{ $data.query.name }}</span></el-col>
        <el-col :span="4"><span class="label">患者年龄</span> <span class="span-font">{{ $data.query.age }}</span></el-col>
        <el-col :span="4"><span class="label">门诊号</span> <span class="span-font">{{ $data.query.num }}</span></el-col>
        <el-col :span="4"><span class="label">看诊医生</span> <span class="span-font">{{ $data.query.doctor }}</span></el-col>
      </el-row>
      <el-row>
        <el-col :span="4"><span class="label">患者性别</span> <span class="span-font">{{ $data.query.sex }}</span></el-col>
        <el-col :span="4"><span class="label">就诊卡号</span> <span class="span-font">{{ $data.query.numMedical }}</span></el-col>
        <el-col :span="4"><span class="label">手机号码</span> <span class="span-font">{{ $data.query.numPhone }}</span></el-col>
        <el-col :span="4"><span class="label">看诊时间</span> <span class="span-font">{{ $data.query.time }}</span></el-col>
      </el-row>
      <el-row>
        <div class="status">
          <el-col :span="7">
            <span class="label">座位号</span>
            <span class="span-font">
              {{ $data.statusSeat }}
            </span>
          </el-col>
          <el-col :span="6">
            <span class="label">当前状态</span>
            <span class="span-font sucess-color">
              {{ $data.statusNow }}
            </span>
          </el-col>
        </div>
      </el-row>
    </div>
    <!-- 患者信息end -->
    <!-- 巡回记录 -->
    <div class="Infomation-xunhui">
      <div class="header">
        <el-row>
          <el-col :span="16">
            <div id="cardInfo">
              {{ $data.title[1] }}
            </div>
          </el-col>
        </el-row>
        <el-row />
      </div>
      <!-- table -->
      <el-table
        :data="tableData"
      >
        <el-table-column label="组号" prop="gNum" width="100" />
        <el-table-column prop="medicalName" label="药品名称" />
        <el-table-column prop="medicalNum" label="规格" />
        <el-table-column prop="dosage" label="剂量" />
        <el-table-column prop="frequency" label="频次" />
        <el-table-column prop="dayNum" label="天数" />
        <el-table-column prop="usage" label="用法" />
        <el-table-column prop="done" label="已完成(天)" />
      </el-table>
    </div>
    <!-- 巡回记录结束 -->
    <!-- 流程记录 -->
    <div class="Infomation-flow">
      <div class="header">
        <el-row>
          <el-col :span="16">
            <div id="cardInfo">
              {{ $data.title[2] }}
            </div>
          </el-col>
        </el-row>
      </div>
      <!-- table -->
      <el-table
        :data="tableDataSecond"
      >
        <el-table-column label="序号" type="index" width="100" />
        <el-table-column prop="flowType" label="流程类型" />
        <el-table-column prop="operator" label="操作人" />
        <el-table-column prop="time" label="操作时间" />

      </el-table>
    </div>
    <!-- 流程记录结束 -->
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
      title: ['患者信息', '输液清单', '流程记录'],
      dateRange: '',
      statusSeat: '06',
      statusNow: '配药完成',
      query: {
        name: '王菲菲',
        age: '5岁6月',
        num: '00240',
        doctor: '李刚',
        sex: '女',
        numMedical: 1001234,
        numPhone: '13412345678',
        time: '2020.8.10 14:34'
      },
      tableData: [
        {
          gNum: '2',
          medicalName: '5%葡萄糖氯化钠注射液',
          medicalNum: '500mlx1袋',
          dosage: '500ml',
          frequency: 'QD',
          dayNum: '2',
          usage: '静脉输液',
          done: '0'
        },
        {
          gNum: '2',
          medicalName: '林可霉素针',
          medicalNum: '0.6x1瓶',
          dosage: '0.6',
          frequency: 'QD',
          dayNum: '2',
          usage: '静脉输液',
          done: '0'
        },
        {
          gNum: '3',
          medicalName: '10%葡萄糖注射液',
          medicalNum: '500mlx1袋',
          dosage: '500ml',
          frequency: 'QD',
          dayNum: '2',
          usage: '静脉输液',
          done: '0'
        },
        {
          gNum: '3',
          medicalName: '维生素C针',
          medicalNum: '1.0x1瓶',
          dosage: '3.0',
          frequency: 'QD',
          dayNum: '2',
          usage: '静脉输液',
          done: '0'
        },
        {
          gNum: '4',
          medicalName: '庆大霉素针',
          medicalNum: '8万Ux1瓶',
          dosage: '24万U',
          frequency: 'QD',
          dayNum: '2',
          usage: '静脉输液',
          done: '0'
        },
        {
          gNum: '4',
          medicalName: '10%葡萄糖注射液',
          medicalNum: '500mlx1袋',
          dosage: '500ml',
          frequency: 'QD',
          dayNum: '2',
          usage: '静脉输液',
          done: '0'
        }
      ],
      tableDataSecond: [
        {
          flowType: '输液登记',
          operator: '赵美丽',
          time: '2020.08.31 09:42:54'
        },
        {
          flowType: '配药',
          operator: '赵美丽',
          time: '2020.08.31 09:45:54'
        }
      ]
    }
  },
  methods: {
    backClick() {
      this.$router.push({
        name: 'Company'
      })
    },
    dateChange() {
      console.log(this.dateRange)
    }
  }
}
</script>

<style scoped>
::v-deep .el-input__inner{
    margin-top: 10px;
}
.header{
    margin: 0 0 15px 0;
}
.medicalMain{
  padding: 30px 20px;
  background-color:#F0F2F5;
  min-height: calc(100vh - 50px);
}
.Infomation-medical{
  margin-top: 20px;
  height: 240px;
  background-color: #FFFFFF;
}
.Infomation-xunhui{
  margin-top: 20px;
  background-color: #FFFFFF;
}
.Infomation-flow{
  margin-top: 20px;
  background-color: #FFFFFF;
}
#cardInfo{
  width: 72px;
  height: 24px;
  font-size: 18px;
  font-family: MicrosoftYaHei;
  color: #999999;
  line-height: 24px;
  margin:10px 15px;
}
.span-font{
    font-size: 14px;
}
.label{
  width: 60px;
  height: 19px;
  font-size: 14px;
  font-family: MicrosoftYaHei;
  color: #9EAEC3;
  line-height: 19px;
  margin-top: 10px;
}
::v-deep .el-col-4{
  margin: 10px 30px;
}
.status {
  margin:40px 0 0 45px
}
.sucess-color {
  color: #29C06D;
}
</style>

