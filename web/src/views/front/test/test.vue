<template>
  <div class="test-back">
    <div class="container">
      <div class="c-item"></div>
      <div class="c-item"></div>
      <div class="c-item"></div>
      <div class="c-item"></div>
      <div class="c-item code" ref="code">
        <p v-for="(item, index) in code" :key="'i-c-' + index">{{ item }}</p>
      </div>
    </div>
  </div>
</template>

<script>
const fix = [
  "import Vue from 'vue'",
  "import App from './App.vue'",
  "import router from './router'",
  "import store from './store'",
  "import ElementUI from 'element-ui'",
  "import 'normalize.css/normalize.css'",
  "import 'animate.css'",
  "Vue.use(ElementUI)",
  "Vue.prototype.$loading = ElementUI.Loading.service",
  "new Vue({",
  "    router,",
  "    store,",
  "   render: h => h(App),",
  "    beforeCreate() {",
  "        Vue.prototype.$bus = this;",
  "    }",
  "}).$mount('#app')",
];
export default {
  name: "TestView",
  data() {
    return {
      code: [],
      timer: null,
    };
  },
  computed: {},
  components: {},
  mounted() {
    let index = 0;
    this.timer = setInterval(() => {
      index += 1;
      this.code.push(fix[index % fix.length]);
      this.$nextTick(() => {
        this.$refs.code.scrollTop = this.$refs.code.scrollHeight;
      });
    }, 500);
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.test-back {
  height: calc(100% - 120px);
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .container {
    height: 70%;
    width: 20%;
    position: relative;
    .code {
      display: flex;
      flex-direction: column;
      overflow-y: hidden;
      p {
        margin-block: 5px;
        color: white;
      }
    }
    .c-item {
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      width: 100%;
      opacity: 0;
      transition: 0.5s;
    }
    .c-item:nth-child(1) {
      background-color: #ff000077;
    }
    .c-item:nth-child(2) {
      background-color: #00ff0077;
    }
    .c-item:nth-child(3) {
      background-color: #0000ff77;
    }
    .c-item:nth-child(4) {
      background-color: #00f0f077;
    }
    .c-item:last-child {
      opacity: 1;
      background-color: #00000077;
    }
  }
  .container:hover {
    .c-item {
      opacity: 1;
    }
    .c-item:nth-child(1) {
      transform: rotate(16deg) skew(-25deg) scale(0.7) translate(30vmin, 30vmin);
    }
    .c-item:nth-child(2) {
      transform: rotate(16deg) skew(-25deg) scale(0.7) translate(15vmin, 15vmin);
    }
    .c-item:nth-child(3) {
      transform: rotate(16deg) skew(-25deg) scale(0.7) translate(0, 0);
    }
    .c-item:nth-child(4) {
      transform: rotate(16deg) skew(-25deg) scale(0.7)
        translate(-15vmin, -15vmin);
    }
    .c-item:last-child {
      transform: rotate(16deg) skew(-25deg) scale(0.7)
        translate(-30vmin, -30vmin);
    }
  }
}
</style>