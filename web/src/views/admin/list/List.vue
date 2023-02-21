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
    <div class="blog-list">
      <div class="add">新建文章</div>
      <ul>
        <li
          v-for="(item, index) in blogs"
          :key="'blog-' + index"
          :class="index === currentBlog ? 'blog-current' : ''"
        >
          <i class="el-icon-delete-solid more"></i>
          <span>{{ item.title }}</span>
          <span>{{ item.preview }}</span>
        </li>
      </ul>
    </div>
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
      blogs: [
        {
          title: "标题",
          preview: "预览",
        },
        {
          title: "标题",
          preview: "预览",
        },
        {
          title: "标题",
          preview: "预览",
        },
      ],
      currentBlog: 0,
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
    border-right: 1px solid #d9d9d9;
    .add {
      line-height: 20px;
      font-size: 15px;
      font-weight: 400;
      padding: 20px 0 20px 25px;
      cursor: pointer;
      color: #595959;
      text-align: center;
    }
    ul {
      list-style: none;
      padding-left: 0;
      margin-top: 0;
      margin-bottom: 0;
      li {
        cursor: pointer;
        height: 90px;
        border-left: 5px solid transparent;
        box-shadow: 0 0 0 1px #d9d9d9;
        padding-left: 20px;
        padding-block: 15px;
        box-sizing: border-box;
        span {
          display: block;
          height: 30px;
          line-height: 30px;
          overflow: hidden;
          -o-text-overflow: ellipsis;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 18px;
          color: #333;
        }
        span:nth-child(3) {
          color: #595959;
          font-size: 16px;
        }
        .more {
          float: right;
          color: #333;
          margin-inline: 10px;
          margin-top: 22.5px;
        }
      }
      li:hover {
        background-color: #e6e6e6;
      }
      .blog-current {
        border-left-color: #ec7259;
        background-color: #e6e6e6;
      }
    }
  }
  .blog-content {
    width: 70%;
    height: 100%;
    overflow-y: auto;
  }
}
</style>