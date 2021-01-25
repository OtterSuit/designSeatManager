<template>
  <div class="archives-container">
    <el-row>
      <el-col :span="10" :offset="7">
        <div class="user box">
          <!-- <div class="editBox" @click="editClick">
        <i class="el-icon-edit-outline" />
        <span>修改</span>
        <div class="editBoxBg" />
      </div> -->
          <el-row style="margin-bottom:16px">
            <span class="title">我的信息</span>
          </el-row>
          <el-row type="flex" justify="space-between">
            <el-col :span="6" class="userImgBox">
              <img src="@/assets/images/meili.png" class="userImg">
              <el-upload
                class="upload"
                action="https://jsonplaceholder.typicode.com/posts/"
                list-type="picture-card"
                :show-file-list="false"
              >
                <i class="iconfont icon-shangchuan uploadIcon" />
                <div class="el-upload__text">更换头像</div>
              </el-upload>
            </el-col>
          </el-row>
          <el-row v-for="item in row" :key="item.label" class="row">
            <el-col :span="5">
              <div class="label">{{ item.label }}</div>
            </el-col>
            <el-col :span="15">
              <div v-if="item.edit">
                <el-input v-model="form[item.value]" class="edit-input" size="small" />
              </div>
              <div v-else class="content">
                {{ form[item.value] }}
              </div>
            </el-col>
            <el-col :span="4">
              <el-button
                v-if="item.edit"
                type="success"
                size="mini"
                icon="el-icon-check"
                @click="editSubmit(item)"
              >
                Ok
              </el-button>
              <el-button
                v-else
                type="primary"
                size="mini"
                icon="el-icon-edit"
                @click="item.edit=!item.edit"
              >
                Edit
              </el-button>
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// postArchives
import { getUserArchives } from '@/api/people/archives'
export default {
  data() {
    return {
      row: [
        {
          label: '姓名',
          value: 'name',
          edit: false
        },
        {
          label: '性别',
          value: 'gender',
          edit: false
        },
        {
          label: '政治面貌',
          value: 'politics',
          edit: false
        },
        {
          label: '电话号码',
          value: 'phone',
          edit: false
        },
        {
          label: '民族',
          value: 'nation',
          edit: false
        },
        {
          label: '邮箱地址',
          value: 'email',
          edit: false
        },
        {
          label: '身份证号',
          value: 'idCard',
          edit: false
        },
        {
          label: '婚姻',
          value: 'marriage',
          edit: false
        },
        {
          label: '爱好',
          value: 'hobby',
          edit: false
        },
        {
          label: '特长',
          value: 'speciality',
          edit: false
        },
        {
          label: '籍贯',
          value: 'native',
          edit: false
        },
        {
          label: '现住地址',
          value: 'address',
          edit: false
        }
      ],
      form: {}
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      getUserArchives().then(response => {
        // console.log(response)
        this.form = response.data.items.user
        // this.form.state = '1'
      })
    },
    // ok按钮
    editSubmit(item) {
      item.edit = false
      this.$message({
        message: item.label + '修改成功',
        type: 'success'
      })
    }
  }
}
</script>

<style lang="scss" type="text/scss" scoped>
i {
  vertical-align: middle;
}
.archives-container {
  padding: 30px;
  background-color:#F0F2F5;
}
.box {
  background:rgba(255,255,255,1);
  box-shadow:4px 4px 40px 0px rgba(0,0,0,0.05);
  border-radius:6px;
  padding: 20px 30px 10px;
  margin-bottom: 20px;
  position: relative;
  .title {
    font-size:20px;
    // color:rgba(153,153,153,1);
    line-height:24px;
    display: block;
    text-align: center;
  }
  .editBox {
  width:59px;
  height:24px;
  background:rgba(64,158,255,1);
  box-shadow:-4px 4px 10px 0px rgba(0,0,0,0.1);
  border-radius:4px 0px 0px 4px;
  position: absolute;
  top: 20px;
  right: 0;
  color: #fff;
  padding: 2px 6px;
  display: none;
  .editBoxBg {
    width:59px;
    height:24px;
    position: absolute;
    top: 0;
    left: 0;
    cursor: pointer;
    z-index: 5;
  }
    span {
      font-size: 12px;
      display: inline-block;
      height: 16px;
      line-height: 16px;
    }
  }
  &:hover .editBox {
    display: block;
  }
}
.user {
  .userImgBox {
    position: relative;
    width: 190px;
    margin: 0 auto 20px;
    .upload {
      position: absolute;
      top: 0;
      left: 0;
      display: none;
      ::v-deep .el-upload--picture-card {
        height: 190px;
        width: 190px;
        background-color: rgba(0,0,0,.7);
        border:1px solid rgba(229,229,229,1);
        border-radius: 190px;
        line-height: 30px;
        padding: 65px 0;
      }
      .uploadIcon ,.el-upload__text{
        color: #fff;
      }
    }
    &:hover .upload{
      display: block;
    }
  }
  .userImg {
    width: 190px;
    border-radius: 190px;
  }
}
.row {
  margin-bottom: 20px;
}
.el-button {
  height: 32px;
  width: 100%;
  padding: 8px 0;
}
::v-deep .el-input__inner{
  padding: 0 10px;
  width: 90%;
}
.label,
.content {
  height: 32px;
  line-height: 32px;
  font-size: 14px;
}
.label {
  color:rgba(158,174,195,1);
}
</style>
