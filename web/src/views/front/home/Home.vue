<template>
  <div class="home-back">
    <div class="content" v-loading="loading">
      <div
        class="list"
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="loading"
        infinite-scroll-distance="100"
      >
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
      pageNo: 1,
      pageSize: 9,
      isNoData: false,
    };
  },
  mounted() {
    this.pageNo = 1;
    this.queryBlog();
  },
  methods: {
    loadMore() {
      if (this.isNoData) {
        return;
      }
      this.pageNo += 1;
      this.queryBlog();
    },
    queryBlog() {
      get(
        "/blog/list",
        {
          pageNo: this.pageNo,
          pageSize: this.pageSize,
          typeId: this.$route.query.typeId,
        },
        false,
        false,
        (data) => {
          this.list = [...this.list, ...data];
          this.loading = false;
          if (data.length < this.pageSize) {
            this.isNoData = true;
          }
        },
        () => {
          if (this.pageNo > 1) {
            this.pageNo - 1;
          }
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