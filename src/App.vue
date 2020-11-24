<template>
  <div id="app">
<!--         <router-view v-if="isRouterAlive && $route.meta.keepAlive"></router-view>
        <keep-alive>
          <router-view v-if="isRouterAlive && $route.meta.keepAlive"></router-view>
        </keep-alive> -->
    <router-view v-if="isRouterAlive"></router-view>
  </div>
</template>

<style lang="less">
#app {
  height: 100%;
}

</style>
<script>
  import { mapGetters } from 'vuex'
export default {
  name: 'App',
  provide () {
    return {
      reload: this.reload
    }
  },
  data () {
    return {
      isRouterAlive: true
    }
  },

  computed: {

    ...mapGetters([
      'gradeList',
      'isReady',
      'difficultyList',
      'getuserInfo'

    ]),
  },
  methods: {
    reload () {
      this.isRouterAlive = false
      this.$nextTick(function () {
        this.isRouterAlive = true
      })
    }
  }
}
</script>