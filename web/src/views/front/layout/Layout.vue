<template>
  <div class="layout-back">
    <div class="layout-nav">
      <nav-view></nav-view>
    </div>
    <router-view :key="$route.path + $route.query.typeId"></router-view>
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
}
</style>