<template>
  <div class="layout-back">
    <back-end-view class="back-end-view"></back-end-view>
    <div class="layout-nav">
      <nav-view></nav-view>
    </div>
    <keep-alive>
      <router-view
        v-if="$route.meta.keepAlive"
        :key="$route.path + $route.query.typeId"
      ></router-view>
    </keep-alive>
    <router-view
      v-if="!$route.meta.keepAlive"
      :key="$route.path + $route.query.typeId"
    ></router-view>
    <div class="bottom">
      <p>蜀ICP备19041988号-1</p>
    </div>
  </div>
</template>

<script>
import BackEndView from "./back-end-view.vue";
import NavView from "./Nav.vue";
export default {
  components: {
    NavView,
    BackEndView,
  },
  name: "FrontLayout",
};
</script>

<style lang="scss" scoped>
.layout-back {
  height: 100%;
  width: 100%;
  .layout-nav {
    height: 120px;
  }
  .bottom {
    position: fixed;
    height: 20px;
    width: 100%;
    bottom: 0;
    background-color: #6ae79277;
    display: flex;
    p {
      margin: auto;
      color: white;
      font-size: 14px;
    }
  }
}
</style>