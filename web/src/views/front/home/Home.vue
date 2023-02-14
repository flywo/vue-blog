<template>
  <div class="back">
    <div class="content">
      <div class="list">
        <home-item
          class="item"
          v-for="(item, index) in list"
          :key="'grid-item-' + index"
          :options="item"
        >
        </home-item>
      </div>
    </div>
  </div>
</template>

<script>
import HomeItem from "./Item.vue";

export default {
  components: {
    HomeItem,
  },
  name: "FrontHome",
  data() {
    return {
      list: [
        {
          image: "favicon.ico",
          time: "2022-00-00 11:11:11",
          title: "标题",
          preview: "预览",
          type: "类别",
        },
        {
          image: "favicon.ico",
          time: "2022-00-00 11:11:11",
          title: "标题",
          preview: "预览",
          type: "类别",
        },
        {
          image: "favicon.ico",
          time: "2022-00-00 11:11:11",
          title: "标题",
          preview: "预览",
          type: "类别",
        },
        {
          image: "favicon.ico",
          time: "2022-00-00 11:11:11",
          title: "标题",
          preview: "预览",
          type: "类别",
        },
        {
          image: "favicon.ico",
          time: "2022-00-00 11:11:11",
          title: "标题",
          preview: "预览",
          type: "类别",
        },
        {
          image: "favicon.ico",
          time: "2022-00-00 11:11:11",
          title: "标题",
          preview: "预览",
          type: "类别",
        },
        {
          image: "favicon.ico",
          time: "2022-00-00 11:11:11",
          title: "标题",
          preview: "预览",
          type: "类别",
        },
        {
          image: "favicon.ico",
          time: "2022-00-00 11:11:11",
          title: "标题",
          preview: "预览",
          type: "类别",
        },
        {
          image: "favicon.ico",
          time: "2022-00-00 11:11:11",
          title: "标题",
          preview: "预览",
          type: "类别",
        },
        {
          image: "favicon.ico",
          time: "2022-00-00 11:11:11",
          title: "标题",
          preview: "预览",
          type: "类别",
        },
      ],
    };
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.back {
  .content {
    margin-left: calc((100% - 1000px) / 2);
    width: 1000px;
    height: 100%;
    .list {
      width: 100%;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
    }
  }
}
</style>