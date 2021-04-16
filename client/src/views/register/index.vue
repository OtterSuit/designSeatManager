<template>
  <div class="register-container">
    <el-form ref="registerForm" :model="registerForm" :rules="registerRules" class="register-form" label-position="left">

      <div class="title-container">
        <img class="title-logo" src="@/assets/images/logo-icon.png" alt="logo">
        <span class="title">座位管理<span style="margin-left: 5px">系统</span></span>
      </div>
      <el-row type="flex" class="register-main">
        <el-col>
          <div class="register-title">注册账号</div>
          <el-form-item prop="school_id">
            <span class="svg-container">
              <i class="el-icon-user" />
            </span>
            <el-input
              ref="school_id"
              v-model="registerForm.school_id"
              placeholder="请输入学号"
              name="school_id"
              type="text"
            />
          </el-form-item>

          <el-form-item prop="name">
            <span class="svg-container">
              <i class="el-icon-user" />
            </span>
            <el-input
              ref="name"
              v-model="registerForm.name"
              placeholder="请输入姓名"
              name="name"
              type="text"
            />
          </el-form-item>

          <el-form-item prop="email">
            <span class="svg-container">
              <i class="el-icon-user" />
            </span>
            <el-input
              ref="email"
              v-model="registerForm.email"
              placeholder="请输入邮箱"
              name="email"
              type="email"
            />
          </el-form-item>

          <el-form-item prop="college">
            <span class="svg-container">
              <i class="el-icon-user" />
            </span>
            <el-select
              v-model="registerForm.college"
              placeholder="请选择学院"
            >
              <el-option
                v-for="(item,index) in collegeOptions"
                :key="index"
                :label="item"
                :value="item"
              />
            </el-select>
          </el-form-item>

          <el-form-item prop="identity">
            <span class="svg-container">
              <i class="el-icon-user" />
            </span>
            <el-select
              v-model="registerForm.identity"
              placeholder="请选择身份"
            >
              <el-option
                v-for="(item,index) in identityOptions"
                :key="index"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>

          <el-form-item prop="password">
            <span class="svg-container">
              <i class="el-icon-unlock" />
            </span>
            <el-input
              :key="passwordType"
              ref="password"
              v-model="registerForm.password"
              :type="passwordType"
              placeholder="请输入密码"
              name="password"
            />
            <span class="show-pwd" @mousedown="showPwd" @mouseup="hiddenPwd">
              <!-- <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" /> -->
              <i :class="passwordType === 'password' ? 'el-icon-edit' : 'el-icon-search'" />
            </span>
          </el-form-item>

          <el-form-item prop="password2">
            <span class="svg-container">
              <i class="el-icon-unlock" />
            </span>
            <el-input
              :key="password2Type"
              ref="password2"
              v-model="registerForm.password2"
              :type="password2Type"
              placeholder="再次输入密码"
              name="password2"
              @keyup.enter.native="handleRegister"
            />
            <span class="show-pwd" @mousedown="showPwd2" @mouseup="hiddenPwd2">
              <!-- <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" /> -->
              <i :class="password2Type === 'password' ? 'el-icon-edit' : 'el-icon-search'" />
            </span>
          </el-form-item>

          <el-button :loading="loading" type="primary" style="width:150px;height:48px;margin:10px 0 30px 0;" @click.native.prevent="handleRegister">确定</el-button>
          <el-button :disabled="loading" style="width:150px;height:48px;margin:0 0 30px 100px;" @click.native.prevent="$router.go(-1)">返回</el-button>
          <!-- <span class="forget">忘记密码？</span> -->
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import api from '@/api'

