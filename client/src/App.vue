<template>
  <div id="app">
    <router-view v-if="isRouterAlive" />
    <Loading v-show="loading" />
  </div>
</template>

<script>
import Loading from "@/components/Loading/Loading"

export default {
  name: 'App',
  provide() { // 父组件中通过provide来提供变量，在子组件中通过inject来注入变量。
    return {
      reload: this.reload
    }
  },
  components: {
    Loading
  },
  computed: {
    loading(){
      return this.$store.getters.loading
    }
  },
  data() {
    return {
      isRouterAlive: true
    }
  },
  methods: {
    reload() {
      this.isRouterAlive = false
      this.$nextTick(function() {
        this.isRouterAlive = true
      })
    }
  }
}
</script>
