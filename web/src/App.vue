<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<style lang="scss">
body,
html,
#app {
  height: 100%;
  width: 100%;
  background-color: var(--bg-color);
  min-width: var(--screen-min-width);
}
#app {
  font-family: "Poppins", "Nunito Sans", "Montserrat", sans-serif;
}
</style>
