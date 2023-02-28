<template>
  <div class="home-back">
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
import { get } from "@/request/request";

export default {
  components: {
    HomeItem,
  },
  name: "FrontHome",
  data() {
    return {
      list: [],
    };
  },
  mounted() {
    this.queryBlog();
  },
  methods: {
    queryBlog(typeId) {
      get("/blog/list", typeId ? { typeId } : null, false, false, (data) => {
        this.list = data;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.home-back {
  .content {
    margin-left: calc((100% - 1000px) / 2);
    width: 1000px;
    padding-bottom: 20px;
    .list {
      width: 100%;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
    }
  }
}
</style>