<template>
  <div class="home-back">
    <div class="content" v-loading="loading">
      <div class="list">
        <home-item
          class="item"
          v-for="(item, index) in list"
          :key="'grid-item-' + index"
          :options="item"
        >
        </home-item>
      </div>
      <el-empty v-if="list.length === 0" description="当前没有内容"></el-empty>
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
      loading: true,
    };
  },
  mounted() {
    this.queryBlog(this.$route.query.typeId);
  },
  methods: {
    queryBlog(typeId) {
      get(
        "/blog/list",
        typeId ? { typeId } : null,
        false,
        false,
        (data) => {
          this.loading = false;
          this.list = data;
        },
        () => {
          this.loading = false;
        }
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.home-back {
  .content {
    padding-bottom: 20px;
    transition: all 0.3s ease-out;
    .list {
      width: 100%;
      display: grid;
      gap: 20px;
      transition: all 0.3s ease-out;
    }
  }
}
@media only screen and (min-width: 1020px) {
  .home-back {
    .content {
      margin-left: calc((100% - var(--big-screen-min-width)) / 2);
      width: var(--big-screen-min-width);
      .list {
        grid-template-columns: repeat(3, 1fr);
      }
    }
  }
}

@media only screen and (max-width: 1020px) {
  .home-back {
    .content {
      margin-left: 20px;
      width: calc(100% - 40px);
      .list {
        grid-template-columns: repeat(2, 1fr);
      }
    }
  }
}

@media only screen and (max-width: 620px) {
  .home-back {
    .content {
      .list {
        grid-template-columns: repeat(1, 1fr);
      }
    }
  }
}
</style>