<template>
  <div class="test-back">
    <div class="container">
      <div class="c-item">
        <div class="title">这是页面5</div>
      </div>
      <div class="c-item">
        <div class="title">这是页面4</div>
      </div>
      <div class="c-item">
        <div class="title">这是页面3</div>
      </div>
      <div class="c-item">
        <div class="title">这是页面2</div>
      </div>
      <div class="c-item code">
        <div class="c-content" ref="code">
          <p v-for="(item, index) in code" :key="'i-c-' + index">{{ item }}</p>
        </div>
        <div class="title">这是代码滚动页面</div>
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
      height: 100%;
      width: 100%;
      .c-content {
        display: flex;
        flex-direction: column;
        height: 100%;
        width: 100%;
        overflow-y: hidden;
        transition: 0.5s;
        p {
          margin-block: 5px;
          color: white;
        }
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
      border-radius: 16px;
      .title {
        color: white;
        font-size: 30px;
        position: absolute;
        right: 0;
        bottom: 0;
        transition: 0.5s;
        transform: translateX(105%);
      }
    }
    .c-item:nth-child(1) {
      background-color: #ff000077;
      border: 3px solid #ff0000;
    }
    .c-item:nth-child(2) {
      background-color: #00ff0077;
      border: 3px solid #00ff00;
    }
    .c-item:nth-child(3) {
      background-color: #0000ff77;
      border: 3px solid #0000ff;
    }
    .c-item:nth-child(4) {
      background-color: #00f0f077;
      border: 3px solid #00f0f0;
    }
    .c-item:last-child {
      opacity: 1;
      background: rgba(155, 200, 72, 0.8);
      border: 3px solid rgba(155, 200, 72);
    }
  }
  .container:hover {
    .c-item {
      opacity: 1;
      .title {
        bottom: 85%;
      }
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