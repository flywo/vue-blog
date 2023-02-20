<template>
  <div class="h-back">
    <div class="content">
      <div class="item">
        <p class="text" style="white-space: pre-line">{{ content }}</p>
      </div>
      <div class="item">
        <markdown-show :content="content"></markdown-show>
      </div>
    </div>
  </div>
</template>

<script>
import MarkdownShow from "@/components/MarkdownShow.vue";
import help from "./help";

export default {
  name: "MarkdownHelp",
  components: {
    MarkdownShow,
  },
  data() {
    return {
      content: help,
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