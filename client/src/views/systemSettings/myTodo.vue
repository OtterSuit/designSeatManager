<template>
  <div style="padding:30px">
    <h3 style="color:#666">我的待办</h3>
    <div class="todoBox">
      <span v-if="todoList.length===0" class="span">
        暂无待办信息
      </span>
      <div
        v-for=" (item,index) in todoList"
        :key="'todo'+index"
      >
        <el-alert
          :title="item.title"
          :type="item.type"
          :description="item.description"
        />
      </div>
    </div>
  </div>
</template>
<script>
import { getTodo } from '@/api/systemSettings/todo'
export default {
  data() {
    return {
      todoList: []
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      getTodo().then(response => {
        this.todoList = response.data.items
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.todoBox {
  border: 1px solid #ccc;
  padding: 20px 10px 0;
}
.el-alert {
  margin-bottom: 20px;
}
.span {
  font-size:18px;
  margin-bottom:20px;
  display: block;
  text-align: center;
}
</style>
