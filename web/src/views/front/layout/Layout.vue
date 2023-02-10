<template>
  <div class="back">
    <div class="layout-nav">
      <nav-view></nav-view>
    </div>
    <router-view></router-view>
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
.back {
  height: 100%;
  width: 100%;
  .layout-nav {
    height: 150px;
  }
}
</style>