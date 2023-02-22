<template>
  <markdown-it-vue
    :content="content"
    :options="{
      markdownIt: {
        linkify: true,
        html: true,
        breaks: true,
        typographer: true,
      },
    }"
  ></markdown-it-vue>
</template>

<script>
import MarkdownItVue from "markdown-it-vue/dist/markdown-it-vue-light.umd.min.js";
import "markdown-it-vue/dist/markdown-it-vue-light.css";

export default {
  name: "MarkdownView",
  components: {
    MarkdownItVue,
  },
  props: ["content"],
};
</script>

<style lang="scss" scoped>
</style>