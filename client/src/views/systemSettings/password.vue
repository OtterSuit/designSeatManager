<template>
  <div class="archives-container">
    <el-row>
      <el-col :span="10" :offset="7">
        <div class="user box">
          <el-row type="flex" justify="space-between">
            <el-col :span="6" class="userImgBox">
              <img v-if="!avatar||avatar===''||avatar==='undefined'||avatar==='null'" src="@/assets/images/meili.png" class="userImg">
              <img v-else :src="avatar" class="userImg">
            </el-col>
          </el-row>
          <el-row style="margin-bottom:16px">
            <span class="title">{{ name }}</span>
          </el-row>
          <el-row class="row">
            <el-form ref="form" :model="form" label-width="100px" :rules="rules">
              <el-form-item label="原密码" prop="oldPassword">
                <el-input v-model.trim="form.oldPassword" type="password" autocomplete="off" />
              </el-form-item>
              <el-form-item label="新密码" prop="newPassword">
                <el-input v-model.trim="form.newPassword" type="password" autocomplete="off" />
              </el-form-item>
              <el-form-item label="重复新密码" prop="newPassword2">
                <el-input v-model.trim="form.newPassword2" type="password" autocomplete="off" />
              </el-form-item>
            </el-form>
          </el-row>
        </div>
      </el-col>
    </el-row>
    <div class="down_btn">
      <el-button class="return_btn" type="primary" @click="onSubmit">提交</el-button>
    </div>
  </div>
</template>

<script>
import api from '@/api'
import { mapGetters } from 'vuex'
export default {
  name: 'Password',
  data() {
    var newPassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else if (value.length < 6) {
        callback(new Error('密码长度需要大于6位数'))
      } else {
        if (this.form.newPassword2 !== '') {
          this.$refs.form.validateField('newPassword2')
        }
        callback()
      }
    }
    var newPassword2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.form.newPassword) {
        console.log(value, this.form.newPassword);
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      form: {
        oldPassword: '',
        newPassword: '',
        newPassword2: ''
      },
      rules: {
        oldPassword: [
          { required: true, message: '请输入密码' }
        ],
        newPassword: [
          { validator: newPassword, trigger: 'blur' }
        ],
        newPassword2: [
          { validator: newPassword2, trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'avatar'
    ])
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate(async valid => {
        if (valid) {
          if (this.form.oldPassword === this.form.newPassword) {
            return this.$message({
              message: '两次密码输入一样,请重新输入',
              type: 'error'
            })
          }
          api.modifyPwd(this.form).then((res) => {
            // console.log(res)
            if (res.code === 200) {
              this.$message({
                message: '修改成功',
                type: 'success'
              })
              this.$router.push({ path: '/' })
            }
          })
        } else {
          this.$message({
            message: '请正确填写',
            type: 'error'
          })
        }
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
  padding: 10vh 30px;
  background-color:#F0F2F5;
  min-height: calc(100vh - 50px);
}
.user {
  .userImgBox {
    position: relative;
    width: 190px;
    margin: 0 auto 20px;
  }
  .userImg {
    width: 190px;
    border-radius: 190px;
  }
  .title {
    font-size:20px;
    // color:rgba(153,153,153,1);
    line-height:24px;
    display: block;
    text-align: center;
  }
}
.box {
  background:rgba(255,255,255,1);
  box-shadow:4px 4px 40px 0px rgba(0,0,0,0.05);
  border-radius:6px;
  padding: 20px 30px 10px;
  margin-bottom: 20px;
  position: relative;
}
.line{
  text-align: center;
}
.down_btn{
  text-align: center;
}
::v-deep .el-form-item__label {
  text-align: left;
  font-weight: normal;
}
</style>
