<template>
  <div class="b-back">
    <div class="content content-common">
      <markdown-show :content="content"></markdown-show>
      <div class="contact">
        <el-image
          class="icon"
          fit="contain"
          :src="require('@/assets/github.png')"
          @click="jumpUrl({ url: 'https://github.com/flywo' })"
        ></el-image>
        <el-image
          class="icon"
          fit="contain"
          :src="require('@/assets/js.png')"
          @click="jumpUrl({ url: 'https://www.jianshu.com/u/dacb5494231b' })"
        ></el-image>
        <el-popover placement="top" trigger="hover">
          <div style="text-align: center; margin-block: 5px">316910279</div>
          <div class="qq" slot="reference">QQ</div>
        </el-popover>
      </div>
    </div>
  </div>
</template>

<script>
import MarkdownShow from "@/components/MarkdownShow.vue";
import blog from "./blog";

export default {
  name: "BlogView",
  components: {
    MarkdownShow,
  },
  data() {
    return {
      content: blog,
    };
  },
  methods: {
    jumpUrl({ url }) {
      window.open(url);
    },
  },
};
</script>

<style lang="scss" scoped>
.b-back {
  padding-bottom: 20px;
  .content {
    position: relative;
    .contact {
      position: absolute;
      top: 5px;
      right: 20px;
      display: flex;
      .icon,
      .qq {
        margin: 10px;
        -webkit-box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.15);
        box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.15);
        border-radius: 50%;
        height: 40px;
        width: 40px;
        cursor: pointer;
        transition: all 0.3s ease-out;
      }
      .icon:hover,
      .qq:hover {
        transform: scale(1.1, 1.1);
      }
      .qq {
        line-height: 40px;
        text-align: center;
      }
    }
  }
}
@media only screen and (min-width: 1020px) {
  .b-back {
    .content {
      margin-left: calc((100% - var(--big-screen-min-width)) / 2);
      width: var(--big-screen-min-width);
    }
  }
}

@media only screen and (max-width: 1020px) {
  .b-back {
    .content {
      margin-left: 20px;
      width: calc(100% - 40px);
    }
  }
}
</style>