export default {
  name: 'Register',
  data() {
    const validatePassword = (rule, value, callback) => {
      // import { validUsername } from '@/utils/validate'
      if (this.registerForm.password.length >= 6) {
        if (value !== '') {
          if (value !== this.registerForm.password) {
            callback(new Error('输入的两次密码不一致'))
          } else {
            callback()
          }
        } else {
          callback(new Error('请再次输入密码'))
        }
      } else {
        callback()
      }
    }
    return {
      collegeOptions: [
        // 机电工程学院 | 数理学院 | 信息科学技术学院 | 外国语学院 | 经济与管理学院 | 艺术学院 | 传播与动漫学院 | 政法学院 | 体育教学部 | 中德科技学院
        '信息科学技术学院',
        '计算机学院',
        '公共管理学院',
        '机电工程学院',
        '数理学院',
        '外国语学院',
        '经济与管理学院',
        '艺术学院',
        '传媒学院'
      ],
      identityOptions: [
        {
          label: '管理员',
          value: 'admin'
        },
        {
          label: '用户',
          value: 'user'
        }
      ],
      registerForm: {
        school_id: '',
        name: '',
        college: '',
        password: '',
        password2: '',
        identity: 'user'
      },
      registerRules: {
        // school_id: [{ required: true, trigger: 'blur', validator: validateUsername }],
        school_id: [
          { required: true, trigger: 'blur', message: '请输入学号' },
          { min: 10, max: 10, message: '请正确输入学号' }],
        name: [
          { required: true, trigger: 'blur', message: '请输入姓名' },
          { min: 2, trigger: 'blur', message: '姓名长度不能少于2位' }
        ],
        college: [{ required: true, trigger: ['change', 'blur'], message: '请选择学院' }],
        email: [{ required: true, trigger: 'blur', message: '请输入邮箱' }],
        password: [{ required: true, trigger: 'blur', min: 6, message: '密码不能少于6位数' }],
        password2: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      loading: false,
      passwordType: 'password',
      password2Type: 'password'
    }
  },
  methods: {
    showPwd() {
      this.passwordType = ''
      window.addEventListener('mouseup', this.hiddenPwd)
    },
    hiddenPwd() {
      this.passwordType = 'password'
      window.removeEventListener('mouseup', this.hiddenPwd)
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    showPwd2() {
      this.password2Type = ''
      window.addEventListener('mouseup', this.hiddenPwd2)
    },
    hiddenPwd2() {
      this.password2Type = 'password'
      window.removeEventListener('mouseup', this.hiddenPwd2)
      this.$nextTick(() => {
        this.$refs.password2.focus()
      })
    },
    handleRegister() {
      console.log(this.$refs.registerForm)
      this.$refs.registerForm.validate(valid => {
        if (valid) {
          this.loading = true
          api.register(this.registerForm).then(res => {
            console.log(res)
            if (res && res._id) {
              this.loading = false
              this.$router.push({ path: 'login' })
            } else {
              this.$message({
                message: '该用户已存在',
                type: 'error'
              })
              this.loading = false
            }
          }).catch(err => {
            console.log(err)
            this.loading = false
          })
        } else {
          console.log('err')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" >
$bg:#123d77;
$light_gray:#fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .register-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.register-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: black;
      // color: $light_gray;
      height: 47px;
      font-size:18px;
      // caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }
.el-select {
    display: inline-block;
    height: 47px;
    width: 87%;

    .el-input__suffix {
        right: -63px;
    }
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: black;
      // color: $light_gray;
      height: 47px;
      font-size: 18px;
      // caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }
  .el-form-item {
    width:400px;
    height:48px;
    background:rgba(255,255,255,1);
    border-radius:6px;
    border:1px solid rgba(233,233,235,1);
    color: black;
    margin-bottom: 15px;
  }
}
</style>

<style lang="scss" scoped>
$bg:#123d77;
$dark_gray:#d1dde3;
$light_gray:#eee;

.register-container {
  position: relative;
  min-height: 100%;
  width: 100%;
  background-image: url("../../assets/images/bgimage.png");
  background-size: cover;
  overflow: hidden;

  .register-form {
    position: absolute;
    // height: 480px;
    width: 640px;
    background-color: #f7f7f7;
    max-width: 100%;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    overflow: hidden;
    border-radius: 10px;
    box-shadow:4px 4px 40px 0px rgba(0,0,0,0.2);
  }
  .register-main {
    background-image: url("../../assets/images/login-main.png");
    background-size: cover;
    // height: 385px;
    padding: 28px 120px 0;

  }
  .register-title {
    margin-bottom: 15px;
    // width:100px;
    height:33px;
    font-size:24px;
    font-weight:400;
    color:rgba(92,172,255,1);
    line-height:33px;
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
    i {
      font-size: 24px;
    }
  }

  .title-container {
    position: relative;
    height: 95px;
    width: 640px;
    background-image: url("../../assets/images/loginTop.png");
    background-size: cover;
    padding: 28px 32px;
    .title {
      font-size: 45px;
      line-height: 45px;
      letter-spacing: 20px;
      color: #d1dde3;
      height: 40px;
      vertical-align: middle;
    }
    .title-logo {
      height: 48px;
      vertical-align: middle;
      margin-left: 20px;
      margin-right: 25px;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

}
::v-deep .el-form-item__error {
  margin-top: -8px;
}
</style>
