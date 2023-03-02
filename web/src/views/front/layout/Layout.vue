<template>
  <div class="layout-back">
    <div class="layout-nav">
      <nav-view></nav-view>
    </div>
    <router-view :key="$route.path + $route.query.typeId"></router-view>
    <div class="bottom">
      <p>蜀ICP备19041988号-1</p>
    </div>
  </div>
</template>

<script>
import NavView from "./Nav.vue";
export default {
  components: {
    NavView,
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
    background-color: #6ae79244;
    display: flex;
    p {
      margin: auto;
      color: #666;
      font-size: 14px;
    }
  }
}
</style>