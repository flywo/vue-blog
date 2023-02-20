<template>
  <div class="l-back">
    <div class="type-list">
      <div class="add">新建分类</div>
      <ul>
        <li
          v-for="(item, index) in types"
          :key="'type-' + index"
          :class="index === currentType ? 'type-current' : ''"
          @click="changeType(index)"
        >
          {{ item }}
          <i
            class="el-icon-delete-solid more"
            @click.stop="deleteType(index)"
          ></i>
          <i class="el-icon-s-tools more" @click.stop="editType(index)"></i>
        </li>
      </ul>
    </div>
    <div class="blog-list"></div>
    <div class="blog-content"></div>
  </div>
</template>

<script>
export default {
  name: "AdminList",
  data() {
    return {
      types: ["1", "2"],
      currentType: 0,
    };
  },
  methods: {
    changeType(index) {
      this.currentType = index;
    },
    deleteType() {},
    editType() {},
  },
};
</script>

<style lang="scss" scoped>
.l-back {
  height: 100%;
  width: 100%;
  display: flex;
  .type-list {
    width: 10%;
    height: 100%;
    overflow-y: auto;
    background-color: #404040;
    .add {
      cursor: pointer;
      color: #f2f2f2;
      text-align: center;
      margin-block: 10px;
    }
    ul {
      list-style: none;
      padding-left: 0;
      margin-top: 0;
      margin-bottom: 0;
      li {
        line-height: 40px;
        font-size: 15px;
        cursor: pointer;
        color: #f2f2f2;
        padding: 0 0 0 15px;
        .more {
          float: right;
          margin-top: 12.5px;
          margin-right: 10px;
        }
      }
      li:hover {
        background-color: #666;
      }
      .type-current {
        background-color: #666;
        border-left: 3px solid #ec7259;
        padding-left: 12px;
      }
    }
  }
  .blog-list {
    width: 20%;
    height: 100%;
    overflow-y: auto;
  }
  .blog-content {
    width: 70%;
    height: 100%;
    overflow-y: auto;
  }
}
</style>