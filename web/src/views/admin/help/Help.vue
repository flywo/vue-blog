<template>
  <div class="h-back">
    <div class="content">
      <div class="item">
        <p class="text" style="white-space: pre-line">{{ content }}</p>
      </div>
      <div class="item">
        <markdown-it-vue
          :content="content"
          :options="options"
        ></markdown-it-vue>
      </div>
    </div>
  </div>
</template>

<script>
import MarkdownItVue from "markdown-it-vue";
import "markdown-it-vue/dist/markdown-it-vue.css";
import help from "./help";

export default {
  name: "MarkdownHelp",
  components: {
    MarkdownItVue,
  },
  data() {
    return {
      content: help,
      options: {
        markdownIt: {
          linkify: true,
        },
      },
    };
  },
};
</script>

<style lang="scss" scoped>
.h-back {
  height: 100%;
  width: 100%;
  .content {
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    .item {
      margin-block: 20px;
      padding: 20px;
      width: 45%;
      background-color: white;
      .text {
        margin: 0;
      }
    }
  }
}
</style>