<template>
  <div :class="{'has-logo':showLogo}">
    <div class="company">
      <div class="logo_txt">
        <img class="pic_logo" src="@/assets/images/logo-icon.png" alt="logo">
        <span class="logo_title" v-if="!isCollapse">座位管理<span style="margin-left: 5px">系统</span></span>
      </div>
    </div>
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item v-for="route in routes" :key="route.path" :item="route" :base-path="route.path" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Logo from './Logo'
import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'
import Cookies from 'js-cookie';

export default {
  components: { SidebarItem, Logo },
  computed: {
    ...mapGetters([
      'sidebar',
    ]),
    routes() {
      let routes = [...this.$router.options.routes]
      console.log(routes);
      if(Cookies.get('Identity') !== 'admin') {
        routes.forEach(route => {
          if(route.children) {
            route.children = route.children.filter(item => {
              if(item.meta.identity !== 'admin') {
                console.log(item.meta);
                return route
              }
            })
          }
        })
      }
      console.log(this.$router.options.routes);
      return routes
    },
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo
    },
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  }
}
</script>
<style lang="scss" scoped>
.company {
  height: 50px;
  background-image: url('../../../assets/images/sidebarTitle.png');
  background-size: cover;
  width: 100%;
  // background: #00284d;
  color: #fff;
  font-size: 16px;
  line-height: 50px;
  // display: flex;
}
.pic_logo {
  height: 45px;
  line-height: 45;
  vertical-align: -webkit-baseline-middle;
  margin-left: -10px;
  margin-right: 10px;
}
.logo_title {
  font-size: 24px;
  // line-height: 45px;
  font-weight: 700;
  vertical-align: sub;
}
.logo_txt {
  padding-left: 24px;
  img {
    height: 23px;
    vertical-align: middle;
  }
  // padding-top: 7px;
}
::v-deep .el-scrollbar{
  height: calc(100% - 50px)!important;
}
</style>
