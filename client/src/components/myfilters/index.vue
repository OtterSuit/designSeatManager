<template>
  <div style="margin-bottom: 10px">
    <el-form ref="select" :model="select">
      <el-row type="flex" align="middle" justify="space-between" :gutter="10">
        <el-col :span="5">
          <div class="tiaozhengyong">
            <span class="title">{{ title }}</span>
            <span class="content">{{ content }}</span>
            <slot name="titleExtent" />
          </div>
        </el-col>
        <el-col :span="18">
          <el-row type="flex" justify="end" :gutter="10">
            <!-- 加一个插槽 -->
            <el-col :span="4">
              <slot name="expand" />
            </el-col>
            <!-- 搜索的输入框 -->
            <el-col v-if="searchName" :span="6">
              <el-form-item style="margin-bottom: 0">
                <el-input v-model="select.name" placeholder="请输入姓名" />
              </el-form-item>
            </el-col>
            <!-- 自定义搜索的输入框 -->
            <el-col v-if="searchContent" :span="6">
              <el-input
                v-model="select.content"
                :placeholder="placeholder"
                class="search-content"
                style="display: inline-block"
                @change="contentChange"
              />
            </el-col>
            <!-- 搜索的按钮 -->
            <el-col v-if="filterButton" :span="1">
              <el-button
                type="primary"
                icon="el-icon-search"
                @click="filterClick"
              >搜索</el-button>
            </el-col>
            <!-- 自定义累似按钮的 -->
            <el-col v-if="searchButton" :span="4">
              <el-button type="primary" @click="searchClick">{{
                searchifo
              }}</el-button>
            </el-col>
            <!-- 学院选择下拉框 -->
            <el-col v-if="chooseCollege" :span="6">
              <el-select
                v-model="select.college"
                :placeholder="selectPlaceholder"
                @change="collegeChange"
              >
                <el-option
                  v-for="(item,index) in options"
                  :key="index"
                  :label="item"
                  :value="item"
                />
              </el-select>
            </el-col>
            <!-- 时间段的选择器 -->
            <el-col v-if="chooseDate" :span="15">
              <el-date-picker
                v-model="select.period"
                type="daterange"
                align="right"
                unlink-panels
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                @change="dateChange"
              />
            </el-col>
            <!-- 日期选择器 -->
            <el-col v-if="chooseTime" :span="5">
              <el-form-item style="margin-bottom: 0">
                <el-date-picker
                  v-model="select.time"
                  :type="dateType"
                  :clearable="false"
                  :format="format"
                  :value-format="valueFormat"
                  placeholder="请选择日期"
                  @change="timeChange"
                />
              </el-form-item>
            </el-col>
            <slot name="extent" />
            <!-- 导出按钮 -->
            <el-dropdown
              v-if="exportoutButton"
              trigger="click"
              class="dropdown"
              style="margin-left: 10px"
              @command="handleCommand"
            >
              <span class="el-dropdown-link">
                <el-button
                  icon="el-icon-download"
                >导出
                  <i class="el-icon-arrow-down el-icon--right" />
                </el-button>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  :command="{
                    action: 'exportExcel',
                  }"
                >Excel表格</el-dropdown-item>
                <el-dropdown-item
                  :command="{
                    action: 'exportPDF',
                  }"
                >PDF文件</el-dropdown-item>
                <el-dropdown-item
                  :command="{
                    action: 'exportHTML',
                  }"
                >HTML文件</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <el-col v-if="exportButton" :span="3">
              <el-button
                type="primary"
                icon="el-icon-download"
                @click="exportClick"
              >导出列表</el-button>
            </el-col>
            <el-col v-if="addButton" :span="addSpan">
              <el-button type="primary" :icon="addIcon" @click="addClick">{{
                addifo
              }}</el-button>
            </el-col>
            <el-col v-if="backButton" :span="3">
              <el-button
                type="grey"
                icon="el-icon-arrow-left"
                @click="backClick"
              >返回</el-button>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row
        type="flex"
        align="middle"
        justify="space-between"
        style="margin-top: 10px"
      >
        <el-col :span="24">
          <el-row type="flex" :gutter="20">
            <slot name="secondRow" />
          </el-row>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'Myfilters',
  props: {
    title: {
      type: String,
      default: ''
    },
    content: {
      type: String,
      default: ''
    },
    addifo: {
      type: String,
      default: ''
    },
    chooseDate: {
      type: Boolean,
      default: false
    },
    chooseTime: {
      type: Boolean,
      default: false
    },
    searchName: {
      type: Boolean,
      default: false
    },
    chooseCollege: {
      type: Boolean,
      default: false
    },
    period: {
      type: Boolean,
      default: false
    },
    backButton: {
      type: Boolean,
      default: false
    },
    exportoutButton: {
      type: Boolean,
      default: false
    },
    options: {
      type: Array,
      default() {
        return [
          '全部学院',
          '计算机学院',
          '经管学院',
          '音舞学院',
          '人文学院',
          '机电学院',
          '体育学院',
          '化工学院',
          '教育学院',
          '公管学院',
          '传播学院',
          '生科学院',
          '旅游学院'
        ]
      }
    },
    selectPlaceholder: {
      type: String,
      default: '请选择学院'
    },
    addButton: {
      type: Boolean,
      default: false
    },
    searchContent: {
      type: Boolean,
      default: false
    },
    searchButton: {
      type: Boolean,
      default: false
    },
    valueFormat: {
      type: String,
      default: ''
    },
    format: {
      type: String,
      default: ''
    },
    dateType: {
      type: String,
      default: 'date'
    },
    timeType: {
      type: String,
      default: 'time'
    },
    searchifo: {
      type: String,
      default: '搜索'
    },
    placeholder: {
      type: String,
      default: '请输入内容'
    },
    addIcon: {
      type: String,
      default: ''
    },
    addSpan: {
      type: Number,
      default: 3
    },
    filterButton: {
      type: Boolean,
      default: false
    },
    exportButton: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      select: {
        time: Date.now(),
        data: Date.now(),
        college: '全部学院',
        name: '',
        content: '',
        period: ''
      }
    }
  },
  methods: {
    handleCommand({ action }) {
      this[action]()
    },
    addClick() {
      this.$emit('addClick')
    },
    filterClick() {
      this.$emit('filterClick')
    },
    exportClick() {
      this.$emit('exportClick')
    },
    searchClick() {
      this.$emit('searchClick', this.select)
    },
    dateChange() {
      this.$emit('dateChange', this.select.data)
    },
    timeChange() {
      this.$emit('timeChange', this.select.time)
    },
    contentChange() {
      this.$emit('contentChange', this.select.content)
    },
    collegeChange() {
      this.$emit('collegeChange', this.select.college)
    },
    editClick() {
      this.$emit('editClick')
    },
    backClick() {
      this.$emit('backClick')
    },
    // 导出
    exportExcel() {
      this.$emit('exportExcel')
    },
    exportPDF() {
      this.$emit('exportPDF')
    },
    exportHTML() {
      this.$emit('exportHTML')
    }
  }
}
</script>

<style lang="scss" type="text/scss" scoped>
.el-button {
  width: 100%;
}
.title {
  font-size: 18px;
}
.content {
  margin-left: 5px;
  font-size: 12px;
  display: inline-block;
  transform: translateY(1px);
  color: #999;
}
</style>
