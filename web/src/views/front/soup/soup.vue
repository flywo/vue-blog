<template>
  <div class="soup-back">
    <div class="content">
      <p class="soup-content">{{ soup }}</p>
    </div>
    <div class="more button-selected" @click="query">
      还没有喝够，再来一碗！
    </div>
  </div>
</template>

<script>
import { get } from "@/request/request";
export default {
  name: "SoupView",
  data() {
    return {
      soup: null,
    };
  },
  computed: {},
  components: {},
  mounted() {
    this.query();
  },
  beforeDestroy() {},
  methods: {
    query() {
      get("/soup/one", null, false, true, (data) => {
        this.soup = data.content;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.soup-back {
  height: calc(100% - 120px);
  width: 100%;
  .content {
    height: 100%;
    width: 100%;
    display: flex;
    padding-bottom: 120px;
    box-sizing: border-box;
    .soup-content {
      margin: auto;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
        "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji",
        "Segoe UI Emoji", "Segoe UI Symbol";
      text-align: center;
      font-weight: 900;
      font-size: 36px;
      color: white;
    }
  }
  .more {
    position: fixed;
    bottom: 40px;
    color: white;
    font-size: 16px;
  }
}
@media only screen and (min-width: 1020px) {
  .soup-content {
    margin-left: calc((100% - var(--big-screen-min-width)) / 2);
    width: var(--big-screen-min-width);
  }
  .more {
    right: calc((100% - var(--big-screen-min-width)) / 2);
  }
}

@media only screen and (max-width: 1020px) {
  .soup-content {
    margin-left: 20px;
    width: calc(100% - 40px);
  }
  .more {
    right: 20px;
  }
}
</style>