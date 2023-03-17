<template>
  <div class="c-back">
    <div class="content content-common" v-loading="loading">
      <div class="time">{{ blog.time }}</div>
      <h1 class="title">{{ blog.title }}</h1>
      <p class="preview">
        {{ blog.preview }}
      </p>
      <markdown-show :content="blog.content || ''"></markdown-show>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import MarkdownShow from "@/components/MarkdownShow.vue";
import { get } from "@/request/request";

export default {
  components: {
    MarkdownShow,
  },
  data() {
    return {
      blog: {},
      loading: true,
    };
  },
  name: "BlogContent",
  mounted() {
    get(
      "/blog/detail",
      {
        id: this.$route.query.id,
      },
      false,
      false,
      (data) => {
        this.loading = false;
        this.blog = data;
      },
      () => {
        this.loading = false;
      }
    );
  },
};
</script>

<style lang="scss" scoped>
.c-back {
  padding-bottom: 20px;
  .content {
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
    .preview {
      padding: 10px;
      margin-bottom: 20px;
      border-left: 2px solid var(--bg-green);
      word-wrap: break-word;
    }
  }
}
@media only screen and (min-width: 1020px) {
  .c-back {
    .content {
      margin-left: calc((100% - var(--big-screen-min-width)) / 2);
      width: var(--big-screen-min-width);
    }
  }
}

@media only screen and (max-width: 1020px) {
  .c-back {
    .content {
      margin-left: 20px;
      width: calc(100% - 40px);
    }
  }
}
</style>