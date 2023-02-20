<template>
  <div class="c-back">
    <div class="content">
      <div class="time">2022-22-22 11:11:11</div>
      <h1 class="title">这是一个标题</h1>
      <markdown-show :content="content"></markdown-show>
    </div>
  </div>
</template>

<script>
import MarkdownShow from "@/components/MarkdownShow.vue";

export default {
  components: {
    MarkdownShow,
  },
  data() {
    return {
      content: "",
    };
  },
  name: "BlogContent",
};
</script>

<style lang="scss" scoped>
.c-back {
  padding-bottom: 20px;
  .content {
    margin-left: calc((100% - 1000px) / 2);
    width: 1000px;
    -webkit-box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.15);
    box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.15);
    background: #fff;
    border-radius: 15px;
    box-sizing: border-box;
    padding: 20px;
    .time {
      text-transform: capitalize;
      color: #333;
      letter-spacing: 0.3px;
    }
    .title {
      font-size: 40px;
      line-height: 1.3;
      font-family: "Montserrat", sans-serif;
      letter-spacing: 0.6px;
      color: #222;
    }
  }
}
</style>